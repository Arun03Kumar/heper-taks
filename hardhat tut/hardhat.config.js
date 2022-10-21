require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY
module.exports = {
  defaultNetwork: "hardhat",
  hardhat: {},
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.API}`,
      accounts: [METAMASK_PRIVATE_KEY],
      chainId: 5,
    },
  },
  solidity: "0.8.17",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API,
  },
};
