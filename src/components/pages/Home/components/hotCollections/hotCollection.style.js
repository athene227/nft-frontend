import styled from 'styled-components';

const HotCollectionWrapper = styled.div`
  .section-hot-collections {
    .hot_selection {
      .nft__item_price {
        color: #00b2fe;
      }

      .nft_coll__holder {
        background: #131437;
        border: 1px solid #282a53;
        box-shadow: 17.9588px 26.9383px 26.9383px rgba(4, 15, 37, 0.15);
        backdrop-filter: blur(173.455px);
        border-radius: 8.97942px;

        .nft_wrap__holder {
          img {
            margin: 20px auto 0;
            border-top-left-radius: 8.97942px;
            border-top-right-radius: 8.97942px;
          }
        }
      }

      .nft_col_content_holder {
        background: rgba(0, 0, 0, 0.1);
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
    .themeLight & {
      .hot-collection-col {
        background: ${({ theme }) => theme.colors['white']};
        box-shadow: 10px 10px 20px #dbe6fd;
        border-color: ${({ theme }) => theme.colors['white']};
      }
      .hot-collection-content {
        background: rgba(${({ theme }) => theme.colors['white']}, 0.5);
        backdrop-filter: blur(20px);
        .nft__item_price_sec {
          margin-right: 10px;
        }
      }
    }
  }
`;
export default HotCollectionWrapper;
