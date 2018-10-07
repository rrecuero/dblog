import React, { Component } from 'react';
import Pricing from '../components/Pricing';

class Subscription extends Component {

  render() {
    return (
      <div className="container">
        <Pricing auth={this.props.auth}
          isAuthenticated />
      </div>
    );
  }
}

export default Subscription;
