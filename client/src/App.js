import React, { Component } from 'react';
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
    const { isAuthenticated } = this.props.auth;
    if (this.state.loading) {
      return "Loading Drizzle...";
    }
    return (
      <div className="App">
        <header className="header-44">
          <nav class="nav-01">
            <div className="container is-fluid">
              <div class="nav-01__box">
                <div class="nav-01__logo"><a class="nav-01__link" href="javascript:void(0);" target="_blank" /> </div>
                <div class="nav-01__links js-menu">
                  <ul class="nav-01__list">
                    <li class="nav-01__item"><a class="button   button--white-outline  button--empty " href="javascript:void(0);" target="_blank">
                      <span>About</span></a>
                    </li>
                    <li class="nav-01__item"><a class="button   button--white-outline  button--empty " href="javascript:void(0);" target="_blank">
                      <span>Features</span></a>
                    </li>
                    <li class="nav-01__item"><a class="button   button--white-outline  button--empty " href="javascript:void(0);" target="_blank">
                      <span>Pricing</span></a>
                    </li>
                    <li class="nav-01__item">
                      {isAuthenticated() && (
                        <button
                          className="button button--white-outline "
                          onClick={this.logout.bind(this)}
                        >
                          <span>Log Out</span>
                        </button>
                      )}
                      {!isAuthenticated() && (
                        <button
                          className="button button--white-outline "
                          onClick={this.logout.bind(this)}
                        >
                          <span>Sign Up</span>
                        </button>
                      )}
                    </li>
                  </ul>
                  <div class="nav-01__burger">
                    <button class="burger js-open-menu" type="button">
                      <div class="burger__box">
                        <div class="burger__inner"></div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <body>
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
          <div class="footer-01">
            <div class="container">
              <div class="footer-01__wrapper">
                <a class="footer-01__logo_link" href="javascript:void(0);"><img class="footer-01__logo" src="img/other/unicorn-logo-text--black.png"/></a>
                <ul class="footer-01__list">
                  <li class="footer-01__item"><a class="footer-01__link" href="javascript:void(0);" target="_blank">
                    ramon@dapis.io</a>
                  </li>
                </ul>
                <ul class="footer-01__list">
                  <li class="footer-01__item">
                    <a class="footer-01__link footer-01__link--black" href="javascript:void(0);" target="_blank">
                      Sign Up
                    </a>
                  </li>
                  <li class="footer-01__item"><a class="footer-01__link footer-01__link--black" href="javascript:void(0);" target="_blank">
                    F.A.Q.</a>
                  </li>
                  <li class="footer-01__item"><a class="footer-01__link footer-01__link--black" href="javascript:void(0);" target="_blank">
                    About</a>
                  </li>
                </ul>
                <ul class="footer-01__list">
                  <li class="footer-01__item"><a class="footer-01__link footer-01__link--black" href="https://twitter.com/unicornplatform" target="_blank">Twitter</a></li>
                  <li class="footer-01__item"><a class="footer-01__link footer-01__link--black" href="https://fb.com/unicornplatform" target="_blank">Facebook</a></li>
                  <li class="footer-01__item"><a class="footer-01__link footer-01__link--black" href="https://www.instagram.com/unicornplatform/" target="_blank">Instagram</a></li>
                </ul>
              </div>
            </div>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
