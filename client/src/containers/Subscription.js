import React, { Component } from 'react';
import Checkout from '../components/Checkout';

class Subscription extends Component {
  render() {

    return (
      <div>
        <Checkout
         name={'The Road to learn React'}
         description={'Only the Book'}
         amount={1}
       />
      </div>
    );
  }
}

export default Subscription;
