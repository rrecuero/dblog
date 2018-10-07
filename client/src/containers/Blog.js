import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import Loading from './Loading.js';
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
      title: null,
      latestBlogHash: null,
      walletLoading: false,
      message: null,
      postsLoaded: false,
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
        if (!this.state.postsLoaded) {
          fetch('/api/posts?userId=' + this.props.auth.userProfile.sub,
            {
              method: 'GET',
              mode: 'cors',
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': `Bearer ${this.props.auth.getAccessToken()}`
              },
            })
            .then(json)
            .then((response) => {
              this.setState({
                posts: response.result,
                postsLoaded: true
              });
            })
            .catch((error) => {
              this.setState({ message: 'Could not fetch posts: ' + error.message,  postLoading: false });
            });
        }
      });
    }
  }

  writePost() {
    this.setState({ postLoading: true });
    const text = this.state.editorState.getCurrentContent().getPlainText('<br />');
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
          title: this.state.title,
          text
        })
      })
      .then(json)
      .then((response) => {
        console.log('response', response.result);
        this.setState({
          success: 'Post has been created!',
          posts: [...this.state.posts, response.result],
          latestBlogHash: response.result.latestBlogHash,
          title: '',
          editorState: EditorState.createEmpty(),
          postLoading: false
        });
        setTimeout(() => {
          this.setState({ success: null });
        }, 2000);
      })
      .catch((error) => {
        this.setState({ message: error.message,  postLoading: false });
      });
  }

  createWallet() {
    this.setState({ walletLoading: true });
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
        this.setState({
          ethAddress: response.result,
          walletLoading: false
        });
      })
      .catch((error) => {
        this.setState({ message: error.message, walletLoading: false });
      });
  }

  render() {
    const { editorState, postLoading, latestBlogHash, postsLoaded,
      walletLoading, title, posts, success, message, ethAddress } = this.state;
    if (!postsLoaded) {
      return <Loading />;
    }
    return (
      <div className="container">
        <div className="header-blog">
          {success &&
            <div className={'success-message'}>
              <i className="fa fa-check" /> {success}.
            </div>
          }
          {message &&
            <div className={'error-message'}>
              <i className="fa fa-warning" /> An error has occured: {message}.
            </div>
          }
          <h1>Your Blog Posts</h1>
        </div>
        <div className="posts">
          {posts.length === 0 && (
            <div className="empty">
              Your blog is empty. Create the first post below.
            </div>
          )}
          {posts.length > 0 && (
            <a href={`https://cloudflare-ipfs.com/ipfs/${latestBlogHash}`}>
              <button className="button button--alt-accent-bg">
                View your Blog
              </button>
            </a>
          )}
          {posts.map((post, index) => (
            <div className={'post'}>
              <div className={'title'}>
                {post.title}
              </div>
              <div className="links">
                <a href={`https://cloudflare-ipfs.com/ipfs/${post.ipfsHash}`}>
                  View on IPFS
                </a>
                <a href={`https://etherscan.io/tx/${post.transaction}`}>
                  View tx on Etherscan
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="write-post">
          <h3> <i className="fa fa-pencil" /> Write a post </h3>
          <div className="settings">
            <div>
              Enter your ETH Address:
            </div>
            <input
              className="address-input"
              placeholder={'0xasdasd..'}
              value={ethAddress}
              onChange={(e) => {
                this.setState({ ethAddress: e.target.value });
              }} />
            <button className="button" onClick={() => this.createWallet()}>
              {walletLoading ? 'Loading...' : 'Or Create wallet'}
            </button>
          </div>
          <div className="title-section">
            <label>Title</label>
            <input
              className="address-input"
              placeholder={'Your awesome title'}
              value={title}
              onChange={(e) => {
                this.setState({ title: e.target.value });
              }} />
          </div>
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onChange} />
          <button className="button button--accent-outline" onClick={() => this.writePost()}>
            {postLoading ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>
    );
  }
}

export default Blog;
