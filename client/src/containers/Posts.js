import React, { Component } from 'react';

class Post extends Component {
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
    return (
      <div className="container">
        Posts
      </div>
    );
  }
}

export default Post;
