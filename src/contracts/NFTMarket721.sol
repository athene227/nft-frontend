// contracts/Market.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// security
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarket721 is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;
    address payable owner;
    uint256 listingPrice = 0.025 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint256 itemId; // this
        address nftContract; // this
        uint256 tokenId; // this
        uint256 price; // this
        address ownerAddress;
    }

    mapping(uint256 => MarketItem) public idToMarketItem;

    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price,
        address ownerAddress
    );

    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    /* Places an item for sale on the marketplace */
    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            price,
            msg.sender
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            price,
            msg.sender
        );
    }

    function getAmountAfterPercent(uint256 amount, uint256 percent)
        public
        pure
        returns (uint256)
    {
        require(amount >= 10000, "number is too small");
        uint256 _percent = percent;
        return (amount * _percent) / 100;
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(
        address nftContract,
        uint256 itemId, // buy!!!!
        uint256 royalty,
        address payable creator,
        address payable seller,
        address payable buyer
    ) public payable nonReentrant {
        uint256 price = idToMarketItem[itemId].price;
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );

        // handeling royalties
        if (royalty > 0) {
            uint256 creatorComission = getAmountAfterPercent(
                msg.value,
                royalty
            );
            creator.transfer(creatorComission);
            seller.transfer(msg.value - creatorComission);
        } else {
            seller.transfer(msg.value);
        }

        IERC721(nftContract).transferFrom(address(this), buyer, tokenId);
        payable(owner).transfer(listingPrice);
    }

    function createAuctionMarketSale(
        address nftContract,
        uint256 itemId, // buy!!!!
        uint256 royalty,
        address payable creator,
        address payable seller,
        address payable buyer
    ) public payable nonReentrant {
        // uint256 price = idToMarketItem[itemId].price;
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        require(
            msg.value > 0,
            "Please submit the asking price in order to complete the purchase"
        );

        // handeling royalties
        if (royalty > 0) {
            uint256 creatorComission = getAmountAfterPercent(
                msg.value,
                royalty
            );
            creator.transfer(creatorComission); // send to the createor
            seller.transfer(msg.value - creatorComission); // send to the seller
        } else {
            seller.transfer(msg.value); // send to the seller
        }

        IERC721(nftContract).transferFrom(address(this), buyer, tokenId); // transfer the nft
        payable(owner).transfer(listingPrice);
    }

    function withdrawNft(address nftContract, uint256 itemId) public {
        address ownerAddress = idToMarketItem[itemId].ownerAddress;
        uint256 tokenId = idToMarketItem[itemId].tokenId;

        require(
            msg.sender == ownerAddress,
            "You are not the owner of this nft!"
        );

        IERC721(nftContract).transferFrom(address(this), ownerAddress, tokenId); // getting the nft back
    }
}
