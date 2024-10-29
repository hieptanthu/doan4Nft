import Web3Modal from "web3modal";
import Web3 from "web3";
import { NFTsAddress, NFTsABI } from "./constants";

const connectSmartContract = async () => {
  try {
    // Kết nối ví thông qua Web3Modal
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();

    // Tạo instance Web3.js từ kết nối
    const web3 = new Web3(connection);
    // Khởi tạo hợp đồng smart contract với Web3.js
    const Contract = new web3.eth.Contract(
      NFTsABI, // ABI của hợp đồng
      NFTsAddress // Địa chỉ của hợp đồng
    );

    console.log(Contract);

    return Contract;
  } catch (error) {
    console.log("not connect to smart contract");
  }
};

const contractNFTs = {
  connectingWithSmartContract: async () => {
    try {
      // Kết nối ví thông qua Web3Modal
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();

      // Tạo instance Web3.js từ kết nối
      const web3 = new Web3(connection);
      // Khởi tạo hợp đồng smart contract với Web3.js
      const Contract = new web3.eth.Contract(
        NFTsABI, // ABI của hợp đồng
        NFTsAddress // Địa chỉ của hợp đồng
      );

      return Contract;
    } catch (error) {
      console.log("not connect to smart contract");
    }
  },
};

export default contractNFTs;
