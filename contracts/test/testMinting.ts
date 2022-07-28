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

describe('Minting', async () => {
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
  });

  describe('sets correct royalty', async () => {
    // Creating an offer doesn't check what the NFT type is, so this is common for both types
    beforeEach(async function () {
      const NFT721 = await ethers.getContractFactory('NFT721');
      nft721 = (await NFT721.connect(deployer).deploy()) as NFT721;

      const NFT1155 = await ethers.getContractFactory('NFT1155');
      nft1155 = (await NFT1155.connect(deployer).deploy()) as NFT1155;
    });

    it('721 - empty royalty', async () => {
      await nft721.connect(userWithNFT).createToken('dummy', 0);

      const [receiver, royalty] = await nft721.royaltyInfo(1, 1000);
      expect(receiver).to.equal(ethers.constants.AddressZero);
      expect(royalty).to.equal(0);
    });

    it('721 - non-empty royalty', async () => {
      await nft721.connect(userWithNFT).createToken('dummy', 987);

      const [receiver, royalty] = await nft721.royaltyInfo(1, 1000);
      expect(receiver).to.equal(userWithNFT.address);
      expect(royalty).to.equal(98);
    });

    it('721 - royalty for further tokens', async () => {
      await nft721.connect(userWithNFT).createToken('dummy', 987);
      await nft721.connect(user2).createToken('dummy', 0);
      await nft721.connect(user2).createToken('dummy', 543);

      const [receiver1, royalty1] = await nft721.royaltyInfo(1, 1000);
      expect(receiver1).to.equal(userWithNFT.address);
      expect(royalty1).to.equal(98);

      const [receiver2, royalty2] = await nft721.royaltyInfo(2, 1000);
      expect(receiver2).to.equal(ethers.constants.AddressZero);
      expect(royalty2).to.equal(0);

      const [receiver3, royalty3] = await nft721.royaltyInfo(3, 1000);
      expect(receiver3).to.equal(user2.address);
      expect(royalty3).to.equal(54);
    });

    it('721 - fails with too big royalty', async () => {
      await expect(
        nft721.connect(userWithNFT).createToken('dummy', 10001)
      ).to.be.revertedWith('ERC2981: royalty fee will exceed salePrice');
    });

    it('1155 - empty royalty', async () => {
      await nft1155.connect(userWithNFT).createToken('dummy', 1, 0);

      const [receiver, royalty] = await nft1155.royaltyInfo(1, 1000);
      expect(receiver).to.equal(ethers.constants.AddressZero);
      expect(royalty).to.equal(0);
    });

    it('1155 - non-empty royalty', async () => {
      await nft1155.connect(userWithNFT).createToken('dummy', 1, 987);

      const [receiver, royalty] = await nft1155.royaltyInfo(1, 1000);
      expect(receiver).to.equal(userWithNFT.address);
      expect(royalty).to.equal(98);
    });

    it('1155 - non-empty royalty for multiple tokens', async () => {
      await nft1155.connect(userWithNFT).createToken('dummy', 5, 987);

      const [receiver, royalty] = await nft1155.royaltyInfo(1, 1000);
      expect(receiver).to.equal(userWithNFT.address);
      expect(royalty).to.equal(98);
    });

    it('1155 - royalty for further tokens', async () => {
      await nft1155.connect(userWithNFT).createToken('dummy', 1, 987);
      await nft1155.connect(user2).createToken('dummy', 1, 0);
      await nft1155.connect(user2).createToken('dummy', 1, 543);

      const [receiver1, royalty1] = await nft1155.royaltyInfo(1, 1000);
      expect(receiver1).to.equal(userWithNFT.address);
      expect(royalty1).to.equal(98);

      const [receiver2, royalty2] = await nft1155.royaltyInfo(2, 1000);
      expect(receiver2).to.equal(ethers.constants.AddressZero);
      expect(royalty2).to.equal(0);

      const [receiver3, royalty3] = await nft1155.royaltyInfo(3, 1000);
      expect(receiver3).to.equal(user2.address);
      expect(royalty3).to.equal(54);
    });
  });
});
