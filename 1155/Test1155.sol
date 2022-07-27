// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

// import base ERC1155 contract from OpenZeppelin
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Test1155 is ERC1155, Ownable {
    
    // constant of TEEKEY NFT
    uint256 public constant TEEKEY = 0;
    
    constructor() ERC1155("https://iybwuhcwy2z3.moralishost.com/{id}.json"){
        _mint(msg.sender, TEEKEY, 1, "");
    }
    
    function mint(address account, uint256 id, uint256 amount) public onlyOwner {
        _mint(account, id, amount, "");
    }
    
    function burn(address account, uint256 id, uint256 amount) public {
        require(msg.sender==account);
        _burn(account, id, amount);
    }
    
}
