const { assert } = require('chai');
const chai = require('chai');
const expect = chai.expect;
const waffle = require('ethereum-waffle');

chai.use(waffle.solidity);

const BN = web3.utils.BN;

const Market = artifacts.require('NFTMarket');
const NFT = artifacts.require('NFT');

const ZERO_ADDRESS = web3.utils.padLeft('0x0', 40);

contract(
  'Market contract with auction market buy, without royalties',
  async (accounts) => {
    let market, nft;
    let owner, user1, user2, user3;

    beforeEach(async function () {
      const accounts = await web3.eth.getAccounts();
      owner = accounts[0];
      user1 = accounts[1];
      user2 = accounts[2];
      user3 = accounts[3];

      market = await Market.new();
      nft = await NFT.new(market.address);
      await nft.createToken('dummy', 5, 0, { from: user1 });
    });

    it('should create a correct marketitem', async () => {
      const deadline = (await getTimestamp()) + 10;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();
      const res = await market.auctionListingIdToMarketItem(listingId);
      const listedAmount = await market.userListedTokens(user1, nft.address, 1);

      assert.equal(res.nftContract, nft.address);
      assert.equal(res.tokenId, 1);
      assert.equal(res.startPrice, 100);
      assert.equal(res.currentBid, 100);
      assert.equal(res.currentBidderAddress, ZERO_ADDRESS);
      assert.equal(res.deadline, deadline);
      assert.equal(res.ownerAddress, user1);
      assert.equal(res.isClosed, false);
      assert.equal(listedAmount, 1);
    });

    it('should be able to place a bid', async () => {
      const deadline = (await getTimestamp()) + 10000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      await market.bid(listingId, { value: 202, from: user2 });

      const res = await market.auctionListingIdToMarketItem(listingId);

      assert.equal(res.startPrice, 100);
      assert.equal(res.currentBid, 200);
      assert.equal(res.currentBidderAddress, user2);
    });

    it("new bidder returns earlier bidder's bid", async () => {
      // two bidders start a bidding war

      const deadline = (await getTimestamp()) + 10000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1,
        gasPrice: 0
      });
      const listingId = await market.getLatestListItemId();

      const creatorBalanceBefore = new BN(await web3.eth.getBalance(user1)); //1000
      const firstBidderBalanceBefore = new BN(await web3.eth.getBalance(user2)); //800

      await market.bid(listingId, { value: 202, from: user2, gasPrice: 0 });

      const creatorBalanceSecond = new BN(await web3.eth.getBalance(user1)); //1000
      const firstBidderBalanceSecond = new BN(await web3.eth.getBalance(user2)); //598
      const secondBidderBalanceSecond = new BN(
        await web3.eth.getBalance(user3)
      ); //800

      await market.bid(listingId, { value: 404, from: user3, gasPrice: 0 }); // 396

      const firstBidderBalanceThird = new BN(await web3.eth.getBalance(user2)); //800
      const secondBidderBalanceThird = new BN(await web3.eth.getBalance(user3)); //396

      await market.bid(listingId, { value: 707, from: user2, gasPrice: 0 });

      const firstBidderBalanceAfter = new BN(await web3.eth.getBalance(user2)); //93
      const secondBidderBalanceAfter = new BN(await web3.eth.getBalance(user3)); //800

      const res = await market.auctionListingIdToMarketItem(listingId);

      // After first bid
      assert.equal(creatorBalanceSecond.sub(creatorBalanceBefore), 0);
      assert.equal(
        firstBidderBalanceSecond.sub(firstBidderBalanceBefore),
        -202
      );

      // After second bid
      assert.equal(firstBidderBalanceThird.sub(firstBidderBalanceSecond), 202);
      assert.equal(
        secondBidderBalanceThird.sub(secondBidderBalanceSecond),
        -404
      );

      assert.equal(firstBidderBalanceAfter.sub(firstBidderBalanceThird), -707);
      assert.equal(secondBidderBalanceAfter.sub(secondBidderBalanceThird), 404);

      assert.equal(res.startPrice, 100);
      assert.equal(res.currentBid, 700);
      assert.equal(res.currentBidderAddress, user2);
    });

    it('termination with no bidders returns NFT', async () => {
      const deadline = (await getTimestamp()) + 1000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      await nextDay();

      const sellerBalanceBefore = await nft.balanceOf(user1, 1);

      await market.terminateAuction(listingId);

      const sellerBalanceAfter = await nft.balanceOf(user1, 1);
      const listedAmount = await market.userListedTokens(user1, nft.address, 1);

      assert.equal(sellerBalanceAfter.sub(sellerBalanceBefore), 1);
      assert.equal(listedAmount, 0);
    });

    it('termination with bidder transfers NFT', async () => {
      const deadline = (await getTimestamp()) + 1000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      await market.bid(listingId, { value: 202, from: user2 });
      await nextDay();

      const sellerBalanceBefore = await nft.balanceOf(user1, 1);
      const buyerBalanceBefore = await nft.balanceOf(user2, 1);

      await market.terminateAuction(listingId);

      const sellerBalanceAfter = await nft.balanceOf(user1, 1);
      const buyerBalanceAfter = await nft.balanceOf(user2, 1);

      const listedAmount = await market.userListedTokens(user1, nft.address, 1);

      assert.equal(
        sellerBalanceAfter.toString(),
        sellerBalanceBefore.toString()
      );
      assert.equal(buyerBalanceAfter.sub(buyerBalanceBefore), 1);
      assert.equal(listedAmount, 0);
    });

    it('termination with bidder transfers value', async () => {
      const deadline = (await getTimestamp()) + 1000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      const sellerBalanceBefore = new BN(await web3.eth.getBalance(user1));
      const buyerBalanceBefore = new BN(await web3.eth.getBalance(user2));

      await market.bid(listingId, { value: 202, gasPrice: 0, from: user2 });
      await nextDay();

      await market.terminateAuction(listingId, { gasPrice: 0 });

      const sellerBalanceAfter = new BN(await web3.eth.getBalance(user1));
      const buyerBalanceAfter = new BN(await web3.eth.getBalance(user2));

      assert.equal(sellerBalanceAfter.sub(sellerBalanceBefore), 200);
      assert.equal(buyerBalanceAfter.sub(buyerBalanceBefore), -202);
    });

    it('emergency withdrawal works', async () => {
      const deadline = (await getTimestamp()) + 1000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      const ownerBalanceBefore = new BN(await web3.eth.getBalance(owner));

      await market.bid(listingId, { value: 202, gasPrice: 0, from: user2 });

      await market.withdraw({ gasPrice: 0 });

      const ownerBalanceAfter = new BN(await web3.eth.getBalance(owner));

      assert.equal(ownerBalanceAfter.sub(ownerBalanceBefore), 202);
    });

    it('should be able to cancel', async () => {
      const deadline = (await getTimestamp()) + 1000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();
      await market.cancelAuctionListing(listingId, {
        from: user1
      });

      const res = await market.auctionListingIdToMarketItem(listingId);
      const listedAmount = await market.userListedTokens(user1, nft.address, 1);

      assert.equal(res.isClosed, true);
      assert.equal(listedAmount, 0);
    });

    it('Cancelling gives NFT back', async () => {
      const deadline = (await getTimestamp()) + 1000;
      const sellerBalanceBefore = await nft.balanceOf(user1, 1);
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      await market.cancelAuctionListing(listingId, {
        from: user1
      });

      const sellerBalance = await nft.balanceOf(user1, 1);

      assert.equal(sellerBalance.toString(), sellerBalanceBefore.toString());
    });

    it('emergency withdrawal fails if not owner', async () => {
      const deadline = (await getTimestamp()) + 1000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      await market.bid(listingId, { value: 202, gasPrice: 0, from: user2 });

      await expect(market.withdraw({ gasPrice: 0, from: user1 })).to.be
        .reverted;
      // await expect(
      //   market.withdraw({ gasPrice: 0, from: user1 })
      // ).to.be.revertedWith("Only owner can withdraw");
    });

    it('bidding fails with too low bid', async () => {
      const deadline = (await getTimestamp()) + 1000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      await expect(
        market.bid(listingId, { value: 101, from: user2, gasPrice: 0 })
      ).to.be.reverted;
      // await expect(
      //   market.bid(listingId, { value: 101, from: user2, gasPrice: 0 })
      // ).to.be.revertedWith("Have to offer higher price");
    });

    it('bidding twice the same bid fails', async () => {
      const deadline = (await getTimestamp()) + 1000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      await market.bid(listingId, { value: 1000, from: user2, gasPrice: 0 });

      await expect(
        market.bid(listingId, { value: 1000, from: user3, gasPrice: 0 })
      ).to.be.reverted;
      // await expect(
      //   market.bid(listingId, { value: 1000, from: user3, gasPrice: 0 })
      // ).to.be.revertedWith("Have to offer higher price");
    });

    it("termination fails when auction hasn't ended", async () => {
      const deadline = (await getTimestamp()) + 1000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      await expect(market.terminateAuction(listingId)).to.be.reverted;
      // await expect(market.terminateAuction(listingId)).to.be.revertedWith(
      //   "The auction hasn't ended"
      // );
    });

    it('bidding, termination and cancellation after termination fails', async () => {
      const deadline = (await getTimestamp()) + 1000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      await nextDay();

      await market.terminateAuction(listingId, { from: user1 });
      await expect(
        market.bid(listingId, { value: 1000, from: user2, gasPrice: 0 })
      ).to.be.revertedWith('Already closed');
      await expect(
        market.terminateAuction(listingId, { from: user1 })
      ).to.be.revertedWith('Already closed');
      await expect(
        market.cancelAuctionListing(listingId, { from: user1 })
      ).to.be.revertedWith('Already closed');
    });

    it('bidding, termination and cancellation after cancellation fails', async () => {
      const deadline = (await getTimestamp()) + 1000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      await market.cancelAuctionListing(listingId, { from: user1 });
      await expect(
        market.bid(listingId, { value: 1000, from: user2, gasPrice: 0 })
      ).to.be.revertedWith('Already closed');
      await expect(
        market.terminateAuction(listingId, { from: user1 })
      ).to.be.revertedWith('Already closed');
      await expect(
        market.cancelAuctionListing(listingId, { from: user1 })
      ).to.be.revertedWith('Already closed');
    });

    it('cancel fails if there are bids', async () => {
      const deadline = (await getTimestamp()) + 1000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();
      await market.bid(listingId, { value: 1000, from: user2, gasPrice: 0 });
      await expect(
        market.cancelAuctionListing(listingId, { from: user1 })
      ).to.be.revertedWith("Can't cancel an auction if there are bids");
    });

    it('cancel fails if not your listing', async () => {
      const deadline = (await getTimestamp()) + 1000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      await expect(
        market.cancelAuctionListing(listingId, { from: user2 })
      ).to.be.revertedWith('Only owner can cancel');
    });

    it("cancel fails if calling simple sale's cancel", async () => {
      const deadline = (await getTimestamp()) + 1000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      await expect(
        market.cancelSimpleListing(listingId, { from: user1 })
      ).to.be.revertedWith('Can cancel only simple listings');
    });

    it('double listing fails', async () => {
      const deadline = (await getTimestamp()) + 1000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      await expect(
        market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
          from: user1
        })
      ).to.be.reverted;
    });
    it('auction owner place bid on his auction shoud fail', async () => {
      const deadline = (await getTimestamp()) + 1000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      await expect(
        market.bid(listingId, {
          from: user1,
          value: 101
        })
      ).to.be.revertedWith("Auction owner can't place bid on his Auction");
    });
  }
);

