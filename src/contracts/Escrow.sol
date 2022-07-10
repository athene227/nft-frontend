// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Escrow {
    address owner;
    uint256 balance;

    // mapping (address=)

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function deposit() public payable {
        uint256 amount = msg.value;
        balance = balance + amount;
    }

    // function claimMyNft() {}


    function withdraw() public onlyOwner {
        payable(owner).transfer(balance);
        balance = 0;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    // [["0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2","3000000000000000000"],["0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db","3000000000000000000"],["0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB","3000000000000000000"]]
}
