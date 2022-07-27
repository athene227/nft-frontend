// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';

import '@openzeppelin/contracts/utils/introspection/ERC165Checker.sol';

import './IPartialNFT.sol';

/**
@title Common functionality for all marketplace contracts
 */
abstract contract MarketTools is Ownable, Pausable {
  using Counters for Counters.Counter;
  using ERC165Checker for address;

  // NFT address -> token id -> (royalty + creator address)
  mapping(address => mapping(uint256 => InitialItem)) public initialItems;
  // Amount of tokens a user has for sale, per contract and per tokenId
  mapping(address => mapping(address => mapping(uint256 => uint256)))
    public userListedTokens;
  Counters.Counter internal _listingIds;
  // Commission percentage for all sales
  uint256 public commissionPercent = 1;
  // List of ERC20 token addresses which are allowed to be used
  mapping(address => bool) public whitelistedERC20;

  bytes4 private InterfaceId_ERC721 = 0x80ac58cd; // The ERC-165 identifier for 721
  bytes4 private InterfaceId_ERC1155 = 0xd9b67a26; // The ERC-165 identifier for 1155

  struct InitialItem {
    uint256 royalty;
    address creator;
  }

  /**
   * @dev Initializes the contract
   * @param erc20TokenAddresses List of ERC20 tokens to be whitelisted initially
   */
  constructor(address[] memory erc20TokenAddresses) {
    for (uint256 i = 0; i < erc20TokenAddresses.length; i++) {
      whitelistedERC20[erc20TokenAddresses[i]] = true;
    }
  }

  /**
   * @dev Adds an ERC20 token to the whitelist
   * @param erc20TokenAddress The address of the token
   */
  function addToWhitelist(address erc20TokenAddress) public onlyOwner {
    whitelistedERC20[erc20TokenAddress] = true;
  }

  /**
   * @dev Removes an ERC20 token from the whitelist
   * @param erc20TokenAddress The address of the token
   */
  function removeFromWhitelist(address erc20TokenAddress) public onlyOwner {
    whitelistedERC20[erc20TokenAddress] = false;
  }

  /**
   * @dev Gets the latest listingId used in the contract
   * @return uint256 listingId
   */
  function getLatestListItemId() public view returns (uint256) {
    return _listingIds.current();
  }

  /**
   * @dev Used to initialize royalties. Under construction currently.
   */
  function initializeItem(
    address nftContract,
    uint256 tokenId,
    address creator,
    uint256 royalty
  ) public {
    require(
      initialItems[nftContract][tokenId].creator == address(0x0),
      'Already initialized'
    );
    initialItems[nftContract][tokenId] = InitialItem(royalty, creator);

    // TODO: consider emitting an event once royalties are implemented properly
  }

  /**
   * @dev Returns the price after the given percentage has been deducted
   * @param price The original price
   * @param quantity How many times the price should be used
   * @param percent How big percentage should be deducted
   */
  function getPriceAfterPercent(
    uint256 price,
    uint256 quantity,
    uint256 percent
  ) public pure returns (uint256) {
    uint256 _percent = percent;
    return ((price * quantity) * _percent) / 100;
  }

  /**
   * @dev Makes sure the sender has given allowance for this contract to manage their NFTs
   * @param nftContract Address of the NFT contract for which to check for allowance
   */
  function checkNFTAllowance(address nftContract) internal view {
    // Make sure the owner has given allowance
    bool givenAllowance = IPartialNFT(nftContract).isApprovedForAll(
      msg.sender,
      address(this)
    );
    require(givenAllowance, 'Not allowed to manage tokens');
  }

  /**
   * @dev Checks how many NFTs the given owner has
   * @param nftContract Address of the NFT contract for which to check for allowance
   * @param tokenId Which NFT token ID to check
   * @param nftOwner Address of the owner
   * @return uint256 The amount of NFTs the owner has. For ERC721, this is always 0 or 1.
   */
  function getNFTOwnerAmount(
    address nftContract,
    uint256 tokenId,
    address nftOwner
  ) internal view returns (uint256) {
    if (is721Type(nftContract)) {
      return IERC721(nftContract).ownerOf(tokenId) == nftOwner ? 1 : 0;
    } else {
      return IERC1155(nftContract).balanceOf(nftOwner, tokenId);
    }
  }

  /**
   * @dev Transfers an NFT
   * @param nftContract Address of the NFT contract
   * @param sender Sender of the NFT
   * @param receiver Receiver of the NFT
   * @param nftTokenId NFT token ID
   * @param amount How many NFTs to transfer
   */
  function transferNFT(
    address nftContract,
    address sender,
    address receiver,
    uint256 nftTokenId,
    uint256 amount
  ) internal {
    if (is721Type(nftContract)) {
      IERC721(nftContract).safeTransferFrom(sender, receiver, nftTokenId);
    } else {
      IERC1155(nftContract).safeTransferFrom(
        sender,
        receiver,
        nftTokenId,
        amount,
        ''
      );
    }
  }

  /**
   * @dev Checks the type of the given NFT. Reverts if it's not supported
   * @param addr Address of the NFT contract
   * @return bool true if it's ERC721, false if ERC1155
   */
  function is721Type(address addr) internal view returns (bool) {
    if (addr.supportsInterface(InterfaceId_ERC721)) {
      return true;
    } else if (addr.supportsInterface(InterfaceId_ERC1155)) {
      return false;
    } else {
      revert('Not supported');
    }
  }

  function pause() external onlyOwner {
    _pause();
  }

  function unpause() external onlyOwner {
    _unpause();
  }
}
