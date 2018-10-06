import React, { Component } from 'react';
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

// <ReadString
//   drizzle={this.props.drizzle}
//   drizzleState={this.state.drizzleState}
// />
// <SetString
//   drizzle={this.props.drizzle}
//   drizzleState={this.state.drizzleState}
// />

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
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="home">
        <div className="header-44">
          <div className="container">
            <div class="header-44__wrapper">
              <div class="header-44__text_box">
                <h2 class="heading heading--accent text-white">Create Your Own Censorship Resistant Blog in 5 Minutes</h2>
                <p class="text-white">
                  Store your posts on the blockchain. Truly verifiable posts that belong to the writer.
                  Easy to use and low friction.
                </p>
              </div>
              <div class="header-44__buttons_box">
                <div class="buttons-set">
                  <ul class="buttons-set__list">
                    <li class="buttons-set__item">
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
      <div class="features-02">
        <div class="container container--small">
          <div class="title-box title-box--center">
            <h2 class="heading">Building a dApp people want</h2>
            <p class="title-box__text">Try enameling the red wine steaks with bloody peanut sauce and salsa verde, steamed.</p>
          </div>
        </div>
        <div class="container">
          <ul class="features-02__items">
            <li class="features-02__item">
              <div class="features-02__item_box">
                <div class="features-02__number"><span class="features-02__word">Hosted on</span> IPFS</div>
                <p class="features-02__description">The interplanetary gives you censorship resistant, traceability and proof of write. </p>
              </div>
            </li>
            <li class="features-02__item">
              <div class="features-02__item_box">
                <div class="features-02__number"><span class="features-02__word">It's</span>Transferable</div>
                <p class="features-02__description">No vendor lock-in. Your blog posts belong only to you.</p>
              </div>
            </li>
            <li class="features-02__item">
              <div class="features-02__item_box">
                <div class="features-02__number"><span class="features-02__word">Every post is an </span> NFT</div>
                <p class="features-02__description">Every post you write is recorded on the Ethereum blockchain. See it, transfer it or even sell it.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="video-01">
        <div class="container container--small">
          <div class="title-box title-box--center">
            <h2 class="heading">Time is the Most Valuable Thing</h2>
            <p class="title-box__text">Dexter, noster eposs etiam convertam de bi-color, velox secula.</p>
          </div>
        </div>
        <div class="container">
          <div class="video-01__item">
            <iframe class="video-01__iframe" src="https://www.youtube.com/embed/Z0FETzb32Hs?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>
            <div class="spinner"></div>
          </div>
        </div>
      </div>
      <div class="features-01">
        <div class="container container--small">
          <div class="features-01__title_box">
            <div class="subheading">Explore the benefits of dBlog Platform</div>
            <h2 class="heading heading--accent">Strong Base for Sustainable Growth<img class="emoji  " src="img/emoji/bicep.png" alt="Emoji"/>
            </h2>
            <p>Quinoa can be enameled with sour oysters, also try jumbleing the kebab with condensed milk.</p>
          </div>
        </div>
        <div class="container">
          <ul class="features-01__items">
            <li class="features-01__item">
              <div class="feature">
                <h3 class="feature__title"><img class="feature__icon" src="img/icons/abstract_icons/abstract-icon-1.svg"/><span class="feature__title_text">Authentic Design</span>
                </h3>
                <p class="feature__content"><span>With chocolates drink oyster sauce. Pork shoulder can be flavored with grey nachos, also try whisking the cake with vinegar.</span></p><a class="feature__link" href="javascript:void(0);" target="_blank"><span>Explore demos</span><span class="icon"><svg viewBox="0 0 13 10" xmlns="http://www.w3.org/2000/svg"><path d="M12.823 4.164L8.954.182a.592.592 0 0 0-.854 0 .635.635 0 0 0 0 .88l2.836 2.92H.604A.614.614 0 0 0 0 4.604c0 .344.27.622.604.622h10.332L8.1 8.146a.635.635 0 0 0 0 .88.594.594 0 0 0 .854 0l3.869-3.982a.635.635 0 0 0 0-.88z" fill-rule="nonzero" fill="#00396B"/></svg></span></a>
              </div>
            </li>
            <li class="features-01__item">
              <div class="feature">
                <h3 class="feature__title"><img class="feature__icon" src="img/icons/abstract_icons/abstract-icon-2.svg"/><span class="feature__title_text">All integrations</span>
                </h3>
                <p class="feature__content"><span>Try mashing up the onion lassi tunas with warm beer and orange juice, sautéed. With turkey drink salad cream.</span></p><a class="feature__link" href="javascript:void(0);" target="_blank"><span>Learn more</span><span class="icon"><svg viewBox="0 0 13 10" xmlns="http://www.w3.org/2000/svg"><path d="M12.823 4.164L8.954.182a.592.592 0 0 0-.854 0 .635.635 0 0 0 0 .88l2.836 2.92H.604A.614.614 0 0 0 0 4.604c0 .344.27.622.604.622h10.332L8.1 8.146a.635.635 0 0 0 0 .88.594.594 0 0 0 .854 0l3.869-3.982a.635.635 0 0 0 0-.88z" fill-rule="nonzero" fill="#00396B"/></svg></span></a>
              </div>
            </li>
            <li class="features-01__item">
              <div class="feature">
                <h3 class="feature__title"><img class="feature__icon" src="img/icons/abstract_icons/abstract-icon-3.svg"/><span class="feature__title_text">Simple Generator</span>
                </h3>
                <p class="feature__content"><span>Why does the species experiment? Advice at the wormhole was the future of resistance, promised to a real spacecraft.</span></p><a class="feature__link" href="javascript:void(0);" target="_blank"><span>Try it</span><span class="icon"><svg viewBox="0 0 13 10" xmlns="http://www.w3.org/2000/svg"><path d="M12.823 4.164L8.954.182a.592.592 0 0 0-.854 0 .635.635 0 0 0 0 .88l2.836 2.92H.604A.614.614 0 0 0 0 4.604c0 .344.27.622.604.622h10.332L8.1 8.146a.635.635 0 0 0 0 .88.594.594 0 0 0 .854 0l3.869-3.982a.635.635 0 0 0 0-.88z" fill-rule="nonzero" fill="#00396B"/></svg></span></a>
              </div>
            </li>
            <li class="features-01__item">
              <div class="feature">
                <h3 class="feature__title"><img class="feature__icon" src="img/icons/abstract_icons/abstract-icon-4.svg"/><span class="feature__title_text">Fully Responsive</span>
                </h3>
                <p class="feature__content"><span>With pickles drink onion lassi. Chicken breasts can be mashed up with yellow ramen, also try enameling the smoothie with tea.</span></p>
              </div>
            </li>
            <li class="features-01__item">
              <div class="feature">
                <h3 class="feature__title"><img class="feature__icon" src="img/icons/abstract_icons/abstract-icon-5.svg"/><span class="feature__title_text">Handmade Animations</span>
                </h3>
                <p class="feature__content"><span>Try chopping casserole rubed with sour milk, whisked with woodruff. Garnish a dozen tablespoons of nachos in eleven pounds of okra sauce.</span></p>
              </div>
            </li>
            <li class="features-01__item">
              <div class="feature">
                <h3 class="feature__title"><img class="feature__icon" src="img/icons/abstract_icons/abstract-icon-6.svg"/><span class="feature__title_text">Built to Inspire</span>
                </h3>
                <p class="feature__content"><span>Condensed milk soup is just not the same without onion powder and muddy yellow asparagus. With avocados drink plain vinegar.</span></p>
              </div>
            </li>
            <li class="features-01__item">
              <div class="feature">
                <h3 class="feature__title"><img class="feature__icon" src="img/icons/abstract_icons/abstract-icon-7.svg"/><span class="feature__title_text">Start Instantly</span>
                </h3>
                <p class="feature__content"><span>When squeezing tangy apples, be sure they are room temperature. Flavor twenty and a half teaspoons of herring in one cup of milk.</span></p>
              </div>
            </li>
            <li class="features-01__item">
              <div class="feature">
                <h3 class="feature__title"><img class="feature__icon" src="img/icons/abstract_icons/abstract-icon-8.svg"/><span class="feature__title_text">Icons &amp; Illustrations</span>
                </h3>
                <p class="feature__content"><span>Honor, mystery, and definition. Beauty at the holodeck was the vision of tragedy, loved to a small machine.</span></p>
              </div>
            </li>
            <li class="features-01__item">
              <div class="feature">
                <h3 class="feature__title"><img class="feature__icon" src="img/icons/abstract_icons/abstract-icon-9.svg"/><span class="feature__title_text">Handy Templates</span>
                </h3>
                <p class="feature__content"><span>Pork shoulder paste has to have a smashed, yellow carrots component. Chicory combines greatly with heated ramen.</span></p>
              </div>
            </li>
            <li class="features-01__item">
              <div class="feature">
                <h3 class="feature__title"><img class="feature__icon" src="img/icons/abstract_icons/abstract-icon-10.svg"/><span class="feature__title_text">Countless Components</span>
                </h3>
                <p class="feature__content"><span>Who can gain the reincarnation and death of a self if he has the powerful control of the creator.</span></p>
              </div>
            </li>
            <li class="features-01__item">
              <div class="feature">
                <h3 class="feature__title"><img class="feature__icon" src="img/icons/abstract_icons/abstract-icon-11.svg"/><span class="feature__title_text">Made by Indie</span>
                </h3>
                <p class="feature__content"><span>Try rubbing the cocktail sauce tofus with warm ketchup and herring sauce, grilled. With chocolates drink orange juice.</span></p>
              </div>
            </li>
            <li class="features-01__item">
              <div class="feature">
                <h3 class="feature__title"><img class="feature__icon" src="img/icons/abstract_icons/abstract-icon-12.svg"/><span class="feature__title_text">Inner Pages</span>
                </h3>
                <p class="feature__content"><span>To the chilled okra add steak, onion, pork butt juice and crushed quinoa. Rice combines greatly with sichuan-style oysters.</span></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="pricing-03">
        <div class="pricing-03__container container container--large">
          <div class="pricing-03__wrapper">
            <div class="pricing-03__info">
              <h1 class="heading">Simple and Fair Pricing</h1>
              <div class="pricing-03__info_text">
                <p>Create your own blog that leverages the power of the blockchain. Get the best of the blockchain with loosing on usability.</p>
                <p>Your posts are always your own. Blockchain allows you to verify your posts and move them when necessary.</p>
              </div>
            </div>
            <div class="pricing-03__illustration js-toggle-animation" title="Release sunlight"><img class="pricing-03__main_img" src="img/emoji/cloud.png"/><img class="pricing-03__secondary_img" src="img/emoji/sun.png"/></div>
            <div class="pricing-03__price">
              <div class="pricing-03__price_top">
                <h2 class="heading">$9 per month</h2>
              </div>
              <div class="pricing-03__price_bottom">
                <ul class="pricing-03__benefits_list">
                  <li class="pricing-03__benefit"><img class="pricing-03__benefit_icon" src="img/icons/checked--acid.svg"/>
                    <div class="pricing-03__benefit_text">Transferable blog</div>
                  </li>
                  <li class="pricing-03__benefit"><img class="pricing-03__benefit_icon" src="img/icons/checked--acid.svg"/>
                    <div class="pricing-03__benefit_text">IPFS Hosting</div>
                  </li>
                  <li class="pricing-03__benefit"><img class="pricing-03__benefit_icon" src="img/icons/checked--acid.svg"/>
                    <div class="pricing-03__benefit_text">Post - ERC-721 Collectible</div>
                  </li>
                  <li class="pricing-03__benefit"><img class="pricing-03__benefit_icon" src="img/icons/checked--acid.svg"/>
                    <div class="pricing-03__benefit_text">Custom Styles(Coming Soon)</div>
                  </li>
                  <li class="pricing-03__benefit"><img class="pricing-03__benefit_icon" src="img/icons/checked--acid.svg"/>
                    <div class="pricing-03__benefit_text">Custom Domain(Coming Soon)</div>
                  </li>
                </ul>
                <div class="pricing-03__button">
                  <button class="button   button--accent-bg " onClick={this.login.bind(this)}>
                    <span>Start Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div><img class="pricing-03__decoration" src="img/other/grid.png"/>
        </div>
      </div>
      <div class="text--01">
        <div class="container container--small">
          <div class="text--01__box">
            <div class="text--01__emoji"><img class="emoji   emoji--large" src="img/emoji/raising_hands.png" alt="Emoji"/>
            </div>
            <p class="text--01__content white-text">Why does dBlog Platform rock? Because it’s the first platform that you can use to build transferable censorship resistant blogs.</p>
            <div class="text--01__link_box"><a class="pill-link  pill-link--black  pill-link--small " href="https://avc.com/2018/09/cloudflares-ipfs-gateway/" target="_blank"><span class="pill-link__text">Learn more about why from Fred Wilson's blog</span><span class="pill-link__icon"><span class="icon"><svg viewBox="0 0 13 10" xmlns="http://www.w3.org/2000/svg"><path d="M12.823 4.164L8.954.182a.592.592 0 0 0-.854 0 .635.635 0 0 0 0 .88l2.836 2.92H.604A.614.614 0 0 0 0 4.604c0 .344.27.622.604.622h10.332L8.1 8.146a.635.635 0 0 0 0 .88.594.594 0 0 0 .854 0l3.869-3.982a.635.635 0 0 0 0-.88z" fill-rule="nonzero" fill="#00396B"/></svg></span></span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Home;
