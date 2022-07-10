import React from 'react';

import Swiper from './Swiper';

const LiveAuctions = () => {
  return (
    <section className="no-top section-live-auction">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="style-2">
              Live Auctions <img src="./img/stopwatch.svg" alt=""></img>
            </h2>
          </div>
        </div>
      </div>
      <div className="container no-top">
        <div className="row">
          <div className="col-lg-12 px-0">
            <Swiper />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveAuctions;
