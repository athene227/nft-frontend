import React from 'react';
import NftItems from 'src/components/nftItems/nftItems.style';

import NewItemsRedux from './NewItemsRedux';

const NewItems = () => {
  return (
    <NftItems>
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
    </NftItems>
  );
};

export default NewItems;
