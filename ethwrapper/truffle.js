var HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config()
/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

const mnemonic = process.env.mnemonic;

 module.exports = {
   networks: {
     development: {
       host: "localhost",
       port: 8545,
       network_id: "*" // Match any network id
     },
     ropsten: {
         provider: function() {
           return new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/fb6b85d94a9c4923b24e1bb11472c253')
         },
         network_id: '3',
         gas: 4465030,
         gasPrice: 10000000000,
       },
     kovan: {
         provider: function() {
           return new HDWalletProvider(mnemonic, 'https://kovan.infura.io/v3/fb6b85d94a9c4923b24e1bb11472c253')
         },
         network_id: '42',
         gas: 4465030,
         gasPrice: 10000000000,
       },
   }
 };