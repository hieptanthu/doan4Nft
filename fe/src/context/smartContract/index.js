import contractNFTs from "./NFTs";
import contractSell from "./NFTsSell";
import contractAuction from "./Auction";

const smartContract = {
  NFTs: contractNFTs,
  Sell: contractSell,
  Auction: contractAuction,
};

export default smartContract;
