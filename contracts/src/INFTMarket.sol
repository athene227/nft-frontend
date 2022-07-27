// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface INFTMarket {
  function initializeItem(
    address nftContractAddress,
    uint256 tokenId,
    address creator,
    uint256 royalty
  ) external;
}
