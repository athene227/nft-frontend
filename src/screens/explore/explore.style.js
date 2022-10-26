import styled from 'styled-components';

const ExploreWrapper = styled.div`
  .explore__Nft {
    background-color: ${({ theme }) => theme.colors.bodybg};
    background-image: url(${({ theme }) => theme.colors.bannerImage});
    padding-top: 128px;
    background-size: contain;
    background-repeat: no-repeat !important;
    .title {
      font-size: 48px;
      line-height: 60px;
      font-weight: 600;
      font-family: 'Neulis Alt';
      letter-spacing: 0.01em;
      padding-bottom: 48px;
      margin-bottom: 0;
      text-align: center;
      @media screen and (max-width: 641px) {
        font-size: 32px;
      }
    }
    .testingg {
      float: right;
    }
    .explore-filtermain {
      margin-bottom: 0;
      ul {
        gap: 9px;
        list-style: none;
        margin-bottom: 0;
        padding-left: 0;
        li {
          padding: 10px;
          font-weight: 400;
          font-size: 15px;
          line-height: 21px;
          letter-spacing: 0.01em;
          color: #ffffff;
          &.active {
            background: linear-gradient(
              90deg,
              rgba(244, 5, 201, 0.2) -1.88%,
              rgba(57, 147, 255, 0.2) 129.09%
            );
          }
          backdrop-filter: blur(12px);
          border-radius: 10px;
        }
      }
    }
    .explore-collection-card {
      filter: drop-shadow(0.46px 0.92px 10px rgba(255, 255, 255, 0.3));
      border-radius: 15px;
      margin-bottom: 29px;
      .explore-collection-image {
        position: relative;
        cursor: pointer;
        .nft__collection_image {
          img {
            width: 434px;
            /* width:100%; */
            height: 362px;
            /* height:100%; */
            object-fit: cover;
            transition: 0.3s all ease-in;
          }
        }
        .nft__collection_details {
          background: linear-gradient(
            180deg,
            rgba(40, 37, 101, 0) 10.65%,
            #1f2156 79.6%
          );
          position: absolute;
          bottom: 0;
          border-radius: 8.2928px;
          width: 100%;
          padding: 19px 12px;
          padding-top: 150px;
          gap: 28px;
          .collection-user-image {
            span {
              background: #06132d;
              border: 2px solid #0084fe;
              border-radius: 5px;
              display: block;
              position: relative;
              width: 54px;
              height: 54px;
              & > img {
                max-width: 100%;
                height: auto;
              }
              i {
                position: absolute;
                bottom: -9px;
                right: -14px;
              }
            }
          }
          ul {
            display: flex;
            align-items: center;
            list-style: none;
            padding-left: 0;
            margin-bottom: 0;
            li {
              padding-left: 22px;
              padding-right: 22px;
              font-weight: 500;
              font-size: 16px;
              line-height: 21px;
              /* identical to box height */
              text-align: center;
              border-right: 1px solid #ffffff;

              color: #ffffff;
              img {
                margin-right: 12px;
              }
              small {
                font-weight: 400;
                font-size: 12px;
                line-height: 16px;
                margin-left: 12px;
                /* identical to box height */

                text-align: center;

                color: #ffffff;

                opacity: 0.8;
              }
              &:first-of-type {
                padding-left: 0;
              }
              &:last-of-type {
                padding-right: 0;
                border-right: 0;
              }
            }
          }
          h4 {
            margin-bottom: 0;
          }
        }
      }
      &:hover {
        .explore-collection-image {
          .nft__collection_image {
            img {
              transform: scale(1.1);
              transition: 0.3s all ease-in;
            }
          }
        }
      }
    }
    .explore-collection-btn {
      text-decoration: none;
      display: inline-block;
      margin-top: 50px;
    }
  }
`;
export default ExploreWrapper;
