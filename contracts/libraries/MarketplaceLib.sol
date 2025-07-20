// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../storage/MarketplaceStorage.sol";

/**
 * @title MarketplaceLib
 * @dev Library for marketplace utility functions and validations
 */
library MarketplaceLib {
    
    /**
     * @dev Validate listing parameters
     */
    function validateListing(MarketplaceStorage.Listing memory listing) internal pure returns (bool) {
        return (
            listing.seller != address(0) &&
            listing.nftContract != address(0) &&
            listing.price > 0 &&
            listing.isActive
        );
    }

    /**
     * @dev Validate auction parameters
     */
    function validateAuction(MarketplaceStorage.Auction memory auction) internal view returns (bool) {
        return (
            auction.seller != address(0) &&
            auction.nftContract != address(0) &&
            auction.startingPrice > 0 &&
            auction.endTime > block.timestamp &&
            auction.isActive
        );
    }

    /**
     * @dev Calculate minimum bid increment (5% of current bid)
     */
    function calculateMinBidIncrement(uint256 currentBid) internal pure returns (uint256) {
        if (currentBid == 0) return 0;
        return (currentBid * 500) / 10000; // 5%
    }

    /**
     * @dev Check if auction is expired
     */
    function isAuctionExpired(MarketplaceStorage.Auction memory auction) internal view returns (bool) {
        return block.timestamp >= auction.endTime;
    }

    /**
     * @dev Calculate auction time remaining
     */
    function getTimeRemaining(MarketplaceStorage.Auction memory auction) internal view returns (uint256) {
        if (auction.endTime <= block.timestamp) return 0;
        return auction.endTime - block.timestamp;
    }

    /**
     * @dev Format price with decimals
     */
    function formatPrice(uint256 price, uint8 decimals) internal pure returns (string memory) {
        // Simple price formatting - can be enhanced for frontend display
        return string(abi.encodePacked(toString(price / (10 ** decimals))));
    }

    /**
     * @dev Convert uint to string
     */
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        
        return string(buffer);
    }

    /**
     * @dev Validate bid amount
     */
    function isValidBid(
        uint256 bidAmount,
        uint256 currentBid,
        uint256 minimumBid
    ) internal pure returns (bool) {
        if (currentBid == 0) {
            return bidAmount >= minimumBid;
        }
        
        uint256 minIncrement = calculateMinBidIncrement(currentBid);
        return bidAmount >= currentBid + minIncrement;
    }

    /**
     * @dev Calculate listing hash for uniqueness
     */
    function getListingHash(
        address nftContract,
        uint256 tokenId,
        address seller
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(nftContract, tokenId, seller));
    }

    /**
     * @dev Validate ETH payment amount
     */
    function validatePayment(uint256 required, uint256 sent) internal pure returns (bool) {
        return sent >= required;
    }
}