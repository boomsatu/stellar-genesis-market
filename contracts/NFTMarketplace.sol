// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./core/NFTMarketplaceCore.sol";
import "./storage/MarketplaceStorage.sol";
import "./interfaces/IMarketplace.sol";
import "./libraries/MarketplaceLib.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title NFTMarketplace
 * @dev Main marketplace contract that orchestrates all NFT trading functionality
 * Uses modular architecture with core business logic separated from storage
 */
contract NFTMarketplace is NFTMarketplaceCore, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    using MarketplaceLib for MarketplaceStorage.Listing;

    MarketplaceStorage public immutable marketplaceStorage;
    
    // Events
    event ListingCreated(uint256 indexed listingId, address indexed seller, address indexed nftContract, uint256 tokenId, uint256 price);
    event ListingSold(uint256 indexed listingId, address indexed buyer, address indexed seller, uint256 price);
    event ListingCancelled(uint256 indexed listingId, address indexed seller);
    event AuctionCreated(uint256 indexed auctionId, address indexed seller, address indexed nftContract, uint256 tokenId, uint256 startingPrice, uint256 endTime);
    event BidPlaced(uint256 indexed auctionId, address indexed bidder, uint256 amount);
    event AuctionEnded(uint256 indexed auctionId, address indexed winner, uint256 finalPrice);
    event RoyaltyPaid(address indexed creator, uint256 amount);
    event CollectionFeeSet(address indexed collection, uint256 feePercentage);

    constructor(address _marketplaceStorage) {
        marketplaceStorage = MarketplaceStorage(_marketplaceStorage);
    }

    /**
     * @dev Create a fixed-price listing for an NFT
     */
    function createListing(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        address paymentToken
    ) external override nonReentrant {
        require(price > 0, "Price must be greater than 0");
        require(_isValidNFTContract(nftContract), "Invalid NFT contract");
        
        // Transfer NFT to marketplace
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        
        uint256 listingId = _createListing(nftContract, tokenId, price, paymentToken, msg.sender);
        
        emit ListingCreated(listingId, msg.sender, nftContract, tokenId, price);
    }

    /**
     * @dev Purchase an NFT from a fixed-price listing
     */
    function buyNFT(uint256 listingId) external payable override nonReentrant {
        MarketplaceStorage.Listing memory listing = marketplaceStorage.getListing(listingId);
        require(listing.isActive, "Listing not active");
        require(msg.value >= listing.price, "Insufficient payment");
        
        // Calculate fees and royalties
        (uint256 marketplaceFee, uint256 royaltyFee, uint256 sellerAmount) = _calculateFees(listing.price, listing.nftContract);
        
        // Transfer payments
        _processSale(listing.seller, sellerAmount, marketplaceFee, royaltyFee, listing.nftContract);
        
        // Transfer NFT to buyer
        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);
        
        // Update listing status
        marketplaceStorage.deactivateListing(listingId);
        
        emit ListingSold(listingId, msg.sender, listing.seller, listing.price);
    }

    /**
     * @dev Cancel an active listing
     */
    function cancelListing(uint256 listingId) external override nonReentrant {
        MarketplaceStorage.Listing memory listing = marketplaceStorage.getListing(listingId);
        require(listing.seller == msg.sender, "Only seller can cancel");
        require(listing.isActive, "Listing not active");
        
        // Return NFT to seller
        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);
        
        // Deactivate listing
        marketplaceStorage.deactivateListing(listingId);
        
        emit ListingCancelled(listingId, msg.sender);
    }

    /**
     * @dev Create an auction for an NFT
     */
    function createAuction(
        address nftContract,
        uint256 tokenId,
        uint256 startingPrice,
        uint256 duration,
        address paymentToken
    ) external override nonReentrant {
        require(startingPrice > 0, "Starting price must be greater than 0");
        require(duration >= 1 hours, "Auction duration too short");
        require(_isValidNFTContract(nftContract), "Invalid NFT contract");
        
        // Transfer NFT to marketplace
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        
        uint256 auctionId = _createAuction(nftContract, tokenId, startingPrice, duration, paymentToken, msg.sender);
        
        emit AuctionCreated(auctionId, msg.sender, nftContract, tokenId, startingPrice, block.timestamp + duration);
    }

    /**
     * @dev Place a bid on an active auction
     */
    function placeBid(uint256 auctionId) external payable override nonReentrant {
        MarketplaceStorage.Auction memory auction = marketplaceStorage.getAuction(auctionId);
        require(auction.isActive, "Auction not active");
        require(block.timestamp < auction.endTime, "Auction ended");
        require(msg.value > auction.currentBid, "Bid too low");
        require(msg.sender != auction.seller, "Seller cannot bid");
        
        // Return previous bid
        if (auction.currentBidder != address(0)) {
            payable(auction.currentBidder).transfer(auction.currentBid);
        }
        
        // Update auction
        marketplaceStorage.updateAuctionBid(auctionId, msg.sender, msg.value);
        
        emit BidPlaced(auctionId, msg.sender, msg.value);
    }

    /**
     * @dev End an auction and transfer NFT to winner
     */
    function endAuction(uint256 auctionId) external override nonReentrant {
        MarketplaceStorage.Auction memory auction = marketplaceStorage.getAuction(auctionId);
        require(auction.isActive, "Auction not active");
        require(block.timestamp >= auction.endTime, "Auction still active");
        
        if (auction.currentBidder != address(0)) {
            // Calculate fees and royalties
            (uint256 marketplaceFee, uint256 royaltyFee, uint256 sellerAmount) = _calculateFees(auction.currentBid, auction.nftContract);
            
            // Transfer payments
            _processSale(auction.seller, sellerAmount, marketplaceFee, royaltyFee, auction.nftContract);
            
            // Transfer NFT to winner
            IERC721(auction.nftContract).transferFrom(address(this), auction.currentBidder, auction.tokenId);
            
            emit AuctionEnded(auctionId, auction.currentBidder, auction.currentBid);
        } else {
            // No bids, return NFT to seller
            IERC721(auction.nftContract).transferFrom(address(this), auction.seller, auction.tokenId);
            
            emit AuctionEnded(auctionId, address(0), 0);
        }
        
        // Deactivate auction
        marketplaceStorage.deactivateAuction(auctionId);
    }

    /**
     * @dev Set collection-specific marketplace fee
     */
    function setCollectionFee(address collection, uint256 feePercentage) external onlyOwner {
        require(feePercentage <= 1000, "Fee too high"); // Max 10%
        marketplaceStorage.setCollectionFee(collection, feePercentage);
        emit CollectionFeeSet(collection, feePercentage);
    }

    /**
     * @dev Withdraw accumulated marketplace fees
     */
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        payable(owner()).transfer(balance);
    }

    /**
     * @dev Get active listings with pagination
     */
    function getActiveListings(uint256 offset, uint256 limit) 
        external 
        view 
        returns (MarketplaceStorage.Listing[] memory listings) {
        return marketplaceStorage.getActiveListings(offset, limit);
    }

    /**
     * @dev Get active auctions with pagination
     */
    function getActiveAuctions(uint256 offset, uint256 limit) 
        external 
        view 
        returns (MarketplaceStorage.Auction[] memory auctions) {
        return marketplaceStorage.getActiveAuctions(offset, limit);
    }

    /**
     * @dev Get user's listings
     */
    function getUserListings(address user) 
        external 
        view 
        returns (uint256[] memory listingIds) {
        return marketplaceStorage.getUserListings(user);
    }

    /**
     * @dev Get collection listings
     */
    function getCollectionListings(address collection) 
        external 
        view 
        returns (uint256[] memory listingIds) {
        return marketplaceStorage.getCollectionListings(collection);
    }
}