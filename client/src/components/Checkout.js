import React from 'react'
import { createBrowserHistory } from 'history';
import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_P4hKXiuXPkqeeGW2ByhhLXZu'
  : 'pk_test_P4hKXiuXPkqeeGW2ByhhLXZu';

const PAYMENT_SERVER_URL = '/api/checkout';

const CURRENCY = 'USD';

const successPayment = (response) => {
  localStorage.setItem('paid', true);
  createBrowserHistory().replace('/blog');
};

const onToken = (amount, description, apiToken, userId) => token =>
  fetch(PAYMENT_SERVER_URL,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        'Authorization': `Bearer ${apiToken}` },
      body: JSON.stringify({
        userId,
        stripeParams: {
          description,
          source: token.id,
          currency: CURRENCY,
          amount: amount * 100
        }
      })
    })
    .then(successPayment)
    .catch((data) => {
      alert('Payment Error');
    });

const Checkout = ({ name, description, amount , apiToken, userId}) =>
  <StripeCheckout
    name={name}
    description={description}
    amount={amount * 100}
    token={onToken(amount, description, apiToken, userId)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />

export default Checkout;
