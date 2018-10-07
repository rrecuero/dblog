import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createBrowserHistory } from 'history';
import Auth from './auth/Auth';

// import css
import 'font-awesome/css/font-awesome.min.css';
// import 'bulma/css/bulma.css';
import './index.scss';

// let drizzle know what contracts we want
const options = { contracts: [] };
// setup the drizzle store and drizzle
const history = createBrowserHistory();
//Auth0
const auth = new Auth(history);


ReactDOM.render((
    <App auth={auth} />
  ),
  document.getElementById('root')
);
// registerServiceWorker();
