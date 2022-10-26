// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// erc 1155
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol';
import '@openzeppelin/contracts/token/common/ERC2981.sol';

// utils
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol';

contract NFT1155 is ERC2981, EIP712, ERC1155URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter public _tokensIds; // for minting incrementing

  string private constant SIGNING_DOMAIN = 'HowToPulse-Voucher1155';
  string private constant SIGNATURE_VERSION = '1';

  // Lazy minted NFTs may not have a tokenID below this
  uint256 public constant LAZY_MINT_TOKENID_START = 1000000000;

  event Mint(uint256 newItemId, uint256 amount);

  /// @notice Represents an un-minted NFT, which has not yet been recorded into the blockchain. A signed voucher can be redeemed for a real NFT using the redeem function.
  struct NFTVoucher {
    /// @notice The id of the token to be redeemed. Must be unique - if another token with this ID already exists, the redeem function will revert.
    uint256 tokenId;
    /// @notice The minimum price (in wei) that the NFT creator is willing to accept for the initial sale of this NFT.
    uint256 minPrice;
    /// @notice How many tokens can be minted. Voucher can be reused until this amount has bee reached
    uint256 amount;
    /// @notice Possible creator royalty for the NFT
    uint96 royalty;
    /// @notice NFT creator
    address creator;
    /// @notice The metadata URI to associate with this token.
    string uri;
    /// @notice the EIP-712 signature of all other fields in the NFTVoucher struct.
    bytes signature;
  }

  constructor() ERC1155('') EIP712(SIGNING_DOMAIN, SIGNATURE_VERSION) {}

  /// @notice Redeems a lazy minted voucher for an actual NFT, creating it in the process.
  /// @param receiver The address of the account which will receive the NFT upon success.
  /// @param amount How many tokens to redeem
  /// @param voucher A signed NFTVoucher that describes the NFT to be redeemed.
  function redeem(
    address receiver,
    uint256 amount,
    NFTVoucher calldata voucher
  ) public payable {
    // Make sure signature is valid and get the address of the signer
    // The returned signer is never 0x0
    address signer = _verify(voucher);
    require(signer == voucher.creator, 'Invalid signature or unauthorized');

    // make sure that the receiver is paying enough to cover the buyer's cost
    require(
      msg.value >= voucher.minPrice * amount,
      'Insufficient funds to redeem'
    );
    require(voucher.tokenId >= LAZY_MINT_TOKENID_START, 'Invalid tokenID');

    require(amount > 0, 'Have to mint something');
    require(
      _tokensMinted[voucher.tokenId] + amount <= voucher.amount,
      'Exceeded mint limit'
    );

    // first assign the token to the signer, to establish provenance on-chain
    _mint(signer, voucher.tokenId, amount, '0x0');

    _setURI(voucher.tokenId, voucher.uri);

    if (voucher.royalty > 0) {
      _setTokenRoyalty(voucher.tokenId, voucher.creator, voucher.royalty);
    }

    // transfer the token to the receiver
    _safeTransferFrom(signer, receiver, voucher.tokenId, amount, '0x0');

    // transfer supplied value to the creator
    (bool success, ) = payable(voucher.creator).call{
      value: msg.value,
      gas: 3000
    }('');
    success; // to suppress unused variable warning

    emit Mint(voucher.tokenId, amount);
  }

  /// @notice Returns a hash of the given NFTVoucher, prepared using EIP712 typed data hashing rules.
  /// @param voucher An NFTVoucher to hash.
  function _hash(NFTVoucher calldata voucher) internal view returns (bytes32) {
    return
      _hashTypedDataV4(
        keccak256(
          abi.encode(
            keccak256(
              'NFTVoucher(uint256 tokenId,uint256 minPrice,uint256 amount,uint96 royalty,address creator,string uri)'
            ),
            voucher.tokenId,
            voucher.minPrice,
            voucher.amount,
            voucher.royalty,
            voucher.creator,
            keccak256(bytes(voucher.uri))
          )
        )
      );
  }

  /// @notice Verifies the signature for a given NFTVoucher, returning the address of the signer.
  /// @dev Will revert if the signature is invalid. Does not verify that the signer is authorized to mint NFTs.
  /// @param voucher An NFTVoucher describing an unminted NFT.
  function _verify(NFTVoucher calldata voucher)
    internal
    view
    returns (address)
  {
    bytes32 digest = _hash(voucher);
    return ECDSA.recover(digest, voucher.signature);
  }

  mapping(uint256 => uint256) _tokensMinted;

  function _mint(
    address to,
    uint256 id,
    uint256 amount,
    bytes memory data
  ) internal override {
    _tokensMinted[id] += amount;
    super._mint(to, id, amount, data);
  }

  function uri(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    return ERC1155URIStorage.uri(tokenId);
  }

  /**
   * @dev Mints a token
   * @param tokenURI The metadata URL for this NFT (using metadata substitution)
   * @param amount The amount of tokens to mint
   * @param royalty Possible royalty percentage per token, specified in basis points (10000 means 100%)
   */
  function createToken(
    string memory tokenURI,
    uint256 amount,
    uint96 royalty
  ) public returns (uint256) {
    _tokensIds.increment();
    uint256 newItemId = _tokensIds.current();
    // minting
    _mint(msg.sender, newItemId, amount, '0x0');

    _setURI(newItemId, tokenURI);

    if (royalty > 0) {
      _setTokenRoyalty(newItemId, msg.sender, royalty);
    }

    emit Mint(newItemId, amount);
    return newItemId;
  }

  /// @inheritdoc ERC165
  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC1155, ERC2981)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
