// SPDX-License-Identifier: MIT
// Used as some other regular ERC20 token in unit tests
pragma solidity ^0.8.4;

import './MarketTools.sol';

import 'hardhat/console.sol';

/**
 * @title Marketplace contract for arbitrary offers for NFTs
 */
contract NFTMarketOffers is MarketTools {
  using Counters for Counters.Counter;
  using ERC165Checker for address;

  mapping(address => uint256) nftOffers;
  mapping(uint256 => Offer) public offers;
  Counters.Counter private _offerIds;

  struct Offer {
    address offerer;
    address nftContract;
    uint256 tokenId;
    address erc20Address;
    uint256 amount;
    uint256 deadline;
    bool isClosed;
  }

  event OfferCreated(uint256 indexed offerId);
  event OfferAccepted(uint256 indexed offerId);

  /**
   * @dev Initializes the contract
   * @param erc20TokenAddresses List of ERC20 tokens to be whitelisted initially
   */
  constructor(address[] memory erc20TokenAddresses)
    MarketTools(erc20TokenAddresses)
  {}

  /**
   * @dev Makes an offer on an arbitrary NFT
   * @param nftContract Address of the NFT contract
   * @param tokenId Token ID of the NFT
   * @param offerERC20Address Address of the ERC20 used for pricing
   * @param offerAmount Amount of the price ERC20 token offered
   * @param offerDeadline Timestamp when the offer is no longer valid
   */
  function offerOnNft(
    address nftContract,
    uint256 tokenId,
    address offerERC20Address,
    uint256 offerAmount,
    uint256 offerDeadline
  ) external whenNotPaused {
    require(whitelistedERC20[offerERC20Address], 'Invalid price token');
    uint256 givenAllowance = IERC20(offerERC20Address).allowance(
      msg.sender,
      address(this)
    );
    require(givenAllowance >= offerAmount, 'Not enough allowance');
    require(offerAmount > 0, 'Must offer something');
    require(offerDeadline > block.timestamp, 'Deadline must be in the future');

    _offerIds.increment();
    uint256 offerId = _offerIds.current();

    Offer memory offer = Offer(
      msg.sender,
      nftContract,
      tokenId,
      offerERC20Address,
      offerAmount,
      offerDeadline,
      false
    );
    offers[offerId] = offer;

    emit OfferCreated(offerId);
  }

  /**
   * @dev Accepts a previously made offer
   * @param offerId ID of the offer
   */
  function acceptOffer(uint256 offerId) external whenNotPaused {
    Offer storage offer = offers[offerId];
    require(offer.offerer != address(0x0), 'No offer found');

    uint256 givenAllowance = IERC20(offer.erc20Address).allowance(
      offer.offerer,
      address(this)
    );
    require(givenAllowance >= offer.amount, 'Not enough allowance');
    require(block.timestamp < offer.deadline, 'The offer has expired');
    require(!offer.isClosed, 'The offer is used already');

    // Check that the seller has the NFT
    if (is721Type(offer.nftContract)) {
      address nftOwner = IERC721(offer.nftContract).ownerOf(offer.tokenId);
      require(nftOwner == msg.sender, 'Only owner can accept offer');
    } else {
      uint256 senderBalance = IERC1155(offer.nftContract).balanceOf(
        msg.sender,
        offer.tokenId
      );
      require(senderBalance > 0, 'Not enough balance');
    }

    offer.isClosed = true;

    uint256 commission = getPriceAfterPercent(
      offer.amount,
      1,
      commissionPercent
    );

    // Transfers royalty
    uint256 royalty = handleErc20Royalty(
      offer.nftContract,
      offer.tokenId,
      offer.erc20Address,
      offer.offerer,
      offer.amount
    );

    // Transfers price
    IERC20(offer.erc20Address).transferFrom(
      offer.offerer,
      msg.sender,
      offer.amount - commission - royalty
    );

    // Transfers commission
    IERC20(offer.erc20Address).transferFrom(offer.offerer, owner(), commission);

    // transfer the nft from owner to offerer
    transferNFT(offer.nftContract, msg.sender, offer.offerer, offer.tokenId, 1);

    emit OfferAccepted(offerId);
  }
}
