import Web3Modal from "web3modal";
import Web3 from "web3";
import { AuctionAddress, AuctionABI } from "./constants";

const contractAuction = {
  connectingWithSmartContract: async () => {
    try {
      // Kết nối ví thông qua Web3Modal
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();

      // Tạo instance Web3.js từ kết nối
      const web3 = new Web3(connection);
      // Khởi tạo hợp đồng smart contract với Web3.js
      const Contract = new web3.eth.Contract(
        AuctionABI, // ABI của hợp đồng
        AuctionAddress // Địa chỉ của hợp đồng
      );

      console.log(Contract);

      return Contract;
    } catch (error) {
      console.log("not connect to smart contract");
    }
  },
  address: AuctionAddress,
};

export default contractAuction;
