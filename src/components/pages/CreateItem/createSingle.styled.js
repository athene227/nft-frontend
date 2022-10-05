import styled from 'styled-components';

import collectionbannerbg from '../../../assets/images/icon/banner-img.svg';
import tabImgbg from '../../../assets/images/tab-img-bg.png';
import tabImgbghover from '../../../assets/images/tab-img-bg-hover.png';

const CreateSingleWrapper = styled.div`

  /*** create 2 ***/
  font-family: 'DM Sans';
  .createNft{
    background-color: ${({ theme }) => theme.colors.bodybg};
    background-image: url(${({ theme }) => theme.colors.bannerImage});
    padding-top: 128px;
    background-size: contain;
    background-repeat: no-repeat !important;
    &__h1{
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
    &__container{
    max-width: 1140px;
width: 100%;
  padding-right: var(--bs-gutter-x, 0.75rem);
  padding-left: var(--bs-gutter-x, 0.75rem);
  margin-right: auto;
  margin-left: auto;
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
      margin-bottom: 25px;
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

    .text-white {
      color: white;
    }
/* Need to remove */
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

      border-radius: 5px;
      margin-bottom: 0;
      &.textarea{
        min-height:140px;
        resize:none;
      }
    }
    .input__holder__single:focus {
      background: ${({ theme }) => theme.colors['input-holder-focus']};
    }
    /* Need to remove */

    .bg__market {
      // width: 200px;
      // height: 200px;

      img {
        display: block;
        margin: 0 auto;
      }
    }
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
        margin: auto;9
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
                rgba(255, 255, 255, 0),
                rgba(255, 255, 255, 0)
              ),
              linear-gradient(101deg, #0084fe, #fe00c7);
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
    .form-cfield, .nft__form_field {
      margin-bottom: 25px;
      .form-group{
        margin-bottom: 0;
      }
      .create-single-input {
        margin-bottom: 0;
      }
      .form-label {
        &.label-sub {
          margin-bottom: 2px !important;
        }
      }
      .sublabel {
        font-size: 14px;
        color: #a2a2a2;
        margin-bottom: 9px;
      }
      .more-info{
          margin-top:10px;
          font-size: 14px;
          line-height: 18px;
          letter-spacing: 0.02em;
        }
    }
    .form-ccfield,.createNft__form_field_secondary {
      border: 1px solid ${({ theme }) => theme.colors['input-holder-border']};
      backdrop-filter: blur(40px);
      background-color: ${({ theme }) => theme.colors['input-holder-bg']};
      border-radius: 5px;
      padding: 20px 20px;
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
          /* display: none; */
          margin-right: 8px;
          position: relative;
          top: -3px;
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
                rgba(255, 255, 255, 0),
                rgba(255, 255, 255, 0)
              ),
              linear-gradient(101deg, #0084fe, #fe00c7);
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
    .form-cfield, .nft__form_field {
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
  .createNft__preview {
    padding-left: 60px;
    padding-top: 30px;
    /* width:48%; */
  }
  .createNft__preview_img {
    // &:after {
    // content: "";
    /* background: linear-gradient(to left, #0084fe, #fe00c7) !important; */
    position: relative;
    position: sticky;
    top:100px;

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
      box-shadow: 0.46px 0.92px 10px rgba(255, 255, 255, 0.2);
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
        margin-bottom:10px;
        position: relative;
        img{
          width: 365px;
          height: 365px;
          object-fit: cover;
          object-position: center;
        }
      }
      .nft__item_info {
        background: rgba(0, 0, 0, 0.01);
        backdrop-filter: blur(26.0529px);
        border-radius: 14.8874px;
        margin-bottom: 0;
        /* margin-top: -40px;
        padding-top: 53px; */
        margin-top:0;
        padding-top:0;
        padding-left: 30px;
        padding-right: 30px;
        margin-left: 0;
        margin-right: 0;
        height: auto;
        font-family: 'Neulis Alt';
        background:transparent;
        backdrop-filter: none;
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
          font-size: 15.331px;
          line-height: 27px;
          margin-bottom:10px;
          img{
            width:17px;
            margin-right:9px;
            border-radius:0;

          }
        }
        .nft-supply-details{
          font-weight: 700;
          font-size: 14px;
          line-height: 14px;
          /* identical to box height, or 100% */
          color: #6670A6;
          span{
            display:block;
            font-size: 16px;
            line-height: 21px;
            /* identical to box height */
            color: #FFFFFF;
            margin-bottom:4px;
          }
        }
        .price-heading{
          font-size: 16px;
          line-height: 20px;
          letter-spacing: 0.01em;
          text-transform: capitalize;
          font-weight:700;
          color:#ffffff;
          display:block;
        }
        .nft__item_price {
          font-weight: 400;
          font-size: 26.0529px;
          line-height: 32px;
          display: flex;
          align-items: center;

          /* identical to box height */

          letter-spacing: 0.01em;
          font-family: 'Neulis Alt';
          color: ${({ theme }) => theme.colors['color_secondary']};
          font-weight: 700;
          span {
            float: right;
            color: ${({ theme }) => theme.colors['text-light']};
          }
          .author_list_pp {
            margin-left: 0;
            margin-right: 6px;
            background: none;
            border: 0px;
            width: 26px;
            height: auto;
          }
        }
        .nft__item_action {
          padding-bottom: 13px;
          position: static;
          min-width:180px;
          /* opacity:0; */
          /* visibility: hidden; */
          /* pointer-events: none; */
          transition: 0.3s all ease-in;
          span {
            background: linear-gradient(95.16deg, #fe00c7 2.64%, #0084fe 100%);
            // border: 2.79138px solid rgba(255, 255, 255, 0.1);
            border-radius: 9.3046px;
            display: inline-block;
            padding: 13px 15px;
            font-size: 20px;
            width: 100%;
            color: #ffffff;
            text-align: center;
            font-weight: 500;
            font-size: 18px;
            line-height: 23px;
            cursor:pointer;
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
      /* &:hover{
        .nft__item_action{
          opacity:1;
          visibility: visible;
          pointer-events: visible;
        }
      } */
    }
    .de_countdown {
      position: absolute;
      font-family: 'Neulis Alt';
      bottom: 15px;
      left: 30px;
      right: auto;
      background-color: white;
      justify-content: center;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.01em;
      font-weight: 700;
      padding:6px 18px;
      box-shadow: 0px 7.44368px 14.8874px rgba(0, 2, 88, 0.5);
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid #FFFFFF;
      backdrop-filter: blur(15px);
      border-radius: 7px;
      > div {
        justify-content: center;
      }
    }
    &:before {
      border-radius: 15px;
      content: '';
      -webkit-mask: -webkit-linear-gradient(180deg, #FE00C7 0%, #0084FE 100%)
          content-box,
        -webkit-linear-gradient(180deg, #FE00C7 0%, #0084FE 100%);
      position: absolute;
      background: linear-gradient(to left, #FE00C7, #0084FE) no-repeat
        padding-box !important;
      padding: 1px;
      -webkit-mask-composite: xor;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display:none;
    }
  }
  input[type='datetime-local'] {
    padding-right: 10px !important;
  }
  .form-field-details,.createNft__attribute_details{
    margin-bottom: 25px;
    .form-ccfield,.createNft__form_field_secondary{
      background: ${({ theme }) => theme.colors['input-holder-bg']};
      margin-bottom: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    .attribute-fields{
    background: linear-gradient(90deg, rgba(244, 5, 201, 0.07) -1.88%, rgba(57, 147, 255, 0.07) 129.09%);
    border: 1px solid #282A53;
    backdrop-filter: blur(40px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 5px;
    padding: 12px 20px 25px;
    border-top-left-radius: 0;
      border-top-right-radius: 0;
   
  }
  .attribute-fields-property{
      display: flex;
      align-items:center;
      flex-wrap: wrap;
      gap:24px;
      .attribute-field-property{
        min-width: 129px;
      }
      
     .nft-attr-normal{
        width:100%;
        text-align:center;
        background: linear-gradient(90deg, rgba(254, 0, 199, 0.3) 0%, rgba(0, 132, 254, 0.3) 100%);
        border: 2px solid #1A96F8;
        border-radius: 10px;
        min-height:91px;
        .nft-attr-name{
          font-size: 13px;
          line-height: 17px;
          text-transform:uppercase;
          margin-bottom: 11px;
        }
        .nft-attr-value{
          font-size: 22px;
          line-height: 29px;
        }
      }

        
      .nft-attr-royalties-disabled{
        width:100%;
        text-align:center;        
        background: linear-gradient(90deg, #282A53 0%, #282A53 100%);
        border: 2px solid #282A53;
        // min-height:91px;
        .nft-attr-name{
          font-size: 13px;
          line-height: 17px;
          text-transform:uppercase;
          margin-bottom: 11px;
        }
        .nft-attr-value{
          font-size: 18px;
          line-height: 20px;
          padding:13px;
          color:white;
          &:hover {
            color:#f4f4f4;
          }
        }
        
        // &:hover {
        //   background: linear-gradient(90deg, rgba(254, 0, 199, 0.3) 0%, rgba(0, 132, 254, 0.3) 100%);
        //   border: 2px solid #1A96F8;
        //   border-radius: 10px;
        // }
      }


      
        
      .nft-attr-royalties-active{
        width:100%;
        text-align:center;        
        background: linear-gradient(90deg, rgba(254, 0, 199, 0.3) 0%, rgba(0, 132, 254, 0.3) 100%);
        border: 2px solid #1A96F8;
        border-radius: 10px;
        // min-height:91px;
        .nft-attr-name{
          font-size: 13px;
          line-height: 17px;
          text-transform:uppercase;
          margin-bottom: 11px;
        }
        .nft-attr-value{
          font-size: 18px;
          line-height: 20px;
          padding:13px;
          color:white;
          &:hover {
            color:#f4f4f4;
          }
        }
        
        // &:hover {
        //   background: linear-gradient(90deg, rgba(254, 0, 199, 0.3) 0%, rgba(0, 132, 254, 0.3) 100%);
        //   border: 2px solid #1A96F8;
        //   border-radius: 10px;
        // }
      }


    }
    .attribute-fields-stat{
      padding-top:16px;
      display:block;
      .attribute-field-stat{
        background: linear-gradient(90deg, rgba(254, 0, 199, 0.3) 0%, rgba(0, 132, 254, 0.3) 100%);
        border: 2px solid #1A96F8;
        border-radius: 10px;
        padding:7px 10px 10px;
        margin-bottom: 15px;
        .nft-attr-ranking {
        .nft-attr-name{
          padding-left:5px;
          font-weight: 500;
          font-size: 14px;
          line-height: 18px;
          letter-spacing: 0.02em;
          color: #FFFFFF;
          &.disabled{
            opacity: 0.5;
          }
        }
        .nft-attr-value{
          padding-right: 5px;
          font-weight: 500;
          font-size: 14px;
          line-height: 18px;
          letter-spacing: 0.02em;
          color: #8F8AA1;
        }
        .progress{
          border: 1px solid #224484;
        }
      }
        .attr-ranking-details{
          margin-bottom:7px;
        }
      }
    }
  .attribute-editable-property{
    padding-top:15px;
    table{
      tr{
        thead{
          border:none;
        }
        th{
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          color: #FFFFFF;
          padding-left:0px;
          padding-right:0;
          border:none;
          &:nth-of-type(2){
            padding-left:10px;
          }
        }
        td{
          vertical-align: top; 
          padding-left:0;
          padding-right:0;
          border:none;
          &:nth-of-type(2){
            padding-left: 12px;
          }
          &:last-of-type{
            text-align:right;
            padding-left:8px;
            cursor:pointer;
            padding-top:15px;
          }
          input{
            background-color:transparent;
          }
        }
      td.actions{
        .icon-custom{
          background-color: rgba(255,255,255,0.1);
          padding:10px;
          border-radius: 55%;
          width:41px;
          height:41px;
          display: inline-block;
          color:#ffffff;
          line-height: 19px;
          text-align: center;
          svg{
            width:11px;
          }
        }
      }
    }
    }
    .table>:not(:first-child){
      border-top:none;
    }
    .editable-buttons{
      .btn-add{
        max-width:40px;
        width:100%;
        padding:5px;
      }
      .btn-save{
        max-width:205px;
        width:100%;
      }
    }
  }
  .attribute-editable-stats{
    table{
      td{
        ul{
          list-style: none;
          padding-left:0;
          display:flex;
          margin-bottom: 0;
          li{
            &:first-of-type{
              input{
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
              }
            }
            &:nth-of-type(2){
              width:50px;
              padding:16px;
              background: #282A53;
              border: 1px solid #282A53;
              backdrop-filter: blur(40px);
              max-height:57px;
              span{
                font-weight: 500;
              font-size: 18px;
              line-height: 23px;
              color: #FFFFFF;
              opacity: 0.5;
              text-align:center;

              }  
            }
            &:last-of-type{
              input{
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
              }
            }
          }
        }
      }
    }
  }
  .how-field-appears{
    gap:15px;
    .sublabel{
      font-weight: 500;
      font-size: 13px;
      line-height: 16px;
      letter-spacing: 0.02em;
    }
    .attribute-field-property{
      min-width:109px;
      .nft-attr-normal{
        background: linear-gradient(90deg, rgba(254, 0, 199, 0.3) 0%, rgba(0, 132, 254, 0.3) 100%);
        border: 2px solid #1A96F8;
        border-radius: 10px;
        text-align: center;
        padding:10px;
        width:100%;
        .nft-attr-name{
          font-size: 10px;
          line-height: 13px;
        }
        .nft-attr-value{
          font-size: 18px;
          line-height: 23px;
        }
      }
    }
    .nft-attr-ranking{
      min-width:110px;
      .nft-attr-name{
        font-weight: 500;
        font-size: 10px;
        line-height: 13px;
        letter-spacing: 0.02em;
      }
      .nft-attr-value{
        font-weight: 700;
        font-size: 10px;
        line-height: 13px;
        letter-spacing: 0.02em;
        color: #8F8AA1;
        }
        .progress{
          height:20px;
        }
    }
  }
  }
  .upload-image-preview{
    width:200px;
    height:200px;
    border-radius: 14.8874px;
    margin-bottom:25px;
    position:relative;
    img{
      max-width:100%;
      border-radius: 14.8874px;
    }
    ul{
      position:absolute;
      top: 8px;
      right:8px;
      li{
        display:inline-block;
        margin-right:10px;
        &:last-of-type{
          margin-right:0;
        }
        a{
          background: rgba(6, 19, 45, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10.4096px);
          /* Note: backdrop-filter has minimal browser support */
          border-radius: 520.481px;
          width:50px;
          height:50px;
          color:#ffffff;
          display:flex;
          align-items: center;
          justify-content:center;
          font-size:17px;
          input{
            visibility: hidden;
            opacity: 0;
            width:0;
            height:0;
          }
        }
      }
    }
  }
  .createNft_royalty{
    ul{
      display: flex;
      list-style:none;
      gap:9px;
      padding-left:0;
      flex-wrap: wrap;
      li{
        background: rgba(40, 42, 83,0.5);
        backdrop-filter: blur(20px);
        border-radius: 5px;
        padding:16px 26px;
        color:#FFFFFF;
        font-weight: 500;
        font-size: 18px;
        line-height: 23px;
        min-width:121px;
        max-width:121px;
        border: 2px solid rgba(40, 42, 83,0.5);
        text-align: center;
        cursor: pointer;
        &.active{
          background: linear-gradient(90deg, rgba(254, 0, 199, 0.3) 0%, rgba(0, 132, 254, 0.3) 100%);
          border: 2px solid #1A96F8;
          border-radius: 10px;
          span{
            opacity: 0.8;
          }
        }
      }
    }
  }
  .custom-switch{
    .MuiSwitch-root {
          padding: 5px;
          .MuiSwitch-track {
            border-radius: 500px;
            opacity: 1;
            background: #ffffff;
          }
          .MuiSwitch-thumb {
            color: #7a7f88;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            margin-top: -2.5px;
            margin-left: -5px;
          }
          .Mui-checked {
            .MuiSwitch-thumb {
              background: linear-gradient(
                360deg,
                #ff00d1 -18.12%,
                #0880fc 82.18%
              );
              color: #ffffff;
              margin-left: 0px;
            }
          }
        }
  }
  .my-disable{
    pointer-events:none;
  }
  .marketplace-bottom-content{
    padding-top: 10px;
    &:before{
      background: linear-gradient(90deg, #0581FD 0%, #F405C9 100%);
      content:'';
      display: block;
      height: 2px;
      margin-bottom: 31px;
      opacity: 0.3;
      backdrop-filter: blur(20px);
    }
    .content-heading{
      margin-bottom: 25px;
      h3{
        font-size: 24px;
        line-height: 31px;
        margin-bottom: 3px;
      }
      p{
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.02em;
        margin-bottom: 0;
      }
      padding-right: 20px;
    }
    .marketplace-content-disabled{
    /* filter: grayscale(90%); */
    background: rgba(217, 217, 217, 0.05);
    border: 1px solid rgba(217, 217, 217, 0.1);
    border-radius: 10px;
    padding:15px;
    margin-left:-15px;
    pointer-events: none;
    padding-bottom: 1px;
    margin-bottom: 25px;
    .de_tab.tab_methods .de_nav li{
      span{
        background: rgba(217, 217, 217, 0.1);
        backdrop-filter: blur(20px);
        strong{
          background: rgba(217, 217, 217, 0.1);
          backdrop-filter: blur(20px);
          color:#828996;
          i{
            background: rgba(6, 19, 45, 0.2);
            border: 3px solid #828996;
            backdrop-filter: blur(12px);
            border-radius: 500px;
            color:#828996;
            img{
              opacity: 0.5;
            }
          }
        }
      }
    }
    .nft__form_field{
      .form-label{
        color: rgba(255, 255, 255, 0.5);
      }
      .span-red{
        color: rgba(255, 255, 255, 0.5);
      }
      .input__holder__single{
        background: rgba(217, 217, 217, 0.1);
        backdrop-filter: blur(20px);
        color: rgba(255, 255, 255, 0.5);
      }
      .input-icon{
        color: rgba(255, 255, 255, 0.5);
        img{
          filter: grayscale(1);
          opacity: 0.8;
        }
      }
      .more-info{
          margin-top:10px;
          font-size: 14px;
          line-height: 18px;
          letter-spacing: 0.02em;
          filter: grayscale(1);
          opacity: 0.8;
          .text-white{
            color: rgba(255, 255, 255, 0.5)!important;
          }
        }
        .calendar-input{
          &+.input-icon{
            img{
              filter: brightness(0.5);
            }
          }
        }
    }
  }
  }

  .collection-popup-content {
      .form-label {
        font-size: 18px;
        line-height: 23px;
        letter-spacing: 0.03em;
        font-weight: 400;
        &.form-label-bold{
          font-weight:700;
        }
      }
      .sublabel{
        font-weight:700;
        .text-primary{
          color:#2272F6;
        }
      }
      .upload-file-field {
        margin-bottom: 0;
      }
      .upload__file {
        padding-left: 28px;
        padding-right: 28px;
        position:relative;
        .browse {
          max-width: 100%;
        }
        .logo-cancle{
          position:absolute;
          background: rgba(74, 77, 82, 0.10);
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor:pointer;
          backdrop-filter: blur(5.20481px);

          height: 40px;
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 500px;
          transform: translate(-50%, -50%);
          top: 50%;
          left: 50%;

        }
        .logo-image-preview{
              img{
                position: absolute;
                width: 90%;
                height: 90%;
                top: 5%;
                left: 5%;
                right: 0;
                bottom: 0;
                border-radius:8px;
              }
            } 
      }
      .collection-banner-imagemain {
        height: 100%;
        .collection-banner-image {
          background-image: url(${collectionbannerbg});
          background-size: cover;
          min-height:167px;
          max-height: 167px;
          position:relative;
          border-radius: 10px;
          img{
            width:100%;
            height:100%;
            position:absolute;
            left:0;
            right:0;
            bottom:0;
            top:0;
            object-fit: cover;
          }
          .d-create-file{
            padding:0;
            position:absolute;
            right: 18px;
            bottom: 18px;
            cursor:pointer;
            .btn-main{
              font-size: 14px;
              line-height: 17px;
              padding:6px 23px;
              margin-bottom: 0!important;
              position:relative;
              z-index:1;
              
            }
          }
          .logo-image-preview{
            img{
              border-radius:15px;
            }
          }
        }
        .upload-file-field{
            width:150px;
            height: 150px;
            margin-top: -84px;
            margin-left: 25px;
            .upload__file{
              padding:50px 14px 30px;
              background: rgba(6, 19, 45, 0.5);
              border: 2px dashed #282A53;
              backdrop-filter: blur(20px);
              /* Note: backdrop-filter has minimal browser support */
              border-radius: 22px;
              .browse{
                p{
                  font-style: italic;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 14px;
                  text-align: center;
                  letter-spacing: 0.02em;
                }
              }
            }
            .btn-main{
              font-size: 14px;
              line-height: 17px;
              padding:6px 17px;
              margin-bottom: 11px!important;
            }

          }
      }
      .form-cfield, .nft__form_field {
        .input__holder__single {
          margin: 0;
        }
     
      }
      .create-popup-btns {
        .btn-main {
          margin-left: 0;
          width: 150px;
        }
        a {
          font-weight:700;
          font-size: 13px;
          line-height: 17px;
          letter-spacing: 0.02em;
          text-decoration-line: underline;
          color: #ffffff;
          opacity: 0.5;
        }
        .collection-popup-switch{
          a{
            cursor: pointer;
            svg{
              margin-right: 3px;
              position:relative;
              top:1px;
            }
          }
        }
      }
      .category-dropdown{
      margin-bottom: 25px;
      .btn-grad.btn{
        color: white;
      background-image: linear-gradient(270deg, ${({ theme }) =>
        theme.colors.color_primary} 0%, ${({ theme }) =>
  theme.colors.color_secondary} 100%);
      border-radius: ${({ theme }) => theme.colors.btn_border};
      font-size: ${({ theme }) => theme.colors.btn_font};
      position: relative;
      z-index: 1;
      border:0px;
      height:50px;

  &:hover {
    box-shadow: none;
    transition: all 0.3s ease;

    &::before {
      opacity: 1;
    }
  }

  &::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(90deg, ${({ theme }) =>
      theme.colors.color_primary} 0%, ${({ theme }) =>
  theme.colors.color_secondary} 100%);
    z-index: -1;
    transition: opacity 0.5s linear;
    opacity: 0;
    border-radius: 5px;;
    /* border-radius: ${({ theme }) => theme.colors.btn_border}; */
    border-width: 1px;
  }
  &:after{
    display:none;
  }
  }
  h5{
    background: linear-gradient(95.16deg, #FE00C7 2.64%, #0084FE 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display:inline-block;
    font-size:24px;
    line-height:31px;
 
  }
  .category-list-tags{
    padding-left:0px;
    ul{
      list-style:none;
      padding:0;
      margin:0;
      display: flex;
      flex-wrap: wrap;
      gap:15px;
      li{
          background: rgba(40, 42, 83,0.5);
          cursor: pointer;
         border: 2px solid rgba(40, 42, 83,0.5);
        border-radius: 10px;
        color:#ffffff;
        padding:10px 10px;
        padding-right:40px;
        font-weight: 700;
        font-size: 16px;
        line-height: 21px;
        position:relative;
        height:50px;
        display:flex;
        align-items: center;
        &.active{
        border: 2px solid #1A96F8;
        background: linear-gradient(90deg, rgba(254, 0, 199, 0.3) 0%, rgba(0, 132, 254, 0.3) 100%);
        }
        .category-icon{
          width:30px;
          height:30px;
          border-radius: 500px;
          background-color:#0E193B;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          svg{
            position:static;
            color:#1A96F8;
            font-size: 15px;
          }
        }
       
        img{
          width:30px;
          height:30px;
          border-radius: 500px;
        }
        span{
          padding-left:6px;
        }
        svg{
          position:absolute;
          right:19px;
          top:16px;
        }
        
      }
    }
  }
  .dropdown-menu{
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(25px);
    border-radius: 10px;
    padding-top:0;
    padding-bottom:0;
    width:100%;
    margin-top:10px!important;
    max-height: 260px;
    overflow: auto;
    .dropdown-item{
      border-bottom:1px solid rgba(255,255,255,0.1);
      color:#FFFFFF;
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      padding:10px;
      display: flex;
      align-items: center;
      &:first-of-type{
        border-top-left-radius: 10px;
        border-top-right-radius:10px;
      }
      &:last-of-type{
        border-bottom-left-radius: 10px;
        border-bottom-right-radius:10px;
      }
      &:hover,&:focus{
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(25px);
      }
      .category-icon{
          width:30px;
          height:30px;
          border-radius: 500px;
          background-color:#0E193B;
          margin-right:10px;  
          padding:5px;
          text-align: center;
          display:flex;
          align-items: center;
          justify-content:center;
          img{
            margin-right:0;
          }
          svg{
            color:#1A96F8;
            font-size: 15px;
          }
      }
      img{
        width:30px;
        height:30px;
        border-radius:500px;
        margin-right:10px;   
      }
    }
  }
}
.simple-collection-content{
  .upload-file-field{
    h5{
      font-weight: 700;
font-size: 18px;
line-height: 23px;
letter-spacing: 0.03em;
    }
    .d-create-file{
      padding-top:35px;
      padding-bottom: 35px;
    }
    .d-create-file{
      height:173px;
    }
  }
  .sublabel{
    &.sublabel-simple{
      margin-top:10px;
      margin-bottom: 30px;
    }
  }
}

  }
  .date-range-popup{
    select{
      option{
        background:#06132d;
      }
    }
    .rdrCalendarWrapper{
      background:transparent;
      .rdrSelected, .rdrInRange, .rdrStartEdge, .rdrEndEdge{
        top:0;
        bottom:0;
      }
      .rdrMonths{
        gap:45px;
        justify-content: space-between;
        .rdrMonth{
          &:first-of-type{
            padding-right:0;
          }
          &:last-of-type{
            padding-left:0;
          }
        }
        .rdrMonthName{
          font-weight: 700;
          font-size: 24px;
          line-height: 31px;
          text-align: center;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin-top:-60px;
        }
        .rdrWeekDays{
        display:none;
      }
      }
      .rdrNextPrevButton{
        border-radius: 55px;
        background:rgba(255,255,255,0.1);
        width: 30px;
        height:30px;
        position: relative;
        z-index: 1;
        i{
          border-color:transparent rgb(255, 255, 255) transparent transparent;
        }
      }
      .rdrNextButton{
        i{
          border-color: transparent transparent transparent rgb(255, 255, 255);
          margin:0 0 0 9px;
        }
      }
      .rdrDateDisplayWrapper{
      background:transparent;
      margin-bottom: 25px;
      .rdrDateDisplay{
        margin:0;
      }
      .rdrDateDisplayItem{
          background:transparent;
          font-weight: 700;
          font-size: 24px;
          line-height: 31px;
          text-align: center;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          border:0px;
          position:relative;
          &:before{
            content: 'Date Range';
            text-align: left;
            display: block;
            margin-bottom: 10px;
            font-weight: 700;
            font-size: 18px;
            line-height: 23px;
            color: #FFFFFF;
          }
          &:after{
            content: '-';
            position:absolute;
            margin-bottom: 10px;
            font-weight: 700;
            font-size: 18px;
            line-height: 23px;
            color: #FFFFFF;
            right:-14px;
            top:52px;
          }
          input{
            border: 1px solid #282A53;
            backdrop-filter: blur(20px);
            background:transparent;
            font-weight: 500;
            font-size: 18px;
            line-height: 23px;
            color: #FFFFFF;
            opacity: 0.5;
            text-align: left;
            padding:17.5px 25px;
            height:auto;
          }
          &:last-of-type{
            &:after{
            display:none;
          }
          }
        }
      }
      .rdrMonthAndYearWrapper{
        .rdrMonthAndYearPickers{
          display:none;
        }
      }
    .rdrDayNumber{
      span{
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        color: #FFFFFF;
        opacity: 0.7;
      }
    }
  
    .rdrStartEdge{
      background: linear-gradient(95.16deg, #FE00C7 2.64%, #0084FE 100%)!important;
      border-radius: 8px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      & + .rdrDayNumber{
        font-weight: 700;
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        color: #FFFFFF;
        span{
          opacity: 1;
        }
      }
    }
    .rdrEndEdge{
      background: linear-gradient(95.16deg, #FE00C7 2.64%, #0084FE 100%)!important;
      border-radius: 8px;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      & + .rdrDayNumber{
        font-weight: 700;
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        color: #FFFFFF;
        span{
          opacity: 1;
        }
      }
    }
      .rdrInRange{
        background: linear-gradient(180deg,rgba(244,5,201,0.4) -1.88%,rgba(57,147,255,0.3) 129.09%)!important;
        backdrop-filter: blur(12px);
        & +  .rdrDayNumber{
          color: #FFFFFF;
          opacity: 0.7;
          span{
            opacity:0.7;
          }
        }
      }
      .rdrDay{
      &.rdrDayHovered{
   
      }
      .rdrDayInPreview{
        background: linear-gradient(180deg, rgba(244, 5, 201, 0.1) -1.88%, rgba(57, 147, 255, 0.1) 129.09%);
        border:0px;
        & +  .rdrDayNumber{
        color: #FFFFFF;
        opacity: 0.4;
        span{
          color: #FFFFFF;
        opacity: 0.4;
        }
      }
      }
      .rdrDayStartPreview{
        border: 0px;
      }
      .rdrDayEndPreview{
        border: 0px;
      }

      &.rdrDayStartOfMonth{
        .rdrEndEdge{
          border-top-left-radius: 0px;
          border-bottom-left-radius: 0;
          left:0;
        }
        .rdrInRange{
          border-top-left-radius: 0px;
          border-bottom-left-radius:0;
          left:0;
        }
        .rdrDayInPreview{
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          left:0;
          border-left:0;
        }
      }
      &.rdrDayEndOfMonth{
        .rdrInRange{
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          right:0;
        }
        .rdrDayInPreview{
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-right:0;
        }
      }
      &.rdrDayPassive{
        /* background: linear-gradient(180deg, rgba(244, 5, 201, 0.1) -1.88%, rgba(57, 147, 255, 0.1) 129.09%); */
        backdrop-filter: blur(12px);
        & +  .rdrDayNumber{
          color: #FFFFFF;
          opacity: 0.7;
          span{
            opacity:0.7;
          }
        }
        .rdrDayNumber{
          span{
            opacity: 0.2;
          }
        }
        &.rdrDayStartOfWeek{
          .rdrInRange{
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            /* background: linear-gradient(180deg, rgba(244, 5, 201, 0.1) -1.88%, rgba(57, 147, 255, 0.1) 129.09%); */
          }
        }
        &.rdrDayEndOfWeek{
          .rdrDayInPreview{
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          left:0;
          border-left:0;
        }
        }
        .rdrInRange{
          display:block;
          background: linear-gradient(180deg, rgba(244, 5, 201, 0.1) -1.88%, rgba(57, 147, 255, 0.1) 129.09%)!important;
          & +  .rdrDayNumber{
          color: #FFFFFF;
          opacity: 0.7;
          span{
            opacity: 0.2;
          }
        }

        }
        .rdrEndEdge{
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          display: block;
          background: linear-gradient(180deg, rgba(244, 5, 201, 0.1) -1.88%, rgba(57, 147, 255, 0.1) 129.09%)!important;
          background:transparent;
        backdrop-filter: blur(12px);
        & +  .rdrDayNumber{
          color: #FFFFFF;
          opacity: 0.7;
          span{
            opacity:0.2;
          }
        }
        }
        .rdrDayInPreview{
          display:block;
        }
      }
    }
      /* .rdrDayPassive */
    }
    .input__holder__single{
      border: 1px solid #282A53;
      backdrop-filter: blur(20px);
      background:transparent;
      &:focus{
        background:transparent;
      }
    }
    .react-time-picker{
      width: 100%;
      .react-time-picker__wrapper{
            border: 1px solid #282A53;
            backdrop-filter: blur(20px);
            background:transparent;
            font-weight: 500;
            font-size: 18px;
            line-height: 23px;
            color: #FFFFFF;
            opacity: 1;
            text-align: left;
            padding:17.5px 25px;
            height:auto;
            position:relative;
            &:after{
            content: '-';
            position:absolute;
            margin-bottom: 10px;
            font-weight: 700;
            font-size: 18px;
            line-height: 23px;
            color: #FFFFFF;
            right:-18px;
            top: 19px;
          }
            
            .react-time-picker__button{
              svg{
                fill:#ffffff;
              }
              &.react-time-picker__clock-button{
                position: absolute;
                left: 15px;
              }
              &.react-time-picker__clear-button{
                svg{
                  stroke:#ffffff;
                  margin-right: -17px;
                }
              }
            }
            .react-time-picker__inputGroup{
              padding-left:20px;
            }
            .react-time-picker__inputGroup__input{
              color:#ffffff;
            }
      }
    }
    .no-after{
      .react-time-picker{
        .react-time-picker__wrapper{
          &:after{
            display:none;
          }
        }
    }
      .create-popup-btns {
        .btn-main.btn-create {
          line-height: 20px;
          padding:7px 30px!important;
          width:auto;
          font-weight:700;
        }
      }

  }


`;

export default CreateSingleWrapper;
