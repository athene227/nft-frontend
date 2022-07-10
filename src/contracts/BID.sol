// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

contract Bids {
    uint256 higherBid;
    address lastHigherBidder;

    mapping(uint256 => uint256) public highestBidForAuction;
    mapping(uint256 => address) public highestBidderForAuction;

    function setBid(uint256 auctionId) public payable {
        require(msg.value > highestBidForAuction[auctionId], "Bid must be more than the previous highest one");
        highestBidForAuction[auctionId] = msg.value;
        highestBidderForAuction[auctionId] = msg.sender;

        // set bid
        higherBid = msg.value;
        lastHigherBidder = msg.sender;
        // send money to last bid
    }

    function finishAuction() public payable {
        // send nft to higher bid
        // send money to seller
        // send royalties to creator
        // send comission to owner -- us
    }
}
