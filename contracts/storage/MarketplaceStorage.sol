// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title MarketplaceStorage
 * @dev Dedicated storage contract for marketplace data
 * Separates data storage from business logic for upgradability and modularity
 */
contract MarketplaceStorage is Ownable {
    using Counters for Counters.Counter;

    // Data structures
    struct Listing {
        uint256 listingId;
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        address paymentToken;
        bool isActive;
        uint256 timestamp;
    }

    struct Auction {
        uint256 auctionId;
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 startingPrice;
        uint256 currentBid;
        address currentBidder;
        address paymentToken;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
    }

    struct UserProfile {
        address user;
        string username;
        string bio;
        string profileImage;
        uint256 totalSales;
        uint256 totalPurchases;
        uint256 reputation;
        bool isVerified;
    }

    // Storage mappings
    mapping(uint256 => Listing) public listings;
    mapping(uint256 => Auction) public auctions;
    mapping(address => UserProfile) public userProfiles;
    
    // Collection-specific marketplace fees
    mapping(address => uint256) public collectionFees;
    
    // User activity tracking
    mapping(address => uint256[]) public userListings;
    mapping(address => uint256[]) public userAuctions;
    mapping(address => uint256[]) public userPurchases;
    
    // Collection tracking
    mapping(address => uint256[]) public collectionListings;
    mapping(address => uint256[]) public collectionAuctions;
    
    // Active listings and auctions for pagination
    uint256[] public activeListingIds;
    uint256[] public activeAuctionIds;
    
    // Counters
    Counters.Counter public totalListings;
    Counters.Counter public totalAuctions;
    
    // Access control
    mapping(address => bool) public authorizedContracts;
    
    modifier onlyAuthorized() {
        require(authorizedContracts[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }

    // Events
    event ListingStored(uint256 indexed listingId, address indexed seller);
    event AuctionStored(uint256 indexed auctionId, address indexed seller);
    event UserProfileUpdated(address indexed user);
    event ContractAuthorized(address indexed contractAddress, bool authorized);

    /**
     * @dev Authorize a contract to modify storage
     */
    function authorizeContract(address contractAddress, bool authorized) external onlyOwner {
        authorizedContracts[contractAddress] = authorized;
        emit ContractAuthorized(contractAddress, authorized);
    }

    /**
     * @dev Create a new listing
     */
    function createListing(Listing memory listing) external onlyAuthorized {
        listings[listing.listingId] = listing;
        userListings[listing.seller].push(listing.listingId);
        collectionListings[listing.nftContract].push(listing.listingId);
        activeListingIds.push(listing.listingId);
        
        totalListings.increment();
        emit ListingStored(listing.listingId, listing.seller);
    }

    /**
     * @dev Create a new auction
     */
    function createAuction(Auction memory auction) external onlyAuthorized {
        auctions[auction.auctionId] = auction;
        userAuctions[auction.seller].push(auction.auctionId);
        collectionAuctions[auction.nftContract].push(auction.auctionId);
        activeAuctionIds.push(auction.auctionId);
        
        totalAuctions.increment();
        emit AuctionStored(auction.auctionId, auction.seller);
    }

    /**
     * @dev Deactivate a listing
     */
    function deactivateListing(uint256 listingId) external onlyAuthorized {
        listings[listingId].isActive = false;
        _removeFromActiveListings(listingId);
    }

    /**
     * @dev Deactivate an auction
     */
    function deactivateAuction(uint256 auctionId) external onlyAuthorized {
        auctions[auctionId].isActive = false;
        _removeFromActiveAuctions(auctionId);
    }

    /**
     * @dev Update auction bid
     */
    function updateAuctionBid(uint256 auctionId, address bidder, uint256 amount) external onlyAuthorized {
        auctions[auctionId].currentBid = amount;
        auctions[auctionId].currentBidder = bidder;
    }

    /**
     * @dev Set collection-specific fee
     */
    function setCollectionFee(address collection, uint256 feePercentage) external onlyAuthorized {
        collectionFees[collection] = feePercentage;
    }

    /**
     * @dev Update user profile
     */
    function updateUserProfile(
        address user,
        string memory username,
        string memory bio,
        string memory profileImage
    ) external onlyAuthorized {
        UserProfile storage profile = userProfiles[user];
        profile.user = user;
        profile.username = username;
        profile.bio = bio;
        profile.profileImage = profileImage;
        
        emit UserProfileUpdated(user);
    }

    /**
     * @dev Record a purchase
     */
    function recordPurchase(address buyer, uint256 listingId, uint256 amount) external onlyAuthorized {
        userPurchases[buyer].push(listingId);
        userProfiles[buyer].totalPurchases += amount;
    }

    /**
     * @dev Record a sale
     */
    function recordSale(address seller, uint256 amount) external onlyAuthorized {
        userProfiles[seller].totalSales += amount;
    }

    // View functions
    function getListing(uint256 listingId) external view returns (Listing memory) {
        return listings[listingId];
    }

    function getAuction(uint256 auctionId) external view returns (Auction memory) {
        return auctions[auctionId];
    }

    function getUserProfile(address user) external view returns (UserProfile memory) {
        return userProfiles[user];
    }

    function getCollectionFee(address collection) external view returns (uint256) {
        return collectionFees[collection];
    }

    function getUserListings(address user) external view returns (uint256[] memory) {
        return userListings[user];
    }

    function getUserAuctions(address user) external view returns (uint256[] memory) {
        return userAuctions[user];
    }

    function getCollectionListings(address collection) external view returns (uint256[] memory) {
        return collectionListings[collection];
    }

    /**
     * @dev Get active listings with pagination
     */
    function getActiveListings(uint256 offset, uint256 limit) 
        external 
        view 
        returns (Listing[] memory) {
        require(offset < activeListingIds.length, "Offset out of bounds");
        
        uint256 end = offset + limit;
        if (end > activeListingIds.length) {
            end = activeListingIds.length;
        }
        
        Listing[] memory result = new Listing[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            result[i - offset] = listings[activeListingIds[i]];
        }
        
        return result;
    }

    /**
     * @dev Get active auctions with pagination
     */
    function getActiveAuctions(uint256 offset, uint256 limit) 
        external 
        view 
        returns (Auction[] memory) {
        require(offset < activeAuctionIds.length, "Offset out of bounds");
        
        uint256 end = offset + limit;
        if (end > activeAuctionIds.length) {
            end = activeAuctionIds.length;
        }
        
        Auction[] memory result = new Auction[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            result[i - offset] = auctions[activeAuctionIds[i]];
        }
        
        return result;
    }

    // Internal functions
    function _removeFromActiveListings(uint256 listingId) internal {
        for (uint256 i = 0; i < activeListingIds.length; i++) {
            if (activeListingIds[i] == listingId) {
                activeListingIds[i] = activeListingIds[activeListingIds.length - 1];
                activeListingIds.pop();
                break;
            }
        }
    }

    function _removeFromActiveAuctions(uint256 auctionId) internal {
        for (uint256 i = 0; i < activeAuctionIds.length; i++) {
            if (activeAuctionIds[i] == auctionId) {
                activeAuctionIds[i] = activeAuctionIds[activeAuctionIds.length - 1];
                activeAuctionIds.pop();
                break;
            }
        }
    }
}