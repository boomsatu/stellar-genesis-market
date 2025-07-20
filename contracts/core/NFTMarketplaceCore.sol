// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../storage/MarketplaceStorage.sol";
import "../interfaces/IMarketplace.sol";
import "../libraries/MarketplaceLib.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

/**
 * @title NFTMarketplaceCore
 * @dev Core business logic for NFT marketplace operations
 * Handles listing creation, auction management, fee calculations, and royalty distributions
 */
abstract contract NFTMarketplaceCore is IMarketplace {
    using Counters for Counters.Counter;
    using MarketplaceLib for MarketplaceStorage.Listing;

    // Core marketplace configuration
    uint256 public constant MAX_MARKETPLACE_FEE = 1000; // 10%
    uint256 public constant MAX_ROYALTY_FEE = 1000; // 10%
    uint256 public constant MIN_AUCTION_DURATION = 1 hours;
    uint256 public constant MAX_AUCTION_DURATION = 30 days;

    uint256 public marketplaceFeePercentage = 250; // 2.5%
    address public feeRecipient;

    // Counters for unique IDs
    Counters.Counter private _listingIdCounter;
    Counters.Counter private _auctionIdCounter;

    // Supported NFT contracts (whitelist)
    mapping(address => bool) public supportedNFTContracts;
    
    // Supported payment tokens
    mapping(address => bool) public supportedPaymentTokens;

    modifier onlySupported(address nftContract) {
        require(supportedNFTContracts[nftContract], "NFT contract not supported");
        _;
    }

    modifier validPaymentToken(address token) {
        require(token == address(0) || supportedPaymentTokens[token], "Payment token not supported");
        _;
    }

    /**
     * @dev Internal function to create a new listing
     */
    function _createListing(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        address paymentToken,
        address seller
    ) internal validPaymentToken(paymentToken) returns (uint256) {
        require(IERC721(nftContract).ownerOf(tokenId) == address(this), "NFT not transferred");
        
        _listingIdCounter.increment();
        uint256 listingId = _listingIdCounter.current();

        MarketplaceStorage.Listing memory newListing = MarketplaceStorage.Listing({
            listingId: listingId,
            seller: seller,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            paymentToken: paymentToken,
            isActive: true,
            timestamp: block.timestamp
        });

        MarketplaceStorage(getMarketplaceStorage()).createListing(newListing);
        
        return listingId;
    }

    /**
     * @dev Internal function to create a new auction
     */
    function _createAuction(
        address nftContract,
        uint256 tokenId,
        uint256 startingPrice,
        uint256 duration,
        address paymentToken,
        address seller
    ) internal validPaymentToken(paymentToken) returns (uint256) {
        require(duration >= MIN_AUCTION_DURATION && duration <= MAX_AUCTION_DURATION, "Invalid duration");
        require(IERC721(nftContract).ownerOf(tokenId) == address(this), "NFT not transferred");
        
        _auctionIdCounter.increment();
        uint256 auctionId = _auctionIdCounter.current();

        MarketplaceStorage.Auction memory newAuction = MarketplaceStorage.Auction({
            auctionId: auctionId,
            seller: seller,
            nftContract: nftContract,
            tokenId: tokenId,
            startingPrice: startingPrice,
            currentBid: 0,
            currentBidder: address(0),
            paymentToken: paymentToken,
            startTime: block.timestamp,
            endTime: block.timestamp + duration,
            isActive: true
        });

        MarketplaceStorage(getMarketplaceStorage()).createAuction(newAuction);
        
        return auctionId;
    }

    /**
     * @dev Calculate marketplace fees, royalties, and seller amount
     */
    function _calculateFees(uint256 salePrice, address nftContract) 
        internal 
        view 
        returns (uint256 marketplaceFee, uint256 royaltyFee, uint256 sellerAmount) {
        
        // Calculate marketplace fee
        uint256 collectionFee = MarketplaceStorage(getMarketplaceStorage()).getCollectionFee(nftContract);
        uint256 effectiveFeePercentage = collectionFee > 0 ? collectionFee : marketplaceFeePercentage;
        marketplaceFee = (salePrice * effectiveFeePercentage) / 10000;

        // Calculate royalty fee if contract supports EIP-2981
        royaltyFee = 0;
        if (_supportsRoyalties(nftContract)) {
            (, uint256 royaltyAmount) = IERC2981(nftContract).royaltyInfo(0, salePrice);
            royaltyFee = royaltyAmount;
        }

        // Ensure total fees don't exceed sale price
        uint256 totalFees = marketplaceFee + royaltyFee;
        require(totalFees <= salePrice, "Fees exceed sale price");

        sellerAmount = salePrice - totalFees;
    }

    /**
     * @dev Process sale payments including fees and royalties
     */
    function _processSale(
        address seller,
        uint256 sellerAmount,
        uint256 marketplaceFee,
        uint256 royaltyFee,
        address nftContract
    ) internal {
        // Pay seller
        if (sellerAmount > 0) {
            payable(seller).transfer(sellerAmount);
        }

        // Pay marketplace fee
        if (marketplaceFee > 0) {
            payable(feeRecipient).transfer(marketplaceFee);
        }

        // Pay royalty
        if (royaltyFee > 0 && _supportsRoyalties(nftContract)) {
            (address royaltyRecipient,) = IERC2981(nftContract).royaltyInfo(0, royaltyFee);
            payable(royaltyRecipient).transfer(royaltyFee);
            emit RoyaltyPaid(royaltyRecipient, royaltyFee);
        }
    }

    /**
     * @dev Check if NFT contract supports EIP-2981 royalties
     */
    function _supportsRoyalties(address nftContract) internal view returns (bool) {
        try IERC165(nftContract).supportsInterface(type(IERC2981).interfaceId) returns (bool supported) {
            return supported;
        } catch {
            return false;
        }
    }

    /**
     * @dev Validate NFT contract
     */
    function _isValidNFTContract(address nftContract) internal view returns (bool) {
        return supportedNFTContracts[nftContract] && 
               IERC165(nftContract).supportsInterface(type(IERC721).interfaceId);
    }

    /**
     * @dev Get marketplace storage contract address
     */
    function getMarketplaceStorage() internal view virtual returns (address);

    // Events for core operations
    event RoyaltyPaid(address indexed recipient, uint256 amount);
    event MarketplaceFeeUpdated(uint256 newFeePercentage);
    event NFTContractSupported(address indexed nftContract, bool supported);
    event PaymentTokenSupported(address indexed token, bool supported);
}