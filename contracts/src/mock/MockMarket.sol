// SPDX-License-Identifier: MIT
// Used as some other regular ERC20 token in unit tests
pragma solidity ^0.8.4;

/* import '../NFTMarket.sol'; */

/* is NFTMarket  */
contract MockMarket {
  uint256 dummy;

  constructor(address[] memory erc20TokenAddresses) {
    /* NFTMarket(erc20TokenAddresses) */
  }

  /*
  function forceNonRead_getBestBid(
    NFTMarket.AuctionBid[] memory bids,
    address priceTokenAddress
  ) public returns (AuctionBid memory) {
    dummy = 1;
    return super.getBestBid(bids, priceTokenAddress);
  }
  */
}
