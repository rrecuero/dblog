const Post = artifacts.require("./Post.sol");

contract("Post", accounts => {
  it("should create a post", async () => {
    const post = await Post.deployed();

    const postData = {
      ipfsUrl: 'QmQByWYPYd6h95ySJeNtDUTrYtT2ZhuWG9qzi8oX7Q5geL',
      hash: '76709b6598a5317ebc0380359e595b9f'
    };

    await post.createPost(postData.ipfsUrl, postData.hash, { from: accounts[0] })

    const createdPost = await post.posts.call(0);

    assert.ok(createdPost[0] == postData.ipfsUrl);
    assert.ok(createdPost[1] == postData.hash);
  });

  it("should transfer post to new owner", async () => {
    const post = await Post.deployed();

    const postID = 0;
    
    const previousOwner = await post.postToOwner.call(postID);
    const newOwner = accounts[1];

    // transfer from old owner to new owner
    await post.transfer(newOwner, postID);

    const newOwnerPost = await post.postToOwner.call(postID);

    assert.ok(newOwner == newOwnerPost);
  });
});
