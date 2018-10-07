import { config } from 'config';
// import request from 'superagent';
import { ManagementClient } from 'auth0';
import UserManager from '../users/userManager';

const createPost = require('../lib/createPost');

const management = new ManagementClient({
  domain: config.get('auth0').domain,
  clientId: '0Ch84OXZjIw5WrnXTiEF5FmV6jVTj6Fw',
  clientSecret: 'dw38oQ9XmTdwdk6WV0jfHCK0hthh-JC3AEHH1gOCSKoec08XRoqRBgCjkfCSsDkO'
});
const userManager = new UserManager();

function writePost(req, res) {
  const {
    userId,
    ethAddress,
    text,
    title
  } = req.body;

  const createdAt = new Date();
  userManager.getUserPosts(userId, (err, posts) => {
    if (err) {
      // Handle error
      return res.status(500).send({ error: err });
    }
    createPost({ content: text, title, createdAt }, posts, userId, ethAddress, (errPost, postHash, blogHash) => {
      if (errPost) {
        return res.status(500).send({ error: errPost });
      }
      userManager.insertPost({
        userId,
        ethAddress,
        postHash,
        createdAt: new Date(),
        text,
        title
      }, (err2) => {
        if (err2) {
          // Handle error
          return res.status(500).send({ error: err2 });
        }
        console.log('postHash', postHash);
        management.updateUserMetadata({ id: userId }, { ethAddress, latestBlogHash: blogHash }, (err3) => {
          if (err3) {
            // Handle error
            return res.status(500).send({ error: err3 });
          }
          // Updated user.
          res.status(200).send({
            result: {
              ethAddress,
              title,
              text,
              ipfsHash: postHash,
              latestBlogHash: blogHash,
              transaction: '',
              tokenUri: ''
            },
          });
        });
      });
    });
  });
}

function getPosts(req, res) {
  const { userId } = req.query;
  userManager.getUserPosts(userId, (err, posts) => {
    if (err) {
      // Handle error
      res.status(500).send({ error: err });
    }
    res.status(200).send({
      result: posts
    });
  });
}


module.exports = (app) => {
  app.post('/api/post', writePost);
  app.get('/api/posts', getPosts);
};
