import React, { Component } from 'react';
import axios from 'axios';

// ...
class Post extends Component {
  // ...
  securedPing() {
    const { getAccessToken } = this.props.auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    axios.fetch(`/api/private`, { headers })
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }
  securedScopedPing() {
      const { getAccessToken } = this.props.auth;
      const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
      axios.fetch(`/api/private-scoped`, { headers })
        .then(response => this.setState({ message: response.data.message }))
        .catch(error => this.setState({ message: error.message }));
  }
}

export default Post;
