# Blockchain development details

This page provides general information about the used contracts and required files around the contracts. All contract source codes can be found under the *src* folder.

## Contracts overview

The following are the main contracts:
- `INFTMarket.sol`: An interface used for storing NFT royalty information to the marketplace contracts.
- `IPartialNFT.sol`: An interface used to present some common functionality between ERC-1155 and ERC-721
- `MarketTools.sol`: An abstract contract which is inherited by all the marketplace contracts. Contains logic common to all marketplace type contracts
- `NFT721.sol`: A basic ERC-721 contract with some extra minting logic for royalties
- `NFT1155.sol`: A basic ERC-1155 contract with some extra minting logic for royalties
- `NFTMarketAuction.sol`: A contract to create and manage NFT auctions
- `NFTMarketOffers.sol`: A contract to create and manage direct offers for (unlisted) NFTs
- `NFTMarketSimple.sol`: A contract to create and manage simple NFT sales

## Contracts details

This section describes the marketplace contracts and their main functionalities.

### Common functionality from `MarketTools.sol`

This section describes the main functionality which is common for all of the marketplace contracts. The contract includes also other less interesting helper functions.

#### `addToWhitelist` and `removeFromWhitelist`

Functionality for adding an ERC20 token to the whitelist and for removing one from there.  Only the deployer has access to this.

Only whitelisted ERC20 tokens can be used in the marketplaces.

#### `initializeItem`

Related to royalties. TODO

#### `pause` and `unpause`

Functionality for pausing and unpausing the contract logic. Only the deployer has access to this.

While the contract is paused, the following functionality can't be used by anyone:

- Auctions:
  - Creating an auction
  - Bidding
  - Canceling a bid
  - Accepting a bid
  - Terminate an auction
  - Canceling an auction
-  Offers:
  - Creating an offer
  - Accepting an offer
- Simple:
  - Creating a simple sale
  - Buying
  - Canceling a simple sale

### `NFTMarketSimple.sol`

#### `createSimpleMarketItem`

Creates a listing for a simple sale. Such sale means any number of one
NFT collection can be listed for any price. Buyers can buy one or multiple or these
tokens with the listed price (per NFT).

A simple market item is always purchased in the blockchain's native asset.

The function assings a new `listingId` for the listing. This ID is needed for
all interaction with the listing. Unfortunately, the ID can't be retrieved
directly from the function call (since it's a transaction), so frontend
implementation has to either monitor for listing events or retrieve the latest
assigned ID with the `getLatestListItemId` function (although you can't be 100%
sure whether the latest listing is the one you are interested in).

#### `buySimple`

Used for buying a number of listed simple sale NFTs. You may buy any number of
NFTs, up to the listed amount of NFTs. Each NFT has the same price.

A simple sale immediately transfers the sale price for the seller and the NFTs
to the buyer.

#### `cancelSimpleListing`

Cancels a simple listing. Only the creator of the listing can cancel their own listing.

### `NFTMarketAuction.sol`

#### `createAuctionMarketItem`

Creates a listing for an auction. An auction is always for just one NFT. An
auction has a minimum starting price and a deadline.

An auction price is always denoted in some whitelisted ERC-20 token. The auction creator decides on the used ERC-20 token.

#### `bid`

Used for bidding on an auction item. You can bid any amount - it does not need to be higher than previous bids. You have to hold enough of the price asset and must've given allowance for the marketplace to withdraw your tokens in advance.

#### `terminateAuction`

Terminates an auction. This can only be called after the auction's deadline has
passed. Anyone can call this for whichever auction.

If there were bidders, the highest bidder's valid bid is transferred to the seller and
NFT transferred to the bidder. If there were no bidders, the auction is simply closed. No new bids are accepted for a closed auction.

To find the highest valid bid, the contract loops through all bids to find a bid where:
1. The bidder has enough of the bid asset in their wallet
1. The bidder has enough allowance for the marketplace to withdraw the bid asset from the bidder's wallet
1. The bid has the highest value from all valid bids

#### `acceptBid`

Accepts an arbitrary valid bid for an auction. This closes the auction. Only the creator of the auction can call this function.

Under normal circumstances auctions are usually terminated with the `terminateAuction` functionality. Accepting an arbitrary bid can be used if the seller sees it fit.

#### `cancelBid`

Cancels a previously issued bid to an auction. Only the bidder can cancel their own bid and only for non-closed auctions.

#### `cancelAuctionMarketItem`

Cancels an auction. Only the creator of the auction can cancel their own auction.

### `NFTMarketOffers.sol`

#### `offerOnNFT`

Creates an arbitrary offer on an arbitrary NFT. The target NFT does not need to be listed in the marketplace.

The offerer chooses the used whitelisted ERC-20 token for the offer. Each offer has a deadline.

#### `acceptOffer`

The owner of an NFT can choose to accept a previously created offer.

### Other functionality

#### Transferring assets

When creating an auction sale or an offer no assets are transferred. The action only requires you to give the required allowance (in advance) for the market contract to withdraw your tokens once a sale completes.

Once a sale is completed, the allowance is used to withdraw the NFT from the seller and the price assets from the buyer, and their ownership is exchanged. If the buyer or the seller no longer has the required assets or allowances in place, the sale fails.

A simple sale is always in the blockchain's native asset which doesn't support allowances. Purchase via simple sale therefore transfers the asset directly to the seller from the buyer - and the NFT via allowances from the seller to the buyer.

#### Royalty

TODO: rewrite once royalty standards are in use.

For each completed sale (a direct sale or a successfully completed auction),
royalty percentage is transferred to the NFT's original creator. The royalty
percentage is decided when minting the NFT(s).

The royalty is calculated after the sale price. For example, if sale (or bid)
price is 100 weis and royalty is 5%, the seller gets 95 weis and creator 5 weis.

Royalties are only paid for trades made using this platform. Sales and/or
transfers outside this platform do not incur royalty.

#### Commission

For each completed sale, a commission is transferred to the contract's owner.
The commission can be considered as the platform's usage fee.

The commission is calculated before the sale price. For example, if user wants
to buy a direct sale item which has a sale price of 100 weis and commission is
1%, the users needs to pay 101 weis.

#### Helper functionality

The contract has most of its variables marked as `public`, and therefore their
data can be retrieved directly from the variable's implicit getter function.

## Unit tests

The contracts are covered by unit tests. Both happy paths and unhappy
paths should be sufficiently covered.

You can run unit tests with Hardhat: `npx hardhat test`.

## Information for the client

### Next steps

TODO

### Vulnerabilities and considerations

There exist some considerations and vulnerabilities currently in the contracts:

- Anyone can mint. There are no access restrictions in the NFT contract. Please
  decide how you want to restrict it and implement it
- Analyzing the NFT contract code isn't included in this project, except for the royalties part.
- Roayalty implementation is not finished

## Development

To start development on the project, you should do (at least) the following:
1. Install packages: `npm i`
1. Compile contracts: `npx hardhat compile`
1. Create typechain artifacts: `npm run generate:typechain`
1. Run unit tests: `npx hardhat test`

## Deployment

A sample deployment script has been created. It deploys all the contracts and also verifies them in Etherscan. You can run the script by following these steps:
1. Set up environment variables in a file called `.env`. There is an example of the settings in `.env.example`.
1. Run script with `npx hardhat run scripts/deploy.ts --network goerli`

Note that you need about 0,04 Eth in your wallet do deploy all of the contracts (at least in Goerli).

### Latest deployment

The latest test deployment to Goerli network of all of the contracts can be found [here](contract_addresses.md). The contracts are also verified in Etherscan.
