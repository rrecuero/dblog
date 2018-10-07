import React, { Component } from 'react';
import Checkout from './Checkout';

class Pricing extends Component {
  state = { userId: this.props.auth && this.props.auth.userProfile };
  componentDidMount() {
    if (this.props.auth && !this.props.auth.userProfile) {
      this.props.auth.getProfile((err, profile) => {
        this.setState({ userId: profile.sub });
      });
    }
  }

  render() {
    return (
      <div className="pricing-03" id="pricing">
        <div className="pricing-03__container container container--large">
          <div className="pricing-03__wrapper">
            <div className="pricing-03__info">
              <h1 className="heading">Simple and Fair Pricing</h1>
              <div className="pricing-03__info_text">
                <p>Create your own blog that leverages the power of the blockchain. Get the best of the blockchain with loosing on usability.</p>
                <p>Your posts are always your own. Blockchain allows you to verify your posts and move them when necessary.</p>
              </div>
            </div>
            <div className="pricing-03__illustration js-toggle-animation" title="Release sunlight"><img className="pricing-03__main_img" src="img/emoji/cloud.png"/><img className="pricing-03__secondary_img" src="img/emoji/sun.png"/></div>
            <div className="pricing-03__price">
              <div className="pricing-03__price_top">
                <h2 className="heading">$9 per month</h2>
              </div>
              <div className="pricing-03__price_bottom">
                <ul className="pricing-03__benefits_list">
                  <li className="pricing-03__benefit"><img className="pricing-03__benefit_icon" src="img/icons/checked--acid.svg"/>
                    <div className="pricing-03__benefit_text">Transferable blog</div>
                  </li>
                  <li className="pricing-03__benefit"><img className="pricing-03__benefit_icon" src="img/icons/checked--acid.svg"/>
                    <div className="pricing-03__benefit_text">IPFS Hosting</div>
                  </li>
                  <li className="pricing-03__benefit"><img className="pricing-03__benefit_icon" src="img/icons/checked--acid.svg"/>
                    <div className="pricing-03__benefit_text">Post - ERC-721 Collectible</div>
                  </li>
                  <li className="pricing-03__benefit"><img className="pricing-03__benefit_icon" src="img/icons/checked--acid.svg"/>
                    <div className="pricing-03__benefit_text">Custom Styles(Coming Soon)</div>
                  </li>
                  <li className="pricing-03__benefit"><img className="pricing-03__benefit_icon" src="img/icons/checked--acid.svg"/>
                    <div className="pricing-03__benefit_text">Custom Domain(Coming Soon)</div>
                  </li>
                </ul>
                <div className="pricing-03__button">
                  {this.props.auth && this.props.auth && this.props.auth.userProfile &&
                    <Checkout
                      apiToken={this.props.auth.getAccessToken()}
                      userId= {this.props.auth && this.props.auth.userProfile.sub}
                      name={'dBlog Subscription'}
                      description={'One Month'}
                      amount={9}
                   />
                  }
                  {!this.props.isAuthenticated &&
                    <button className="button   button--accent-bg " onClick={this.props.login}>
                      <span>Start Now</span>
                    </button>
                  }
                </div>
              </div>
            </div>
          </div><img className="pricing-03__decoration" src="img/other/grid.png"/>
        </div>
      </div>
    );
  }
}

export default Pricing;
