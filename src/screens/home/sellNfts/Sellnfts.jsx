import React from 'react';
import Wallet from './Wallet';

const Sellnfts = () => {
  return (
    <section className="container no-top">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="style-2">
            Create and Sell Your NFTs{' '}
            <img src="./img/sellnfts/dollar-symbol.svg" alt=""></img>
          </h2>
        </div>
      </div>
      <div className="container no-top">
        <div className="row">
          <div className="col-lg-12 px-0">
            <Wallet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sellnfts;
