import { ManagementClient } from 'auth0';
import { config } from 'config';

const management = new ManagementClient({
  domain: config.get('auth0').domain,
  clientId: '0Ch84OXZjIw5WrnXTiEF5FmV6jVTj6Fw',
  clientSecret: 'dw38oQ9XmTdwdk6WV0jfHCK0hthh-JC3AEHH1gOCSKoec08XRoqRBgCjkfCSsDkO'
});

function getUser(req, res, next) {
  const { userId } = req.query;
  management.getUser({ id: userId, fields: 'user_metadata' }, (error, user) => {
    if (error) {
      return next('Error getting latest user ' + error);
    }
    res.status(200).send({ result: user });
  });
}

module.exports = (app) => {
  app.get('/api/user', getUser);
};
