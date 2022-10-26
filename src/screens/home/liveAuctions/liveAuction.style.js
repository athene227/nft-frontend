import styled from 'styled-components';

const LiveAuctionWrapper = styled.div`
  .section-live-auction {
    background-image: url(${({ theme }) => theme.colors.liveAuctionbgs});
    background-size: 150% 110%;
    background-repeat: no-repeat;
    background-position: center center;
    .swiper-wrapper {
      margin-left: -12px;
      @media screen and (max-width: 641px) {
        margin-left: 0;
      }
    }
    .live_item {
      .nft__item_preview {
        width: 360px;
        height: 360px;
        @media screen and (max-width: 641px) {
          width: 100%;
          min-height: 220px;
          max-height: 220px;
        }
      }

      .stats {
        position: absolute;
        bottom: 0%;
        z-index: 0;
        width: 90%;
        margin: 2%;
        background: ${({ theme }) => theme.colors['stats-bg']};
        backdrop-filter: blur(50px);
        border-radius: 10px;

        .stats_heading {
          font-size: 25px;
          font-weight: 700;
          color: white;
        }

        .stats_info {
          font-size: 14px;
          color: ${({ theme }) => theme.colors.white};
          margin-bottom: 0;
        }

        .stats_price {
          color: ${({ theme }) => theme.colors['color_primary']};
          font-size: 16px;
          font-weight: 900;
          @media only screen and (max-width: 641px) {
            font-size: 12px;
          }
        }

        .stats_timer {
          color: white;
          font-size: 15px;
          font-weight: 700;
          @media only screen and (max-width: 641px) {
            font-size: 11px;
          }
        }
      }
      .nft-outer {
        @media screen and (max-width: 641px) {
          height: auto;
        }
      }
    }

    .live_bg_col {
      background: ${({ theme }) => theme.colors['live-bg-color']};
      border-radius: 20px;
      width: 400px;
      height: 620px;
      @media screen and (max-width: 768px) {
        margin: 0 auto;
      }
      box-shadow: 20px 30px 30px
        ${({ theme }) => theme.colors['live-bg-shadow']};
      backdrop-filter: blur(193.17px);
      /* Note: backdrop-filter has minimal browser support */

      border-radius: 10px;
      padding: 10px 20px 30px;
      @media only screen and (max-width: 641px) {
        width: 100%;
        height: auto;
      }
    }
    .swiper-slide-active.swiper-slide {
      .live_bg_col {
        background: ${({ theme }) => theme.colors['live-bg-color']};
      }
    }
    .icon_font {
      font-size: 20px;
    }

    .author_list_dimensions {
      width: 30px;
      height: 30px;
    }
    .nft__item_info {
      @media screen and (max-width: 641px) {
        height: auto;
      }
      .nft__item_action {
        @media screen and (max-width: 641px) {
          position: static;
        }
      }
      .author_list_pp {
        margin-left: 0;
      }
      .nft__item_price img {
        width: 18px;
        height: 18px;
      }
    }
    .author_icon_custom {
      margin-left: -14px;
    }
  }
  // Live Auctions Swiper Global Styles

  .swiper-slide {
    // backdrop-filter: blur(10px);
    /* filter: blur(2px); */
  }

  .swiper-slide-next {
    // backdrop-filter: blur(5px);
    /* filter: blur(1px); */
  }

  .swiper-slide-prev {
    // backdrop-filter: blur(5px);
    /* filter: blur(2px); */
  }

  .swiper-slide-active {
    // backdrop-filter: blur(0px);
    filter: none;
  }

  .swiper-button-prev {
    color: ${({ theme }) => theme.colors.gray}!important;
  }

  .swiper-button-next {
    color: ${({ theme }) => theme.colors['gray']}!important;
  }

  .swiper-pagination-bullet-active {
    background: ${({ theme }) => theme.colors['color_primary']}!important;
  }

  .swiper-pagination {
    position: relative !important;
  }

  .swiper-pagination-bullet {
    background: ${({ theme }) => theme.colors.gray}!important;
  }

  .swiper-button-next-unique {
    z-index: 10;
    position: absolute;
    top: 45%;
    font-size: 30px;
    color: #fff;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    &:hover {
      color: ${({ theme }) => theme.colors['color_primary']};
    }
    right: -1%;
  }

  .swiper-button-prev-unique {
    z-index: 10;
    position: absolute;
    top: 45%;
    font-size: 30px;
    color: #fff;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    &:hover {
      color: ${({ theme }) => theme.colors['color_primary']};
    }
    left: -1%;
  }
`;
export default LiveAuctionWrapper;
