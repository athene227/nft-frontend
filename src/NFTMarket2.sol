// contracts/Market.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

// security
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarket2 is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _listingIds;

    address payable public owner;
    uint256 internal commissionPercent = 1; // check instructions about using other values

    // NFT address -> token id -> (royalty + creator address)
    mapping(address => mapping(uint256 => InitialItem)) public initialItems;
    mapping(uint256 => SimpleMarketItem) public simpleListingIdToMarketItem;
    mapping(uint256 => AuctionMarketItem) public auctionListingIdToMarketItem;
    // Amount of tokens a user has for sale, per contract and per tokenId
    mapping(address => mapping(address => mapping(uint256 => uint256)))
        public userListedTokens;

    struct Attribute {
        string display_type;
        string trait_type;
        string value;
    }

    struct FrontData {
        string name;
        string description;
        string imageUrl;
        Attribute[] attributes;
        bool multiple;
        string collectionId;
        string category;
    }

    constructor() {
        owner = payable(msg.sender);
    }

    struct InitialItem {
        uint256 royalty;
        address creator;
        FrontData frontData;
    }

    struct SimpleMarketItem {
        address nftContract;
        uint256 tokenId;
        uint256 price;
        uint256 originalQuantity;
        uint256 remainingQuantity;
        address ownerAddress;
    }

    struct AuctionMarketItem {
        address nftContract;
        uint256 tokenId;
        uint256 startPrice;
        uint256 currentBid;
        address currentBidderAddress;
        address ownerAddress;
        uint256 deadline;
        bool isClosed;
    }

    event SimpleMarketItemCreated(
        uint256 indexed listingId,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price,
        address creatorAddress,
        uint256 royalty,
        uint256 quantity,
        address sellerAddress,
        FrontData frontData
    );

    event AuctionMarketItemCreated(
        uint256 indexed listingId,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 startPrice,
        uint256 deadline,
        address creatorAddress,
        uint256 royalty,
        address sellerAddress,
        FrontData frontData
    );

    event BidCreated(
        uint256 indexed listingId,
        address bidderAddress,
        uint256 price,
        uint256 tokenId
    );

    event BuySimpleEvent(
        uint256 listingId,
        uint256 tokenId,
        address creatorAddress,
        address sellerAddress,
        address buyerAddress,
        uint256 price,
        uint256 quantity,
        uint256 royalty,
        FrontData frontData
    );

    event CancelSimpleEvent(
        uint256 listingId,
        uint256 tokenId,
        address creatorAddress,
        address sellerAddress,
        uint256 quantity,
        uint256 royalty,
        FrontData frontData
    );

    event CancelAuctionEvent(
        uint256 listingId,
        uint256 tokenId,
        address creatorAddress,
        address sellerAddress,
        uint256 royalty,
        FrontData frontData
    );

    event TerminateAuctionEvent(
        uint256 listingId,
        uint256 tokenId,
        address creatorAddress,
        address sellerAddress,
        address bidderAddress,
        address terminatorAddress,
        uint256 royalty,
        FrontData frontData
    );

    // get royalties amount
    function getPriceAfterPercent(
        uint256 price,
        uint256 quantity,
        uint256 percent
    ) public pure returns (uint256) {
        uint256 _percent = percent;
        return ((price * quantity) * _percent) / 100;
    }

    // Called by NFT contract
    function initializeItem(
        address nftContract,
        uint256 tokenId,
        address creator,
        uint256 royalty,
        FrontData memory frontData
    ) public {
        require(
            initialItems[nftContract][tokenId].creator == address(0x0),
            "Already initialized"
        );
        //* initial item
        InitialItem storage initialItem = initialItems[nftContract][tokenId];

        // royaly
        initialItem.royalty = royalty;
        // creator
        initialItem.creator = creator;

        // frontData
        initialItem.frontData.name = frontData.name;
        initialItem.frontData.description = frontData.description;
        initialItem.frontData.imageUrl = frontData.imageUrl;
        initialItem.frontData.multiple = frontData.multiple;
        initialItem.frontData.collectionId = frontData.collectionId;
        initialItem.frontData.category = frontData.category;

        for (uint256 i = 0; i < frontData.attributes.length; i++) {
            Attribute memory attribute = frontData.attributes[i];
            initialItem.frontData.attributes.push(attribute);
        }
    }

    function getLatestListItemId() public view returns (uint256) {
        return _listingIds.current();
    }

    /* Places an item for sale on the marketplace */
    function createSimpleMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        uint256 quantity
    ) public nonReentrant {
        require(price > 0, "Price must be at least 1 wei");
        require(quantity > 0, "Have to provide some quantity");
        require(
            userListedTokens[msg.sender][nftContract][tokenId] == 0,
            "A listing already exists for the token"
        );

        _listingIds.increment();
        uint256 listingId = _listingIds.current();

        simpleListingIdToMarketItem[listingId] = SimpleMarketItem(
            nftContract,
            tokenId,
            price,
            quantity,
            quantity,
            msg.sender
        );

        userListedTokens[msg.sender][nftContract][tokenId] = quantity;

        // transfer from the seller to here (the market contract)
        IERC1155(nftContract).safeTransferFrom(
            msg.sender,
            address(this),
            tokenId,
            quantity,
            ""
        );
        uint256 royalty = initialItems[nftContract][tokenId].royalty;
        address creator = initialItems[nftContract][tokenId].creator;
        FrontData memory frontData = initialItems[nftContract][tokenId]
            .frontData;

        emit SimpleMarketItemCreated(
            listingId,
            nftContract,
            tokenId,
            price,
            creator,
            royalty,
            quantity,
            msg.sender,
            frontData
        );
    }

    function createAuctionMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 startPrice,
        uint256 deadline
    ) public nonReentrant {
        require(deadline > block.timestamp, "Deadline must be in the future");
        require(
            userListedTokens[msg.sender][nftContract][tokenId] == 0,
            "A listing already exists for the token"
        );
        _listingIds.increment();
        uint256 listingId = _listingIds.current();

        auctionListingIdToMarketItem[listingId] = AuctionMarketItem(
            nftContract,
            tokenId,
            startPrice,
            startPrice,
            address(0x0),
            msg.sender,
            deadline,
            false
        );

        userListedTokens[msg.sender][nftContract][tokenId] = 1;

        // transfer from the seller to here (the market contract)
        IERC1155(nftContract).safeTransferFrom(
            msg.sender,
            address(this),
            tokenId,
            1,
            ""
        );

        InitialItem memory item = initialItems[nftContract][tokenId];

        emit AuctionMarketItemCreated(
            listingId,
            nftContract,
            tokenId,
            startPrice,
            deadline,
            item.creator,
            item.royalty,
            msg.sender,
            item.frontData
        );
    }

    /* Creates the sale of a simple marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function buySimple(
        // ===> buying
        uint256 listingId,
        uint256 quantity
    ) public payable nonReentrant {
        SimpleMarketItem storage marketItem = simpleListingIdToMarketItem[
            listingId
        ];

        require(quantity > 0, "Have to buy something");
        require(
            quantity <= marketItem.remainingQuantity,
            "Not enough items for sale"
        );

        uint256 commission = getPriceAfterPercent(
            marketItem.price,
            quantity,
            commissionPercent
        );

        require(
            msg.value == (marketItem.price * quantity) + commission,
            "Please submit the asking price in order to complete the purchase"
        );

        marketItem.remainingQuantity -= quantity;

        InitialItem memory item = initialItems[marketItem.nftContract][
            marketItem.tokenId
        ];
        if (item.royalty > 0 && item.creator != address(0x0)) {
            uint256 creatorRoyalty = getPriceAfterPercent(
                marketItem.price,
                quantity,
                item.royalty
            );

            sendAssets(item.creator, creatorRoyalty);
            sendAssets(
                marketItem.ownerAddress,
                marketItem.price * quantity - creatorRoyalty
            );
        } else {
            sendAssets(marketItem.ownerAddress, marketItem.price * quantity);
        }

        // pay commission to the market place
        sendAssets(owner, commission);

        userListedTokens[marketItem.ownerAddress][marketItem.nftContract][
            marketItem.tokenId
        ] = marketItem.remainingQuantity;

        // transfer the nft fron here to the buyer
        IERC1155(marketItem.nftContract).safeTransferFrom(
            address(this),
            msg.sender,
            marketItem.tokenId,
            quantity,
            "0x0"
        );

        emit BuySimpleEvent(
            listingId,
            marketItem.tokenId,
            item.creator,
            marketItem.ownerAddress,
            msg.sender,
            marketItem.price,
            quantity,
            item.royalty,
            item.frontData
        );
    }

    function bid(uint256 listingId) public payable nonReentrant {
        AuctionMarketItem storage marketItem = auctionListingIdToMarketItem[
            listingId
        ];
        require(!marketItem.isClosed, "Already closed");
        require(
            msg.sender != marketItem.ownerAddress,
            "Auction owner can't place bid on his Auction"
        );

        uint256 pureBid = (msg.value * 100) / (commissionPercent + 100);

        require(pureBid > marketItem.currentBid, "Have to offer higher price");
        require(block.timestamp < marketItem.deadline, "The auction has ended");
        require(!marketItem.isClosed, "Already closed");

        uint256 oldCommission = getPriceAfterPercent(
            marketItem.currentBid,
            1,
            commissionPercent
        );

        // If someone had placed a bid earlier, return that bid
        if (marketItem.currentBidderAddress != address(0x0)) {
            (bool success, ) = payable(marketItem.currentBidderAddress).call{
                value: marketItem.currentBid + oldCommission,
                gas: 3000
            }("");
            if (!success) {
                // What should happen if the receiver doesn't accept the assets?
            }
        }

        marketItem.currentBidderAddress = msg.sender;
        marketItem.currentBid = pureBid;

        emit BidCreated(listingId, msg.sender, pureBid, marketItem.tokenId);
    }

    // Terminates an auction and settles its result
    function terminateAuction(uint256 listingId) public {
        AuctionMarketItem storage marketItem = auctionListingIdToMarketItem[
            listingId
        ];
        require(!marketItem.isClosed, "Already closed");
        require(
            block.timestamp >= marketItem.deadline,
            "The auction hasn't ended"
        );

        InitialItem memory item = initialItems[marketItem.nftContract][
            marketItem.tokenId
        ];
        if (marketItem.currentBidderAddress != address(0x0)) {
            uint256 commission = getPriceAfterPercent(
                marketItem.currentBid,
                1,
                commissionPercent
            );

            if (item.royalty > 0 && item.creator != address(0x0)) {
                uint256 creatorRoyalty = getPriceAfterPercent(
                    marketItem.currentBid,
                    1,
                    item.royalty
                );
                sendAssets(item.creator, creatorRoyalty);
                sendAssets(
                    marketItem.ownerAddress,
                    marketItem.currentBid - creatorRoyalty
                );
            } else {
                sendAssets(marketItem.ownerAddress, marketItem.currentBid);
            }

            // pay commission to the market place
            sendAssets(owner, commission);

            // transfer the nft fron here to the buyer
            IERC1155(marketItem.nftContract).safeTransferFrom(
                address(this),
                marketItem.currentBidderAddress,
                marketItem.tokenId,
                1,
                "0x0"
            );
        } else {
            // no bidders
            // transfer the nft from here to the original owner
            IERC1155(marketItem.nftContract).safeTransferFrom(
                address(this),
                marketItem.ownerAddress,
                marketItem.tokenId,
                1,
                "0x0"
            );
        }
        userListedTokens[marketItem.ownerAddress][marketItem.nftContract][
            marketItem.tokenId
        ] = 0;
        marketItem.isClosed = true;

        emit TerminateAuctionEvent(
            listingId,
            marketItem.tokenId,
            item.creator,
            marketItem.ownerAddress,
            marketItem.currentBidderAddress,
            msg.sender,
            item.royalty,
            item.frontData
        );
    }

    function cancelAuctionListing(uint256 listingId) public {
        AuctionMarketItem storage marketItem = auctionListingIdToMarketItem[
            listingId
        ];
        require(marketItem.deadline > 0, "Can cancel only auctions");
        require(marketItem.ownerAddress == msg.sender, "Only owner can cancel");
        require(!marketItem.isClosed, "Already closed");
        require(
            marketItem.currentBidderAddress == address(0x0),
            "Can't cancel an auction if there are bids"
        );

        marketItem.isClosed = true;

        // getting the nft back
        IERC1155(marketItem.nftContract).safeTransferFrom(
            address(this),
            marketItem.ownerAddress,
            marketItem.tokenId,
            1,
            "0x0"
        );

        userListedTokens[marketItem.ownerAddress][marketItem.nftContract][
            marketItem.tokenId
        ] = 0;

        InitialItem memory item = initialItems[marketItem.nftContract][
            marketItem.tokenId
        ];

        emit CancelAuctionEvent(
            listingId,
            marketItem.tokenId,
            item.creator,
            marketItem.ownerAddress,
            item.royalty,
            item.frontData
        );
    }

    function cancelSimpleListing(uint256 listingId) public {
        SimpleMarketItem storage marketItem = simpleListingIdToMarketItem[
            listingId
        ];
        require(
            marketItem.originalQuantity > 0,
            "Can cancel only simple listings"
        );
        require(marketItem.ownerAddress == msg.sender, "Only owner can cancel");
        require(marketItem.remainingQuantity > 0, "There is nothing to cancel");

        // should add another require marketItem.remainingQuantity > 0,
        // in case nothing is to cancel

        uint256 remaining = marketItem.remainingQuantity;
        marketItem.remainingQuantity = 0;

        // getting the nft back
        IERC1155(marketItem.nftContract).safeTransferFrom(
            address(this),
            marketItem.ownerAddress,
            marketItem.tokenId,
            remaining,
            "0x0"
        );

        userListedTokens[marketItem.ownerAddress][marketItem.nftContract][
            marketItem.tokenId
        ] = 0;
        InitialItem memory item = initialItems[marketItem.nftContract][
            marketItem.tokenId
        ];

        emit CancelSimpleEvent(
            listingId,
            marketItem.tokenId,
            item.creator,
            marketItem.ownerAddress,
            marketItem.remainingQuantity,
            item.royalty,
            item.frontData
        );
    }

    function sendAssets(address receiver, uint256 amount) internal {
        (bool success, ) = payable(receiver).call{value: amount, gas: 3000}("");
        if (!success) {
            // What should happen if the receiver doesn't accept the assets? Probably just ignore it?
        }
    }

    // owner withdraw money. The contract is useless after this. Unsure if you want this.
    function withdraw() public {
        require(address(this).balance > 0, "balance is 0");
        require(owner == msg.sender, "Only owner can withdraw");
        sendAssets(owner, address(this).balance);
    }

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes memory
    ) public virtual returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) public virtual returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }
}
