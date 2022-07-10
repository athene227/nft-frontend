# Information about used contracts

This page provides general information about the used contracts. The relevant
contracts are:

- NFT.sol
- INFTMarket.sol
- NFTMarket.sol

## General usage

NFT.sol contains token code and NFTMarket.sol contains an NFT marketplace. NFT
contract is aware of the market contract and calls functionality in it.

## NFT.sol

NFT contains the ERC-1155 token code. Regular functionality (from OpenZeppelin)
is extended by minting and giving the market contract allowance for all users'
tokens.

When new tokens are minted, the token basic information (creator address and
royalty amount) is added to the market contract. Therefore the royalty amount
needs to be decided already when minting the token.

## INFTMarket.sol

This interface contains a subset of NFTMarket.sol's functionality - only the
functionality used by the NFT contract.

## NFTMarket.sol

This is the main marketplace contract, containing all functionality related to
the NFT marketplace.

### Functions

The contract has the following main public functions:

#### `initializeItem`

Called by the NFT contract upon minting. This initializes the token in the
market contract. Initialization (per contract and tokenId) can only be done
once. After the initialization is done, the token may be listed in the
marketplace.

Initialization sets the token's creator address and its (possible) royalty
percentage. The royalty may be given as zero, which means no royalties are
collected from the token's sales.

#### `getLatestListItemId`

This gives the last assigned listing ID. More information about this ID below.

#### `createSimpleMarketItem`

Creates a listing for a direct or simple sale. Such sale means any number of one
token can be listed for any price. Buyers can buy one or multiple or these
tokens with the listed price (per token).

Listing tokens with this function transfers the tokens to the marketplace
contract for safekeeping.

The function assings a new `listingId` for the listing. This ID is needed for
all interaction with the listing. Unfortunately, the ID can't be retrieved
directly from the function call (since it's a transaction), so frontend
implementation has to either monitor for listing events or retrieve the latest
assigned ID with the `getLatestListItemId` function (although you can't be 100%
sure whether the latest listing is the one you are interested in).

#### `createAuctionMarketItem`

Creates a listing for an auction. An auction is always for just one NFT. An
auction has a starting price and a deadline.

An auction transfers the NFT and assings a listing ID in the same way as
`createSimpleMarketItem`.

#### `buySimple`

Used for buying a number of listed simple sale tokens. You may buy any number of
tokens, up to the listed amount of tokens. Each token has the same price.

A simple sale immediately transfers the sale price for the seller and the tokens
to the buyer.

#### `bid`

Used for bidding on an auction item. You can bid any amount, but it has to be
higher than the previous bid (plus commission).

Outbidding a previous bid immediately transfers the previous bid amount back to
the previous bidder.

#### `terminateAuction`

Terminates an auction. This can only be called after the auction's deadline has
passed. Anyone can call this for whichever auction, but this reverts if the
auction hasn't ended.

If there were bidders, the highest bidder's bid is transferred to the seller and
NFT transferred to the bidder. If there were no bidders, the NFT is simply
transferred back to the seller.

Once this function is called, the auction is marked as ended and no new bids are
accepted.

### Other functionality

#### Royalty

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

#### Cancelling listing

The owner can cancel a simple sale whenever he wants to by calling the
appropriate functionality.

The owner can cancel an auction only if there are no bids on it.

#### Helper functionality

The contract has most of its variables marked as `public`, and therefore their
data can be retrieved directly from the variable's implicit getter functionl

## Unit tests

The contracts are mostly covered by unit tests. Both happy paths and unhappy
paths should be sufficiently covered.

For the unit tests, you should run a local blockchain with the Berlin hard fork,
so you have the possibility to set gasPrice to zero (useful for testing user
Ether balances). You can start such blockchain with `npm run local`.

You can run the unit tests with `truffle test`.

## Information for the client

The contracts still need some work, which is left for the client. That work is
explained here.

### Events

The functions do not emit many events currently. You should emit events where
you need them.

### Next steps

The frontend should be implemented and all of the contract functionality tested
thoroughly by the client. The developer has implemented everything as well as
possible but thorough client testing is needed to: 1) find possible bugs and 2)
find out if the contracts do what the client wanted them to do.

### Vulnerabilities and considerations

There exist some considerations and vulnerabilities currently in the contracts:

- Anyone can mint. There are no access restrictions in the NFT contract. Please
  decide how you want to restrict it and implement it
- Using commission or royalty percentages which do not divide numbers evenly may
  cause minor amounts of _wei_ to be left behind in the contract. An example:
  sale price is 100 and royalty is 3%, 3 wei gets sent as royalty and (under
  certain circumstances) 96 wei are given to seller, which leaves 1 wei behind
  in the contract. Usually this is not a big problem, but it's something to be
  aware of.
- Using the `withdraw` function should be reserved for emergencies. It will
  basically render the contract useless, since it no longer has the assets to
  pay sellers. Consider whether you want to keep the function or not - removing
  would reduce the amount of trust required, but keeping it may prove useful if
  there are problems.
- The NFT URI functionality has not been analyzed. Make sure it works as you
  want it to work.
- What should happen if the recipient of Ether (for example sale price) refuses
  the transfer? Currently the assets are simply not sent and remain in the
  market contract (forever).
- What should happen if the recipient of NFTs refuses the transfer (or is a
  smart contract which is not capable of handling the NFT)? Currently the
  transaction reverts, but there's not much we could do about it.
