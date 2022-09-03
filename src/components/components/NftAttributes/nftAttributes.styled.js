import styled from "styled-components";

const NftAttributeWrapper = styled.div`
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

`
export default NftAttributeWrapper;