contract(
  'Market contract with auction market buy, with royalties',
  async (accounts) => {
    let market, nft;
    let owner, user1, user2;

    beforeEach(async function () {
      const accounts = await web3.eth.getAccounts();
      owner = accounts[0];
      user1 = accounts[1];
      user2 = accounts[2];
      user3 = accounts[3];

      market = await Market.new();
      nft = await NFT.new(market.address);
    });

    it('first sale gives royalty correctly', async () => {
      // It doesn't matter how much the royalty is, since it's given to the same address anyway
      await nft.createToken('dummy', 5, 6, { from: user1 });
      const deadline = (await getTimestamp()) + 1000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      const sellerBalanceBefore = new BN(await web3.eth.getBalance(user1)); // 1000
      const buyerBalanceBefore = new BN(await web3.eth.getBalance(user2)); // 1000

      await market.bid(listingId, {
        value: 404,
        from: user2,
        gasPrice: 0
      });
      await nextDay();
      await market.terminateAuction(listingId, { gasPrice: 0 });

      const sellerBalanceAfter = new BN(await web3.eth.getBalance(user1)); //  1400
      const buyerBalanceAfter = new BN(await web3.eth.getBalance(user2)); //  596

      assert.equal(buyerBalanceBefore.sub(buyerBalanceAfter).toString(), 404);
      assert.equal(sellerBalanceAfter.sub(sellerBalanceBefore), 400);
    });

    it('second sale gives royalty correctly', async () => {
      const royalty = 6;
      await nft.createToken('dummy', 5, royalty, { from: user1 });

      let deadline = (await getTimestamp()) + 1000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user1
      });
      let listingId = await market.getLatestListItemId();

      const creatorBalanceBefore = new BN(await web3.eth.getBalance(user1)); //1000
      const firstBuyerBalanceBefore = new BN(await web3.eth.getBalance(user2)); //1000

      await market.bid(listingId, {
        value: 303,
        from: user2,
        gasPrice: 0
      });

      await nextDay();
      await market.terminateAuction(listingId, { gasPrice: 0 });

      const creatorBalanceMiddle = new BN(await web3.eth.getBalance(user1)); //1300
      const firstBuyerBalanceMiddle = new BN(await web3.eth.getBalance(user2)); //697
      const secondBuyerBalanceMiddle = new BN(await web3.eth.getBalance(user3)); //1000

      // Create second auction listing
      deadline = (await getTimestamp()) + 1000;
      await market.createAuctionMarketItem(nft.address, 1, 100, deadline, {
        from: user2
      });
      listingId = await market.getLatestListItemId();

      await market.bid(listingId, {
        value: 404,
        from: user3,
        gasPrice: 0
      });

      await nextDay();
      await market.terminateAuction(listingId, { gasPrice: 0 });

      const creatorBalanceAfter = new BN(await web3.eth.getBalance(user1)); //1300 + 24 = 1324
      const firstBuyerBalanceAfter = new BN(await web3.eth.getBalance(user2)); //697+376 = 1073
      const secondBuyerBalanceAfter = new BN(await web3.eth.getBalance(user3)); //596

      assert.equal(firstBuyerBalanceMiddle.sub(firstBuyerBalanceBefore), -303); //697 - 1000
      assert.equal(creatorBalanceMiddle.sub(creatorBalanceBefore), 300); // 1300  - 1000
      assert.equal(
        firstBuyerBalanceAfter.sub(firstBuyerBalanceMiddle), //1073 - 697 = 376
        (400 * (100 - royalty)) / 100 // 400*94/100 = 376
      );
      assert.equal(secondBuyerBalanceAfter.sub(secondBuyerBalanceMiddle), -404); // 596 - 1000
      assert.equal(
        creatorBalanceAfter.sub(creatorBalanceMiddle), // 1324 - 1300 = 24
        (400 * royalty) / 100 // royalty % from 400   // 24
      );
    });
  }
);

const getTimestamp = async () => {
  const block = await web3.eth.getBlock('latest');
  return block.timestamp;
};

const nextDay = async () => {
  let oneDay = 24 * 60 * 60;
  await web3.currentProvider.send(
    {
      jsonrpc: '2.0',
      method: 'evm_increaseTime',
      params: [oneDay],
      id: 0
    },
    () => {}
  );

  await web3.currentProvider.send(
    {
      jsonrpc: '2.0',
      method: 'evm_mine',
      params: [],
      id: 0
    },
    () => {}
  );
};
