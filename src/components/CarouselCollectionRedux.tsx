import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { getImage } from 'src/services/ipfs';

import { fetchHotCollections } from '../store/actions/thunks';
import * as selectors from '../store/selectors';
import { carouselCollection } from './constants';
import CustomSlide from './CustomSlide';

const CarouselCollectionRedux = () => {
  const dispatch = useDispatch();
  const hotCollectionsState = useSelector(selectors.hotCollectionsState);
  const hotCollections = hotCollectionsState.data
    ? hotCollectionsState.data
    : [];

  useEffect(() => {
    dispatch(fetchHotCollections());
  }, [dispatch]);

  return (
    <div className="nft">
      <Slider {...carouselCollection}>
        {hotCollections &&
          hotCollections.map((item, index) => (
            <CustomSlide
              key={index}
              index={index + 1}
              item={item}
              avatar={getImage(item.creator[0].profileImage)}
              banner={getImage(item.nftCollection[0].imageUrl)}
              username={item.creator[0].username}
              uniqueId={item.collectionId}
            />
          ))}
      </Slider>
    </div>
  );
};

export default memo(CarouselCollectionRedux);
