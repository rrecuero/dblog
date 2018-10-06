pragma solidity ^0.4.19;

import "./ownable.sol";
import "./safemath.sol";

contract postFactory is Ownable {

  using SafeMath for uint256;

  event NewPost(string ipfsHash);

  struct Post {
    string ipfsUrl;
    string hash;
  }

  Post[] public posts;

  mapping (uint => address) public postToOwner;
  mapping (address => uint) ownerPostCount;

  function createPost(string _ipfsHash) public {
    uint id = posts.push(Post(_ipfsHash)) - 1;
    postToOwner[id] = msg.sender;
    ownerPostCount[msg.sender]++;
    NewPost(_ipfsHash);
  }

}
