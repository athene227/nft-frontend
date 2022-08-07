import '@nomiclabs/hardhat-waffle';
import 'hardhat-gas-reporter';
import 'hardhat-contract-sizer';
//import 'hardhat-typechain';
import '@nomiclabs/hardhat-etherscan';
import dotenv from 'dotenv';
dotenv.config();

//const HDWalletProvider = require('@truffle/hdwallet-provider');
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

// 0x22F79d3E5b8e83c03Bb496E48970F255280b886c address that deploy the contract

const private_keys = [
  process.env.PRIVATE_KEY ||
    '21a2360b561fbfeebdd5b012e48a9e16e473ec931406abd05d26b5dae840c2e6'
];

// infuraId
const infuraId = process.env.INFURA_ID || '3d3184cc421046c8b638d184e8fbe107';

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.4',
    optimizer: {
      enabled: 'true',
      runs: 200
    }
  },
  networks: {
    hardhat: {
      gasPrice: 0,
      initialBaseFeePerGas: 0
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/ws/v3/${infuraId}`,
      accounts: private_keys,
      network_id: 4, // Ropsten's id
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true // Skip dry run before migrations? (default: false for public nets )
    },
    goerli: {
      url: process.env.GOERLI_PROVIDER_URL,
      accounts: [process.env.GOERLI_PRIVATE_KEY],
      network_id: 5,
      confirmations: 5
    },
    pulseTestnet: {
      url: 'https://rpc.v2b.testnet.pulsechain.com',
      accounts: private_keys,
      network_id: 941,
      gas: 5500000,
      skipDryRun: true
    }
  },
  mocha: {
    timeout: 400000
  },
  paths: {
    sources: './src'
  },
  gasReporter: {
    enabled: false,
    currency: 'USD'
  },
  contractSizer: {
    runOnCompile: false
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
