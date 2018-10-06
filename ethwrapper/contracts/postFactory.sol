pragma solidity ^0.4.19;

import "./ownable.sol";
import "./safemath.sol";

contract PostFactory is Ownable {

  using SafeMath for uint256;

  event NewPost(string ipfsHash);

  struct Post {
    string ipfsUrl;
    string hash;
  }

  Post[] public posts;
  // string[] public blogs;

  mapping (uint => address) public postToOwner;
  mapping (address => uint) ownerPostCount;

  // TODO: Only owner can create contract
  function createPost(string _ipfsHash, string hash) public onlyOwner {
    uint id = posts.push(Post(_ipfsHash, hash)) - 1;
    postToOwner[id] = msg.sender;
    ownerPostCount[msg.sender]++;
    NewPost(_ipfsHash);
  }

}
