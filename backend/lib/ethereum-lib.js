require('dotenv').config()

const Web3 = require('web3');
const pk = process.env.private_key;
const postInterface = require('../../ethwrapper/build/contracts/Post.json').abi;

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
web3.eth.accounts.privateKeyToAccount(pk);

class PostContract {
  constructor() {
    this.defaultAccount = `0x72466A75a372CF1D1175590F2Ea8e8503EE5be00`;
    this.PostContractAddress = `0x4c6665e38517a8d99155f43e1f3066bc1ea77029`;

    this.Post = new web3.eth.Contract(postInterface, this.PostContractAddress, {
      from: this.defaultAccount, // default from address
      gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    }); 
  }

  async createPostToken(ipfsUri='Fyuccck', hash='bofasdfadsfdy') {
    this.Post.methods.createPost(ipfsUri, hash).send({from: this.defaultAccount, gas: '2000000'}, (error, transactionHash) => {
      if (error) {
        console.log('\n\nThere was an error calling createPost', error)
        return;
      }

    }).then((receipt) => {
      console.log('\n 🎉  Created New PostToken 🎉');
      console.log(`Created Token `, receipt.events.NewPost.returnValues);
      this._transferOwnership(undefined, receipt.events.NewPost.returnValues.tokenId);
    });
  }

  async _transferOwnership(to='0x60801c0625939a1368c2b753EEBbE50435AC56E6', tokenId) {
    this.Post.methods.transfer(to, tokenId).send({ from: this.defaultAccount, gas: '2000000'}).then(receipt => {
      console.log(`\n 🎊  Transferred ownership from ${this.defaultAccount} to ${to} 🎉 \n`)
      console.log(receipt.events.Transfer.returnValues);
    });
  }

}

const postContract = new PostContract();
module.exports = postContract;