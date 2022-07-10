import React from 'react';

import NewItemsRedux from './NewItemsRedux';

const NewItems = () => {
  return (
    <section className="container news-item-main section-new-items nft-general-style">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="style-2">
            New Items <img src="./img/marketing.svg" alt=""></img>
          </h2>
        </div>
      </div>
      <div className={`nft_items__holder`}>
        <NewItemsRedux />
      </div>
    </section>
  );
};

export default NewItems;
