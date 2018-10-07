import React, { Component } from 'react';
import Pricing from '../components/Pricing';
import './Home.scss';

class Home extends Component {

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    console.log('this.props', this.props);
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="home">
        <div className="header-44">
          <div className="container">
            <div className="header-44__wrapper">
              <div className="header-44__text_box">
                <h2 className="heading heading--accent text-white">Create Your Own Censorship Resistant Blog in 5 Minutes</h2>
                <p className="text-white">
                  Store your posts on the blockchain. Truly verifiable posts that belong to the writer.
                  Easy to use and low friction.
                </p>
              </div>
              <div className="header-44__buttons_box">
                <div className="buttons-set">
                  <ul className="buttons-set__list">
                    <li className="buttons-set__item">
                    {!isAuthenticated() && (
                      <button
                        className="button button--alt-accent-bg"
                        onClick={this.login.bind(this)}>
                        Log In / Sign up
                      </button>
                    )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div className="features-02" id="about">
        <div className="container container--small">
          <div className="title-box title-box--center">
            <h2 className="heading">Building a dApp People Want</h2>
            <p className="title-box__text">
              Users only care about blockchain if it means cheaper, faster or new capabiities.
            </p>
          </div>
        </div>
        <div className="container">
          <ul className="features-02__items">
            <li className="features-02__item">
              <div className="features-02__item_box">
                <div className="features-02__number"><span className="features-02__word">Hosted on</span> IPFS</div>
                <p className="features-02__description">The interplanetary gives you censorship resistant, traceability and proof of write. </p>
              </div>
            </li>
            <li className="features-02__item">
              <div className="features-02__item_box">
                <div className="features-02__number"><span className="features-02__word">It's</span>Transferable</div>
                <p className="features-02__description">No vendor lock-in. Your blog posts belong only to you.</p>
              </div>
            </li>
            <li className="features-02__item">
              <div className="features-02__item_box">
                <div className="features-02__number"><span className="features-02__word">Every post is an </span> NFT</div>
                <p className="features-02__description">Every post you write is recorded on the Ethereum blockchain. See it, transfer it or even sell it.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="video-01">
        <div className="container container--small">
          <div className="title-box title-box--center">
            <h2 className="heading">Freedom of expression demands decentralization</h2>
            <p className="title-box__text">It's an universal right that cannot be delegated to 3rd parties. Our friend from Aragon explain why.</p>
          </div>
        </div>
        <div className="container">
          <div className="video-01__item">
            <iframe className="video-01__iframe" src="https://www.youtube.com/embed/AqjIWmiAidw" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen=""></iframe>
            <div className="spinner"></div>
          </div>
        </div>
      </div>
      <div className="features-01" id="features">
        <div className="container container--small">
          <div className="features-01__title_box">
            <div className="subheading">Explore the benefits of dBlog Platform</div>
            <h2 className="heading heading--accent">Strong Base for Sustainable Growth<img className="emoji  " src="img/emoji/bicep.png" alt="Emoji"/>
            </h2>
            <p>Post can be transferred to a different blog relayer, at any time.</p>
          </div>
        </div>
        <div className="container">
          <ul className="features-01__items">
            <li className="features-01__item">
              <div className="feature">
                <h3 className="feature__title"><img className="feature__icon" src="img/icons/abstract_icons/abstract-icon-1.svg"/><span className="feature__title_text">Seamless</span>
                </h3>
                <p className="feature__content">
                  <span>
                    No need to use Metamask or any other special browser.
                  </span>
                </p>
              </div>
            </li>
            <li className="features-01__item">
              <div className="feature">
                <h3 className="feature__title"><img className="feature__icon" src="img/icons/abstract_icons/abstract-icon-2.svg"/><span className="feature__title_text">Pay in USD</span>
                </h3>
                <p className="feature__content">
                  <span>
                    Simple and transparent pricing that you can understand. It's in $$$.
                  </span>
                </p>
              </div>
            </li>
            <li className="features-01__item">
              <div className="feature">
                <h3 className="feature__title"><img className="feature__icon" src="img/icons/abstract_icons/abstract-icon-3.svg"/><span className="feature__title_text">Proof of Write</span>
                </h3>
                <p className="feature__content">
                  <span>
                    Every post you write will be registered forever on the Ethereum blockchain.
                  </span></p>
              </div>
            </li>
            <li className="features-01__item">
              <div className="feature">
                <h3 className="feature__title"><img className="feature__icon" src="img/icons/abstract_icons/abstract-icon-4.svg"/><span className="feature__title_text">Fully Responsive</span>
                </h3>
                <p className="feature__content"><span>Your blog is going to be fully responsive in all different devices.</span></p>
              </div>
            </li>
            <li className="features-01__item">
              <div className="feature">
                <h3 className="feature__title"><img className="feature__icon" src="img/icons/abstract_icons/abstract-icon-7.svg"/><span className="feature__title_text">Start Instantly</span>
                </h3>
                <p className="feature__content"><span>No need to buy cryptocurrencies or install any clunky extension.</span></p>
              </div>
            </li>
            <li className="features-01__item">
              <div className="feature">
                <h3 className="feature__title"><img className="feature__icon" src="img/icons/abstract_icons/abstract-icon-9.svg"/><span className="feature__title_text">Handy Templates</span>
                </h3>
                <p className="feature__content"><span>Choose between different templates to suit your needs or transfer to another Blog Relayer.</span></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Pricing isAuthenticated={isAuthenticated} login={this.login.bind(this)} />
      <div className="text--01">
        <div className="container container--small">
          <div className="text--01__box">
            <div className="text--01__emoji"><img className="emoji   emoji--large" src="img/emoji/raising_hands.png" alt="Emoji"/>
            </div>
            <p className="text--01__content white-text">Why does dBlog Platform rock? Because it’s the first platform that you can use to build transferable censorship resistant blogs.</p>
            <div className="text--01__link_box"><a className="pill-link  pill-link--black  pill-link--small " href="https://avc.com/2018/09/cloudflares-ipfs-gateway/" target="_blank"><span className="pill-link__text">Learn more about why from Fred Wilson's blog</span><span className="pill-link__icon"><span className="icon"><svg viewBox="0 0 13 10" xmlns="http://www.w3.org/2000/svg"><path d="M12.823 4.164L8.954.182a.592.592 0 0 0-.854 0 .635.635 0 0 0 0 .88l2.836 2.92H.604A.614.614 0 0 0 0 4.604c0 .344.27.622.604.622h10.332L8.1 8.146a.635.635 0 0 0 0 .88.594.594 0 0 0 .854 0l3.869-3.982a.635.635 0 0 0 0-.88z" fillRule="nonzero" fill="#00396B"/></svg></span></span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Home;
