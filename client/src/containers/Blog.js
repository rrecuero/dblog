import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Blog.scss';

function json(response) {
  return response.json()
}

class Blog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      userProfile: this.props.auth && this.props.auth.userProfile,
      ethAddress: null,
      posts: []
    };
    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }
  componentDidMount() {
    if (this.props.auth && !this.props.auth.userProfile) {
      this.props.auth.getProfile((err, profile) => {
        this.setState({ userProfile: profile });
      });
    }
  }

  writePost() {
    console.log('write this.state.editorState', this.state.editorState);
    const text = this.state.editorState.getCurrentContent().getPlainText('<br />');
    console.log();
    fetch('/api/post',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          'Authorization': `Bearer ${this.props.auth.getAccessToken()}` },
        body: JSON.stringify({
          userId: this.props.auth.userProfile.sub,
          ethAddress: this.state.ethAddress,
          text
        })
      })
      .then((data) => {
        this.setState({ message: data.message });
      })
      .catch((error) => {
        this.setState({ message: error.message });
      });
  }

  createWallet() {
    console.log();
    fetch('/api/wallet',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          'Authorization': `Bearer ${this.props.auth.getAccessToken()}` },
        body: JSON.stringify({
          userId: this.props.auth.userProfile.sub
        })
      })
      .then(json)
      .then((response) => {
        console.log('ethAddress', response);
        this.setState({
          ethAddress: response.result
        });
      })
      .catch((error) => {
        this.setState({ message: error.message });
      });
  }

  render() {
    const { editorState, posts, ethAddress } = this.state;
    return (
      <div className="container">
        <div className="header-blog">
          <h1>Your Blog</h1>
          <div className="settings">
            Enter your ETH Address:
            <input
              className="address-input"
              placeholder={'0xasdasd..'}
              value={ethAddress}
              onChange={(e) => {
                console.log('value', e.target.value);
                this.setState({ ethAddress: e.target.value });
              }} />
            <button className="button" onClick={() => this.createWallet()}>
              Or Create wallet
            </button>
          </div>
        </div>
        <div className="posts">
          {posts.length === 0 && (
            <div className="empty">
              You have not posted anything yet. Write your first post.
            </div>
          )}
        </div>
        <div className="write-post">
          <Editor
            initialEditorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onChange} />
          <button className="button button--alt-accent-bg" onClick={() => this.writePost()}>
            Save Post
          </button>
        </div>
      </div>
    );
  }
}

export default Blog;
