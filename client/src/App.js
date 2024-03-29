import React, { Component } from 'react';
import './App.scss';

class App extends Component {

  componentDidMount() {
    this.ping();
    if (this.props.auth.isAuthenticated()) {
      this.props.auth.getProfile();
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
    return (
      <div className="App">
        <header className="header-44">
          <nav className="nav-01">
            <div className="container is-fluid">
              <div className="nav-01__box">
                <div className="nav-01__logo"><a className="nav-01__link" href="/" target="_blank" > dBlog </a> </div>
                <div className="nav-01__links js-menu">
                  <ul className="nav-01__list">
                    {isAuthenticated() &&
                      <li className="nav-01__item"><a className="button   button--white-outline  button--empty " href="/blog">
                        <span>My Blog</span></a>
                      </li>
                    }
                    {!isAuthenticated() &&
                      <span>
                        <li className="nav-01__item"><a className="button   button--white-outline  button--empty " href="#about">
                          <span>About</span></a>
                        </li>
                        <li className="nav-01__item"><a className="button   button--white-outline  button--empty " href="#features">
                          <span>Features</span></a>
                        </li>
                        <li className="nav-01__item"><a className="button   button--white-outline  button--empty " href="#pricing">
                          <span>Pricing</span></a>
                        </li>
                      </span>
                    }
                    <li className="nav-01__item">
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
                          onClick={this.login.bind(this)}
                        >
                          <span>Sign Up</span>
                        </button>
                      )}
                    </li>
                  </ul>
                  <div className="nav-01__burger">
                    <button className="burger js-open-menu" type="button">
                      <div className="burger__box">
                        <div className="burger__inner"></div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
        {this.props.children}
        <section>
          <div className="footer-01">
            <div className="container">
              <div className="footer-01__wrapper">
                <a className="footer-01__logo_link" href="/">dBlog</a>
                <ul className="footer-01__list">
                  <li className="footer-01__item"><a className="footer-01__link" href="javascript:void(0);" target="_blank">
                    ramon@dapis.io</a>
                  </li>
                </ul>
                <ul className="footer-01__list">
                  <li className="footer-01__item">
                    <a className="footer-01__link footer-01__link--black" href="javascript:void(0);" target="_blank">
                      Sign Up
                    </a>
                  </li>
                  <li className="footer-01__item"><a className="footer-01__link footer-01__link--black" href="javascript:void(0);" target="_blank">
                    F.A.Q.</a>
                  </li>
                  <li className="footer-01__item"><a className="footer-01__link footer-01__link--black" href="javascript:void(0);" target="_blank">
                    About</a>
                  </li>
                </ul>
                <ul className="footer-01__list">
                  <li className="footer-01__item"><a className="footer-01__link footer-01__link--black" href="https://twitter.com/unicornplatform" target="_blank">Twitter</a></li>
                  <li className="footer-01__item"><a className="footer-01__link footer-01__link--black" href="https://fb.com/unicornplatform" target="_blank">Facebook</a></li>
                  <li className="footer-01__item"><a className="footer-01__link footer-01__link--black" href="https://www.instagram.com/unicornplatform/" target="_blank">Instagram</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
