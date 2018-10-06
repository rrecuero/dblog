import React, { Component } from 'react';
import ReadString from "../components/ReadString";
import SetString from "../components/SetString";
import Checkout from '../components/Checkout';

import './Home.scss';

class Home extends Component {
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
  }

  compomentWillUnmount() {
    this.unsubscribe();
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    if (this.state.loading) {
      return "Loading Drizzle...";
    }
    const { isAuthenticated, userHasScopes } = this.props.auth;
    return (
      <div className="home">
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

export default Home;
