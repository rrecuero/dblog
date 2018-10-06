import React, { Component } from 'react';
import logo from './logo.svg';
import ReadString from "./components/ReadString";
import SetString from "./components/SetString";
import Checkout from './components/Checkout';

import './App.scss';

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
    const { isAuthenticated, userHasScopes } = this.props.auth;
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
        <div className="App-intro">
          <Checkout
             name={'The Road to learn React'}
             description={'Only the Book'}
             amount={1}
           />
          <ReadString
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          />
          <SetString
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          />
        </div>
        {!isAuthenticated() && (
          <button
            className="btn-margin"
            onClick={this.login.bind(this)}>
            Log In
          </button>
        )}
        {isAuthenticated() && (
          <button
            className="btn-margin"
            onClick={this.logout.bind(this)}
          >
            Log Out
          </button>
        )}
        {isAuthenticated() &&  userHasScopes(['write:posts']) && (
          <button
            className="btn-margin"
            onClick={this.goTo.bind(this, 'admin')}
          >
            Admin
          </button>
        )}
      </div>
    );
  }
}

export default App;
