import React, { Component } from 'react';

class Blog extends Component {
  state = { userProfile: this.props.auth && this.props.auth.userProfile };
  componentDidMount() {
    if (this.props.auth && !this.props.auth.userProfile) {
      this.props.auth.getProfile((err, profile) => {
        this.setState({ userProfile: profile });
      });
    }
  }

  securedPing() {
    const { getAccessToken } = this.props.auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    fetch(`/api/private`, { headers })
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }
  securedScopedPing() {
      const { getAccessToken } = this.props.auth;
      const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
      fetch(`/api/private-scoped`, { headers })
        .then(response => this.setState({ message: response.data.message }))
        .catch(error => this.setState({ message: error.message }));
  }
  render() {
    const { userProfile } = this.state;
    console.log('userProfile', userProfile);
    return (
      <div className="container">
        <h1>Your Blog</h1>
      </div>
    );
  }
}

export default Blog;
