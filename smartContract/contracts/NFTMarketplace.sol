// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage, ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _auctionIdCounter;
    Counters.Counter private _itemsSold;
    Counters.Counter private _myNFT;

    address payable  owner;

    struct myNFT{
        uint256 tokenId;
       string title;
       string Description;
       address payable  owner; 
       bool show;
    }

    

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        uint256 price;
      
    }

    struct Auction {
        uint256 tokenId;
        address payable seller;
        uint256 startingPrice;
        uint256 highestBid;
        address payable highestBidder;
        uint256 startTime;
        uint256 endTime;
    }

    mapping(uint256 => MarketItem) private idMarketItem;
    mapping(uint256 => Auction) private IdAuctions;
    mapping(uint256 => myNFT) private idNFTs;
    event MarketItemCreated(uint256 tokenId, address seller, uint256 price);
    event AuctionCreated(uint256 auctionId, address indexed nftContract, uint256 indexed tokenId, address seller, uint256 startingPrice, uint256 startTime, uint256 endTime);
    event BidPlaced(uint256 indexed auctionId, address indexed bidder, uint256 bidAmount);
    event AuctionFinalized(uint256 indexed auctionId, address indexed winner, uint256 finalAmount);
    event TokenBought(uint256 tokenId, address buyer, uint256 price);
    event MarketItemDeleted(uint256 tokenId);
    event AuctionDeleted(uint256 tokenId);
    event createListMyNFT(   uint256 tokenId,
       string title,
       string Description,
       address payable  owner,
       bool show);

       event updateListMyNFT(   uint256 tokenId,
       string title,
       string Description,
       address payable  owner,
       bool show);

    modifier onlyOwnerOfToken(uint256 tokenId) {
        require(ownerOf(tokenId) == msg.sender, "Caller is not the owner of this token");
        _;
    }



    constructor() ERC721("NFT Marketplace Token", "NFTM") {
        owner = payable(msg.sender);
    }

    function deleteTokenSold(uint256 tokenId) private {
        // Check if the MarketItem exists by verifying the price or seller
        if (idMarketItem[tokenId].price > 0 || idMarketItem[tokenId].seller != address(0)) {
            delete idMarketItem[tokenId];  // Delete MarketItem if it exists
            emit MarketItemDeleted(tokenId); // Emit an event for market item deletion
        } 
        
        // Check if the Auction exists by verifying the highest bid or seller
        if (IdAuctions[tokenId].highestBid > 0 || IdAuctions[tokenId].seller != address(0)) {
            delete IdAuctions[tokenId];  // Delete Auction if it exists
            emit AuctionDeleted(tokenId); // Emit an event for auction deletion
        }
    }

    function updateOwner( uint256 tokenId ,address payable newOwner )private{

        myNFT storage item = idNFTs[tokenId];
        item.owner=newOwner;
       
        emit updateListMyNFT(tokenId, item.title,item.Description,newOwner,item.show);
    }

    



    // Create a new NFT token and list it for sale
    function createToken(string memory tokenUrl, string memory title,string memory Description,  bool show) public payable returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenUrl);
        idNFTs[newTokenId] = myNFT(newTokenId, title,Description,payable(msg.sender), show);
        emit createListMyNFT(newTokenId, title,Description,payable(msg.sender), show);
        return newTokenId;
    }

    // List NFT for sale
    function createSell(uint256 tokenId, uint256 price ) public onlyOwnerOfToken(tokenId) {
        deleteTokenSold(tokenId);
        idMarketItem[tokenId] = MarketItem(tokenId, payable(msg.sender), price);
        _transfer(msg.sender, address(this), tokenId);
        emit MarketItemCreated(tokenId, msg.sender, price);
    }

    function cancelSell(uint256 tokenId) public {
        MarketItem storage Item = idMarketItem[tokenId];
        
        // Ensure the caller is the seller
        require(Item.seller == msg.sender, "Only the seller can cancel the auction.");
        
        
        // Transfer the NFT back to the seller
        _transfer(address(this), Item.seller, Item.tokenId);
        deleteTokenSold(tokenId);
        
        emit AuctionFinalized(tokenId, Item.seller, 0);
    }

    // Buy NFT instantly
    function buyNFT(uint256 tokenId) public payable nonReentrant {
        MarketItem storage item = idMarketItem[tokenId];
        require(msg.value == item.price, "Please submit the asking price");
        item.seller.transfer(msg.value);
        _transfer(address(this), msg.sender, tokenId);
        _itemsSold.increment();
        deleteTokenSold(tokenId);
        emit TokenBought(tokenId, msg.sender, item.price);
        
    }

    // Create an auction for an NFT
    function createAuction(uint256 tokenId, uint256 startingPrice, uint256 startTime, uint256 endTime) public onlyOwnerOfToken(tokenId) {
        require(startingPrice > 0, "Starting price must be greater than zero");
        deleteTokenSold(tokenId);
        IdAuctions[tokenId] = Auction({
            tokenId: tokenId,
            seller: payable(msg.sender),
            startingPrice: startingPrice,
            highestBid: 0,
            highestBidder: payable(address(0)),
            startTime: startTime,
            endTime: endTime
           
        });

        _transfer(msg.sender, address(this), tokenId);
        emit AuctionCreated(tokenId, address(this), tokenId, msg.sender, startingPrice, startTime, endTime);
    }

    function cancelAuction(uint256 tokenId) public {
        Auction storage auction = IdAuctions[tokenId];
        // Ensure the caller is the seller
        require(auction.seller == msg.sender, "Only the seller can cancel the auction.");
        
        // Check if there are no bids placed
        require(auction.highestBid == 0, "Cannot cancel the auction after a bid has been placed.");
        
        // Transfer the NFT back to the seller
        _transfer(address(this), auction.seller, auction.tokenId);
        deleteTokenSold(tokenId);
        emit AuctionFinalized(tokenId, auction.seller, 0);
    }

    // Place a bid on an auction
    function placeBid(uint256 auctionId) public payable nonReentrant {
        Auction storage auction = IdAuctions[auctionId];
        require(block.timestamp < auction.endTime, "Auction has ended");
        require(block.timestamp > auction.startTime, "Auction not start");
        require(msg.value > auction.highestBid, "Bid must be higher than the current highest bid");
        require(msg.value >= auction.startingPrice, "Bid must be at least the starting price");

        // Refund the previous highest bidder
        if (auction.highestBidder != address(0)) {
            auction.highestBidder.transfer(auction.highestBid);
        }

        auction.highestBid = msg.value;
        auction.highestBidder = payable(msg.sender);
        emit BidPlaced(auctionId, msg.sender, msg.value);
    }

    // Finalize the auction
    function finalizeAuction(uint256 tokenId) public nonReentrant {
        Auction storage auction = IdAuctions[tokenId];
        require(block.timestamp >= auction.endTime, "Auction has not ended yet");

        if (auction.highestBidder != address(0)) {
            _transfer(address(this), auction.highestBidder, auction.tokenId);
            auction.seller.transfer(auction.highestBid);
            emit AuctionFinalized(tokenId, auction.highestBidder, auction.highestBid);
            deleteTokenSold(tokenId);
        } else {
            deleteTokenSold(tokenId);
            _transfer(address(this), auction.seller, auction.tokenId);
        }
    }

    // show NFT
    function ShowOnOrOffNFT( uint256 tokenId ,bool show ) public onlyOwnerOfToken(tokenId){

        myNFT storage item = idNFTs[tokenId];
        item.show=show;
        emit updateListMyNFT(tokenId, item.title,item.Description,item.owner,show);
    }

 
    
}
