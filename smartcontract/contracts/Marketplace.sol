// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./NFT.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Marketplace {
    using Counters for Counters.Counter;

    Counters.Counter private _itemsSold;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        uint256 price;
    }

    mapping(uint256 => MarketItem) private idMarketItem;

    event MarketItemCreated(uint256 tokenId, address seller, uint256 price);
    event TokenBought(uint256 tokenId, address buyer, uint256 price);
    event SellItemDeleted(uint256 tokenId);

    NFT private nftContract;

    constructor(NFT _nftContract) {
        nftContract = _nftContract;
    }

    // List NFT for sale
    function createSell(uint256 tokenId, uint256 price) public {
        // Check for approval
        require(
            nftContract.getApproved(tokenId) == address(this) || 
            nftContract.isApprovedForAll(msg.sender, address(this)), 
            "ERC721: insufficient approval"
        );

        // Create market item
        idMarketItem[tokenId] = MarketItem(tokenId, payable(msg.sender), price);
        
        // Transfer NFT to marketplace
        nftContract.transferFrom(msg.sender, address(this), tokenId);
        nftContract.updateStatusMyNFT(tokenId, NFT.NFTStatus.Sell);
        emit MarketItemCreated(tokenId, msg.sender, price);
    }

    // Buy NFT instantly
    function buyNFT(uint256 tokenId) public payable {
        MarketItem storage item = idMarketItem[tokenId];
        require(msg.value == item.price, "Please submit the asking price");

        // Transfer the funds to the seller
        item.seller.transfer(msg.value);
        //update satust
        nftContract.updateStatusMyNFT(tokenId, NFT.NFTStatus.None);

        // update owner 
        nftContract.updateOwnerMyNFT(tokenId,msg.sender);
        // Transfer the NFT to the buyer
        nftContract.transferFrom(address(this), msg.sender, tokenId);

        // Increment sold items count and delete market item
        _itemsSold.increment();
        delete idMarketItem[tokenId];

        emit TokenBought(tokenId, msg.sender, item.price);
    }

    // Cancel the sale of the NFT
    function cancelSell(uint256 tokenId) public {
        MarketItem storage item = idMarketItem[tokenId];

        // Ensure the caller is the seller
        require(item.seller == payable(msg.sender), "Only the seller can cancel the sale.");
        nftContract.updateStatusMyNFT(tokenId, NFT.NFTStatus.None);
        // Transfer the NFT back to the seller
        nftContract.transferFrom(address(this), msg.sender, tokenId);
        
        // Delete the market item
        deleteTokenSell(tokenId);
    }

    // Get market item details
    function getMarketItemDetails(uint256 tokenId) public view returns (MarketItem memory) {
        return idMarketItem[tokenId];
    }



    // Delete market item
    function deleteTokenSell(uint256 tokenId) private {
        delete idMarketItem[tokenId];
        emit SellItemDeleted(tokenId);
    }
}
