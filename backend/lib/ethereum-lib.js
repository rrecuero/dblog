require('dotenv').config()

const Web3 = require('web3');
const pk = process.env.private_key;
const postInterface = require('../../ethwrapper/build/contracts/Post.json').abi;

const web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/fb6b85d94a9c4923b24e1bb11472c253'));
web3.eth.accounts.privateKeyToAccount(pk);

class PostContract {
  constructor() {
    // Faraaz Accounts
    // this.defaultAccount = `0x72466A75a372CF1D1175590F2Ea8e8503EE5be00`;
    // this.PostContractAddress = `0xa79a89033a258a47f771d58554d9456fd1f44318`;

    this.defaultAccount = `0x9b073D121AAF5e18BfbD8f17ed79728BBB30fc7e`;
    this.PostContractAddress = `0xd219be8fc4ad8139dbeba9c8be356b214089c53e`;

    this.Post = new web3.eth.Contract(postInterface, this.PostContractAddress, {
      from: this.defaultAccount, // default from address
      gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });
  }

  createPostToken(toAddress, ipfsUri='QmRSj3L3iFf2ix3kE9xJWG7ga3vSEZmYtpg5nY5Nnh5VNo', hash='bofasdfadsfdy') {
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
