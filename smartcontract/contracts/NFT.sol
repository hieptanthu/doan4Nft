// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFT is ERC721URIStorage, ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    address payable public owner;
    enum NFTStatus { None, Sell, Auction }
    struct myNFT {
        uint256 tokenId;
        string title;
        string Description;
        address payable owner;
        bool show;
        string image;
       NFTStatus status ;
    }

    mapping(uint256 => myNFT) private idNFTs;

    event createListMyNFT(uint256 tokenId, string title, string Description, address payable owner, bool show, string image);
    event updateListMyNFT(uint256 tokenId, address payable owner, bool show ,NFTStatus status);
    event MarketplaceApproved(address marketplaceAddress, uint256 tokenId);

    constructor() ERC721("NFT Marketplace Token", "NFTM") {
        owner = payable(msg.sender);
    }



    // Helper function to convert enum to string for event
    function _getStatusString(NFTStatus status) internal pure returns (string memory) {
        if (status == NFTStatus.None) {
            return "None";
        } else if (status == NFTStatus.Sell) {
            return "Sell";
        } else {
            return "Auction";
        }
    }


    // Function to update the status of an NFT
    function updateStatusMyNFT(uint256 tokenId, NFTStatus _status) public onlyOwnerOfToken(tokenId) {
        myNFT storage item = idNFTs[tokenId];
        if (item.status != _status) {
            item.status = _status;
            emit updateListMyNFT(tokenId, item.owner, item.show, _status); // Emit an event for the status update
        }
    }

    // Function to update the owner of an NFT
    function updateOwnerMyNFT(uint256 tokenId, address _owner) public onlyOwnerOfToken(tokenId) {
        myNFT storage item = idNFTs[tokenId];
        if (item.owner != payable (_owner)) {
            item.owner = payable (_owner);
            emit updateListMyNFT(tokenId, payable (_owner), item.show, item.status);
        }
    }

  

    function approveMarketplace(address marketplaceAddress, uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner");
        
        approve(marketplaceAddress, tokenId);
        emit MarketplaceApproved(marketplaceAddress, tokenId);
    }

    // Create a new NFT
    function createToken(string memory tokenUrl, string memory title, string memory Description) public payable returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenUrl);

        idNFTs[newTokenId] = myNFT(newTokenId, title, Description, payable(msg.sender), true, tokenUrl,NFTStatus.None);
        emit createListMyNFT(newTokenId, title, Description, payable(msg.sender), true, tokenUrl);

        return newTokenId;
    }

    // Show or hide NFT
    function ShowOnOrOffNFT(uint256 tokenId, bool show) public onlyOwnerOfToken(tokenId) {
        myNFT storage item = idNFTs[tokenId];
        if (item.show != show) {
            item.show = show;
            emit updateListMyNFT(tokenId, item.owner, show ,item.status);
        }
    }

    // Get all my NFTs
    function getMyNFTs() public view returns (myNFT[] memory) {
        uint256 totalItems = _tokenIds.current(); // Total number of NFTs

        // Create an array to hold the owner's NFTs
        myNFT[] memory ownerItems = new myNFT[](totalItems); // Temporary array
        uint256 currentIndex = 0;

        // Single pass: Populate the array directly
        for (uint256 i = 1; i <= totalItems; i++) { // Start from 1 since IDs are assumed to start from 1
            if (idNFTs[i].status==NFTStatus.None) {
                ownerItems[currentIndex] = idNFTs[i]; // Store the NFT in the array
                currentIndex++; // Move to the next index in the array
            }
        }

        // Create a final array with the exact size of owned items
        myNFT[] memory finalOwnerItems = new myNFT[](currentIndex);
        for (uint256 j = 0; j < currentIndex; j++) {
            finalOwnerItems[j] = ownerItems[j]; // Copy to final array
        }

        return finalOwnerItems; // Return the array of NFTs owned by the owner
    }

    // Get NFTs owned by a specific owner
     function getOwnerMyNFTs(address nftOwner) public view returns (myNFT[] memory) {
        uint256 totalItems = _tokenIds.current(); // Total number of NFTs

        // Create an array to hold the owner's NFTs
        myNFT[] memory ownerItems = new myNFT[](totalItems); // Temporary array
        uint256 currentIndex = 0;

        // Single pass: Populate the array directly
        for (uint256 i = 1; i <= totalItems; i++) { // Start from 1 since IDs are assumed to start from 1
            if (idNFTs[i].owner == nftOwner && idNFTs[i].status==NFTStatus.None) {
                ownerItems[currentIndex] = idNFTs[i]; // Store the NFT in the array
                currentIndex++; // Move to the next index in the array
            }
        }

        // Create a final array with the exact size of owned items
        myNFT[] memory finalOwnerItems = new myNFT[](currentIndex);
        for (uint256 j = 0; j < currentIndex; j++) {
            finalOwnerItems[j] = ownerItems[j]; // Copy to final array
        }

        return finalOwnerItems; // Return the array of NFTs owned by the owner
    }

    // Get NFTs owned by a specific owner sell
    function getOwnerNFTsSell(address nftOwner) public view returns (myNFT[] memory) {
        uint256 totalItems = _tokenIds.current(); // Total number of NFTs

        // Create an array to hold the owner's NFTs
        myNFT[] memory ownerItems = new myNFT[](totalItems); // Temporary array
        uint256 currentIndex = 0;

        // Single pass: Populate the array directly
        for (uint256 i = 1; i <= totalItems; i++) { // Start from 1 since IDs are assumed to start from 1
            if (idNFTs[i].owner == nftOwner && idNFTs[i].status==NFTStatus.Sell) {
                ownerItems[currentIndex] = idNFTs[i]; // Store the NFT in the array
                currentIndex++; // Move to the next index in the array
            }
        }

        // Create a final array with the exact size of owned items
        myNFT[] memory finalOwnerItems = new myNFT[](currentIndex);
        for (uint256 j = 0; j < currentIndex; j++) {
            finalOwnerItems[j] = ownerItems[j]; // Copy to final array
        }

        return finalOwnerItems; // Return the array of NFTs owned by the owner
    }


    // Get NFTs owned by a specific owner Auction
    function getOwnerNFTsAuction(address nftOwner) public view returns (myNFT[] memory) {
        uint256 totalItems = _tokenIds.current(); // Total number of NFTs

        // Create an array to hold the owner's NFTs
        myNFT[] memory ownerItems = new myNFT[](totalItems); // Temporary array
        uint256 currentIndex = 0;

        // Single pass: Populate the array directly
        for (uint256 i = 1; i <= totalItems; i++) { // Start from 1 since IDs are assumed to start from 1
            if (idNFTs[i].owner == nftOwner && idNFTs[i].status==NFTStatus.Auction) {
                ownerItems[currentIndex] = idNFTs[i]; // Store the NFT in the array
                currentIndex++; // Move to the next index in the array
            }
        }

        // Create a final array with the exact size of owned items
        myNFT[] memory finalOwnerItems = new myNFT[](currentIndex);
        for (uint256 j = 0; j < currentIndex; j++) {
            finalOwnerItems[j] = ownerItems[j]; // Copy to final array
        }

        return finalOwnerItems; // Return the array of NFTs owned by the owner
    }


    // Get NFTs  SEll
     function getNFTsSell() public view returns (myNFT[] memory) {
        uint256 totalItems = _tokenIds.current(); // Total number of NFTs

        // Create an array to hold the owner's NFTs
        myNFT[] memory ownerItems = new myNFT[](totalItems); // Temporary array
        uint256 currentIndex = 0;

        // Single pass: Populate the array directly
        for (uint256 i = 1; i <= totalItems; i++) { // Start from 1 since IDs are assumed to start from 1
            if (idNFTs[i].status==NFTStatus.Sell) {
                ownerItems[currentIndex] = idNFTs[i]; // Store the NFT in the array
                currentIndex++; // Move to the next index in the array
            }
        }

        // Create a final array with the exact size of owned items
        myNFT[] memory finalOwnerItems = new myNFT[](currentIndex);
        for (uint256 j = 0; j < currentIndex; j++) {
            finalOwnerItems[j] = ownerItems[j]; // Copy to final array
        }

        return finalOwnerItems; // Return the array of NFTs owned by the owner
    }


