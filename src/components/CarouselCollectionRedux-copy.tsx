import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { ICollection } from 'src/types/collections.types';

import { fetchHotCollections } from '../store/actions/thunks';
import * as selectors from '../store/selectors';
import { carouselCollection } from './constants';
import CustomSlide from './CustomSlide';

const CarouselCollectionRedux = ({ data = [] }: { data: ICollection[] }) => {
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
        {data.map((item, index) => (
          <CustomSlide
            key={index}
            index={index + 1}
            avatar={item.avatar}
            banner={item.banner}
            username={item.username}
            uniqueId={item.unique_id}
          />
        ))}
      </Slider>
    </div>
  );
};

export default memo(CarouselCollectionRedux);
