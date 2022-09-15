import styled from 'styled-components';

const HotCollectionWrapper = styled.div`
  .section-hot-collections {
    .hot_selection {
      .nft__item_price {
        color: #00B2FE;
      }
      .nft__item_price_sec {
        margin-right: 10px;
      }

      .nft_coll__holder {
        background: ${({ theme }) => theme.colors['hot-collection-bg']};
        border-color: ${({ theme }) => theme.colors['item__border_color']};
        box-shadow: ${({ theme }) => theme.colors['hot-collection-bx']};
        backdrop-filter: blur(173.455px);
        border-radius: 8.97942px;
        padding-bottom: 0;

        .nft_wrap__holder {
          img {
            margin: 20px auto 0;
            border-top-left-radius: 8.97942px;
            border-top-right-radius: 8.97942px;
          }
        }
      }

      .nft_col_content_holder {
        background: ${({ theme }) => theme.colors['hot-collection-contentbg']};
        backdrop-filter: blur(62.8559px);
        border-radius: 8.97942px;
        min-height: 180px;

        .nft__item_price_sec {
          font-size: 16px;
          color: #00b2fe;
        }

        .nft_coll_info {
          padding-top: 55px;

          span {
            font-size: 16px;
            color: ${({ theme }) => theme.colors['text-btn-light']};
            opacity: 0.5;
            padding-top: 15px;
            display: block;
          }

          h4 {
            font-size: 20px;
            color: ${({ theme }) => theme.colors['text-btn-light']};
          }
        }

        .nft_coll_pp {
          width: 80px;

          i {
            bottom: -18px;
            right: 0;
          }

          .nft__item_author_img {
            width: 80px;
            height: 80px;
            top: -50px;
            position: absolute;
            border: 5px solid rgba(255, 255, 255, 0.15);
          }
        }
      }
    }
    .image_position {
      width: 30px !important;
      height: 30px !important;
    }
  }
`;
export default HotCollectionWrapper;
