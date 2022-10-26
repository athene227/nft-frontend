import styled from 'styled-components';

const ItemDetailWrapper = styled.div`
  .nft-detail-page {
    padding-top: 0;
    section.nft-detail-section {
      position: relative;
      padding: 0;
      margin: 0;
      background-color: ${({ theme }) => theme.colors.bodybg};
      background-image: url(${({ theme }) => theme.colors.bannerImage});
      background-repeat: no-repeat;
    }
    /* nft detail page */
    .item_info {
      padding-left: 60px;
      .item_detail_head {
        h2 {
          font-size: 40px;
          line-height: 48px;
        }
        p {
          font-size: 16px;
          line-height: 21px;
          font-weight: 500;
          margin-bottom: 0;
          color: rgba(255, 255, 255, 0.5);
          img {
            margin-left: 8px;
            margin-right: 5px;
            margin-top: -2px;
          }
          strong {
            font-weight: 700;
            font-size: 16px;
            line-height: 21px;
            color: #ffffff;
          }
        }
        margin-bottom: 25px;

        ul {
          display: flex;
          list-style: none;
          gap: 10px;
          padding-left: 0;
          li {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            /* Note: backdrop-filter has minimal browser support */
            font-size: 20px;
            line-height: 20px;
            color: #ffffff;
            border-radius: 30px;
            width: 40px;
            height: 40px;
            padding: 10px;
            text-align: center;
            a {
              color: inherit;
            }
          }
        }
      }
      .nft-information-list {
        /* identical to box height */
        ul {
          font-weight: 500;
          font-size: 16px;
          line-height: 21px;
          list-style: none;
          display: flex;
          padding-left: 0;
          li {
            border-right: 1px solid #838996;
            padding-left: 15px;
            padding-right: 15px;
            color: rgba(255, 255, 255, 0.5);
            &:first-of-type {
              padding-left: 40px;
              position: relative;
              img {
                position: absolute;
                left: 0;
                top: -7px;
              }
            }
            strong {
              color: #ffffff;
            }
            img {
              margin-right: 10px;
            }
            svg {
              margin-right: 10px;
            }
          }
        }
      }
      .item_detail_content {
        p {
          font-size: 16px;
          color: ${({ theme }) => theme.colors['text-light']};
          font-weight: 500;
          margin-bottom: 5px;
          strong {
            font-weight: 700;
            color: ${({ theme }) => theme.colors['text-light']};
          }
          &.item_detail_price {
            color: #00b2fe;
            font-size: 18px;
            margin-top: 20px;
            display: flex;
            i {
              background: linear-gradient(
                211.71deg,
                #00eaff 13.69%,
                #0080ff 32.04%,
                #8000ff 49.84%,
                #e619e6 68.2%,
                #ff0000 86.31%
              );
              padding: 7px;
              border-radius: 55%;
              font-size: 0;
              margin-right: 5px;
              // display: inline-block;
              img {
                max-width: 17px;
              }
            }
            strong {
              color: #00b2fe;
            }
          }
        }
        .author-details {
          margin-top: 30px;
        }
        .item_author {
          .author_list_pp {
            margin-left: 0;
          }
          .author_list_info {
            padding-top: 3px;
            padding-left: 60px;
            h6 {
              margin-bottom: 5px;
              color: ${({ theme }) => theme.colors['text-light']};
              font-size: 14px;
            }
            span {
              color: ${({ theme }) => theme.colors['text-light']};
            }
          }
        }
        .detail_properties {
          // margin-top: 30px;
          // margin-bottom: 30px;
          h6 {
            font-size: 16px;
            color: ${({ theme }) => theme.colors['text-light']};
          }
        }
        .de_tab {
          background: #0e193b;
          /* @include theme('themeLight', background, $white); */
          backdrop-filter: blur(50px);
          /* Note: backdrop-filter has minimal browser support */
          .de_tab_content {
            padding: 30px 20px;
          }
          border-radius: 0px 0px 5px 5px;
          .p_list {
            display: flex;
            align-items: center;
            .author_list_pp {
              position: relative;
              margin-left: 0;
              margin-top: 0;
            }
            .p_list_info {
              padding-left: 15px;
              b {
                color: ${({ theme }) => theme.colors['text-light']};
              }
            }
          }
          .de_nav {
            margin-bottom: 0;
            background: linear-gradient(
              90deg,
              rgba(244, 5, 201, 0.07) -1.88%,
              rgba(57, 147, 255, 0.07) 129.09%
            );
            border: 1px solid #282a53;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            /* @include theme('themeLight', border, 0px); */
            li {
              padding: 2px;
              span {
                margin-right: 0;
                font-size: 16px;
                font-weight: 700;
                padding: 15px 40px;
                color: ${({ theme }) => theme.colors['text-light']};
              }
              &.active {
                background: rgb(254, 0, 199);
                background: linear-gradient(
                  90deg,
                  rgba(254, 0, 199, 1) 0%,
                  rgba(9, 9, 121, 1) 100%,
                  rgba(0, 132, 254, 1) 100%
                );
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                span {
                  // background: linear-gradient(
                  //     90deg,
                  //     rgba(244, 5, 201, 0.07) -1.88%,
                  //     rgba(57, 147, 255, 0.07) 129.09%
                  // );
                  border-top-left-radius: 8px;
                  border-top-right-radius: 8px;
                  background: #192754;
                  color: ${({ theme }) => theme.colors['text-light']};
                  /* @include theme('themeLight', background, $white); */
                  opacity: 0.9;
                  /* @include theme('themeLight', opacity, 1); */
                  /* @include theme(
                      'themeLight',
                      box-shadow,
                      0px 0px 20px 5px #cacaca inset
                    ); */
                }
              }
            }
          }
        }
        .auction_endsin {
          // background: linear-gradient(90deg, rgba(244, 5, 201, 0.2) -1.88%, rgba(57, 147, 255, 0.2) 129.09%);
          background: #111f48;
          border-radius: 5px;
          max-width: 220px;
          margin: 0 auto;
          margin-right: 0;
          margin-top: 20px;
          margin-bottom: -25px;
          .de_countdown {
            background: none;
            font-size: 20px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 10px;
            // padding: 17px 30px;
            margin-left: 0;
            margin-bottom: 0;
            div {
              color: ${({ theme }) => theme.colors['text-light']}!important;
              background: none !important;
              padding-top: 5px;
              -webkit-text-fill-color: ${({ theme }) =>
                theme.colors['text-light']};
            }
            p {
              font-size: 13px;
              margin-bottom: 0;
              line-height: 2.5em;
            }
          }
        }
      }
    }
    .image_position {
      position: absolute;
      top: 0;
      left: 0;
    }
    .nft-detail {
      padding-top: 160px;
    }
    .nft-detail-image-preview {
      width: 500px;
      height: 350px;
      position: relative;
    }
    .nft-detail-wishlist {
      z-index: 2;
      position: absolute;
      top: 10px;
      left: 435px;
      cursor: pointer;
    }
    .nft-detail-image {
      z-index: 1;
      position: absolute;
      text-align: left;
    }
    .nft-bottom-detail {
      .nft-detail-description {
        margin-bottom: 29px;
        h3 {
          margin-top: 30px;
          font-weight: 700;
          font-size: 18px;
          line-height: 23px;
          letter-spacing: -0.02em;
          color: ${({ theme }) => theme.colors['text-light']};
          margin-bottom: 8px;
          text-align: left;
          opacity: 1;
        }
        p {
          font-weight: 400;
          font-size: 16px;
          line-height: 28px;
          color: ${({ theme }) => theme.colors['text-light']};
          text-align: left;
          margin-bottom: 0;
        }
      }
      .nft-detail-properties {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8.2928px;
        padding: 20px 25px;
        h3 {
          font-weight: 700;
          font-size: 24px;
          line-height: 31px;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0;
          opacity: 1;
          margin-bottom: 26px;
        }
        .attribute-fields-property {
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 38px;
          .attribute-field-property {
            min-width: 129px;
            border: solid;
            border-color: #1a96f8;
            border-radius: 10px;
          }
          .nft-attr-normal {
            background: linear-gradient(
              90deg,
              rgba(254, 0, 199, 0.3) 0%,
              rgba(0, 132, 254, 0.3) 100%
            );
            padding: 15px 20px 8px;
            min-width: 75px;
            width: 100%;
            .nft-attr-name {
              font-size: 13px;
              line-height: 17px;
              text-transform: uppercase;
              margin-bottom: 11px;
              font-weight: 500;
            }
            .nft-attr-value {
              font-size: 22px;
              line-height: 29px;
              font-weight: 500;
            }
          }
          margin-bottom: 40px;
        }
        .attribute-field-stat {
          margin-bottom: 27px;
          background: linear-gradient(
            90deg,
            rgba(254, 0, 199, 0.3) 0%,
            rgba(0, 132, 254, 0.3) 100%
          );
          border-width: 2px;
          border-style: solid;
          border-color: rgb(26, 150, 248);
          border-image: initial;
          border-radius: 10px;
          padding: 7px 10px 10px;
          &:last-of-type {
            margin-bottom: 15px;
          }
        }
        margin-bottom: 45px;
      }
      .nft-detail-select {
        margin-bottom: 10px;
        .form-control-select {
          .MuiSelect-select {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
        }
      }
      .nft-detail-table {
        position: relative;
        &:before {
          opacity: 0.1;
          border: 1px solid #ffffff;
          height: 1px;
          width: 100%;
        }
      }
      ul {
        display: flex;
        padding: 0;
        list-style: none;
        li {
          font-size: 16px;
          margin-right: 25px;
          a {
            color: ${({ theme }) => theme.colors['text-light']};
            text-decoration: none;
            display: flex;
            i {
              margin-right: 8px;
              margin-top: -2px;
              img {
                width: 20px;
              }
            }
            span {
              border-bottom: 1px solid
                ${({ theme }) => theme.colors['text-light']};
            }
          }
        }
      }
    }
  }
`;
const NftPurchaseCard = styled.div`
  margin-top: 30px;
  background: linear-gradient(
    90deg,
    rgba(244, 5, 201, 0.3) -1.88%,
    rgba(57, 147, 255, 0.3) 129.09%
  );
  backdrop-filter: blur(12px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 10px;
  .nft-card-header {
    padding: 16px 24px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.05);
    p {
      margin-bottom: 0;
      svg {
        color: #ffffff;
        margin-right: 8px;
      }
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
  .nft-card-content {
    padding: 20px 24px;
    h4 {
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      /* identical to box height */

      letter-spacing: -0.02em;

      color: #ffffff;

      opacity: 0.5;
      margin-bottom: 4px;
    }
    h2 {
      font-weight: 700;
      font-size: 32px;
      line-height: 42px;
      /* identical to box height */
      color: #ffffff;
      svg {
        margin-right: 13px;
        color: #ffffff;
        margin-top: -5px;
        path {
          opacity: 1;
        }
      }
      small {
        font-size: 16px;
        line-height: 20px;
        color: rgba(255, 255, 255, 0.5);
        font-weight: 700;
      }
    }
    button {
      padding: 15px 27px;
      min-width: 142px;
    }
  }
  .nft-card-footer {
    padding: 16px 24px;
    background: linear-gradient(
      90deg,
      rgba(244, 5, 201, 0.3) -1.88%,
      rgba(57, 147, 255, 0.3) 129.09%
    );
    backdrop-filter: blur(12px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 0px 0px 10px 10px;
    p {
      margin-bottom: 0;
      font-weight: 400;
      font-size: 18px;
      line-height: 23px;
      color: rgba(255, 255, 255, 0.5);
      span {
        color: #ffffff;
        svg {
          width: 18px;
          margin-top: -2px;
          margin-left: 10px;
          path {
            opacity: 1;
          }
        }
      }
      small {
        font-size: 12px;
        line-height: 15px;
        font-weight: 400;
      }
    }
    span {
      font-weight: 400;
      font-size: 18px;
      line-height: 23px;
      display: inline-block;
      color: rgba(255, 255, 255, 0.5);
      em {
        background: #ffffff;
        border-radius: 10px;
        width: 30px;
        height: 20px;
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: -0.03em;
        color: #06132d;
        display: inline-block;
        text-align: center;
        padding: 3px 3px 2.5px;
      }
    }
  }
`;
const NftOfferTableWrapper = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8.2928px;
  margin-top: 33px;
  padding: 25px 20px;
  .table-header {
    margin-bottom: 11px;
  }
  h2 {
    font-weight: 700;
    font-size: 24px;
    line-height: 31px;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin-bottom: 0;
  }
  .title-image {
    img,
    canvas {
      margin-top: -6px;
      margin-right: 10px;
    }
    .title-image-details {
      text-align: left;
      h3 {
        font-weight: 500;
        font-size: 16px;
        line-height: 12px;
        margin-top: 3px;
        /* identical to box height, or 75% */

        text-align: left;
        letter-spacing: -0.02em;

        color: #ffffff;
        margin-bottom: 7px;
        svg {
          width: 11px;
          height: 11px;
          path {
            opacity: 1;
          }
        }
      }
      p {
        font-weight: 500;
        font-size: 11px;
        line-height: 14px;
        letter-spacing: -0.02em;
        margin-bottom: 0;
        width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .QB-dataTable .ag-header-viewport .ag-header-cell {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    /* identical to box height */

    letter-spacing: -0.02em;

    color: #ffffff;

    opacity: 0.6;
  }
  .QB-dataTable .ag-center-cols-viewport .ag-cell-value {
    font-weight: 500;
    font-size: 16px;
    line-height: 12px;
    /* identical to box height, or 75% */

    text-align: right;
    letter-spacing: -0.02em;

    color: #ffffff;
    padding: 6px 8px;
    p {
      margin-bottom: 0;
    }
  }
  .QB-dataTable .ag-row-even,
  .QB-dataTable .ag-row-odd,
  .QB-dataTable .ag-row {
    border-bottom-color: rgba(255, 255, 255, 0.1);
    background-color: transparent;
    background: transparent;
  }
  .btn-main {
    padding: 8px 18px;
  }
  .btn-end {
    padding-top: 15px;
    padding-bottom: 15px;
    margin-top: 32px;
  }
`;
const NftDetailTableWrapper = styled.div`
  padding-top: 30px;
  margin-bottom: 42px;
  h2 {
    font-weight: 700;
    font-size: 24px;
    line-height: 31px;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin-bottom: 0;
  }
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 0;
  }
  .price-with-icon {
    p {
      margin-bottom: 0%;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      /* identical to box height */

      letter-spacing: 0.01em;

      color: #ffffff;
      svg {
        width: 17px;
        path {
          opacity: 1;
        }
      }
    }
    span {
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      /* identical to box height */

      letter-spacing: 0.02em;

      color: #ffffff;

      opacity: 0.3;
    }
  }
  .QB-dataTable .ag-center-cols-viewport .ag-cell-wrapper {
    min-height: 80px !important;
    border-bottom: 0px !important;
  }
  .QB-dataTable .ag-center-cols-viewport {
    border-radius: 12px;
  }
  .text-gradient {
    margin-bottom: 0;
  }
  .QB-dataTable .ag-header-viewport {
    border-bottom: 0px !important;
  }
  .QB-dataTable .ag-header-viewport .ag-header-cell:first-of-type,
  .QB-dataTable
    .ag-center-cols-viewport
    .ag-cell:first-of-type
    .ag-cell-wrapper
    .ag-cell-value {
    padding-left: 30px !important;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  .QB-dataTable .ag-header-viewport .ag-header-cell:last-of-type,
  .QB-dataTable
    .ag-center-cols-viewport
    .ag-cell:last-of-type
    .ag-cell-wrapper
    .ag-cell-value {
    padding-right: 30px !important;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  .QB-dataTable .ag-row-even,
  .QB-dataTable .ag-row-odd,
  .QB-dataTable .ag-row {
    border-bottom-color: rgba(0, 0, 0, 0.1);
    /* box-shadow: 0px 0px 15px #000000; */
    border-radius: 12px;
    border-bottom: 5px solid rgba(0, 0, 0, 0.5) !important;
    border-top: 5px solid rgba(0, 0, 0, 0.5);
  }
  .QB-dataTable .ag-row:first-of-type {
    border-top: 0px;
  }
`;
const NftHistoryChartWrapper = styled.div`
  padding: 25px 29px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8.2928px;
  margin-top: 12px;
  h2 {
    font-weight: 700;
    font-size: 24px;
    line-height: 31px;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin-bottom: 0;
  }
  .history-chart-header {
    margin-bottom: 25px;
    p {
      margin-left: 12px;
      padding-left: 12px;
      margin-right: 55px;
      margin-bottom: 0;
      border-left: 1px solid rgba(255, 255, 255, 0.18);
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      letter-spacing: -0.02em;
      color: rgba(255, 255, 255, 0.6);
      span {
        font-weight: 700;
        color: #ffffff;
      }
    }
    .sorting-select {
    }
  }
`;
const NftDetailCollectionWrapper = styled.div`
  background: #13214a;
  padding: 32px 0;

  /*
  .slick-slide{
  
  } */
  .nft {
    .slick-prev,
    .slick-next {
      background-color: #ffffff;
      &:before {
        background-color: #ffffff;
        color: #06132d;
      }
    }
  }
  h2 {
    font-weight: 700;
    font-size: 40px;
    line-height: 50px;
    color: #ffffff;
    text-align: center;
    margin-bottom: 36px;
  }
  .slick-list {
    margin-left: -20px;
    margin-right: -20px;
  }
  .nft__collection_main {
    padding-left: 20px;
    padding-right: 20px;
  }
  .nft_collection_item {
    background: linear-gradient(
      90deg,
      rgba(244, 5, 201, 0.07) -1.88%,
      rgba(57, 147, 255, 0.07) 129.09%
    );
    box-shadow: 0.46px 0.92px 10px rgba(255, 255, 255, 0.2);
    border-radius: 15.4608px;
    padding: 10px;
    .nft_collection_image {
      margin-bottom: 10px;
      position: relative;
      .de_countdown {
      }
      .de_countdown {
        position: absolute;
        font-family: 'Neulis Alt';
        bottom: 15px;
        left: 18px;
        right: auto;
        background-color: white;
        justify-content: center;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.01em;
        font-weight: 700;
        padding: 6px 18px;
        box-shadow: 0px 7.44368px 14.8874px rgba(0, 2, 88, 0.5);
        background: rgba(255, 255, 255, 0.7);
        border: 1px solid #ffffff;
        backdrop-filter: blur(15px);
        border-radius: 7px;
        > div {
          justify-content: center;
        }
      }
      img {
        border-radius: 14.8874px;
        min-height: 237px;
        max-height: 237px;
        width: 100%;
        /* object-fit: cover; */
        object-fit: cover;
      }
    }
    .nft_collection_details {
      .nft_collection_info {
        margin-bottom: 18px;
        h3 {
          font-weight: 700;
          font-size: 20px;
          line-height: 25px;
          letter-spacing: 0.01em;
          color: #ffffff;
          margin-bottom: 0;
          font-family: 'Neulis Alt';
          text-transform: capitalize;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          white-space: nowrap;
        }
        p {
          font-weight: 700;
          font-size: 12px;
          line-height: 16px;
          color: #6670a6;
          margin-bottom: 0;
          display: flex;
          align-items: center;
          img {
            height: 13px;
            border-radius: 55px;
            margin-right: 3px;
          }
        }
      }
      .nft_collection_price {
        h4 {
          font-weight: 700;
          font-size: 14px;
          line-height: 18px;
          letter-spacing: 0.01em;
          color: #ffffff;
          margin-bottom: 7px;
        }
        p {
          font-family: 'Neulis Alt';
          font-weight: 700;
          font-size: 24px;
          line-height: 29px;
          letter-spacing: 0.01em;
          color: #00b2fe;
          display: flex;
          align-items: center;
          margin-bottom: 0;
          span {
            overflow: hidden;
            text-overflow: ellipsis;
            width: 85%;
            padding-right: 2px;
          }
          svg {
            margin-right: 7px;
            height: 22px;
            width: 22px;
            path {
              opacity: 1;
            }
          }
        }
        .nft_price_left {
          width: 50%;
        }
        .nft_price_right {
          button {
            min-width: 114px;
            padding: 7px 4px;
            border-radius: 6.36628px;
          }
        }
      }
    }
  }
  .MuiContainer-root {
    max-width: 1320px;
  }
  &.collection-detail-wrapper {
    background: transparent;
    padding: 0;
    .nft_collection_item {
      min-width: 210px;
    }
    .MuiContainer-root {
      max-width: 100%;
      padding-left: 0;
      padding-right: 0;
    }
  }
`;
export {
  ItemDetailWrapper,
  NftDetailCollectionWrapper,
  NftDetailTableWrapper,
  NftHistoryChartWrapper,
  NftOfferTableWrapper,
  NftPurchaseCard
};
