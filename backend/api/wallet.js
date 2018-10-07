import { config } from 'config';
// import request from 'superagent';
import { ManagementClient } from 'auth0';

const management = new ManagementClient({
  domain: config.get('auth0').domain,
  clientId: '0Ch84OXZjIw5WrnXTiEF5FmV6jVTj6Fw',
  clientSecret: 'dw38oQ9XmTdwdk6WV0jfHCK0hthh-JC3AEHH1gOCSKoec08XRoqRBgCjkfCSsDkO'
});


function createWallet(req, res) {
  const { userId } = req.body;
  const ethAddress = '0x00000000000';
  management.updateUserMetadata({ id: userId }, { ethAddress }, (err) => {
    if (err) {
      // Handle error
      res.status(500).send({ error: err });
    }
    res.status(200).send({ result: ethAddress });
  });
}


module.exports = (app) => {
  app.post('/api/wallet', createWallet);
};
