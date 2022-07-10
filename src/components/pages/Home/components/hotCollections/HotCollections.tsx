import React from 'react';

import HotCollectionRedux from './HotCollectionRedux';

const HotCollections = () => {
  return (
    <section className="container no-top section-hot-collections">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="style-2">
            Hot Collections <img src="./img/fire.svg" alt=""></img>
          </h2>
        </div>
      </div>
      <div className="container no-top">
        <div className="row">
          <div className="col-lg-12 px-0">
            <div className={`hot_selection hot_selection`}>
              {' '}
              <HotCollectionRedux />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
