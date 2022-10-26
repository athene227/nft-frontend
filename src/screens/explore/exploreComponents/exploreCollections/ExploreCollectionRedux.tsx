/* eslint-disable react/jsx-no-bind */
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'src/components/Loader';
import { clearCollections, clearFilter } from 'src/store/actions';
import { setCollectionCurrentPage } from 'src/store/actions';
import { getListedCollections } from 'src/store/actions/thunks/collections';
import * as selectors from 'src/store/selectors';

import ExploreCollectionCard from './ExploreCollectionCard';

const ExploreCollectionRedux = () => {
  const dispatch = useDispatch();

  const { collections, currentPage, pageLimit, totalCount } = useSelector(
    selectors.collectionsState
  );

  const { categories } = useSelector(selectors.nftFilter);

  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    const currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  useEffect(() => {
    dispatch(getListedCollections());
  }, [dispatch, categories.length]);

  //will run when component unmounted
  useEffect(() => {
    return () => {
      dispatch(clearFilter());
      dispatch(clearCollections());
    };
  }, [dispatch]);

  const loadMore = () => {
    dispatch(setCollectionCurrentPage(currentPage + 1));
    dispatch(getListedCollections());
  };

  return (
    <div className={`row`}>
      {collections?.data?.map((collection, index) => (
        // eslint-disable-next-line react/jsx-no-bind
        <ExploreCollectionCard
          collection={collection}
          key={index}
          onImgLoad={onImgLoad}
          height={height}
          className={`col-lg-4`}
        />
      ))}
      {collections?.loading && (
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

export default memo(ExploreCollectionRedux);
