import { config } from 'config';
import request from 'superagent';
import { ManagementClient } from 'auth0';

const management = new ManagementClient({
  domain: config.get('auth0').domain,
  clientId: '0Ch84OXZjIw5WrnXTiEF5FmV6jVTj6Fw',
  clientSecret: 'dw38oQ9XmTdwdk6WV0jfHCK0hthh-JC3AEHH1gOCSKoec08XRoqRBgCjkfCSsDkO'
});


function writePost(req, res) {
  // const token = req.headers.authorization.split(' ')[1];
  // Get user address it will be in the payload or call middleman
  // 0. Write file to IPFS (maybe change the owner to the address)
  // 1. Create Post by calling PostFactory
  // 2. Transfer the post owner to the eth address
  management.updateUserMetadata({ id: userId }, { paid: true }, (err, user) => {
    if (err) {
      // Handle error
      res.status(500).send({ error: err });
    }
    // Updated user.
    console.log(user);
    res.status(200).send({ success: stripeRes });
  });
  res.status(200).send({ result: {} });
}


module.exports = (app) => {
  app.post('/api/post', writePost);
};
