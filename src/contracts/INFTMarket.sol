// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


// import "./NFTMarket.sol"; 
interface INFTMarket {
    function initializeItem(
        address nftContractAddress,
        uint256 tokenId,
        address creator,
        uint256 royalty
        // NFTMarket.FrontData memory frontData
    ) external;
}
