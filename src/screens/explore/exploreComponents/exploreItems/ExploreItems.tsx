/* eslint-disable react/jsx-no-bind */
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'src/components/Loader';
import { clearFilter, clearNfts } from 'src/store/actions';
import { setCurrentPage } from 'src/store/actions';
import * as actions from 'src/store/actions/thunks';
import * as selectors from 'src/store/selectors';

import ExploreItemCard from './ExploreItemCard';

const ExploreItems = () => {
  const dispatch = useDispatch();

  const { nfts, currentPage, pageLimit, totalCount } = useSelector(
    selectors.nftItems
  );
  const { categories, status, price, collections } = useSelector(
    selectors.nftFilter
  );
  const sortOrder = useSelector(selectors.nftSorter);

  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    const currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  useEffect(() => {
    dispatch(actions.fetchListedNfts());
  }, [
    dispatch,
    categories.length,
    status.length,
    price,
    collections.length,
    sortOrder
  ]);

  //will run when component unmounted
  useEffect(() => {
    return () => {
      dispatch(clearFilter());
      dispatch(clearNfts());
    };
  }, [dispatch]);

  const loadMore = () => {
    dispatch(setCurrentPage(currentPage + 1));
    dispatch(actions.fetchListedNfts());
  };

  return (
    <div className={`nft m-0 row`}>
      {nfts?.data?.map((nft, index) => (
        // eslint-disable-next-line react/jsx-no-bind
        <ExploreItemCard
          nft={nft}
          key={index}
          onImgLoad={onImgLoad}
          height={height}
          className={`itm d-item col-lg-3 col-md-4 col-sm-6 col-xs-12 col mb-4 mb-4 custom_col`}
        />
      ))}
      {nfts?.loading && (
        <div className="col-sm-12 text-center">
          <Loader />
        </div>
      )}
      {(currentPage + 1) * pageLimit < totalCount && totalCount && (
        <div className="col-lg-12">
          <div className="spacer-single"></div>
          <span
            onClick={loadMore}
            className="btn-main btn-grad-outline lead m-auto"
          >
            Load More
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(ExploreItems);
