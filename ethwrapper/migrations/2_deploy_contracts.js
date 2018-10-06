const PostFactory = artifacts.require("PostFactory");
const Post = artifacts.require("Post");

module.exports = function(deployer) {
  deployer.deploy(PostFactory);
  deployer.deploy(Post);
};
