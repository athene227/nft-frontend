const { assert } = require('chai');
const chai = require('chai');
const expect = chai.expect;
const waffle = require('ethereum-waffle');

chai.use(waffle.solidity);

const BN = web3.utils.BN;

const Market = artifacts.require('NFTMarket');
const NFT = artifacts.require('NFT');

contract(
  'Market contract with simple market buy, without royalties',
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
      // 5 tokens with no royalty
      await nft.createToken('dummy', 5, 0, { from: user1 });
    });

    it('should create a correct marketitem', async () => {
      await market.createSimpleMarketItem(nft.address, 1, 100, 3, {
        from: user1
      });

      const listingId = await market.getLatestListItemId();
      const res = await market.simpleListingIdToMarketItem(listingId);
      const listedAmount = await market.userListedTokens(user1, nft.address, 1);

      //* tests *//
      assert.equal(res.nftContract, nft.address);
      assert.equal(res.tokenId, 1);
      assert.equal(res.price, 100);
      assert.equal(res.originalQuantity, 3);
      assert.equal(res.remainingQuantity, 3);
      assert.equal(res.ownerAddress, user1);
      assert.equal(listedAmount, 3);
    });

    it('should buy all of one listing', async () => {
      //* listing simple item *//
      await market.createSimpleMarketItem(nft.address, 1, 100, 4, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();
      //* buying the all items *//
      await market.buySimple(listingId, 4, { value: 404, from: user2 });

      const res = await market.simpleListingIdToMarketItem(listingId);
      const listedAmount = await market.userListedTokens(user1, nft.address, 1);

      //* tests *//
      assert.equal(res.originalQuantity, 4);
      assert.equal(res.remainingQuantity, 0);
      assert.equal(listedAmount, 0);
    });

    it('can relist if all tokens sold', async () => {
      //* listing simple item *//
      await market.createSimpleMarketItem(nft.address, 1, 100, 4, {
        from: user1
      });
      const listingIdBefore = await market.getLatestListItemId();
      //* buying the all items *//
      await market.buySimple(listingIdBefore, 4, { value: 404, from: user2 });

      await market.createSimpleMarketItem(nft.address, 1, 100, 3, {
        from: user2
      });

      const listingIdAfter = await market.getLatestListItemId();

      assert.notEqual(listingIdBefore, listingIdAfter);
    });

    it('should buy some of one listing', async () => {
      //* listing simple item *//
      await market.createSimpleMarketItem(nft.address, 1, 100, 4, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      //* buying 1 of the items  *//
      await market.buySimple(listingId, 1, { value: 101, from: user2 });

      const resFirst = await market.simpleListingIdToMarketItem(listingId);
      const listedAmountFirst = await market.userListedTokens(
        user1,
        nft.address,
        1
      );

      //* buying 2 of the items  *//
      await market.buySimple(listingId, 2, { value: 202, from: user2 });

      const resSecond = await market.simpleListingIdToMarketItem(listingId);
      const listedAmountSecond = await market.userListedTokens(
        user1,
        nft.address,
        1
      );

      //* tests *//
      assert.equal(resFirst.originalQuantity, 4);
      assert.equal(resFirst.remainingQuantity, 3);
      assert.equal(listedAmountFirst, 3);

      assert.equal(resSecond.originalQuantity, 4);
      assert.equal(resSecond.remainingQuantity, 1);
      assert.equal(listedAmountSecond, 1);
    });

    it('should transfer value from buyer to seller', async () => {
      //* listing simple items *//
      await market.createSimpleMarketItem(nft.address, 1, 100, 4, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      const buyerBalanceBefore = new BN(await web3.eth.getBalance(user2));
      const sellerBalanceBefore = new BN(await web3.eth.getBalance(user1));
      //* buying items *//
      await market.buySimple(listingId, 4, {
        value: 404,
        from: user2,
        gasPrice: 0
      });

      const buyerBalanceAfter = new BN(await web3.eth.getBalance(user2));
      const sellerBalanceAfter = new BN(await web3.eth.getBalance(user1));

      //* tests *//
      assert.equal(buyerBalanceBefore.sub(buyerBalanceAfter), 404);
      assert.equal(sellerBalanceAfter.sub(sellerBalanceBefore), 400);
    });

    it('should forward commission', async () => {
      //* listing simple items *//
      await market.createSimpleMarketItem(nft.address, 1, 100, 4, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      const ownerBalanceBefore = new BN(await web3.eth.getBalance(owner));

      await market.buySimple(listingId, 4, {
        value: 404,
        from: user2,
        gasPrice: 0
      });

      const ownerBalanceAfter = new BN(await web3.eth.getBalance(owner));

      assert.equal(ownerBalanceAfter.sub(ownerBalanceBefore), 4);
    });

    it('should be able to cancel', async () => {
      await market.createSimpleMarketItem(nft.address, 1, 100, 4, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();
      const res1 = await market.simpleListingIdToMarketItem(listingId);
      await market.cancelSimpleListing(listingId, {
        from: user1
      });
      const res2 = await market.simpleListingIdToMarketItem(listingId);
      const listedAmount = await market.userListedTokens(user1, nft.address, 1);

      assert.equal(res1.remainingQuantity, 4);
      assert.equal(res2.remainingQuantity, 0);
      assert.equal(listedAmount, 0);

      // Check that buying is not possible anymore

      // await expect(
      //   market.buySimple(listingId, 4, { value: 404, from: user2, gasPrice: 0 })
      // ).to.be.reverted;
      try {
        // await expect(
        await market.buySimple(listingId, 4, {
          value: 404,
          from: user2,
          gasPrice: 0
        });
        assert.fail('Should throw');
        // ).to.be.revertedWith("Not enough items for sale");
      } catch (error) {
        console.log(
          '🚀 ~ file: testSimple.js ~ line 201 ~ it ~ error.message',
          error.message
        );
      }
    });

    it('Cancelling gives all remaining NFTs back', async () => {
      await market.createSimpleMarketItem(nft.address, 1, 100, 4, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      await market.buySimple(listingId, 1, {
        value: 101,
        from: user2,
        gasPrice: 0
      });

      await market.cancelSimpleListing(listingId, {
        from: user1
      });

      const sellerBalance = await nft.balanceOf(user1, 1);
      const buyerBalance = await nft.balanceOf(user2, 1);

      assert.equal(sellerBalance, 4);
      assert.equal(buyerBalance, 1);
    });

    it('should transfer NFT to buyer', async () => {
      //here
      // before
      const sellerBalanceBefore = await nft.balanceOf(user1, 1); // 5
      const buyerBalanceBefore = await nft.balanceOf(user2, 1); // 0
      const contractBalanceBefore = await nft.balanceOf(market.address, 1); // 0

      const listedAmount = 4;
      const buyAmount = 2;

      await market.createSimpleMarketItem(nft.address, 1, 100, listedAmount, {
        // seller - 1   market - 4
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      await market.buySimple(listingId, buyAmount, {
        // buyer - 2   seller - 1     market - 2
        value: buyAmount * 101,
        from: user2
      });
      // after
      const sellerBalanceAfter = await nft.balanceOf(user1, 1); // 1
      const buyerBalanceAfter = await nft.balanceOf(user2, 1); // 2
      const contractBalanceAfter = await nft.balanceOf(market.address, 1); // 2

      // amount of NFTs in total before = amount of NFTS in total after
      assert.equal(
        sellerBalanceBefore // 5
          .add(buyerBalanceBefore) // 0
          .add(contractBalanceBefore) // 0
          .toString(),
        sellerBalanceAfter // 1
          .add(buyerBalanceAfter) // 2
          .add(contractBalanceAfter) // 2
          .toString()
      );
      assert.equal(sellerBalanceAfter, sellerBalanceBefore - listedAmount);
      assert.equal(contractBalanceBefore, 0);
      assert.equal(contractBalanceAfter, listedAmount - buyAmount);
      assert.equal(buyerBalanceAfter, buyAmount);
    });

    it('should transfer NFT to buyer in secondary sale', async () => {
      const creatorBalanceBefore = await nft.balanceOf(user1, 1); //5
      const firstBuyerBalanceBefore = await nft.balanceOf(user2, 1); //0
      const contractBalanceBefore = await nft.balanceOf(market.address, 1); //0

      await market.createSimpleMarketItem(nft.address, 1, 100, 4, {
        from: user1
      });
      let listingId = await market.getLatestListItemId();

      await market.buySimple(listingId, 4, {
        value: 404,
        from: user2
      });

      const creatorBalanceMiddle = await nft.balanceOf(user1, 1); //1
      const firstBuyerBalanceMiddle = await nft.balanceOf(user2, 1); //4
      const secondBuyerBalanceMiddle = await nft.balanceOf(user3, 1); //0
      const contractBalanceMiddle = await nft.balanceOf(market.address, 1); //0

      const listedAmountOriginalSellerMiddle = await market.userListedTokens(
        user1,
        nft.address,
        1
      );

      await market.createSimpleMarketItem(nft.address, 1, 100, 3, {
        from: user2
      });
      listingId = await market.getLatestListItemId();

      await market.buySimple(listingId, 2, {
        value: 202,
        from: user3
      });

      const listedAmountOriginalSellerAfter = await market.userListedTokens(
        user1,
        nft.address,
        1
      );
      const listedAmountSecondSellerAfter = await market.userListedTokens(
        user2,
        nft.address,
        1
      );

      const creatorBalanceAfter = await nft.balanceOf(user1, 1); //1
      const firstBuyerBalanceAfter = await nft.balanceOf(user2, 1); //1
      const secondBuyerBalanceAfter = await nft.balanceOf(user3, 1); //2
      const contractBalanceAfter = await nft.balanceOf(market.address, 1); //1

      // amount of NFTs in total before = amount of NFTS in total after (no NFTs are lost)
      assert.equal(
        creatorBalanceBefore //5
          .add(firstBuyerBalanceBefore) //0
          .add(secondBuyerBalanceMiddle) //0
          .add(contractBalanceBefore) //0
          .toString(),
        creatorBalanceAfter //1
          .add(firstBuyerBalanceAfter) //1
          .add(secondBuyerBalanceAfter) //2
          .add(contractBalanceAfter) //1
          .toString()
      );
      // After first buy
      assert.equal(creatorBalanceMiddle, 1);
      assert.equal(contractBalanceBefore, 0);
      assert.equal(contractBalanceMiddle, 0);
      assert.equal(firstBuyerBalanceMiddle, 4);
      assert.equal(secondBuyerBalanceMiddle, 0);
      assert.equal(listedAmountOriginalSellerMiddle, 0);

      // After second buy
      assert.equal(creatorBalanceAfter, 1);
      assert.equal(contractBalanceAfter, 1);
      assert.equal(firstBuyerBalanceAfter, 1);
      assert.equal(secondBuyerBalanceAfter, 2);
      assert.equal(listedAmountOriginalSellerAfter, 0);
      assert.equal(listedAmountSecondSellerAfter, 1);
    });

    it('cancel fails if not your listing', async () => {
      await market.createSimpleMarketItem(nft.address, 1, 100, 4, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      await expect(
        market.cancelSimpleListing(listingId, {
          from: user2
        })
      ).to.be.reverted;

      // await expect(
      //   market.cancelSimpleListing(listingId, {
      //     from: user2,
      //   })
      // ).to.be.revertedWith("Only owner can cancel");
    });

    it('cancel fails if trying to cancel an auction', async () => {
      await market.createSimpleMarketItem(nft.address, 1, 100, 4, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      await expect(
        market.cancelAuctionListing(listingId, {
          from: user1
        })
      ).to.be.reverted;
      // await expect(
      //   market.cancelAuctionListing(listingId, {
      //     from: user1,
      //   })
      // ).to.be.revertedWith("Can cancel only auctions");
    });

    it("can't list zero quantity", async () => {
      await expect(
        market.createSimpleMarketItem(nft.address, 1, 100, 0, {
          from: user1
        })
      ).to.be.reverted;
      // await expect(
      //   market.createSimpleMarketItem(nft.address, 1, 100, 0, {
      //     from: user1,
      //   })
      // ).to.be.revertedWith("Have to provide some quantity");
    });

    it('buy fails with nonexisting listing', async () => {
      await market.createSimpleMarketItem(nft.address, 1, 100, 4, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      // await expect(
      //   market.buySimple(listingId + 5, 4, { value: 403 })
      // ).to.be.reverted;
      await expect(market.buySimple(listingId + 5, 4, { value: 403 })).to.be
        .reverted;
    });

    it('buy fails with wrong value', async () => {
      await market.createSimpleMarketItem(nft.address, 1, 100, 4, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      await expect(market.buySimple(listingId, 4, { value: 403 })).to.be
        .reverted;

      await expect(market.buySimple(listingId, 4, { value: 405 })).to.be
        .reverted;

      // await expect(
      //   market.buySimple(listingId, 4, { value: 403 })
      // ).to.be.revertedWith(
      //   "Please submit the asking price in order to complete the purchase"
      // );

      // await expect(
      //   market.buySimple(listingId, 4, { value: 405 })
      // ).to.be.revertedWith(
      //   "Please submit the asking price in order to complete the purchase"
      // );
    });

    it('buy fails with wrong quantity', async () => {
      await market.createSimpleMarketItem(nft.address, 1, 100, 4, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      await expect(market.buySimple(listingId, 0, { value: 404 })).to.be
        .reverted;

      await expect(market.buySimple(listingId, 5, { value: 404 })).to.be
        .reverted;

      // await expect(
      //   market.buySimple(listingId, 0, { value: 404 })
      // ).to.be.revertedWith("Have to buy something");

      // await expect(
      //   market.buySimple(listingId, 5, { value: 404 })
      // ).to.be.revertedWith("Not enough items for sale");
    });

    it('relisting fails if previous listing exists', async () => {
      await market.createSimpleMarketItem(nft.address, 1, 100, 3, {
        from: user1
      });
      await expect(
        market.createSimpleMarketItem(nft.address, 1, 100, 1, {
          from: user1
        })
      ).to.be.reverted;
    });
  }
);

contract(
  'Market contract with simple market buy, with royalties',
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
      const royalty = 6;
      await nft.createToken('dummy', 5, royalty, { from: user1 });
      await market.createSimpleMarketItem(nft.address, 1, 100, 4, {
        from: user1
      });
      const listingId = await market.getLatestListItemId();

      const buyerBalanceBefore = new BN(await web3.eth.getBalance(user2));
      const sellerBalanceBefore = new BN(await web3.eth.getBalance(user1));

      await market.buySimple(listingId, 4, {
        value: 404,
        from: user2,
        gasPrice: 0
      });

      const buyerBalanceAfter = new BN(await web3.eth.getBalance(user2));
      const sellerBalanceAfter = new BN(await web3.eth.getBalance(user1));

      assert.equal(buyerBalanceBefore.sub(buyerBalanceAfter).toString(), 404);
      assert.equal(sellerBalanceAfter.sub(sellerBalanceBefore), 400);
    });

    it('second sale gives royalty correctly', async () => {
      const royalty = 6;
      await nft.createToken('dummy', 5, royalty, { from: user1 });

      await market.createSimpleMarketItem(nft.address, 1, 100, 3, {
        from: user1
      });
      let listingId = await market.getLatestListItemId();

      const creatorBalanceBefore = new BN(await web3.eth.getBalance(user1)); //1000
      const firstBuyerBalanceBefore = new BN(await web3.eth.getBalance(user2)); //500

      await market.buySimple(listingId, 3, {
        value: 303,
        from: user2,
        gasPrice: 0
      });

      const creatorBalanceMiddle = new BN(await web3.eth.getBalance(user1)); //1000+303-(0.03 comission to the market place) = 1300
      const firstBuyerBalanceMiddle = new BN(await web3.eth.getBalance(user2)); //197
      const secondBuyerBalanceMiddle = new BN(await web3.eth.getBalance(user3)); //800

      // Create second sale listing
      await market.createSimpleMarketItem(nft.address, 1, 200, 2, {
        from: user2,
        gasPrice: 0
      });
      listingId = await market.getLatestListItemId();

      await market.buySimple(listingId, 2, {
        value: 404,
        from: user3,
        gasPrice: 0
      });

      const creatorBalanceAfter = new BN(await web3.eth.getBalance(user1)); // 1300 + 24(400 * 0.06) = 1324
      const firstBuyerBalanceAfter = new BN(await web3.eth.getBalance(user2)); // 197 + (400 -24) = 573
      const secondBuyerBalanceAfter = new BN(await web3.eth.getBalance(user3)); //800 - 404 = 396

      assert.equal(firstBuyerBalanceMiddle.sub(firstBuyerBalanceBefore), -303);
      assert.equal(creatorBalanceMiddle.sub(creatorBalanceBefore), 300);
      assert.equal(
        firstBuyerBalanceAfter.sub(firstBuyerBalanceMiddle), // 573 - 197 = 376     376
        (400 * (100 - royalty)) / 100 // 376
      );
      assert.equal(secondBuyerBalanceAfter.sub(secondBuyerBalanceMiddle), -404); // 396 - 800
      assert.equal(
        creatorBalanceAfter.sub(creatorBalanceMiddle), // 1324 - 1300 = 24
        (400 * royalty) / 100 // royalty % from 400   // 24
      );
    });
  }
);
