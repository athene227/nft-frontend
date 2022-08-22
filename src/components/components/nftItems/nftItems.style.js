import styled from 'styled-components';

const NftItems = styled.div`
  .nft-general-style {
    .nft_items__holder {
      .nft {
        .custom_col {
          @media screen and (min-width: 1200px) {
            width: 20%;
            max-width: 20%;
            .nft__item {
              margin: 0;
              padding-left: 10px;
              padding-right: 10px;
            }
          }
          @media screen and (max-width: 1199px) {
            padding: 0;
            margin-bottom: 0 !important;
          }
        }
        .nft__item {
          .nft_item__top_image {
            width: 30px;
            height: 30px;
          }

          @media only screen and (max-width: 1200px) {
            padding: 10px 10px 20px;
          }

          .de_countdown__bg_white {
            background-color: white;
            border: none;
            position: absolute;
            top: 62%;
            left: 10px;

            width: 75%;
            color: black;
            right: 0;
            margin: 0 auto;
          }

          .nft__item__name_hover {
            border-bottom: 1px solid transparent;
            width: 130px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &:hover {
              border-bottom: 1px solid;
            }
          }

          .img_hover {
            cursor: pointer;
            transition: transform 0.2s;

            &:hover {
              transform: scale(1.2);
            }
          }

          .nft__item_price {
            bottom: 10px;
            position: absolute;
            right: 10px;
            color: $item__price_color;
            font-size: 12px;

            img {
              width: 18px;
              height: 18px;
              vertical-align: middle;
            }

            @media only screen and (max-width: 1200px) {
              font-size: 12px;
            }

            img {
              display: inline-block;
              vertical-align: middle;
            }
          }

          background: ${({ theme }) => theme.colors.new__item_bg};
          border: 0.829279px solid
            ${({ theme }) => theme.colors.item__border_color};
          box-shadow: 8.2928px 16.5856px 16.5856px
            ${({ theme }) => theme.colors.box_shadow};
          backdrop-filter: blur(193.17px);

          /* Note: backdrop-filter has minimal browser support */

          border-radius: 8.2928px;

          .nft__item_wrap {
            img {
              width: 200px;
              height: 200px;
              border-radius: 3.08748px;
              object-fit: cover;
              cursor: pointer;
            }
          }

          .re_pulse_bottom {
            width: 30px;
            height: 30px;

            img {
              width: 30px;
              height: 30px;
            }
          }

          .pulse_bottom {
            width: 30px;
            height: 30px;
            top: -30px;
            right: 0;

            img {
              width: 30px;
              height: 30px;
            }
          }

          .btn_grad_custom {
            color: white;
            border-radius: 5px;
            font-size: 11px;
            padding: 0 10px;
            bottom: 5px;
            position: absolute;
            left: 20px;

            span {
              color: white;
            }
          }

          .action_row_custom {
            position: inherit;
            bottom: 0px;
          }

          .icon_margin {
            margin-left: 5px;
          }
        }
      }
      .news-item-main {
        padding-top: 110px;
      }
    }
    &.section-new-items {
      .nft__item {
        &.nft-item-custom {
          &:hover {
            .nft-item-customcontent {
              margin: -20px;
              padding: 20px;
            }
          }
        }
      }
      .slick-dots li {
        margin: 0;
      }
    }
  }
`;
export default NftItems;
