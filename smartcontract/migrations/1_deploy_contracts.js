const NFT = artifacts.require("NFT");
const Marketplace = artifacts.require("Marketplace");
const Auction = artifacts.require("Auction");

module.exports = async function (deployer) {
  // Deploy the NFT contract
  await deployer.deploy(NFT);

  // Get the deployed NFT instance
  const nftInstance = await NFT.deployed();

  // Deploy the Marketplace contract with the NFT contract instance
  await deployer.deploy(Marketplace, nftInstance.address); // Pass the address directly as a parameter
  await deployer.deploy(Auction, nftInstance.address); // Pass the address directly as a parameter
  const marketplaceInstance = await Marketplace.deployed();
  const AuctionInstance = await Auction.deployed();

  console.log("NFT deployed at:", nftInstance.address);
  console.log("Marketplace deployed at:", marketplaceInstance.address);
  console.log("AuctionInstance deployed at:", AuctionInstance.address);

  // Link Marketplace to NFT contract after both have been deployed
  await deployer.link(Marketplace, NFT);
};
