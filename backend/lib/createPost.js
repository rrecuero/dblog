const rp = require('request-promise');
const fs = require('fs');
const md5 = require('md5');
const postContract = require('./ethereum-lib');
const generateHtml = require('./generateHtml');
const IPFS_URL = 'https://ipfs.infura.io:5001/api/v0';

// Get user address it will be in the payload or call middleman
// [X] - 0. Write file to IPFS (maybe change the owner to the address)
// [X] - 1. Create Post by calling PostFactory
// [X] - 2. Transfer the post owner to the eth address

function removeTempFile(fileName) {
  fs.unlink(`${__dirname}/${fileName}`, (err) => {
    if (err) throw err;
  });
}

function getFromIPFS(ipfsHash) {
  const options = {
    uri: `${IPFS_URL}?arg=${ipfsHash}&archive=true`,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    resolveWithFullResponse: true,
  };

  rp(options)
    .then((res) => {
      console.log('RESPONSE', res);
    })
    .catch((err) => {
      console.log('API Request Failed: ', err);
    });
}

function createPost(post, oldPosts, userId, cb) {
  const fileNamePost = md5(post.content + post.title);
  const fileNameBlog = 'blog' + userId;
  const contentPost = JSON.stringify(post);
  const contentBlog = generateHtml([...oldPosts, post]);

  const wstreamp = fs.createWriteStream(`${__dirname}/${fileNamePost}.json`);
  wstreamp.write(contentPost);
  wstreamp.end();
  const wstreamb = fs.createWriteStream(`${__dirname}/${fileNameBlog}.html`);
  wstreamb.write(contentBlog);
  wstreamb.end();

  const optionsPost = {
    method: 'POST',
    uri: `${IPFS_URL}/add?pin=false`,
    formData: {
      file: {
        value: fs.createReadStream(`${__dirname}/${fileNamePost}.json`),
        options: {
          contentType: 'application/json'
        }
      }
    },
    json: true,
  };

  const optionsBlog = {
    method: 'POST',
    uri: `${IPFS_URL}/add?pin=false`,
    formData: {
      file: {
        value: fs.createReadStream(`${__dirname}/${fileNameBlog}.html`),
        options: {
          contentType: 'application/json'
        }
      }
    },
    json: true,
  };

  return rp(optionsPost)
    .then((res) => {
      console.log('\n 🎉  Sucessfully saved post to IPFS 🎉\n\n', res);
      console.log(`\n https://cloudflare-ipfs.com/ipfs/${res.Hash}`);
      removeTempFile(fileNamePost + '.json');
      postContract.createPostToken(res.Hash, fileNamePost);
      rp(optionsBlog).then((res2) => {
        console.log('\n 🎉  Sucessfully saved blog to IPFS 🎉\n\n', res2);
        console.log(`\n https://cloudflare-ipfs.com/ipfs/${res2.Hash}`);
        removeTempFile(fileNameBlog + '.html');
        cb(null, res.Hash, res2.Hash);
      })
        .catch((err) => {
          console.log('API call failed: ', err);
        });
    })
    .catch((err) => {
      console.log('API call failed: ', err);
    });
}

// createPost({ content: 'bla bla', title: 'title 1', createdAt: new Date() }, [
//   { content: 'bla bla 2', title: 'title 2', createdAt: new Date() },
// ], 'userid', (err, postHash, blogHash) => {
//   console.log('err', err);
//   console.log('postHash', postHash);
//   console.log('blogHash', blogHash);
// });
module.exports = createPost;
