require('dotenv').config()

const Web3 = require('web3');
const pk = process.env.private_key;
const postInterface = require('../../ethwrapper/build/contracts/Post.json').abi;

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
web3.eth.accounts.privateKeyToAccount(pk);

class PostContract {
  constructor() {
    this.defaultAccount = `0x30d3d0c5472dea9cf3bb907f5028c17b96180d4c`;
    this.PostContractAddress = `0xa22337f97351b1e19f686638a1ebca5c59cdd52a`;

    this.Post = new web3.eth.Contract(postInterface, this.PostContractAddress, {
      from: this.defaultAccount, // default from address
      gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });
  }

  createPostToken(toAddress, ipfsUri='Fyuccck', hash='bofasdfadsfdy') {
    this.Post.methods.createPost(ipfsUri, hash).send({from: this.defaultAccount, gas: '2000000'}, (error, transactionHash) => {
      if (error) {
        console.log('\n\nThere was an error calling createPost', error)
        return;
      }

    }).then((receipt) => {
      console.log('\n 🎉  Created New PostToken 🎉');
      console.log(`Created Token `, receipt.events.NewPost.returnValues);
      this._transferOwnership(toAddress, receipt.events.NewPost.returnValues.tokenId);
    });
  }

  _transferOwnership(to='0x60801c0625939a1368c2b753EEBbE50435AC56E6', tokenId) {
    this.Post.methods.transfer(to, tokenId).send({ from: this.defaultAccount, gas: '2000000'}).then(receipt => {
      console.log(`\n 🎊  Transferred ownership from ${this.defaultAccount} to ${to} 🎉 \n`)
      console.log(receipt.events.Transfer.returnValues);
    });
  }

}

const postContract = new PostContract();
module.exports = postContract;
