import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Callback from './containers/Callback';
import Profile from './containers/Profile';
import Posts from './containers/Posts';
import registerServiceWorker from './utils/registerServiceWorker';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Auth from './auth/Auth';

// import drizzle functions
import { Drizzle, generateStore } from 'drizzle';
import { DrizzleContext } from 'drizzle-react';
import { LoadingContainer } from 'drizzle-react-components';
// import contract artifacts

import MyStringStore from './contracts/MyStringStore.json';

// import css
import 'font-awesome/css/font-awesome.min.css';
// import 'bulma/bulma.sass';
import './index.scss';

// let drizzle know what contracts we want
const options = { contracts: [MyStringStore] };
// setup the drizzle store and drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);
const history = createBrowserHistory();
//Auth0
const auth = new Auth(history);

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

// TODO: Move out
const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

ReactDOM.render((
    <DrizzleContext.Provider drizzle={drizzle}>
      <App drizzle={drizzle} auth={auth}>
        <LoadingContainer>
          <Router history={history} store={drizzleStore}>
            <Switch>
              <Route exact path="/" render={(props) =>
                <App auth={auth} {...props} />} />
              <Route exact path="/profile" render={(props) =>
                <Profile auth={auth} {...props} />} />
              <Route component={NoMatch} />
              <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} />
              }}/>
              <Route path="/myposts" render={(props) => (
                !auth.isAuthenticated() ? (
                  <Redirect to="/"/>
                ) : (
                  <Posts auth={auth} {...props} />
                )
              )} />
              <Route path="/admin" render={(props) => (
                !auth.isAuthenticated() || !auth.userHasScopes(['write:posts']) ? (
                  <Redirect to="/"/>
                ) : (
                  <h1> Admin </h1>
                )
              )} />
            </Switch>
          </Router>
        </LoadingContainer>
      </App>
    </DrizzleContext.Provider>
  ),
  document.getElementById('root')
);
registerServiceWorker();
