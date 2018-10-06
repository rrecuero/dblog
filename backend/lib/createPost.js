var rp = require('request-promise');
var fs = require('fs');
var md5 = require('md5');

const IPFS_URL = 'https://ipfs.infura.io:5001/api/v0';

  // Get user address it will be in the payload or call middleman
  // [X] - 0. Write file to IPFS (maybe change the owner to the address)
  // [] - 1. Create Post by calling PostFactory
  // [] - 2. Transfer the post owner to the eth address

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

async function writeFileToIPFS (data={title: 'Sample Title', body: 'Sample whatever'}) {
  const fileName = md5(data);
  const wstream = fs.createWriteStream(`${__dirname}/${fileName}.json`);
  wstream.write(JSON.stringify(data));
  wstream.end();

  const options = {
    method: 'POST',
    uri: `${IPFS_URL}/add?pin=false`,
    formData: {
      file: {
          value: fs.createReadStream(`${__dirname}/${fileName}.json`),
          options: {
              contentType: 'application/json'
          }
      }
    },
    json: true,
  };

  rp(options)
    .then(res => {
      console.log('\n 🎉  Sucessfully saved to IPFS 🎉\n\n', res);
      console.log('\n');
      removeTempFile(fileName);
    })
    .catch(err => {
      console.log('API call failed: ', err);
    });
}

function removeTempFile(fileName) {
  fs.unlink(`${__dirname}/${fileName}.json`, (err) => {
    if (err) throw err;
  });
}

// writeFileToIPFS();

