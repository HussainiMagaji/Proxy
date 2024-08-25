//require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');
require("@nomicfoundation/hardhat-verify");

require("dotenv").config( );
//require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",

  networks: {
    swisstronik: {
      url: process.env.SWISSTRONIK_URL,
      accounts: [ process.env.PRIVATE_KEY ]
    },
  },

  etherscan: {
    apiKey: "ANY_STRING_WILL_DO",
    customChains: [
      {
        network: "swisstronik",
        chainId: 1291,
        urls: {
          apiURL: "https://explorer-evm.testnet.swisstronik.com/api",
          browserURL: "https://explorer-evm.testnet.swisstronik.com",
        },
      },
    ],
  },

  sourcify: {
    enabled: true
  }

};
