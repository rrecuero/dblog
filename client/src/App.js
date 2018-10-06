import React, { Component } from 'react';
import logo from './logo.svg';
import Callback from './containers/Callback';
import Profile from './containers/Profile';
import Posts from './containers/Posts';
import Home from './containers/Home';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.scss';


// TODO: Move out
const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);


class App extends Component {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
    this.ping();
  }

  handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      this.props.auth.handleAuthentication();
    }
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  ping() {
    return fetch(`/api/ping`, {
      accept: 'application/json',
    })
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          apiLoaded: true
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          apiLoaded: true,
          apiError: error
        });
      }
    )
  }

  compomentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) {
      return "Loading Drizzle...";
    }
    return (
      <div className="App">
        <h1> Drizzle is ready </h1>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Router history={createBrowserHistory()}>
          <Switch>
            <Route exact path="/" render={(props) =>
              <Home drizzle={this.props.drizzle} auth={this.props.auth} {...props} />} />
            <Route exact path="/profile" render={(props) =>
              <Profile auth={this.props.auth} {...props} />} />
            <Route exact path="/callback" render={(props) => {
              this.handleAuthentication(props);
              return <Callback {...props} />
            }}/>
            <Route path="/myposts" render={(props) => (
              !this.props.auth.isAuthenticated() ? (
                <Redirect to="/"/>
              ) : (
                <Posts auth={this.props.auth} {...props} />
              )
            )} />
            <Route path="/admin" render={(props) => (
              !this.props.auth.isAuthenticated() || !this.props.auth.userHasScopes(['write:posts']) ? (
                <Redirect to="/"/>
              ) : (
                <h1> Admin </h1>
              )
            )} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
