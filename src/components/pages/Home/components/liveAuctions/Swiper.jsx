// Import Swiper styles
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
// import "swiper/modules/effect/effect-coverflow.scss";
import 'swiper/modules/pagination/pagination.scss';

import React, { useEffect } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { BsArrowLeft } from 'react-icons/bs';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
// import required modules
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

import { fetchHotAuctions } from '../../../../../store/actions/thunks';
import * as selectors from '../../../../../store/selectors';
import LiveAuctionItem from './LiveAuctionItem';

const nfts = [
  {
    author: './img/eth.png',
    image: './img/auctions/pic5.jpg',
    title: 'Art Crypto',
    price: '0.25',
    user: '@cryptoage'
  },
  {
    author: './img/eth.png',
    image: './img/auctions/pic4.svg',
    title: 'Art Crypto',
    price: '0.25',
    user: '@cryptoage'
  },

  {
    author: './img/eth.png',
    image: './img/auctions/pic6.png',
    title: 'Art Crypto',
    price: '0.25',
    user: '@cryptoage'
  },
  {
    author: './img/eth.png',
    image: './img/auctions/pic7.png',
    title: 'Art Crypto',
    price: '0.25',
    user: '@cryptoage'
  },
  {
    author: './img/eth.png',
    image: './img/auctions/pic8.png',
    title: 'Art Crypto',
    price: '0.25',
    user: '@cryptoage'
  }
];

export default function Swiperr() {
  const dispatch = useDispatch();
  const hotAuctionState = useSelector(selectors.hotAuctionState);
  const hotAuctions = hotAuctionState.data ? hotAuctionState.data : [];

  useEffect(() => {
    dispatch(fetchHotAuctions());
  }, [dispatch]);
  console.log(
    '🚀 ~ file: Swiper.jsx ~ line 70 ~ Swiperr ~ hotAuctions',
    hotAuctions
  );
  return (
    <div>
      <div className="swiper-button-prev-unique swiper-arrow-btn ">
        <svg
          width="57"
          height="57"
          viewBox="0 0 57 57"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            r="27.75"
            transform="matrix(-1 0 0 1 28.5 28.6636)"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path
            d="M34.3948 40.4531L22.6053 28.6636L34.3948 16.8741"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="col">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          loop={true}
          centeredSlides={true}
          slidesPerView={1}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          // navigation={true}
          breakpoints={{
            641: {
              slidesPerView: 1,
              spaceBetween: 0,
              depth: 0,
              stretch: 0,
              modifier: 0
            },
            768: {
              slidesPerView: 1,
              stretch: 0,
              spaceBetween: 20,
              depth: 0
            },
            1199: {
              slidesPerView: 3,
              spaceBetween: 50
            }
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 35,
            spaceBetween: 20,
            depth: 120,
            modifier: 2,
            slideShadows: true,
            scale: 1
          }}
          // pagination={true}
          navigation={{
            nextEl: '.swiper-button-next-unique',
            prevEl: '.swiper-button-prev-unique'
          }}
          modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
          className="mySwiper"
        >
          {hotAuctions &&
            hotAuctions.map((hotAuction, index) => {
              return (
                <SwiperSlide key={index}>
                  <LiveAuctionItem hotAuction={hotAuction} />
                </SwiperSlide>
              );
            })}
        </Swiper>

        <div className="swiper-arrow-btn swiper-button-next-unique">
          <svg
            width="57"
            height="57"
            viewBox="0 0 57 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="28.5"
              cy="28.6636"
              r="27.75"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M22.6052 40.4531L34.3947 28.6636L22.6052 16.8741"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
