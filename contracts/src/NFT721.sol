// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// erc 721
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

// ERC721URIStorage (inherits from erc 721)
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';

// utils
import '@openzeppelin/contracts/utils/Counters.sol';

import './INFTMarket.sol';

contract NFT721 is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter public _tokensIds; // for minting incrementing
  address _marketplaceAddress; // market place address we gonna give ability to transact the tokens;

  constructor(address marketplaceAddress) ERC721('Metaverse Tokens', 'METT') {
    _marketplaceAddress = marketplaceAddress;
  }

  event Mint(uint256 newItemId);

  function createToken(string memory tokenURI, uint256 royalty)
    public
    returns (uint256)
  {
    _tokensIds.increment();
    uint256 newItemId = _tokensIds.current();
    // minting
    _mint(msg.sender, newItemId);
    //
    _setTokenURI(newItemId, tokenURI);
    // give the marketplace approval to transcat this token between users
    setApprovalForAll(_marketplaceAddress, true);

    //emit Mint(newItemId);
    // FIXME: enable when we implement royalties properly
    /*     INFTMarket(_marketplaceAddress).initializeItem(
      address(this),
      newItemId,
      msg.sender,
      royalty
      // frontData
    ); */
    return newItemId;
  }

  // Whenever tokens are transferred, add the market contract allowance to handle the tokens
  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal virtual override {
    super._beforeTokenTransfer(from, to, tokenId);
    if (_marketplaceAddress != to) {
      // Allow marketplace to transfer tokens from the new owner
      _setApprovalForAll(to, _marketplaceAddress, true);
    }
  }
}
