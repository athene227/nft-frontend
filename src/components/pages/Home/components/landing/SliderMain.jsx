import React from 'react';
import Reveal from 'react-awesome-reveal';
import BanrLayer from './bannerLayer';
import { keyframes } from '@emotion/react';
import BorderImage from './BorderImage';
import banrLayer from './bannerLayer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { sliderSettings } from './sliderSettings';

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const data = [
  {
    image: './img/main-sub-img1.png',
    alt: ''
  },
  {
    image: './img/main-sub-img2.png',
    alt: ''
  },
  {
    image: './img/main-sub-img1.png',
    alt: ''
  },
  {
    image: './img/main-sub-img2.png',
    alt: ''
  }
];

const SliderMain = () => (
  <div className="container">
    <BanrLayer />
    <div className="h_500 d-flex align-items-center flex-wrap">
      <div className="col-12 col-sm-4">
        <div className="spacer-single"></div>
        {/* <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
          <h6 className=""><span className="text-uppercase color">NFTonPulse</span></h6>
        </Reveal> */}
        <div className="spacer-10"></div>
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={300}
          duration={600}
          triggerOnce
        >
          <h1 className="">Dive Into The World of NFTs</h1>
        </Reveal>
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={600}
          duration={600}
          triggerOnce
        >
          <p className=" lead pr-5">
            NFTonPulse is the most popular and trusted NFT marketplace platform
            for buying and selling NFTs
          </p>
        </Reveal>
        <div className="spacer-single"></div>
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={800}
          duration={900}
          triggerOnce
        >
          <span className="btn-main lead btn-grad">Explore</span>
          <div className="mb-sm-30"></div>
        </Reveal>
      </div>

      <div className="col-12 col-sm-5 xs-hide justify-content-end text-right">
        <Reveal
          className="onStep"
          keyframes={fadeIn}
          delay={900}
          duration={1500}
          triggerOnce
        >
          <BorderImage
            image={'./img/main-img.png'}
            alt=""
            dimension={'500px'}
          />
        </Reveal>
      </div>

      <div className="max_width_21 col-12 sol-sm-2 d-flex flex-column justify-content-between h-100">
        <Reveal
          className="onStep"
          keyframes={fadeIn}
          delay={900}
          duration={1500}
          triggerOnce
        >
          <Slider {...sliderSettings}>
            {data.map((item, index) => (
              <BorderImage
                key={index}
                image={item.image}
                alt={item.alt}
                dimension={'240px'}
              />
            ))}
          </Slider>
        </Reveal>
        <div className="spacer-20"></div>
        <Reveal
          className="onStep"
          keyframes={fadeIn}
          delay={900}
          duration={1500}
          triggerOnce
        >
          <Slider {...sliderSettings}>
            {data.map((item, index) => (
              <BorderImage
                key={index}
                image={item.image}
                alt={item.alt}
                dimension={'240px'}
              />
            ))}
          </Slider>
        </Reveal>
      </div>
    </div>
  </div>
);
export default SliderMain;
