// This file is used for measuring certain gas costs. Enable when needed.

import { ethers, network, waffle } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import { assert, expect } from 'chai';
import { NFT721, NFT1155, MockERC20 } from '../typechain/pulse';
import '@nomiclabs/hardhat-waffle';

const dummyDeadline = 9000000000;

xdescribe('Estimating gas costs', async () => {
  /*   let market: MockMarket, nft721: NFT721, nft1155: NFT1155, erc20: MockERC20; */
  let user1: SignerWithAddress,
    user2: SignerWithAddress,
    deployer: SignerWithAddress,
    userWith721NFT: SignerWithAddress,
    userWith1155NFT: SignerWithAddress,
    userWith20Token: SignerWithAddress;

  const erc20AllowanceAmount = 10000000;
  const erc20MintAmount = 10000000000;

  beforeEach(async function () {
    const accounts = await ethers.getSigners();
    user1 = accounts[0];
    user2 = accounts[1];
    deployer = accounts[2];
    userWith721NFT = accounts[3];
    userWith1155NFT = accounts[4];
    userWith20Token = accounts[5];
    /* 
    const Market = await ethers.getContractFactory('MockMarket');
    const NFT1155 = await ethers.getContractFactory('NFT1155');
    const NFT721 = await ethers.getContractFactory('NFT721');
    const Erc20 = await ethers.getContractFactory('MockERC20');

    erc20 = (await Erc20.connect(userWith20Token).deploy({
      gasPrice: 0
    })) as MockERC20;
    market = (await Market.connect(deployer).deploy([erc20.address], {
      gasPrice: 0
    })) as MockMarket;

    nft721 = (await NFT721.connect(deployer).deploy(, {
      gasPrice: 0
    })) as NFT721;
    await nft721
      .connect(userWith721NFT)
      .createToken('dummy', 0, { gasPrice: 0 });
    await nft721
      .connect(userWith721NFT)
      .setApprovalForAll(market.address, true, { gasPrice: 0 });

    await erc20
      .connect(userWith20Token)
      .freeMint(erc20MintAmount, { gasPrice: 0 });
    await erc20
      .connect(userWith20Token)
      .approve(market.address, erc20AllowanceAmount, { gasPrice: 0 }); */
  });

  xdescribe('of finding the best bid', async () => {
    /* beforeEach(async function () {
      await market
        .connect(userWith721NFT)
        .createAuctionMarketItem(
          nft721.address,
          1,
          erc20.address,
          100,
          (await getTimestamp()) + 5000,
          { gasPrice: 0 }
        );

      await erc20.connect(user1).freeMint(erc20MintAmount, { gasPrice: 0 });
      await erc20
        .connect(user1)
        .approve(market.address, erc20MintAmount, { gasPrice: 0 });

      await erc20.connect(user2).freeMint(erc20MintAmount, { gasPrice: 0 });
      await erc20
        .connect(user2)
        .approve(market.address, erc20MintAmount, { gasPrice: 0 });
    });

    it('some', async () => {
      const listingId = await market.getLatestListItemId();

      await market.connect(user1).bid(listingId, 12, { gasPrice: 0 });
      await market.connect(userWith20Token).bid(listingId, 10, { gasPrice: 0 });
      await market.connect(user2).bid(listingId, 11, { gasPrice: 0 });
      await market.connect(user2).bid(listingId, 13, { gasPrice: 0 });

      for (let i = 0; i < 1000; i++) {
        await market.connect(user1).bid(listingId, 13 + i, { gasPrice: 0 });
      }

            const bids = await market.getAuctionBids(listingId, { gasPrice: 0 });
      console.log('starting to get bids', bids.length);
      const best = await market.forceNonRead_getBestBid(bids, erc20.address); 

      await nextDay();
      await market.terminateAuction(listingId);
    });*/
  });
});

const getTimestamp = async () => {
  const block = await ethers.provider.getBlock('latest');
  return block.timestamp;
};

const nextDay = async () => {
  const oneDay = 24 * 60 * 60;
  await network.provider.send('evm_increaseTime', [oneDay]);
  await network.provider.send('evm_mine');
};
