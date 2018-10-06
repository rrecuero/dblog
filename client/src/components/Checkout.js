import React from 'react'
// import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_MY_PUBLISHABLE_KEY'
  : 'pk_test_P4hKXiuXPkqeeGW2ByhhLXZu';

const PAYMENT_SERVER_URL = '/api/checkout';

const CURRENCY = 'USD';

const successPayment = data => {
  alert('Payment Successful');
};

const onToken = (amount, description, apiToken) => token =>

  fetch(PAYMENT_SERVER_URL,
    {
      method: 'POST',
      mode: 'cors',
      headers: { 'Authorization': `Bearer ${apiToken}` },
      body: {
        description,
        source: token.id,
        currency: CURRENCY,
        amount: amount * 100
      }
    })
    .then(successPayment)
    .catch((data) => {
      alert('Payment Error');
    });

const Checkout = ({ name, description, amount , apiToken}) =>
  <StripeCheckout
    name={name}
    description={description}
    amount={amount * 100}
    token={onToken(amount, description, apiToken)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />

export default Checkout;
