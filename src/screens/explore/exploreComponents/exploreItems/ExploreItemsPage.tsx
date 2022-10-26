import NftItems from 'src/components/nftItems/nftItems.style';

import ExploreFilter from './ExploreFilter';
import ExploreItems from './ExploreItems';

const ExploreItemsPage = () => {
  return (
    <>
      <section className="explore__Nft">
        <div className="container container-nospace">
          <h1 className="title">Explore NFTs</h1>
          <div className="row">
            <div className="col-lg-12">
              <ExploreFilter />
            </div>
          </div>
          <NftItems>
            <div className="nft-general-style">
              <div className={`nft_items__holder`}>
                <ExploreItems />
              </div>
            </div>
          </NftItems>
        </div>
      </section>
    </>
  );
};

export default ExploreItemsPage;
