import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Callback from './containers/Callback';
import registerServiceWorker from './utils/registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

//Auth0
const auth = new Auth();
// let drizzle know what contracts we want
const options = { contracts: [MyStringStore] };
// setup the drizzle store and drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);
const history = createBrowserHistory();

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
      <App drizzle={drizzle}>
        <LoadingContainer>
          <Router history={history} store={drizzleStore}>
            <Switch>
              <Route exact path="/" component={App} auth={auth} />
              <Route component={NoMatch} />
              <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} />
              }}/>
            </Switch>
          </Router>
        </LoadingContainer>
      </App>
    </DrizzleContext.Provider>
  ),
  document.getElementById('root')
);
registerServiceWorker();
