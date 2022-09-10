import styled from 'styled-components';

import progressBg from '../../../assets/images/progress-bg.png';
import tabImgbg from '../../../assets/images/tab-img-bg.png';
import tabImgbghover from '../../../assets/images/tab-img-bg-hover.png';

const CreateSingleWrapper = styled.div`
  /*** create 2 ***/
  font-family: 'DM Sans';
  .section-single-head {
    padding-bottom: 50px;
  }
  .create-single-head {
    font-size: 48px;
    line-height: 60px;
    font-weight: 600;
    font-family: 'Neulis Alt';
    letter-spacing: 0.01em;
    margin-bottom: 0;
    @media screen and (max-width: 641px) {
      font-size: 32px;
    }
  }
  
  .add-attr-popup {
    max-width: 550px;

    .attr-type-container {
      cursor: pointer;
      border-radius: 10px;
      padding: 10px;
      text-align: left;
      margin-bottom: 20px;
      border: ${({ theme }) => theme.colors['input-holder-border']};
      background: ${({ theme }) => theme.colors['nft-attr-bg']};

      &:hover {
        border: 1px solid rgb(21, 178, 229);
      }

      .nft-attr-normal {
        margin: auto;
        width: 100%;
        border-radius: 0px;
        background: ${({ theme }) => theme.colors['nft-attr-bg2']};
        box-shadow: ${({ theme }) => theme.colors['nft-attr-bx']};
      }
      .nft-attr-bsnumber,
      .nft-attr-bspercent {
        margin: auto;
        width: 100%;
        border-radius: 0px;
        background: ${({ theme }) => theme.colors['nft-attr-bg2']};
        box-shadow: ${({ theme }) => theme.colors['nft-attr-bx']};
        .boost-label-wrapper {
          width: 70%;
        }
        .nft-attr-name {
          color: #00b2eb;
        }

        .nft-attr-value {
          color: ${({ theme }) => theme.colors['text-light']};
        }
      }

      .nft-attr-ranking {
        max-width: 100%;
        padding: 10px;
        padding-top: 0;
        border-radius: 0px;
        background: ${({ theme }) => theme.colors['nft-attr-bg2']};
        box-shadow: ${({ theme }) => theme.colors['nft-attr-bx']};
        .nft-attr-name {
          color: ${({ theme }) => theme.colors['text-light']};
        }
        .nft-attr-value {
          color: #747474;
        }
      }

      .form-label {
        margin-left: 5px;
        font-size: 18px;
        color: ${({ theme }) => theme.colors['text-light']};
      }
    }
  }
  .de_tab.tab_methods {
    .de_nav {
      text-align: left;

      li {
        margin: 0 30px 0 0;

        span {
          background: ${({ theme }) => theme.colors['tab-bg']};
          padding: 1px;
          border-bottom-right-radius: 50px;
          strong {
            border: 1px solid #282a53;
            backdrop-filter: blur(40px);
            background: ${({ theme }) => theme.colors['tab-bg2']};
            box-shadow: ${({ theme }) => theme.colors['tab-bx']};
            border-bottom-right-radius: 50px;
            background-size: 100% 100%;
            padding: 35px 10px;
            font-size: 20px;
            line-height: 20px;
            text-align: center;
            display: table-cell;
            vertical-align: middle;
            border: none;
            min-width: 140px;
            color: ${({ theme }) => theme.colors['tab-color']};
            font-weight: 500;
            width: 200px;
            height: 200px;
            position: relative;
          }

          i {
            // display: block;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            width: 80px;
            height: 80px;
            background-image: url(${tabImgbg});
            /* background-image: url("../images/tab-img-bg.png"); */
            background-size: 100% 100%;
            margin: 0 auto;
            margin-bottom: 10px;
            img {
              width: 34px;
            }
          }
        }

        &.active {
          span {
            background: rgb(63, 94, 251);
            background: linear-gradient(
              90deg,
              rgba(63, 94, 251, 1) 0%,
              rgba(252, 70, 107, 1) 100%
            );
            strong {
              border: none;
              background-color: ${({ theme }) => theme.colors['tab-bg2']};
            }
            i {
              color: ${({ theme }) => theme.colors['white']};
              background-image: url(${tabImgbghover});
            }
          }
        }
        @media screen and (max-width: 641px) {
          margin: 0 15px 0 0;
          span {
            strong {
              width: 184px;
              height: 184px;
            }
          }
          &#btn2 {
            margin: 0;
            span {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
  .create-single-section {
    max-width: 1140px;

    @media screen and (max-width: 641px) {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    padding-top: 0;
    .marketplace-tabs-main {
      h5 {
        font-size: 24px;
        font-family: 'DM Sans';
        letter-spacing: 0.02em;
      }
      p {
        font-size: 14px;
        margin-bottom: 0;
        font-family: 'DM Sans';
        letter-spacing: 0.02em;
      }
    }
    .marketplace-tabs {
      margin-top: 30px;
    }
    .upload__file {
      background: ${({ theme }) => theme.colors['input-holder-bg']};
      border: 2px dashed ${({ theme }) => theme.colors['input-holder-border']};
      backdrop-filter: blur(40px);
      padding: 44px 50px;

      /* Note: backdrop-filter has minimal browser support */

      border-radius: 5px;

      p {
        margin-bottom: 0;
      }
    }

    .btn_gradient {
      background: linear-gradient(95.16deg, #fe00c7 2.64%, #0084fe 100%);
      border: none;
      margin-bottom: 20px !important;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
      border-radius: 5px;
    }

    .input__holder__single {
      font-family: 'DM Sans';
      background: ${({ theme }) => theme.colors['input-holder-bg']};
      border: 1px solid ${({ theme }) => theme.colors['input-holder-border']};
      backdrop-filter: blur(40px);
      font-size: 18px;
      line-height: 23px;
      font-weight: 500;
      padding-left: 30px;
      padding-right: 30px;
      /* Note: backdrop-filter has minimal browser support */

      border-radius: 5px;
      margin-bottom: 0;
    }
    .input__holder__single:focus {
      background: ${({ theme }) => theme.colors['input-holder-focus']};
    }

    .bg__market {
      // width: 200px;
      // height: 200px;

      img {
        display: block;
        margin: 0 auto;
      }
    }
  }

  .nft-create-form {
    h5 {
      margin-bottom: 10px !important;
      color: ${({ theme }) => theme.colors['text-light']};
    }
    .error-form {
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 0.02em;
      font-weight: 500;
      color: #ff3f3f;
      margin-top: 10px;
    }
    .react-datepicker-wrapper {
      input {
        height: 40px;
        padding-left: 5px;
        background: ${({ theme }) => theme.colors['input-holder-bg']};
        border: 1px solid ${({ theme }) => theme.colors['input-holder-border']};
        color: ${({ theme }) => theme.colors['text-light']};
        border-radius: 6px;
      }
    }
    .upload-file-field {
      margin-bottom: 40px;
      h5 {
        font-size: 24px;
        margin-bottom: 20px;
        font-weight: 700;
      }
      .browse {
        p {
          font-size: 14px;
          line-height: 17px;
          font-weight: 500;
          letter-spacing: 0.02em;
        }
      }
      .profile_avatar {
        justify-content: center;
        padding-top: 15px;
        img {
          object-fit: cover;
          width: 100px;
          height: 100px;
        }
      }
    }
    .form-cfield {
      margin-bottom: 25px;
      .create-single-input {
        margin-bottom: 0;
      }
      .form-label {
        &.label-sub{
        margin-bottom: 2px!important;
      }
      }
      .sublabel {
        font-size: 14px;
        color: #a2a2a2;
        margin-bottom: 9px;
      }
    }
    .form-ccfield {
      border: 1px solid ${({ theme }) => theme.colors['input-holder-border']};
      backdrop-filter: blur(40px);
      background-color: ${({ theme }) => theme.colors['input-holder-bg']};
      border-radius: 5px;
      padding: 20px 30px;
      background: ${({ theme }) => theme.colors['new__item_bg']};
      background: linear-gradient(
        90deg,
        rgba(244, 5, 201, 0.07) -1.88%,
        rgba(57, 147, 255, 0.07) 129.09%
      );
      .btn-add,
      .btn-remove {
        background: linear-gradient(95.16deg, #fe00c7 2.64%, #0084fe 100%);
        // border: 3px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        display: inline-block;
        font-size: 16px;
        line-height: 20px;
        padding: 5px 20px;
        height: 40px;
        font-family: 'Neulis Alt';
      }
      .btn-remove {
        padding: 8px 20px;
      }
      .sublabel {
        margin-bottom: 0px;
        font-size: 14px;
        line-height: 18px;
      }
      .MuiSwitch-track {
        background: #ffffff;
      }
      &.sensative-content {
        background: linear-gradient(
          90deg,
          rgba(244, 5, 201, 0.2) -1.88%,
          rgba(57, 147, 255, 0.2) 129.09%
        );
        h5 {
          font-size: 20px;
          line-height: 26px;
          margin-bottom: 7px !important;
        }
        i {
          display: none;
        }
      }
    }
    .add-collection-field {
      h5 {
        font-size: 24px;
        margin-bottom: 40px;
      }
      button {
        border: 0px;
        height: auto;
        width: auto;
        background: transparent;
        padding-left: 0;
        span {
          // background: linear-gradient(90deg, rgba(244, 5, 201, 0.07) -1.88%, rgba(57, 147, 255, 0.07) 129.09%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: ${({ theme }) => theme.colors['tab-bg']};
          box-shadow: ${({ theme }) => theme.colors['tab-bx']};
          padding: 1px;
          border-bottom-right-radius: 50px;
          display: block;
          strong {
            border: 1px solid #282a53;
            backdrop-filter: blur(40px);
            /* background-color: #121435; */
            background-color: ${({ theme }) => theme.colors['tab-bg2']};
            box-shadow: ${({ theme }) => theme.colors['tab-bx']};
            /* @include theme("themeLight", background-color, $white); */
            border-bottom-right-radius: 50px;
            // background-image: url("../images/tab-bg.png");
            background-size: 100% 100%;
            padding: 35px 10px;
            // background: none;
            font-size: 20px;
            line-height: 20px;
            text-align: center;
            display: table-cell;
            vertical-align: middle;
            border: none;
            // border-bottom-right-radius: 60px;
            min-width: 140px;
            color: ${({ theme }) => theme.colors['tab-color']};
            font-weight: 500;
            width: 200px;
            height: 200px;
            position: relative;
          }
          i {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            width: 80px;
            height: 80px;
            background-image: url(${tabImgbg});
            background-size: 100% 100%;
            margin: 0 auto;
            color: ${({ theme }) => theme.colors['white']};
            margin-bottom: 10px;
            font-style: normal;
            img {
              width: 34px;
            }
          }
          &:hover {
            background: rgb(63, 94, 251);
            background: linear-gradient(
              90deg,
              rgba(63, 94, 251, 1) 0%,
              rgba(252, 70, 107, 1) 100%
            );
            strong {
              border: none;
              background-color: ${({ theme }) => theme.colors['tab-bg2']};
            }
            i {
              color: ${({ theme }) => theme.colors['white']};
              background-image: url(${tabImgbghover});
            }
          }
        }
      }
    }
    .sugession-box {
      color: #a2a2a2;
      font-size: 14px;
    }
    .btn-main-submit {
      background: linear-gradient(95.16deg, #fe00c7 2.64%, #0084fe 100%);
      // border: 3px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      font-size: 20px;
      line-height: 25px;
      padding: 20px;
      max-width: 210px;
      width: 100%;
    }
    .checkout {
      .maincheckout {
      }
    }
    .form-cfield {
      .upload__file {
        &#pet-select {
          background-color: ${({ theme }) => theme.colors['white']};
          border: 1px solid ${({ theme }) => theme.colors['white']};
          width: 100%;
          height: auto;
          padding: 10px;
        }
      }
    }
  }

  .property-fields {
    .form-control {
      padding: 0.5rem;
      margin-bottom: 0;
    }
    .form-label {
      color: ${({ theme }) => theme.colors['text-light']};
    }
    .property-info-box {
      margin-top: 15px;
      margin-bottom: 30px;
      .nft-attr-normal {
      }
    }
  }
  /*** create file ***/

  .d-create-file {
    padding: 50px;
    border-radius: 10px;
    /* border: dashed 3px ${({ theme }) => theme.colors['light-gray']}; */
    text-align: center;

    #get_file {
      margin: 0 auto;
    }

    .browse {
      position: relative;
      width: max-content;
      height: auto;
      margin: 0 auto;
      cursor: pointer;

      #upload_file {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }

      &:hover {
        .btn-main {
          box-shadow: 2px 2px 20px 0px
            ${({ theme }) => theme.colors['pink_col']};
          transition: all 0.3s ease;
        }
      }
      .btn-main {
        padding: 13px 26px;
        font-size: 16px;
        margin-bottom: 15px !important;
        cursor: pointer;
      }
    }
  }
  .create-single-left {
    /* width:52%; */
  }
  .preview-nft-col {
    padding-left: 60px;
    padding-top: 50px;
    /* width:48%; */
  }
  .createsingle-imagemain {
    // &:after {
    // content: "";
    /* background: linear-gradient(to left, #0084fe, #fe00c7) !important; */
    position: relative;

    // width: 102.5%;
    // height: 102%;
    // position: absolute;
    // top: -1%;
    // left: -1%;
    // left: -1.2%;
    // z-index: -2;
    border-radius: 15px;
    transition: 0.3s all ease-in;
    -webkit-transition: 0.3s all ease-in;
    -moz-transition: 0.3s all ease-in;
    -ms-transition: 0.3s all ease-in;
    -o-transition: 0.3s all ease-in;
    padding: 1px;
    overflow: hidden;
    // }
    .nft__item {
      background: ${({ theme }) => theme.colors.new__item_bg};
      padding: 0;
      .author_list_pp {
        border: 6.27631px solid rgba(0, 0, 0, 0.01);
        backdrop-filter: blur(10.4096px);
        background-color: transparent;
        position: relative;
        margin-top: 0;
        width: 54px;
        height: 54px;
        padding: 0;
        /* @include theme("themeLight", border-color, $background_light); */
      }
      .nft__item_wrap {
        margin-top: 15px;
        padding-left: 15px;
        padding-right: 15px;
      }
      .nft__item_info {
        background: rgba(0, 0, 0, 0.01);
        backdrop-filter: blur(26.0529px);
        border-radius: 14.8874px;
        margin-bottom: 0;
        margin-top: -40px;
        padding-top: 53px;
        padding-left: 30px;
        padding-right: 30px;
        margin-left: 0;
        margin-right: 0;
        height: auto;
        font-family: 'Neulis Alt';
        h4 {
          font-size: 26px;
          line-height: 32.31px;
          font-weight: 600;
          letter-spacing: 0.01em;
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 260px;
          width: 100%;
        }
        .nft-collection-name {
          font-weight: 400;
          font-size: 22.331px;
          line-height: 27px;
        }
        .nft__item_price {
          font-weight: 400;
          font-size: 26.0529px;
          line-height: 32px;
          /* identical to box height */

          letter-spacing: 0.01em;
          font-family: 'Neulis Alt';
          color: ${({ theme }) => theme.colors['color_secondary']};
          font-weight: 700;
          span {
            float: right;
            color: ${({ theme }) => theme.colors['text-light']};
          }
        }
        .nft__item_action {
          position: static;
          span {
            background: linear-gradient(95.16deg, #fe00c7 2.64%, #0084fe 100%);
            // border: 2.79138px solid rgba(255, 255, 255, 0.1);
            border-radius: 9.3046px;
            display: inline-block;
            max-width: 150px;
            padding: 13px 15px;
            font-size: 20px;
            width: 100%;
            margin-top: 20px;
            color: #ffffff;
            text-align: center;
          }
        }
        .nft__item_like {
          font-size: 26px;
          color: #0084fe;
          bottom: 32px;
          span {
            font-size: 26px;
            color: #0084fe;
          }
        }
      }
    }
    .de_countdown {
      position: absolute;
      font-family: 'Neulis Alt';
      top: 63%;
      left: 30px;
      right: 30px;
      background-color: white;
      justify-content: center;
      font-size: 22px;
      line-height: 28px;
      font-weight: 700;
      padding-top: 15px;
      padding-bottom: 13px;
      box-shadow: 0px 7.44368px 14.8874px rgba(0, 2, 88, 0.5);
      border-radius: 14.8874px;
      > div {
        justify-content: center;
      }
    }
    &:before {
      border-radius: 15px;
      content: '';
      -webkit-mask: -webkit-linear-gradient(345deg, #0084fe 0%, #fe00c7 100%)
          content-box,
        -webkit-linear-gradient(345deg, #0084fe 0%, #fe00c7 100%);
      position: absolute;
      background: linear-gradient(to left, #0084fe, #fe00c7) no-repeat
        padding-box !important;
      padding: 1px;
      -webkit-mask-composite: xor;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
  input[type="datetime-local"]{
    padding-right: 10px!important;
  }
`;
export default CreateSingleWrapper;
