// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// erc 721
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/common/ERC2981.sol';

// utils
import '@openzeppelin/contracts/utils/Counters.sol';

contract NFT721 is ERC721URIStorage, ERC2981 {
  using Counters for Counters.Counter;
  Counters.Counter public _tokensIds; // for minting incrementing

  event Mint(uint256 newItemId);

  constructor() ERC721('HowToPulse', 'HTP') {}

  /**
   * @dev Mints a token
   * @param tokenURI The metadata URL for this NFT
   * @param royalty Possible royalty percentage, specified in basis points (10000 means 100%)
   */
  function createToken(string memory tokenURI, uint96 royalty)
    public
    returns (uint256)
  {
    _tokensIds.increment();
    uint256 newItemId = _tokensIds.current();
    // minting
    _mint(msg.sender, newItemId);

    _setTokenURI(newItemId, tokenURI);

    if (royalty > 0) {
      _setTokenRoyalty(newItemId, msg.sender, royalty);
    }

    emit Mint(newItemId);

    return newItemId;
  }

  /// @inheritdoc ERC165
  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC721, ERC2981)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
