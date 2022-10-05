import NftItems from '../../../../components/nftItems/nftItems.style';
import ExploreCollectionRedux from './ExploreCollectionRedux';
import ExploreFilter from './ExploreFilter';

const ExploreCollections = () => {
  return (
    <>
      <section className="explore__Nft">
        <div className="container container-nospace">
          <h1 className="title">Explore Collections</h1>
          <div className="row">
            <div className="col-lg-12">
              <ExploreFilter />
            </div>
          </div>
          <NftItems>
            <div className="nft-general-style">
              <div className={`nft_items__holder`}>
                <ExploreCollectionRedux />
              </div>
            </div>
          </NftItems>
        </div>
      </section>
    </>
  );
};

export default ExploreCollections;
