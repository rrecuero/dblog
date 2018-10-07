import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Auth from './auth/Auth';
import Loading from './containers/Loading';
import Profile from './containers/Profile';
import Blog from './containers/Blog';
import Home from './containers/Home';
import Subscription from './containers/Subscription';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// import css
import 'font-awesome/css/font-awesome.min.css';
// import 'bulma/css/bulma.css';
import './index.scss';

// let drizzle know what contracts we want
// setup the drizzle store and drizzle
//Auth0
const auth = new Auth();

// TODO: Move out
const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

const handleAuthentication = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    this.props.auth.handleAuthentication();
  }
}

ReactDOM.render((
    <App auth={auth} >
      <Router>
        <Switch>
          <Route exact path="/" render={(props) =>
            <Home auth={auth} {...props} />} />
          <Route exact path="/profile" render={(props) =>
            <Profile auth={auth} {...props} />} />
          <Route exact path="/callback" render={(props) => {
            auth.handleAuthentication(props);
            return <Loading {...props} />
          }}/>
          <Route path="/subscription" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
              <Subscription auth={auth} {...props} />
            )
          )} />
          <Route path="/blog" render={(props) => (
            !auth.isAuthenticated() || !auth.hasPaid()? (
              <Redirect to="/"/>
            ) : (
              <Blog auth={auth} {...props} />
            )
          )} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </App>
  ),
  document.getElementById('root')
);
// registerServiceWorker();
