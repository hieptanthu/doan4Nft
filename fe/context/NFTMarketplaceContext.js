// src/ContractContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Router from "next/router";
import axios from "axios";
import { nftMarketplaceAddress, nftMarketplaceABI } from "./constants";
import Web3Modal from "web3modal";
import { NFTStorage, File } from "nft.storage";
const client = new NFTStorage({
  token: "697b0133.edf5943516c041918a0c1134f2025f3b",
});
// Import just a few select items

const checkContract = async () => {
  const contract = await connectingWithSmartContract();
  console.log(contract.interface.fragments);
};

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    nftMarketplaceAddress,
    nftMarketplaceABI,
    signerOrProvider
  );

//CONNECTING WITH SMART CONTRACT
const connectingWithSmartContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const singer = provider.getSigner();
    const contract = fetchContract(singer);
    return contract;
  } catch (error) {
    console.log("not connect to smart contract");
  }
};

async function uploadToNFTStorage(fileData) {
  const fromData = new FormData();
  fromData.append("file", fileData);

  const response = await axios({
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    data: fromData,
    headers: {
      pinata_api_key: `da91802aa3accdffd5ef`,
      pinata_secret_api_key: `9730ed98f26704e345c35ed0e5e290f2ec98583a7b20b4dde8e09a382018e770`,
    },
  });

  const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  return ImgHash;
}

export const useContract = React.createContext();

export const ContractProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [data, setData] = useState(0);
  const [inputValue, setInputValue] = useState("");

  //  Connecting Wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      setAccount(accounts[0]);

      window.location.reload();
    } catch (error) {
      console.log("SomeTing Went connecting With wallet");
    }
  };

  // check If Wallet Connected
  const checkIfWalletConnected = async () => {
    try {
      checkContract();
      if (!window.ethereum) return console.log("Install MetaMask");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      console.log(accounts[0]);
      if (accounts.length) {
        setAccount(accounts[0]);
      } else {
        console.log("No Account Found");
      }
    } catch (error) {
      console.log("SomeTing Went connecting With wallet");
    }
  };

  //create Function
  const createNFT = async (formInput, file) => {
    const { title, Description } = formInput;
    if (!title || !Description || !file) {
      return console.log("Data Is Missing", title);
    }
    const url = await uploadToNFTStorage(file);
    try {
      console.log(url);
    } catch (error) {
      console.log("Error while create NFT");
    }
  };

  return (
    <useContract.Provider
      value={{
        account,
        checkIfWalletConnected,
        connectWallet,
        createNFT,
      }}
    >
      {children}
    </useContract.Provider>
  );
};
