/* eslint-disable react/jsx-no-bind */
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'src/components/components/Loader';
import { clearFilter, clearNfts } from 'src/store/actions';
import { setCurrentPage } from 'src/store/actions';
import * as actions from 'src/store/actions/thunks';
import { getCollections } from 'src/store/actions/thunks/collections';
import * as selectors from 'src/store/selectors';

import ExploreCollectionCard from './ExploreCollectionCard';

const ExploreCollectionRedux = () => {
  const dispatch = useDispatch();

  // const { nfts, currentPage, pageLimit, totalCount } = useSelector(
  //   selectors.nftItems
  // );
  const collectionList = useSelector(selectors.collectionsState).collections
    .data;

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
    dispatch(getCollections());
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

  // const loadMore = () => {
  //   dispatch(setCurrentPage(currentPage + 1));
  //   dispatch(actions.fetchListedNfts());
  // };

  return (
    <div className={`row`}>
      {collectionList?.map((collection, index) => (
        // eslint-disable-next-line react/jsx-no-bind
        <ExploreCollectionCard
          collection={collection}
          key={index}
          onImgLoad={onImgLoad}
          height={height}
          className={`col-lg-4`}
        />
      ))}
      <div className="col-md-12 text-center">
        <a
          href="#"
          className="explore-collection-btn btn-main btn-grad-outline"
        >
          Show more results
        </a>
      </div>
    </div>
  );
};

export default memo(ExploreCollectionRedux);
