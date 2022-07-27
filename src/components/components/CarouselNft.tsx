import React, { useState } from 'react';
import Slider from 'react-slick';
import { carouselNft } from './constants';
import { INft } from 'src/types/nfts.types';
import NftCard from './NftCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CarouselNftProps {
  data: INft[];
}

const CarouselNft = (props: CarouselNftProps) => {
  const { data } = props;
  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }: any) => {
    const currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  return (
    <Slider {...carouselNft}>
      {[0, 1, 2].map((item) =>
        data?.map((item, index) => (
          <NftCard
            key={index}
            nft={item}
            className="carousel-nft-item"
            onImgLoad={onImgLoad}
            height={height}
          />
        ))
      )}
    </Slider>
  );
};

export default CarouselNft;
