import React from 'react';

const Wallet = () => (
  <div className="row ">
    <div className="col-lg-3 mb30 text-center">
      <span className="box-url">
        <img src="./img/sellnfts/setwallet.svg" alt="" className="mb20" />
        <h4>Set Up Your Wallet</h4>
        <p>
          Once you’ve set up your wallet of choice, connect it to OpenSea by
          clicking the wallet icon in the top right corner. Learn about the
          wallets we support.
        </p>
      </span>
    </div>

    <div className="col-lg-3 mb30 text-center">
      <span className="box-url">
        <img
          src="./img/sellnfts/createcollection.svg"
          alt=""
          className="mb20"
        />
        <h4>Create Your Collection</h4>
        <p>
          Click My Collections and set up your collection. Add social links, a
          description, profile & banner images, and set a secondary sales fee.
          <br></br>
          <br></br>
        </p>
      </span>
    </div>

    <div className="col-lg-3 mb30 text-center">
      <span className="box-url">
        <img src="./img/sellnfts/addnft.svg" alt="" className="mb20" />
        <h4>Add Your NFTs</h4>
        <p>
          Upload your work (image, video, audio, or 3D art), add a title and
          description, and customize your NFTs with properties, stats, and
          unlockable content.
        </p>
      </span>
    </div>

    <div className="col-lg-3 mb30 text-center">
      <span className="box-url">
        <img src="./img/sellnfts/listsale.svg" alt="" className="mb20" />
        <h4>List Them For Sale</h4>
        <p>
          Choose between auctions, fixed-price listings, and declining-price
          listings. You choose how you want to sell your NFTs, and we help you
          sell them!
        </p>
      </span>
    </div>
  </div>
);
export default Wallet;
