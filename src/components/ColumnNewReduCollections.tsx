import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ICollection } from 'src/types/collections.types';

import * as actions from '../store/actions/thunks';
import CollectionCard from './CollectionCard';
import NftItems from './nftItems/nftItems.style';

interface IProps {
  collections: ICollection[];
  showLoadMore: boolean;
  shuffle: boolean;
}
//react functional component
const ColumnNewRedux = ({
  collections = [],
  showLoadMore = true,
  shuffle = false
}: IProps) => {
  const dispatch = useDispatch();
  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    const currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  const loadMore = () => {
    dispatch(actions.fetchListedNfts());
  };

  return (
    <NftItems>
      <div className="nft-general-style ">
        <div className="nft_items__holder">
          <div className="nft row">
            {collections &&
              collections.map((collection, index) => (
                <CollectionCard
                  collection={collection}
                  key={index}
                  onImgLoad={onImgLoad}
                  height={height}
                  clockTop
                />
              ))}
            {showLoadMore && collections.length <= 20 && (
              <div className="col-lg-12">
                <div className="spacer-single"></div>
                <span onClick={loadMore} className="btn-main lead m-auto">
                  Load More
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </NftItems>
  );
};

export default memo(ColumnNewRedux);
