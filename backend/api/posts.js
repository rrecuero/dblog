// import { config } from 'config';

function writePost(req, res) {
  // Get user address it will be in the payload or call middleman
  // 0. Write file to IPFS (maybe change the owner to the address)
  // 1. Create Post by calling PostFactory
  // 2. Transfer the post owner to the eth address
  res.status(200).send({ result: {} });
}

module.exports = (app) => {
  app.post('/api/post', writePost);
};
