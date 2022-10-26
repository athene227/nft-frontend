import React from 'react';

const BanrLayer = () => {
  return (
    <div className="bannerLayer image_position">
      <svg
        width="1015"
        height="479"
        viewBox="0 0 1015 479"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_219_2408)">
          <ellipse
            cx="507.462"
            cy="-45.1756"
            rx="109.109"
            ry="190.518"
            transform="rotate(-38.8361 507.462 -45.1756)"
            fill="#F268EA"
          />
          <path
            d="M592.063 -113.284C625.01 -72.3587 645.321 -27.6786 651.545 11.4582C657.772 50.6108 649.891 84.1043 626.622 102.838C603.352 121.571 568.948 122.119 532.028 107.677C495.122 93.2402 455.809 63.8574 422.862 22.9325C389.915 -17.9924 369.604 -62.6725 363.379 -101.809C357.153 -140.962 365.034 -174.455 388.303 -193.189C411.573 -211.922 445.977 -212.47 482.897 -198.028C519.803 -183.591 559.116 -154.209 592.063 -113.284Z"
            stroke="black"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_219_2408"
            x="0.832275"
            y="-568.631"
            width="1013.26"
            height="1046.91"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="180"
              result="effect1_foregroundBlur_219_2408"
            />
          </filter>
        </defs>
      </svg>
    </div>
    /* <img
          src="./img/ellipse-primary.svg"
          alt=""
          className="image_position"}
        /> */
  );
};

export default BanrLayer;
