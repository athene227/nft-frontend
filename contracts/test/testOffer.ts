import { ethers, network, waffle } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import { assert, expect } from 'chai';
import '@nomiclabs/hardhat-waffle';
import {
  MockERC20,
  NFT721,
  NFT1155,
  NFTMarketOffers,
  NFT1155__factory
} from '../typechain/pulse';
import { deployMockContract } from 'ethereum-waffle';

const dummyDeadline = 9000000000;

describe('Offer', async () => {
  let offers: NFTMarketOffers,
    nft721: NFT721,
    nft1155: NFT1155,
    erc20: MockERC20,
    anotherErc20: MockERC20;
  let deployer: SignerWithAddress,
    user2: SignerWithAddress,
    userWithNFT: SignerWithAddress,
    userWithTokens: SignerWithAddress;

  beforeEach(async function () {
    const accounts = await ethers.getSigners();
    deployer = accounts[0];
    user2 = accounts[1];
    userWithNFT = accounts[2];
    userWithTokens = accounts[3];

    const Offers = await ethers.getContractFactory('NFTMarketOffers');
    const Erc20 = await ethers.getContractFactory('MockERC20');

    erc20 = (await Erc20.connect(userWithTokens).deploy()) as MockERC20;
    anotherErc20 = (await Erc20.connect(userWithTokens).deploy()) as MockERC20;
    offers = (await Offers.connect(deployer).deploy([
      erc20.address
    ])) as NFTMarketOffers;

    await erc20.connect(userWithTokens).freeMint(1000);
    await erc20.connect(userWithTokens).approve(offers.address, 600);
  });

  describe('Creating an offer', async () => {
    // Creating an offer doesn't check what the NFT type is, so this is common for both types
    beforeEach(async function () {
      const NFT721 = await ethers.getContractFactory('NFT721');
      nft721 = (await NFT721.connect(deployer).deploy(
        offers.address
      )) as NFT721;
      await nft721.connect(userWithNFT).createToken('dummy', 0);
      await nft721.connect(userWithNFT).setApprovalForAll(offers.address, true);
    });

    it('should create a correct offer item', async () => {
      await offers
        .connect(userWithTokens)
        .offerOnNft(nft721.address, 1, erc20.address, 5, dummyDeadline);

      const offer = await offers.offers(1);

      expect(offer.offerer).to.equal(userWithTokens.address);
      expect(offer.nftContract).to.equal(nft721.address);
      expect(offer.tokenId).to.equal(1);
      expect(offer.erc20Address).to.equal(erc20.address);
      expect(offer.amount).to.equal(5);
      expect(offer.deadline).to.equal(dummyDeadline);
    });

    it('should emit the correct events', async () => {
      await expect(
        offers
          .connect(userWithTokens)
          .offerOnNft(nft721.address, 1, erc20.address, 5, dummyDeadline)
      )
        .to.emit(offers, 'OfferCreated')
        .withArgs(1);
    });

    it('should fail if paused', async () => {
      await offers.connect(deployer).pause();
      await expect(
        offers
          .connect(userWithTokens)
          .offerOnNft(nft721.address, 1, erc20.address, 5, dummyDeadline)
      ).to.be.revertedWith('Pausable: paused');
    });

    it('should fail if not enough allowance', async () => {
      await expect(
        offers
          .connect(userWithTokens)
          .offerOnNft(nft721.address, 1, erc20.address, 700, dummyDeadline)
      ).to.be.revertedWith('Not enough allowance');
    });

    describe('Invalid parameters', async () => {
      // TODO: add tests when multiple erc20 are whitelisted

      it('should fail if incorrect price token', async () => {
        await expect(
          offers
            .connect(userWithTokens)
            .offerOnNft(
              nft721.address,
              1,
              anotherErc20.address,
              500,
              dummyDeadline
            )
        ).to.be.revertedWith('Invalid price token');
      });

      it('should fail if the deadline is incorrect', async () => {
        await expect(
          offers
            .connect(userWithTokens)
            .offerOnNft(nft721.address, 1, erc20.address, 5, 1)
        ).to.be.revertedWith('Deadline must be in the future');
      });

      it('should fail if the amount is zero', async () => {
        await expect(
          offers
            .connect(userWithTokens)
            .offerOnNft(nft721.address, 1, erc20.address, 0, dummyDeadline)
        ).to.be.revertedWith('Must offer something');
      });
    });
  });

  describe('Accepting a 721 offer', async () => {
    beforeEach(async function () {
      const NFT721 = await ethers.getContractFactory('NFT721');
      nft721 = (await NFT721.connect(deployer).deploy(
        offers.address
      )) as NFT721;
      await nft721.connect(userWithNFT).createToken('dummy', 0);
      await nft721.connect(userWithNFT).setApprovalForAll(offers.address, true);

      const deadline = await getTimestamp();

      await offers
        .connect(userWithTokens)
        .offerOnNft(nft721.address, 1, erc20.address, 505, deadline + 5000);
    });

    it('should work', async () => {
      await offers.connect(userWithNFT).acceptOffer(1);
    });

    it('should transfer ERC20 asset', async () => {
      const marketERC20AllowanceBefore = await erc20.allowance(
        userWithTokens.address,
        offers.address
      );

      const tx = offers.connect(userWithNFT).acceptOffer(1);

      await expect(() => tx).to.changeTokenBalances(
        erc20,
        [userWithTokens, userWithNFT, deployer],
        [-505, 500, 5]
      );

      const marketERC20AllowanceAfter = await erc20.allowance(
        userWithTokens.address,
        offers.address
      );

      expect(
        marketERC20AllowanceAfter.sub(marketERC20AllowanceBefore)
      ).to.equal(-505);
    });

    it('should transfer NFT asset', async () => {
      const ownerBefore = await nft721.ownerOf(1);
      await offers.connect(userWithNFT).acceptOffer(1);
      const ownerAfter = await nft721.ownerOf(1);

      expect(ownerBefore).to.equal(userWithNFT.address);
      expect(ownerAfter).to.equal(userWithTokens.address);
    });

    it('should emit the correct events', async () => {
      await expect(offers.connect(userWithNFT).acceptOffer(1))
        .to.emit(offers, 'OfferAccepted')
        .withArgs(1);
    });

    it('should fail if paused', async () => {
      await offers.connect(deployer).pause();
      await expect(
        offers.connect(userWithNFT).acceptOffer(1)
      ).to.be.revertedWith('Pausable: paused');
    });

    it('should fail if no such offer', async () => {
      await expect(
        offers.connect(userWithNFT).acceptOffer(2)
      ).to.be.revertedWith('No offer found');
    });

    it('should fail if not enough erc20 approval', async () => {
      // remove approval
      await erc20.connect(userWithTokens).approve(offers.address, 4);
      await expect(
        offers.connect(userWithNFT).acceptOffer(1)
      ).to.be.revertedWith('Not enough allowance');
    });

    it('should fail if no NFT approval', async () => {
      // remove approval
      await nft721
        .connect(userWithNFT)
        .setApprovalForAll(offers.address, false);
      await expect(
        offers.connect(userWithNFT).acceptOffer(1)
      ).to.be.revertedWith('ERC721: caller is not token owner nor approved');
    });

    it('should fail if deadline has passed', async () => {
      await nextDay();
      await expect(
        offers.connect(userWithTokens).acceptOffer(1)
      ).to.be.revertedWith('The offer has expired');
    });

    it('should fail if not owner', async () => {
      await expect(
        offers.connect(userWithTokens).acceptOffer(1)
      ).to.be.revertedWith('Only owner can accept offer');
    });

    it('should fail if not a supported NFT Type', async () => {
      const mockContract = await deployMockContract(
        userWithNFT,
        NFT1155__factory.abi
      );
      await mockContract.mock.supportsInterface.returns(false);

      await offers
        .connect(userWithTokens)
        .offerOnNft(mockContract.address, 1, erc20.address, 5, dummyDeadline);

      await expect(
        offers.connect(userWithNFT).acceptOffer(2)
      ).to.be.revertedWith('Not supported');
    });
  });

  describe('Accepting a 1155 offer', async () => {
    beforeEach(async function () {
      const NFT1155 = await ethers.getContractFactory('NFT1155');
      nft1155 = (await NFT1155.connect(deployer).deploy(
        offers.address
      )) as NFT1155;
      await nft1155.connect(userWithNFT).createToken('dummy', 5, 0);
      await nft1155
        .connect(userWithNFT)
        .setApprovalForAll(offers.address, true);

      await offers
        .connect(userWithTokens)
        .offerOnNft(nft1155.address, 1, erc20.address, 505, dummyDeadline);
    });

    it('should work', async () => {
      await offers.connect(userWithNFT).acceptOffer(1);
    });

    it('should transfer ERC20 asset', async () => {
      const marketERC20AllowanceBefore = await erc20.allowance(
        userWithTokens.address,
        offers.address
      );

      const tx = offers.connect(userWithNFT).acceptOffer(1);

      await expect(() => tx).to.changeTokenBalances(
        erc20,
        [userWithTokens, userWithNFT, deployer],
        [-505, 500, 5]
      );

      const marketERC20AllowanceAfter = await erc20.allowance(
        userWithTokens.address,
        offers.address
      );

      expect(
        marketERC20AllowanceAfter.sub(marketERC20AllowanceBefore)
      ).to.equal(-505);
    });

    it('should transfer NFT asset', async () => {
      const sellerBalanceBefore = await nft1155.balanceOf(
        userWithNFT.address,
        1
      );
      const buyerBalanceBefore = await nft1155.balanceOf(
        userWithTokens.address,
        1
      );

      await offers.connect(userWithNFT).acceptOffer(1);
      const sellerBalanceAfter = await nft1155.balanceOf(
        userWithNFT.address,
        1
      );
      const buyerBalanceAfter = await nft1155.balanceOf(
        userWithTokens.address,
        1
      );

      expect(sellerBalanceAfter.sub(sellerBalanceBefore)).to.equal(-1);
      expect(buyerBalanceAfter.sub(buyerBalanceBefore)).to.equal(1);
    });

    it('should fail if no such offer', async () => {
      await expect(
        offers.connect(userWithNFT).acceptOffer(2)
      ).to.be.revertedWith('No offer found');
    });

    it('should fail if not enough erc20 approval', async () => {
      // remove approval
      await erc20.connect(userWithTokens).approve(offers.address, 4);
      await expect(
        offers.connect(userWithNFT).acceptOffer(1)
      ).to.be.revertedWith('Not enough allowance');
    });

    it('should fail if no NFT approval', async () => {
      // remove approval
      await nft1155
        .connect(userWithNFT)
        .setApprovalForAll(offers.address, false);
      await expect(
        offers.connect(userWithNFT).acceptOffer(1)
      ).to.be.revertedWith('ERC1155: caller is not token owner nor approved');
    });

    it('should fail if not owner', async () => {
      await expect(
        offers.connect(userWithTokens).acceptOffer(1)
      ).to.be.revertedWith('Not enough balance');
    });
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