// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("NFTMarketplace", (m) => {
  // Create a contract instance for NFTMarketplace without any parameters
  const NFTMarketplace = m.contract("NFTMarketplace");

  return { NFTMarketplace };
});
