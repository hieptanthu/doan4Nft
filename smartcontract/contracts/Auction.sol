// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFT.sol";



contract Auction {


     using Counters for Counters.Counter;

    Counters.Counter private _itemsSold;

    struct AuctionItem {
        uint256 tokenId;
        address payable seller;
        uint256 startingPrice;
        uint256 highestBid;
        address payable highestBidder;
        uint256 startTime;
        uint256 endTime;
    }

    struct Bid { 
        address bidder; uint256 amount; uint256 timestamp; 
     }

    NFT private nftContract; // Tham chiếu đến contract NFT
    mapping(uint256 => AuctionItem) public auctions;
    mapping(uint256 => Bid[]) public bidHistory;
    event AuctionCreated(uint256 tokenId, uint256 startingPrice, uint256 startTime,uint256 endTime);
    event NewBid(uint256 tokenId, address bidder, uint256 amount);
    event AuctionEnded(uint256 tokenId, address winner, uint256 amount);
    event deleteAuction(uint256 tokenId);


    constructor(NFT _nftContract) {
        nftContract = _nftContract;  // Khởi tạo contract NFT thông qua interface
    }

function createAuction(uint256 _tokenId, uint256 _startingPrice,uint256 _startTime ,uint256 _endTime) public {
    require(nftContract.ownerOf(_tokenId) == msg.sender, "Not the owner of the NFT");
    // Kiểm tra xem contract Auction đã được approve cho tokenId chưa
    require(nftContract.getApproved(_tokenId) == address(this), "Auction contract not approved");

    auctions[_tokenId] = AuctionItem({
        tokenId: _tokenId,
        seller: payable(msg.sender),
        startingPrice: _startingPrice,
        highestBid: 0,
        highestBidder: payable(address(0)),
        startTime: _startTime,
        endTime: _endTime
    });

     

    nftContract.transferFrom(msg.sender, address(this), _tokenId);
    nftContract.updateStatusMyNFT(_tokenId, NFT.NFTStatus.Auction);

    emit AuctionCreated(_tokenId, _startingPrice, _startTime, _endTime);
}

function cancelAuction(uint256 _tokenId) public {
        AuctionItem storage auction = auctions[_tokenId];
        require(auction.seller == msg.sender, "Only seller can cancel the auction");
        require(auction.highestBidder == address(0), "Auction already has bids");
        nftContract.updateStatusMyNFT(_tokenId, NFT.NFTStatus.None);
        // Trả lại NFT cho seller
        nftContract.transferFrom(address(this), auction.seller, _tokenId);
       deleteTokenSell(_tokenId);
    }

function getTime() public view returns (uint256) {
        return block.timestamp;
    }


function placeBid(uint256 _tokenId) public payable {
    AuctionItem storage auction = auctions[_tokenId];
    
    require(block.timestamp >= auction.startTime, "Auction has not started");
    require(block.timestamp <= auction.endTime, "Auction has ended");

    // Kiểm tra giá thầu
    require(msg.value > auction.startingPrice, "Bid must be higher than starting price");
    require(msg.value > auction.highestBid, "Bid must be higher than current highest bid");

    // Hoàn lại tiền cho bidder trước đó nếu có
    if (auction.highestBidder != address(0)) {
        auction.highestBidder.transfer(auction.highestBid);
    }

        // Lưu thông tin của người đấu giá vào lịch sử
    // Lưu thông tin của người đấu giá vào lịch sử
        bidHistory[_tokenId].push(Bid({
            bidder:payable(msg.sender),
            amount: msg.value,
            timestamp: block.timestamp
        }));

    auction.highestBid = msg.value;
    auction.highestBidder = payable(msg.sender);

    emit NewBid(_tokenId, msg.sender, msg.value);
}


function endAuction(uint256 _tokenId) public {
    AuctionItem storage auction = auctions[_tokenId];
    require(block.timestamp >= auction.endTime, "Auction not yet ended");
    require(auction.seller == msg.sender||auction.highestBidder== msg.sender, "Only seller can end the auction");
        nftContract.updateStatusMyNFT(_tokenId, NFT.NFTStatus.None);
    if (auction.highestBidder == address(0)) {
        // Không có ai đấu giá, trả lại NFT cho người bán
        nftContract.transferFrom(address(this), auction.seller, _tokenId);
    } else {
        

        // Chuyển tiền cho người bán
        auction.seller.transfer(auction.highestBid);

        // update owner 
        nftContract.updateOwnerMyNFT(_tokenId,auction.highestBidder);
        // Chuyển NFT cho người thắng
        nftContract.transferFrom(address(this), auction.highestBidder, _tokenId);
        _itemsSold.increment();
    }
    
    deleteTokenSell(_tokenId);
    emit AuctionEnded(_tokenId, auction.highestBidder, auction.highestBid);
    
}

    // Delete market item
function deleteTokenSell(uint256 _tokenId) private {
    // Remove the auction associated with the tokenId
    delete auctions[_tokenId];
    
    // Emit the event for deletion
    emit deleteAuction(_tokenId);
}


// Hàm để lấy lịch sử đấu giá cho một token
    function getBidHistory(uint256 _tokenId) public view returns (Bid[] memory) {
        return bidHistory[_tokenId];
    }
    
    
    function getDetails(uint256 tokenId) public view returns (AuctionItem memory) {
        return auctions[tokenId];
    }


}
