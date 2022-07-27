// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Test721 is ERC721URIStorage {
    
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;

    constructor() ERC721("Test721", "TEST") {}

    function mintTeekey(string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment(); // increment the number of token

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
    
}

//tee.mint('0x99F0Cb08C372997dc5DA24dC43c95480db962652', 2, {gas:1000000, value:1000000000000000})