import React, { Component } from 'react';
import Checkout from '../components/Checkout';
import Pricing from '../components/Pricing';

class Subscription extends Component {
  render() {

    return (
      <div className="container">
        <h1> Choose a plan </h1>
        <Pricing auth={this.props.auth} isAuthenticated />
      </div>
    );
  }
}

export default Subscription;
