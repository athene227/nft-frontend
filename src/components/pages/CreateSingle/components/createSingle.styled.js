import styled from "styled-components";

const CreateSingleWrapper = styled.div`
/*** create 2 ***/
.create-single-head{
 @media screen and (max-width:641px){
  font-size: 32px;
 } 
}
.nft-attr-normal {
  background: ${({theme})=> theme.colors['create-single-bg']};
  @include theme("themeLight", box-shadow, 0px 0px 20px rgba(0, 0, 0, 0.2) inset);
  border: 1px solid #282a53;
  @include theme("themeLight", border-color, #dadada);
  border-radius: 5px;
  padding: 15px 20px;
  gap: 15px;
  // text-align: center;
  width: fit-content;
  min-width: 75px;

  .nft-attr-name {
    color: #00b2fe;
    font-size: 18px;
    font-weight: 500;
    .nft-date-icon {
      margin-right: 6px;
      margin-top: -4px;
    }
  }

  .nft-attr-value {
    color: $white;
    @include theme("themeLight", color, $text-light);
    font-size: 18px;
    font-weight: 500;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.nft-attr-bsnumber,
.nft-attr-bspercent {
  width: fit-content;
  display: flex;
  // flex-direction: column;
  background: $gradient2;
  border: 1px solid #282a53;
  @include theme("themeLight", background, $background_light);
  @include theme("themeLight", box-shadow, 0px 0px 20px rgba(0, 0, 0, 0.2) inset);
  @include theme("themeLight", border-color, #dadada);
  border-radius: 5px;
  padding: 15px 20px;
  gap: 15px;

  .boost-progress-wrapper {
    cursor: pointer;
    margin: auto;
    width: 65px;
    height: 65px;

    .CircularProgressbar .CircularProgressbar-path {
      stroke: rgb(0 178 235);
    }

    .CircularProgressbar .CircularProgressbar-trail {
      stroke: none;
      fill: rgb(4 39 58);
      @include theme("themeLight", fill, rgb(91 106 114));
      fill-opacity: 1;
    }

    div[data-test-id="CircularProgressbarWithChildren__children"] {
      font-size: 24px;
    }
  }

  .boost-label-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .nft-attr-name {
      font-size: 18px;
      margin: 7px 0px 0px;
      text-transform: none;
      color: #00b2fe;
      // width: min-content;
      font-weight: 600;
      text-align: left;
    }

    .nft-attr-value {
      font-size: 18px;
      opacity: 0.6;
      margin: 0px;
      color: #ffffff;
      @include theme("themeLight", color, $text-light);
    }
  }

  &.danger {
    .CircularProgressbar .CircularProgressbar-path {
      stroke: rgb(184, 41, 60);
    }

    .CircularProgressbar .CircularProgressbar-trail {
      stroke: none;
      fill: rgb(97, 7, 22);
      fill-opacity: 1;
    }

    .nft-attr-value {
      color: rgb(255 42 71);
    }
  }
}

.nft-attr-ranking {
  width: 100%;
  max-width: 655px;

  .nft-attr-name {
    color: $white;
    @include theme("themeLight", color, $text-light);
  }

  .nft-attr-value {
    color: #8f8aa1;
  }
  .progress {
    border-radius: 1.25rem;
    height: 1.3rem;
    background: #181a3a;
    @include theme("themeLight", background, #6c6d83);
    background-image: url("../images/progress-bg.png");
  }
  .progress-bar {
    background: linear-gradient(180deg, #0084fe 24.12%, #0047fe 100%);
  }
  &.danger .progress-bar {
    background: #ff0d3e;
  }
}

.nft-attr-container {
  display: flex;
  flex-wrap: wrap;

  & > * {
    margin: 5px;
  }
}

.add-attr-popup {
  max-width: 550px;

  .attr-type-container {
    cursor: pointer;
    border-radius: 10px;
    padding: 10px;
    // text-align: center;
    text-align: left;
    margin-bottom: 20px;
    background: ${({theme})=> theme.colors['create-single-bg']};
    @include theme("themeLight", box-shadow, 0px 0px 20px rgba(0, 0, 0, 0.2) inset);
    border: 1px solid #282a53;
    @include theme("themeLight", border-color, #dadada);

    &:hover {
      border: 1px solid rgb(21, 178, 229);
    }

    .nft-attr-normal {
      margin: auto;
      width: 100%;
      background: transparent;
      border-radius: 0px;
      @include theme("themeLight", background, $white);
      @include theme("themeLight", box-shadow, 0px 0px 20px rgba(0, 0, 0, 0.2) inset);
    }
    .nft-attr-bsnumber,
    .nft-attr-bspercent {
      margin: auto;
      width: 100%;
      background: none;
      border-radius: 0px;
      @include theme("themeLight", background, $white);
      @include theme("themeLight", box-shadow, 0px 0px 20px rgba(0, 0, 0, 0.2) inset);
      .boost-label-wrapper {
        width: 70%;
      }
      .nft-attr-name {
        color: #00b2eb;
      }

      .nft-attr-value {
        color: $white;
        @include theme("themeLight", color, $text-light);
      }
    }

    .nft-attr-ranking {
      max-width: 100%;
      padding: 10px;
      padding-top: 0;
      border-radius: 0px;
      @include theme("themeLight", background, $white);
      @include theme("themeLight", padding, 10px);
      @include theme("themeLight", box-shadow, 0px 0px 20px rgba(0, 0, 0, 0.2) inset);
      .nft-attr-name {
        @include theme("themeLight", color, $text-light);
      }
      .nft-attr-value {
        color: #747474;
      }
    }

    .form-label {
      margin-left: 5px;
      font-size: 18px;
      color: ${({theme})=> theme.colors['text-light']};
    }
  }
}
.de_tab.tab_methods {
  .de_nav {
    text-align: left;

    li {
      margin: 0 30px 0 0;
    

      span {
        // background: linear-gradient(90deg, rgba(244, 5, 201, 0.07) -1.88%, rgba(57, 147, 255, 0.07) 129.09%);
        background: #121435;
        @include theme("themeLight", background-color, #b9bad1);

        padding: 1px;
        border-bottom-right-radius: 50px;
        strong {
          border: 1px solid #282a53;
          backdrop-filter: blur(40px);
          background-color: #121435;
          @include theme("themeLight", background-color, $white);
          @include theme("themeLight", box-shadow, 0px 0px 20px 5px #cacaca inset);
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
          color: #ffffff;
          @include theme("themeLight", color, #121435);
          font-weight: 500;
          width: 200px;
          height: 200px;
          position: relative;
        }

        // &:after{
        //   content: "";
        //   position: absolute;
        //   /* margin: -20px; */
        //   width: 36px;
        //   height: 88px;
        //   transform: rotate(45deg);
        //   background-color: #020B1D;
        //   // background-color: red;
        //   bottom: -25px;
        //   right: 0;
        //   border-left:1px solid #282A53 ;
        // }
        i {
          // display: block;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          width: 80px;
          height: 80px;
          background-image: url("../images/tab-img-bg.png");
          background-size: 100% 100%;
          margin: 0 auto;
          margin-bottom: 10px;
          img {
            width: 34px;
          }
          // background-color: red;
        }
      }

      &.active {
        span {
          background: rgb(63, 94, 251);
          background: linear-gradient(90deg, rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%);
          strong {
            // border-color: $pink_col;
            // color: $pink_col;
            border: none;
            @include theme("themeLight", background-color, $white);
            background-color: #121435;
            // &:after{
            //   border-color: $pink_col;
            // }
          }
          i {
            color: $white;
            background-image: url("../images/tab-img-bg-hover.png");
          }
        }
      }
      @media screen and (max-width:641px){
        margin: 0 15px 0 0;
        span{
          strong{
            width: 184px;
            height: 184px;
          }
        }
        &#btn2{
          margin: 0;
          span{
            margin-right: 0;
          }
        }
      }
    }
  }
}
.create-single-section {
  @media screen and (max-width:641px){
    padding-left: 0!important;
    padding-right: 0!important;
  }
  padding-top: 0;
  .marketplace-tabs-main {
    h5 {
      font-size: 24px;
    }
    p {
      font-size: 14px;
      margin-bottom: 0;
    }
  }
  .marketplace-tabs {
    margin-top: 30px;
  }
  .upload__file {
    background: #06132d;
    border: 2px dashed #282a53;
    @include theme("themeLight", border-color, #dadada);
    @include theme("themeLight", background-color, $white);
    backdrop-filter: blur(40px);
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
    background: $color_bg_primary;
    border: 1px solid $item__border_color;
    @include theme("themeLight", background, $white);
    @include theme("themeLight", border-color, #dadada);
    backdrop-filter: blur(40px);
    // margin-bottom: 50px;
    /* Note: backdrop-filter has minimal browser support */

    border-radius: 5px;
  }
  .input__holder__single:focus {
    background: #06132d;
    @include theme("themeLight", background, $background_light);
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
    margin-bottom: 10px;
    @include theme("themeLight", color, $text-light);
  }
  .react-datepicker-wrapper {
    input {
      height: 40px;
      padding-left: 5px;
      background: $color_bg_primary;
      border: 1px solid $item__border_color;
      @include theme("themeLight", background, $white);
      @include theme("themeLight", border-color, #dadada);
      @include theme('themeLight', color, $text-light);
      border-radius: 6px;
    }
  }
  .upload-file-field {
    h5 {
      font-size: 24px;
      margin-bottom: 20px;
    }
    .browse {
      p {
        font-size: 14px;
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
    margin-bottom: 50px;
    .sublabel {
      font-size: 14px;
      color: #a2a2a2;
    }
  }
  .form-ccfield {
    border: 1px solid #282a53;
    @include theme("themeLight", border-color, #dadada);
    backdrop-filter: blur(40px);
    background-color: #06132d;
    @include theme("themeLight", background-color, $white);
    padding: 20px 30px;
    .btn-add,
    .btn-remove {
      background: linear-gradient(95.16deg, #fe00c7 2.64%, #0084fe 100%);
      // border: 3px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      display: inline-block;
      font-size: 16px;
      padding: 5px 20px;
      height: auto;
    }
    .btn-remove {
      padding: 8px 20px;
    }
    .sublabel {
      margin-bottom: 30px;
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
      span {
        // background: linear-gradient(90deg, rgba(244, 5, 201, 0.07) -1.88%, rgba(57, 147, 255, 0.07) 129.09%);
        background: #121435;
        @include theme("themeLight", background-color, #b9bad1);
        @include theme("themeLight", box-shadow, 0px 0px 20px 5px #cacaca inset);
        padding: 1px;
        border-bottom-right-radius: 50px;
        display: block;
        strong {
          border: 1px solid #282a53;
          backdrop-filter: blur(40px);
          background-color: #121435;
          @include theme("themeLight", box-shadow, 0px 0px 20px 5px #cacaca inset);
          @include theme("themeLight", background-color, $white);
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
          color: #ffffff;
          @include theme("themeLight", color, #121435);
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
          background-image: url("../images/tab-img-bg.png");
          background-size: 100% 100%;
          margin: 0 auto;
          color: $white;
          margin-bottom: 10px;
          font-style: normal;
          img {
            width: 34px;
          }
        }
        &:hover {
          border: none;

          background-image: url("../images/tab-bg-hover.png");
          // &:after{
          //   border-color: $pink_col;
          // }

          i {
            color: $white;
            background-image: url("../images/tab-img-bg-hover.png");
          }
        }
      }
      &:hover {
        border: 0px;
        background: none;
        background-color: transparent;
        span {
          background: rgb(63, 94, 251);
          background: linear-gradient(90deg, rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%);
          strong {
            // border-color: $pink_col;
            // color: $pink_col;
            border: none;

            background-color: #121435;
            @include theme("themeLight", background-color, $white);
            // &:after{
            //   border-color: $pink_col;
            // }
          }
          i {
            color: $white;
            background-image: url("../images/tab-img-bg-hover.png");
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
  .form-cfield{
    .upload__file{
      &#pet-select{
        background-color:$white;
        border:1px solid $white;
        width: 100%;
        height: auto;
        padding: 10px;
      }
    }
  }
}
.checkout {
  .maincheckout {
    &.modal-style-1 {
      background-color: #0e193b;
      max-width: 800px;
      padding: 0;
      .modal-header {
        border-bottom: 0px;
        font-size: 32px;
        color: #ffffff;
        justify-content: center;
        padding: 25px 0;
        background: $gradient2;
        border-bottom: 0.5px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(80px);
        @include theme("themeLight", background, $background_light);
        @include theme("themeLight", background-color, $background_light);
        .modal-title {
          margin-bottom: 0;
          font-size: 32px;
          @include theme("themeLight", color, $text-heading-light);
        }
        .btn-close {
          background: transparent;
          @include theme("themeLight", color, $text-light);
        }
      }
      .modal-content {
        background-color: #0e193b;
        @include theme("themeLight", background-color, $white);
        border: 0px;
        border-radius: 0px;
        padding: 30px;
        padding-bottom: 50px;
        max-height: 600px;
        overflow-y: scroll;
        .form-cfield {
          h6 {
            color: #ffffff;
          }
          .form-control {
            background: transparent;
            border: 1px solid #282a53;
            color: $white;
            @include theme('themeLight', color, $text-light);
            @include theme("themeLight", border-color, #dadada);
          }
        }
        .btn-main {
          margin-top: 0;
          &.btn-create {
            padding: 13px 40px;
            font-size: 16px;
          }
        }
        &::-webkit-scrollbar {
          width: 3px;
        }

        &::-webkit-scrollbar-track {
          background: rgb(255, 255, 255, 0.1);
        }

        &::-webkit-scrollbar-thumb {
          background: #00b2fe;
          border-radius: 10px;
        }

        &:hover::-webkit-scrollbar-thumb {
          background: #32bbf5;
        }
        .themeLight & {
          &::-webkit-scrollbar {
            width: 3px;
          }

          &::-webkit-scrollbar-track {
            background: #aba0a0;
          }

          &::-webkit-scrollbar-thumb {
            background: #19baff;
            border-radius: 10px;
          }

          &:hover::-webkit-scrollbar-thumb {
            background: #32bbf5;
          }
        }
      }
      &.modal-width-small{
        max-width: 550px;
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
    color: $white;
    @include theme("themeLight", color, $text-light);
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
  border: dashed 3px $light-gray;
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
        box-shadow: 2px 2px 20px 0px $pink_col;
        transition: all 0.3s ease;
      }
    }
    .btn-main {
      padding: 13px 40px;
      font-size: 16px;
    }
  }
}
.createsingle-imagemain {
  // &:after {
  // content: "";
  background: linear-gradient(to left, #0084fe, #fe00c7) !important;
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
  padding: 2px;
  // }
  .nft__item {
    background-color: #06132d;
    @include theme("themeLight", background-color, $white);
    padding: 0;
    .author_list_pp {
      border: 6.27631px solid rgba(0, 0, 0, 0.01);
      backdrop-filter: blur(10.4096px);
      background-color: transparent;
      position: relative;
      margin-top: 15px;
      @include theme("themeLight", border-color, $background_light);
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
      padding-top: 35px;
      padding-left: 30px;
      padding-right: 30px;
      height: auto;
      h4 {
        font-size: 26px;
        font-weight: 600;
        letter-spacing: 0.01em;
      }
      .nft__item_price {
        font-size: 22px;
        span {
          float: right;
          @include theme("themeLight", color, $text-light);
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
          font-size: 22px;
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
    top: 56%;
    left: 7%;
    background-color: #ffffff;
    font-size: 22px;
    font-weight: 700;
    > div {
      justify-content: center;
    }
  }
}

`;
export default CreateSingleWrapper;