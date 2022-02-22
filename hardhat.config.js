/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "mainnet",
  networks: {
    hardhat: {},
    ropsten: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    mainnet: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "6V2TB93MF2FG7ER7CEEJGGJUCTQR4DEWHV"
  }
};

