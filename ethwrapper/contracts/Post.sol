pragma solidity ^0.4.19;

import "./erc721.sol";
import "./safemath.sol";
import "./postFactory.sol";

contract Post is PostFactory, ERC721 {

  using SafeMath for uint256;

  mapping (uint => address) blogApprovals;

  function balanceOf(address _owner) public view returns (uint256 _balance) {// return ownerPostCount[_owner];
  }

  function ownerOf(uint256 _tokenId) public view returns (address _owner) {
    return postToOwner[_tokenId];
  }

  modifier onlyOwnerOf(uint _postId) {
    require(msg.sender == postToOwner[_postId]);
    _;
  }

  function _transfer(address _from, address _to, uint256 _tokenId) private {
    ownerPostCount[_to] = ownerPostCount[_to].add(1);
    ownerPostCount[msg.sender] = ownerPostCount[msg.sender].sub(1);
    postToOwner[_tokenId] = _to;
    Transfer(_from, _to, _tokenId);
  }

  function transfer(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    // _transfer(msg.sender, _to, _tokenId);
  }

  function approve(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    // zombieApprovals[_tokenId] = _to;
    // Approval(msg.sender, _to, _tokenId);
  }

  function takeOwnership(uint256 _tokenId) public {
    // require(zombieApprovals[_tokenId] == msg.sender);
    // address owner = ownerOf(_tokenId);
    // _transfer(owner, msg.sender, _tokenId);
  }
}
