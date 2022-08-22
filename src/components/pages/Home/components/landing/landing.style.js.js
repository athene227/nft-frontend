import styled from 'styled-components';

const HomeSlider = styled.div`
  .home-banner {
    .h_500 {
      // height: 500px;
    }
    .max_width_21 {
      max-width: 21%;
      @media screen and (max-width: 767px) {
        &.banner-small-slider {
          max-width: 50%;
          padding-top: 60px;
          .banner-small-carousel {
            // float:left;
            // width: 50%;
          }
          .banner-carousel2 {
            display: none;
          }
        }
      }
      @media screen and (max-width: 573px) {
        &.banner-small-slider {
          max-width: 100%;
          padding-top: 40px;
        }
      }

      @media all and (max-width: 576px) {
        max-width: 100%;
        margin-top: 2rem;
      }
    }

    .image_position {
      position: absolute;
      top: 0;
      left: 0;
    }
    .border_image {
      width: 100%;
      height: auto;
      position: relative;
      border: 7px solid rgba(${({ theme }) => theme.colors.white}, 0.1);
      border-radius: 10px;

      @media all and (max-width: 576px) {
        max-width: 100% !important;
      }
    }
    @media screen and (max-width: 573px) {
      h1 {
        font-size: 35px;
      }
      p.lead {
        padding-right: 0 !important;
      }
    }
  }
`;
export default HomeSlider;
