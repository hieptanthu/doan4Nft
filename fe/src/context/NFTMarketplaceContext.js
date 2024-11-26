// src/ContractContext.js

import React from "react";
import { useState } from "react";
import Web3Modal from "web3modal";
import smartContract from "./smartContract";
import ipfs from "./ipfs";
import Web3 from "web3";
import lbr from "@/library";

export const useContract = React.createContext();

export const ContractProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const accountHandler = {
    checkIfWalletConnected: async () => {
      try {
        if (!window.ethereum) {
          console.log("Please install MetaMask");
          return "";
        }

        const we3Modal = new Web3Modal();

        const provider = await we3Modal.connect();

        // Create a Web3 instance using the provider
        const web3 = new Web3(provider);
        // Request wallet connection (asks user for permission)
        const accounts = await web3.eth.requestAccounts();

        if (accounts.length > 0) {
          const account = accounts[0];

          // Get the balance of the connected account (balance is in wei)
          const accountOk = await web3.eth.getAccounts(account);
          localStorage.setItem("accountAddress", accountOk[0]);
          setAccount(accountOk[0]);
        } else {
          console.log("No accounts found");
        }
      } catch (error) {
        console.log(
          "Something went wrong while connecting with the wallet",
          error
        );
        return ""; // Return empty string on error
      }
    },

    address: async function () {
      // Use regular function to keep the correct context of 'this'
      let addressAccount = localStorage.getItem("accountAddress") || ""; // Use the correct key

      if (addressAccount === "") {
        addressAccount = await this.checkIfWalletConnected();
      }

      return addressAccount;
    },
  };

  const contractMyNFT = {
    createNFT: async (url, title, Description) => {
      try {
        const contract = await smartContract.NFTs.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        const web3 = new Web3(window.ethereum);
        const transaction = await contract.methods
          .createToken(url, title, Description)
          .send({
            from: account,
            value: web3.utils.toWei("0.000001", "ether"),
          });

        if (transaction.status) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("createNFT false", error);
      }
    },

    approveSell: async (tokenId) => {
      try {
        const contract = await smartContract.NFTs.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        const transaction = await contract.methods
          .approveMarketplace(smartContract.Sell.address, tokenId)
          .send({
            from: account,
          });
        if (transaction.status) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("CallMyNFTsOwner false", error);
      }
    },
    approveAuction: async (tokenId) => {
      try {
        const contract = await smartContract.NFTs.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        const transaction = await contract.methods
          .approveMarketplace(smartContract.Auction.address, tokenId)
          .send({
            from: account,
          });
        if (transaction.status) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("CallMyNFTsOwner false", error);
      }
    },

    CallNFTs: async () => {
      try {
        const contract = await smartContract.NFTs.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        const transaction = await contract.methods.getMyNFTs().call();

        return transaction;
      } catch (error) {
        console.log("CallMyNFTsOwner false", error);
      }
    },

    CallMyNFTsOfOwner: async (accountAddress) => {
      try {
        const contract = await smartContract.NFTs.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        const transaction = await contract.methods
          .getOwnerMyNFTs(accountAddress)
          .call();

        return transaction;
      } catch (error) {
        console.log("CallMyNFTsOwner false", error);
      }
    },
    CallSellNFTsOfOwner: async (accountAddress) => {
      try {
        const contract = await smartContract.NFTs.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        const transaction = await contract.methods
          .getOwnerNFTsSell(accountAddress)
          .call();
        return transaction;
      } catch (error) {
        console.log("CallMyNFTsOwner false", error);
      }
    },
    CallAuctionNFTsOwner: async (accountAddress) => {
      try {
        const contract = await smartContract.NFTs.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        const transaction = await contract.methods
          .getOwnerNFTsAuction(accountAddress)
          .call();

        return transaction;
      } catch (error) {
        console.log("CallMyNFTsOwner false", error);
      }
    },
    CallNFTDetails: async (tokenId) => {
      try {
        const contract = await smartContract.NFTs.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        const transaction = await contract.methods
          .getNFTDetails(tokenId)
          .call();

        return transaction;
      } catch (error) {
        console.log("CallMyNFTsOwner false", error);
      }
    },
    CallAllNFTsSell: async () => {
      try {
        const contract = await smartContract.NFTs.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        const transaction = await contract.methods.getNFTsSell().call();
        console.log(transaction);
        return transaction;
      } catch (error) {
        console.log("CallAllNFTsSell false", error);
      }
    },
    CallNFTsAuction: async () => {
      try {
        const contract = await smartContract.NFTs.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        const transaction = await contract.methods.getNFTsAuction().call();

        return transaction;
      } catch (error) {
        console.log("CallAllNFTsSell false", error);
      }
    },
    getTransferHistory: async (tokenId) => {
      try {
        // Kết nối với hợp đồng NFT
        const contract = await smartContract.NFTs.connectingWithSmartContract();
        if (!contract) {
          console.error("Contract is not initialized");
          return;
        }
        // Lắng nghe tất cả các sự kiện Transfer liên quan đến tokenId
        const transferHistory = await contract.getPastEvents("Transfer", {
          filter: { tokenId: tokenId }, // Lọc sự kiện Transfer theo tokenId
          fromBlock: 0, // Bắt đầu từ block 0
          toBlock: "latest", // Đến block mới nhất
        });

        const transferData = transferHistory.map((event) => ({
          from: event.returnValues.from,
          to: event.returnValues.to,
          tokenId: event.returnValues.tokenId,
        }));
        // Trả về mảng chứa thông tin về các sự kiện
        return transferData;
      } catch (error) {
        console.error("Error fetching transfer history:", error);
        return [];
      }
    },
  };

  const contractSell = {
    Sell: async (tokenId, price) => {
      try {
        const contract = await smartContract.Sell.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        const transaction = await contract.methods
          .createSell(tokenId, lbr.number.fromNumberToWei(price))
          .send({
            from: account,
          });

        if (transaction.status) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("createNFT false", error);
      }
    },

    cancel: async (tokenId) => {
      try {
        const contract = await smartContract.Sell.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        const transaction = await contract.methods
          .cancelSell(tokenId)
          .send({ from: account });

        if (transaction.status) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("createNFT false", error);
      }
    },

    CallDetails: async (tokenId) => {
      try {
        const contract = await smartContract.Sell.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        const transaction = await contract.methods
          .getMarketItemDetails(tokenId)
          .call();

        return transaction;
      } catch (error) {
        console.log("CallMyNFTsOwner false", error);
      }
    },
    Buy: async (tokenId, price) => {
      try {
        const contract = await smartContract.Sell.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        // Gửi giao dịch mua NFT
        const transaction = await contract.methods.buyNFT(tokenId).send({
          from: account,
          value: price,
        });
        if (transaction.status) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("createNFT false", error);
      }
    },
  };

  const contractAuction = {
    Auction: async (tokenId, price, startTime, endTime) => {
      try {
        const contract =
          await smartContract.Auction.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        const transaction = await contract.methods
          .createAuction(
            tokenId,
            lbr.number.fromNumberToWei(price),
            startTime,
            endTime
          )
          .send({
            from: account,
          });

        if (transaction.status) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("createNFT false", error);
      }
    },

    Cancel: async (tokenId) => {
      try {
        const contract =
          await smartContract.Auction.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        const transaction = await contract.methods
          .cancelAuction(tokenId)
          .send({ from: account });

        if (transaction.status) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("createNFT false", error);
      }
    },

    CallDetails: async (tokenId) => {
      try {
        const contract =
          await smartContract.Auction.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        const transaction = await contract.methods.getDetails(tokenId).call();
        console.log(transaction);
        return transaction;
      } catch (error) {
        console.log("Detail false", error);
      }
    },
    PlaceBid: async (tokenId, price) => {
      try {
        const contract =
          await smartContract.Auction.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        const priceIn = BigInt(lbr.number.fromNumberToWei(price));

        console.log(priceIn);
        const transaction = await contract.methods.placeBid(tokenId).send({
          from: account,
          value: priceIn,
        }); // Include the value in Wei

        if (transaction.status) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        if (error.data) {
          console.error("Chi tiết lỗi:", error.data);
        }
        // Kiểm tra lỗi và hiển thị thông báo phù hợp
        if (error.code === 4001) {
          console.error("Giao dịch bị hủy bỏ bởi người dùng");
        } else if (error.message.includes("insufficient funds")) {
          console.error("Không đủ số dư để thực hiện giao dịch");
        } else if (error.message.includes("reverted")) {
          console.error("Giao dịch bị từ chối. Kiểm tra điều kiện của đấu giá");
        } else {
          console.error("Lỗi không xác định:", error.message);
        }
      }
    },
    endAuction: async (tokenId) => {
      try {
        const contract =
          await smartContract.Auction.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        const transaction = await contract.methods
          .endAuction(tokenId)
          .send({ from: account });

        if (transaction.status) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("createNFT false", error);
      }
    },
    getBidHistory: async (tokenId) => {
      try {
        const contract =
          await smartContract.Auction.connectingWithSmartContract();
        if (!contract) {
          return console.error("Contract is not initialized");
        }

        const transaction = await contract.methods
          .getBidHistory(tokenId)
          .call();

        return transaction;
      } catch (error) {
        console.log("get Bid History false", error);
      }
    },

    TurnOnListenEventNewBid: async (def) => {
      try {
        const contract =
          await smartContract.Auction.connectingWithSmartContract();
        if (!contract) {
          throw new Error("Contract is not initialized");
        }

        contract.on("NewBid", def);
      } catch (error) {
        console.error("Error in TurnOnListenEventNewBid:", error);
      }
    },

    TurnOffListeningToNewBid: async (def) => {
      try {
        const contract =
          await smartContract.Auction.connectingWithSmartContract();
        if (!contract) {
          throw new Error("Contract is not initialized");
        }

        contract.off("NewBid", def);
      } catch (error) {
        console.error("Error in TurnOffListeningToNewBid:", error);
      }
    },

    contract: async () => {
      return await smartContract.Auction.connectingWithSmartContract();
    },
  };

  return (
    <useContract.Provider
      value={{
        accountHandler,
        ipfs,
        account,
        contractMyNFT,
        contractSell,
        contractAuction,
      }}
    >
      {children}
    </useContract.Provider>
  );
};
