import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './utils/registerServiceWorker';
import { createBrowserHistory } from 'history';
import Auth from './auth/Auth';

// import drizzle functions
import { Drizzle, generateStore } from 'drizzle';
import { DrizzleContext } from 'drizzle-react';
// import contract artifacts

import MyStringStore from './contracts/MyStringStore.json';

// import css
import 'font-awesome/css/font-awesome.min.css';
// import 'bulma/css/bulma.css';
import './index.scss';

// let drizzle know what contracts we want
const options = { contracts: [MyStringStore] };
// setup the drizzle store and drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);
const history = createBrowserHistory();
//Auth0
const auth = new Auth(history);


ReactDOM.render((
    <DrizzleContext.Provider drizzle={drizzle}>
      <App drizzle={drizzle} auth={auth} />
    </DrizzleContext.Provider>
  ),
  document.getElementById('root')
);
registerServiceWorker();
