import styled from 'styled-components';

const CollectionDetailWrapper = styled.div`
  .collection-detail-banner {
    min-height: 280px;
    margin-top: 85px;
  }

  .collection-banner-details {
    .profile_avatar {
      .profile-avatar-image {
        max-width: 150px;
        position: relative;
        img {
          border: 5px solid #ffffff;
          border-radius: 20px;
        }
        svg {
          position: absolute;
          right: -15px;
          bottom: -15px;
        }
      }
      .profile_name {
        svg {
          margin-right: 6px;
          margin-top: -5px;
        }
        .profile-check-icon {
          width: 32px;
          margin-top: -3px;
        }
        h4 {
          font-size: 32px;
          line-height: 39px;
          letter-spacing: 0.01em;
        }
      }
      .profile-username-cta {
        /* display: flex; */

        .profile-username {
          margin-right: 20px;
          font-size: 16px;
          line-height: 25px;
          /* identical to box height, or 156% */

          letter-spacing: 0.02em;

          color: #828996;
          .profile_username {
            background: linear-gradient(90deg, #fe00c7 0%, #0084fe 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            display: inline-block;
            font-weight: 700;
          }
          .profile_wallet {
            font-size: 18px;
            color: ${({ theme }) => theme.colors.white};
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 200px;
            overflow: hidden;
            margin-left: 8px;
            font-weight: 700;
            display: inline-block;
            position: relative;
            top: 7px;
          }
        }

        .profile-cta {
          font-weight: 500;

          .profile_wallet {
            font-size: 18px;
            color: ${({ theme }) => theme.colors.white};
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 200px;
            overflow: hidden;
            float: left;
          }

          span#btn_copy {
            cursor: pointer;
            color: ${({ theme }) => theme.colors.white};
          }
        }
      }
    }
    .collection-profile-links {
      .profileSocial {
        display: flex;
        padding-left: 0;

        li {
          list-style: none;
          margin-right: 30px;

          a {
            color: ${({ theme }) => theme.colors.white};
          }
        }
      }
      .profile-extra-icons {
        display: flex;
        padding-left: 30px;
        border-left: 1px solid rgba(255, 255, 255, 0.15);
        gap: 20px;
        list-style: none;
        li {
          a {
            color: rgba(255, 255, 255, 0.4);
          }
        }
      }
    }
    .profileDescription {
      margin-top: 30px;
      // margin-left: 20px;
      margin-bottom: 40px;
      ul {
        padding-left: 0;
        li {
          font-weight: 700;
          font-size: 20px;
          line-height: 25px;
          /* identical to box height, or 125% */
          letter-spacing: 0.02em;
          color: #ffffff;
          list-style: none;
          padding-left: 30px;
          padding-right: 30px;
          border-right: 1px solid rgba(255, 255, 255, 0.15);
          text-align: center;
          &:first-of-type {
            padding-left: 0;
          }
          &:last-of-type {
            padding-right: 0;
            border-right: 0px;
          }
          span {
            font-weight: 400;
            font-size: 16px;
            line-height: 25px;
            /* identical to box height, or 156% */
            letter-spacing: 0.02em;
            color: #828996;
            display: block;
          }
        }
      }
      @media screen and (max-width: 767px) {
        margin: 0;
      }
    }
  }
  .nft-collection-details {
    padding-top: 0;
    margin-top: -75px;
    padding-bottom: 0;
    background: ${({ theme }) => theme.colors.gradient1};

    .profile_avatar {
      display: block;

      .profile-avatar-image {
        position: relative;

        i {
          color: ${({ theme }) => theme.colors.white};
          background: ${({ theme }) => theme.colors.pink_col};
          margin: 110px 0 0 110px;
          display: block;
          position: absolute;
          padding: 10px;
          border-radius: 100%;
          -moz-border-radius: 100%;
          -webkit-border-radius: 100%;
          bottom: 0;
        }
      }

      .profile_name {
        margin-top: 25px;
        display: block;

        // margin-left: 20px;
        .profile_username {
          font-size: 16px;
          display: block;
          color: ${({ theme }) => theme.colors.pink_col};
        }

        h4 {
          font-size: 24px;
          line-height: 1.3em;
        }
      }

      img {
        object-fit: cover;
        display: flex;
        align-items: center;
        border-radius: 100%;
        -moz-border-radius: 100%;
        -webkit-border-radius: 100%;
        width: 150px;
        height: 150px;
      }
    }

    .d_profile {
      margin-bottom: 50px;

      @media screen and (max-width: 768px) {
        display: block;

        .de-flex-col {
          display: block;
        }
      }
    }

    .nft-profile-tabs {
      background: #06142d;

      .items_filter {
        border-bottom: 1px solid
          ${({ theme }) => theme.colors.item__border_color};

        .de_nav {
          &.text-left {
            margin: 0;
            text-align: center !important;
          }

          li {
            margin-left: 50px;
            margin-right: 50px;

            @media screen and (max-width: 1199px) {
              margin-left: 20px;
              margin-right: 20px;
            }

            @media screen and (max-width: 767px) {
              margin-left: 0px;
              margin-right: 0px;
            }

            span {
              color: ${({ theme }) => theme.colors.general};
              border: 0;
              border-bottom: 1px solid ${({ theme }) => theme.colors.general};
              margin-right: 0;
              padding-left: 30px;
              padding-right: 30px;

              @media screen and (max-width: 767px) {
                padding-left: 15px;
                padding-right: 15px;
                display: flex;
                flex-direction: column;
              }

              strong {
                background-color: ${({ theme }) => theme.colors.general};
                color: ${({ theme }) => theme.colors.white};
                padding: 2px 6px;
                border-radius: 15px;
              }
            }

            &.active {
              span {
                color: ${({ theme }) => theme.colors.color_primary};
                border-color: ${({ theme }) => theme.colors.color_primary};

                strong {
                  background-color: ${({ theme }) =>
                    theme.colors.color_primary};
                }
              }
            }
          }
        }
      }
    }

    .collection-sidebar-container {
      border: 3px solid #fff;
      padding: 20px;
    }
    .collection-sidebar {
      width: 30%;
      float: left;
      padding: 20px;
      border: 2px solid red;
    }
    .collection-main-content {
      width: 50%;
      float: right;
      padding: 20px;
      border: 2px solid red;
    }
    .de_countdown {
      position: absolute;
      top: 60%;
      left: 9%;
      background-color: #ffffff;
      font-size: 17px;
      font-weight: 700;
      justify-content: center;
      display: flex;
      width: 80%;
      color: $white;
      z-index: 1;
    }

    .author_list_pp {
      position: static;

      @media screen and (max-width: 1400px) {
        margin-left: 0;
      }
    }

    .profile-banner-details {
      @media screen and (max-width: 767px) {
        display: block;
      }
    }
  }
  .nft-profile-tabs {
    padding-top: 50px;
  }
  .nft-collection-tabs {
    padding-left: 48px;
    padding-right: 48px;
    border-bottom: 1px solid #282a53;
    .MuiButtonBase-root {
      color: rgba(255, 255, 255, 0.5);
      &.Mui-selected {
        background: linear-gradient(90deg, #fe00c7 0%, #0084fe 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }
    }
    .MuiTabs-indicator {
      background: linear-gradient(90deg, #fe00c7 0%, #0084fe 100%);
    }
  }
  .nft-collection-tabscontent {
    padding: 24px;
  }
  .sorting-dropdown {
    position: relative;
    margin-right: 10px;
    .filter-button {
      border: 1px solid #282a53;
      border-radius: 10px;
      padding: 15px;
      padding-right: 80px;
      svg.button__icon {
        display: none;
      }
      span {
        i {
          top: 19px;
        }
      }
    }
  }
  .global-search .MuiAutocomplete-inputRoot fieldset {
    border: none;
  }
  .global-search svg {
    opacity: 0.5;
  }
  .global-search .MuiAutocomplete-inputRoot:hover fieldset {
    border: none;
  }
  .icon-view {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 13px;
    .icon-view-inner {
      padding: 0;
    }
  }
  .collection-filter-bar {
    margin-bottom: 20px;
    .collection-filter {
      padding-left: 0;
    }
    .filter-icon {
      margin-right: 10px;
    }
    .search.global-search {
      margin-right: 56px;
      .MuiOutlinedInput-root {
        padding-left: 20px;
        color: #ffffff;
      }
      input {
        color: #ffffff;
      }
    }
  }
  .collection-filter-secondary {
    padding-left: 0;
    margin-bottom: 17px;
    .filter-update-info {
      position: relative;
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 14px;
      line-height: 18px;
      margin-right: 90px;
      color: #ffffff;
      span {
        background: linear-gradient(95.16deg, #fe00c7 2.64%, #0084fe 100%);
        opacity: 0.1;
        border: 1.5px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        position: relative;
        width: 40px;
        height: 40px;
        display: inline-block;
        margin-right: 15px;
      }
      i {
        position: absolute;
        color: #ffffff;
        left: 13px;
        top: 11px;
        font-size: 18px;
      }
    }
    .filter-tags {
      ul {
        display: flex;
        list-style: none;
        margin-bottom: 0;
        li {
          background: linear-gradient(
            90deg,
            rgba(254, 0, 199, 0.3) 0%,
            rgba(0, 132, 254, 0.3) 100%
          );
          /* opacity: 0.1; */
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #ffffff;
          font-size: 14px;
          line-height: 18px;
          padding: 11px 15px;
          &:last-of-type {
            background: none;
            border: none;
            padding-top: 12px;
          }
          i {
            margin-left: 17px;
          }
        }
      }
    }
    .total-items {
      font-weight: 700;
      font-size: 18px;
      line-height: 23px;
      color: #ffffff;
    }
  }
  .collection-filter-sidebar {
    position: relative;
    .EZDrawer .EZDrawer__container {
      position: absolute;
      top: 21px !important;
      /* width:100%!important; */
      width: 227px !important;
      background: #091838;
      backdrop-filter: blur(40px);
      height: 100% !important;
      /* Note: backdrop-filter has minimal browser support */

      border-radius: 10px;
      &.filter-width {
        /* width:100%!important; */
      }
      .collection-filter-header {
        background: linear-gradient(
          95.16deg,
          rgba(254, 0, 199, 0.1) 2.64%,
          rgba(0, 132, 254, 0.1) 100%
        );
        border: 1.5px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px 10px 0px 0px;
        padding: 14px 19px;
        span {
          font-weight: 700;
          font-size: 20px;
          line-height: 25px;
          /* identical to box height */

          letter-spacing: 0.01em;

          background: linear-gradient(97.24deg, #fe00c7 23.29%, #3993ff 78.51%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
      }
      .collection-filter-content {
        .MuiFormControl-root {
          display: flex;
        }
        .MuiAccordionSummary-content {
          margin: 15px 0;
          margin-bottom: 17px;
          &.Mui-expanded {
            margin: 15px 0;
            min-height: 10px;
            margin-bottom: 17px;
          }
          .MuiTypography-root {
            font-weight: 700;
          }
        }
        .MuiAccordionSummary-expandIconWrapper {
          color: #ffffff;
        }
        .MuiAccordion-root {
          background: transparent;
          color: #ffffff;
          border-radius: 0px;
          /* border-bottom:1px solid rgba(255,255,255,0.1); */
          border: none;
          backdrop-filter: none;
          box-shadow: none;
          position: relative;
          margin-bottom: 0;
          &.Mui-expanded {
            margin-top: 0;
          }
          &:after {
            content: '';
            background-color: rgba(255, 255, 255, 0.1);
            height: 1px;
            width: 90%;
            left: 5%;
            position: absolute;
            bottom: 0;
          }
        }
        .MuiAccordionDetails-root {
          padding-top: 0;
          padding-bottom: 0;
          & > .MuiTypography-root {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
        }
        .MuiFormControlLabel-root {
          width: 100%;
          justify-content: space-between;
          display: flex;
          margin-left: 0;
          margin-bottom: 16px;
          .MuiCheckbox-root,
          .MuiRadio-root {
            padding-right: 0;
            color: rgba(255, 255, 255, 0.6);
            padding-top: 0;
            padding-bottom: 0;
            .MuiSvgIcon-root {
              font-size: 23px;
            }
          }
          .MuiRadio-root {
            color: rgba(255, 255, 255, 0.15);
            &:hover {
              color: rgba(255, 255, 255, 1);
            }
            .MuiSvgIcon-root {
              font-size: 22px;
            }
            &.Mui-checked {
              color: rgba(255, 255, 255, 1);
            }
          }
          .MuiFormControlLabel-label {
            opacity: 0.5;
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;
            .label-counter {
              position: absolute;
              right: 35px;
            }
          }
        }
        .MuiAccordionSummary-root {
          &.Mui-expanded {
            min-height: 20px;
          }
        }
        .MuiCollapse-wrapper {
          box-shadow: none;
        }
      }
    }
    .form-control-select {
      .MuiSelect-select {
        font-weight: 700;
        font-size: 12px;
        line-height: 16px;
        color: #ffffff;
        opacity: 0.5;
        padding: 7px 10px;
        background: transparent;
      }
      .MuiSelect-icon {
        right: 5px;
      }
      margin-bottom: 10px;
    }
    .minmax-filters {
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        gap: 12px;
        margin-bottom: 10px;
        li {
          .MuiFormControl-root {
            background: #132140;
            border-radius: 5px;
            font-weight: 700;
            font-size: 12px;
            line-height: 16px;
            /* identical to box height */

            color: #ffffff;

            /* opacity: 0.5; */
          }
          .MuiInputBase-root {
            color: #ffffff;
          }
          .MuiOutlinedInput-input {
            padding: 7px 10px;
            text-align: center;
            /* padding-top:4px; */
            padding-left: 0;
            opacity: 0.5;
            /* background: #132140; */
          }
          .MuiOutlinedInput-notchedOutline {
            /* border:1px solid rgba(255,255,255,0.5); */

            border: none;

            border-radius: 5px;
            legend {
              background: transparent;
              display: none;
            }
          }
        }
      }
      button {
        border-radius: 5px;
        padding: 8px 10px;
        margin-bottom: 25px;
      }
    }
  }
  .container-padding-top {
    padding-top: 24px;
  }
  .collection-filter-content{
    .filter-searchbar {
    /* width: 100% !important; */
    /* &.MuiAutocomplete-root { */
      &.MuiFormControl-root {
        background: #132140;
        border-radius: 5px;
        font-weight: 700;
        font-size: 12px;
        line-height: 16px;
        padding: 5px 0;
        /* identical to box height */

        color: #ffffff;

        /* opacity: 0.5; */
        margin-bottom: 14px;
        .MuiInputBase-root {
          color: #ffffff;
        }
        .MuiOutlinedInput-input {
          padding: 0 10px;
          /* padding-top:4px; */
          padding-left: 0;
          opacity: 0.5;
          /* background: #132140; */
        }
        .MuiInputAdornment-root {
          /* opacity:0.5; */
          svg {
            width: 12px;
            height: 12px;
          }
        }
        .MuiOutlinedInput-notchedOutline {
          /* border:1px solid rgba(255,255,255,0.5); */

          border: none;

          border-radius: 5px;
          legend {
            background: transparent;
            display: none;
          }
        }
      }
    /* } */
  }
  
  }

  .collection-search-filter {
    width: 100%;
  }
`;
export { CollectionDetailWrapper };
