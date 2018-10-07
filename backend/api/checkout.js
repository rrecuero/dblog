import configureStripe from 'stripe';
import { config } from 'config';
import { ManagementClient } from 'auth0';

const management = new ManagementClient({
  domain: config.get('auth0').domain,
  clientId: '0Ch84OXZjIw5WrnXTiEF5FmV6jVTj6Fw',
  clientSecret: 'dw38oQ9XmTdwdk6WV0jfHCK0hthh-JC3AEHH1gOCSKoec08XRoqRBgCjkfCSsDkO'
});

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
  ? config.get('Stripe').live : config.get('Stripe').test;

const stripe = configureStripe(STRIPE_SECRET_KEY);

const postStripeCharge = (req, res) => (stripeErr, stripeRes) => {
  const { userId } = req.body;
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    management.updateUserMetadata({ id: userId }, { paid: true }, (err, user) => {
      if (err) {
        // Handle error
        res.status(500).send({ error: err });
      }
      // Updated user.
      console.log(user);
      res.status(200).send({ success: stripeRes });
    });
  }
};
module.exports = (app) => {
  app.post('/api/checkout', (req, res) => {
    stripe.charges.create(req.body.stripeParams, postStripeCharge(req, res));
  });
};
