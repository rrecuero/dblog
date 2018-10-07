/* eslint-disable */
export const config = {
  // DB
  mongodb: {
    params: {
      poolSize: 10,
      autoReconnect: true,
      connectTimeoutMS: 10000
    },
    dbname: 'heroku_nx9rz983',
    url: "mongodb://...",
    reconnectAttempts: 3
  },
  //Stripe
  Stripe: {
    test: 'sk_test_akl3XNXtFLBlCQkX0CV5P6P1',
    live: 'sk_test_MY_SECRET_KEY'
  },
  auth0: {
    domain: 'dapis.auth0.com'
  },
  // Mail
  Mandrill: {
    key: ''
  },
  jwt: {
    secret: 'asdasd'
  },
  logger: {
    host: 'test',
    port: '1'
  }
};
