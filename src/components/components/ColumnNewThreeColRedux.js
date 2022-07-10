/* eslint-disable react/jsx-no-bind */
import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NftCard from './NftCard';
import Loader from './Loader';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions/thunks';
import { clearNfts, clearFilter } from '../../store/actions';
import { setCurrentPage } from '../../store/actions';

const ColumnNewThreeColRedux = () => {
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
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  useEffect(() => {
    dispatch(actions.fetchListedNfts(false));
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
    <div className="row">
      {nfts?.data?.map((nft, index) => (
        // eslint-disable-next-line react/jsx-no-bind
        <NftCard
          nft={nft}
          key={index}
          onImgLoad={onImgLoad}
          height={height}
          className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4"
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
          <span onClick={loadMore} className="btn-main lead m-auto">
            Load More
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(ColumnNewThreeColRedux);