//   Get NFTs  Auction
    function getNFTsAuction() public view returns (myNFT[] memory) {
        uint256 totalItems = _tokenIds.current(); // Total number of NFTs

        // Create an array to hold the owner's NFTs
        myNFT[] memory ownerItems = new myNFT[](totalItems); // Temporary array
        uint256 currentIndex = 0;

        // Single pass: Populate the array directly
        for (uint256 i = 1; i <= totalItems; i++) { // Start from 1 since IDs are assumed to start from 1
            if (idNFTs[i].status==NFTStatus.Auction) {
                ownerItems[currentIndex] = idNFTs[i]; // Store the NFT in the array
                currentIndex++; // Move to the next index in the array
            }
        }

        // Create a final array with the exact size of owned items
        myNFT[] memory finalOwnerItems = new myNFT[](currentIndex);
        for (uint256 j = 0; j < currentIndex; j++) {
            finalOwnerItems[j] = ownerItems[j]; // Copy to final array
        }

        return finalOwnerItems; // Return the array of NFTs owned by the owner
    }


    // Get NFT details
    function getNFTDetails(uint256 tokenId) public view returns (myNFT memory) {
        myNFT storage data = idNFTs[tokenId];
        if (!data.show) {
            require(data.owner == payable(msg.sender), "NFT show is set to false");
        }
        return data;
    }

    modifier onlyOwnerOfToken(uint256 tokenId) {
        require(ownerOf(tokenId) == msg.sender, "Caller is not the owner of this token");
        _;
    }

    modifier onlyContractOwner() {
        require(msg.sender == owner, "Caller is not the contract owner");
        _;
    }
}
