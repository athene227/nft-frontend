import styled from 'styled-components';

const HeaderWrapper = styled.div`
  /*navbar*/

  .navbar {
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.colors.navBg};
    color: ${({ theme }) => theme.colors.navColor};
    border-bottom: solid 1px rgba(255, 255, 255, 0);
    z-index: 999;
    transition: all 0.6s ease;
    &.white {
      a {
        // color: $white;
        color: inherit;
        // @include theme("themeDark", color, $white);
        // @include theme("themeLight", color, $text-light);
      }

      .btn {
        color: ${({ theme }) => theme.colors.white};

        .lines {
          top: 24px;
        }
      }
    }

    .w-100-nav {
      margin: 0;
      width: 100%;
      justify-content: left;
      align-items: center;
      flex-wrap: nowrap;
    }

    a {
      position: relative;
      font-size: 14px;
      font-weight: 600;
      padding: 0 5px 0 0;
      text-decoration: none !important;
      color: ${({ theme }) => theme.colors['text-light']};
      outline: none;
      transition: all 0.3s ease;

      &:hover {
        color: ${({ theme }) => theme.colors['text-light']};
        transition: all 0.3s ease;
      }

      &.active {
        transition: all 0.3s ease;

        &:before {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 0;
          left: 0;
          top: 0;
          background: 0;
          cursor: default;
        }
      }
    }

    .navbar-title {
      margin-right: auto;
      font-size: 150%;
      padding: 12px 16px;
    }

    .navbar-item {
      position: relative;
      display: inline-block;
      padding: 30px 6px;
      height: max-content;
      cursor: default;

      .lines {
        position: absolute;
        top: 22px;
        display: block;
        width: 0;
        border-bottom: 2px solid ${({ theme }) => theme.colors.color_primary};
        transition: 0.7s;
      }

      &:hover {
        .lines {
          width: 90%;
          transition: 0.7s;
        }
      }
    }

    .breakpoint__xl-only {
      width: max-content;
      margin-left: auto;
    }

    .logo {
      width: max-content;
      padding-right: 30px;

      .navbar-item {
        position: relative;
        top: 2px;
        left: 0px;
        padding: 0;
        width: max-content;
        border-bottom: none;

        a {
          padding: 0;

          .d-3 {
            // display: none;
          }
        }
      }
    }

    .menu {
      display: flex;
      justify-content: flex-end;
    }

    .nav-icon {
      display: none;
    }

    @media only screen and (max-width: 1199px) {
      .m-2-hor {
        padding: 0px 2%;
      }
      .menu {
        display: block;
        padding: 15px 0 10px;
      }
      &.navbar {
        position: relative;

        .logo {
          display: inline-block;
        }

        .search {
          display: inline-block;
          position: relative;
          // top: -22px;
          top: 0px;

          #quick_search {
            width: 100%;
          }
        }

        .mainside {
          position: absolute;
          right: 60px;
          top: 18px;
        }

        .dropdown-custom.btn {
          color: ${({ theme }) => theme.colors.white};
          width: 100%;
          text-align: left;

          &::after {
            float: right;
            font-size: 0.9rem;
          }
        }
      }
      .w-100-nav {
        display: block;
        // padding: 20px 2%;
      }
      .navbar-item {
        display: block;
        padding: 15px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
      .nav-icon {
        position: absolute;
        top: 35px;
        right: 25px;
        display: block;
        width: 20px;
        height: 10px;
        padding-top: 13px;
        line-height: 0;
        cursor: pointer;
        background: none;
        border: none;
        padding: 0;
        z-index: 9999;
      }
      .bg-nav-icon {
        width: 32px;
        height: 24px;
        background: rgba(255, 255, 255, 0);
        border-radius: 2px;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
      }
      #nav-icon span,
      .nav-icon span {
        display: none;
        position: absolute;
        top: 5px;
        left: -40px;
        font-size: 0.62rem;
        font-weight: 600;
        text-transform: uppercase;
      }
      .menu-line {
        position: absolute;
        width: 100%;
        height: 2px;
        top: 0px;
        background-color: ${({ theme }) => theme.colors.white};
      }
      .menu-line1 {
        position: absolute;
        width: 100%;
        height: 2px;
        top: 5px;
        background-color: ${({ theme }) => theme.colors.white};
      }
      .menu-line2 {
        position: absolute;
        width: 100%;
        height: 2px;
        top: 10px;
        background-color: ${({ theme }) => theme.colors.white};
      }
      &.sticky {
        position: absolute !important;
      }
    }
    @media only screen and (max-width: 641px) {
      &.navbar {
        .search {
          display: none;
        }

        .mainside {
          a {
            font-size: 13px;
            padding: 4px 10px;
          }
        }

        .logo {
          display: inline-block;
        }
      }
    }

    &.sticky {
      position: fixed;
      top: 0;
      width: 100%;
      background: ${({ theme }) => theme.colors.navsticky};
      border-bottom: 0;
      transition: all 0.6s ease;

      &.white {
        background: ${({ theme }) => theme.colors.navsticky};
        box-shadow: ${({ theme }) => theme.colors.navWhitebs};

        .btn {
          color: ${({ theme }) => theme.colors['theme-light']};
        }

        a {
          color: ${({ theme }) => theme.colors['theme-light']};
        }
      }
    }

    .search {
      display: flex;
      width: max-content;
      padding-left: 30px;
      position: relative;

      #quick_search {
        padding: 4px 11px;
        padding-left: 2rem;
        border: none;
        border-radius: 10px;
        font-size: 15px;
        color: ${({ theme }) => theme.colors.white};
        background: rgba(255, 255, 255, 0.1);
        width: 274px;
        height: 34px;
        outline: none;
        transition: 0.7s;

        &:hover {
          transition: 0.7s;
          box-shadow: 0px 0px 0px 4px
            ${({ theme }) => theme.colors.color_primary};
        }
      }

      i {
        color: ${({ theme }) => theme.colors.color_placeholder};
        left: 40px;
        position: absolute;
        top: 8px;
      }
    }

    .mainside {
      width: max-content;
      padding-left: 0;
      padding-right: 0;

      a {
        text-align: center;
        color: #fff !important;
        background: ${({ theme }) => theme.colors.color_primary};
        border-radius: 30px;
        letter-spacing: normal;
        outline: 0;
        font-weight: 800;
        text-decoration: none;
        padding: 6px 20px;
        font-size: 14px;
        border: none;
        cursor: pointer;
        box-shadow: 2px 2px 20px 0px rgba(131, 100, 226, 0);
        transition: all 0.3s ease;

        &:hover {
          box-shadow: 2px 2px 20px 0px
            ${({ theme }) => theme.colors.color_primary};
          transition: all 0.3s ease;
        }
      }
    }

    .profile_image_container {
      cursor: pointer;
      // position: absolute;
      display: inline-block;
      width: 50px;
      height: 50px;
      background: ${({ theme }) => theme.colors.color_primary};
      margin-right: 10px;
      border-radius: 100% !important;
      z-index: 1;
      transition: 0.3s;

      &:hover img {
        padding: 3px;
        -webkit-box-shadow: 0px 0px 0px 2px
          ${({ theme }) => theme.colors.color_primary};
        transition: 0.3s;
      }

      .profile_image {
        width: 100%;
        height: 100%;
        border-radius: 100% !important;
        -moz-border-radius: 100% !important;
        -webkit-border-radius: 100% !important;
        position: relative;
        z-index: 1;
      }
    }
  }
  //header
  .de-menu-profile {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;

    img {
      width: 38px;
      border-radius: 30px;
      -moz-border-radius: 30px;
      -webkit-border-radius: 30px;
      // margin-left: 5px;
      margin-bottom: 2px;
    }

    .popshow {
      cursor: default;
      width: 350px;
      position: absolute;
      background: linear-gradient(
        to right,
        rgba(254, 0, 199, 0.2),
        rgba(14, 30, 69, 0.2)
      );
      backdrop-filter: blur(20px);
      border-radius: 5px;
      overflow: hidden;
      inset: 55px auto auto -300px;
      padding: 20px;
      animation: smoothDrop 0.2s ease;
      -webkit-animation: smoothDrop 0.2s ease;
      box-shadow: 2px 2px 30px 0px rgba(20, 20, 20, 0.1);
      z-index: 1;

      .d-name {
        margin-bottom: 15px;

        h4 {
          font-weight: bold;
          display: block;
          margin: 0;
          padding: 0;
          font-size: 16px;
          margin-top: 5px;
          color: gray;
        }

        span.name {
          color: ${({ theme }) => theme.colors.pink_col};
          cursor: pointer;
        }

        span.d-wallet-address {
          float: right;
          cursor: pointer;
          padding-top: 5px;
        }
      }

      .d-balance {
        font-size: 18px;
        margin-bottom: 15px;
        background: #020b1d;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        font-weight: 600;
        border: 1px solid #fe00c7;

        h4 {
          font-weight: bold;
          display: block;
          margin: 0;
          padding: 0;
          font-size: 16px;
          margin-top: 5px;
          color: gray;
        }
      }

      .d-wallet {
        font-size: 14px;
        margin-bottom: 15px;
        color: ${({ theme }) => theme.colors.pink_col};

        h4 {
          font-weight: bold;
          display: block;
          margin: 0;
          padding: 0;
          font-size: 16px;
          margin-top: 5px;
          color: black;
        }

        .d-wallet-address {
          display: inline-block;
          max-width: 64%;
          overflow: hidden;
        }

        /*#btn_copy {
          margin-left: 15px;
        }*/
      }

      .d-line {
        margin: 15px 0 15px 0;
        border-top: solid 1px #bbbbbb;
      }

      .de-submenu-profile {
        list-style: none;
        margin: 0;
        padding: 0;

        li {
          padding: 5px 0;

          span {
            cursor: pointer;
            color: white;
            background: none;
            padding: 0;
            font-weight: bold;
            font-size: 14px;
            display: block;
            text-align: left;

            &:hover {
              box-shadow: none;
            }

            i {
              color: white;
              font-size: 16px;
              font-weight: bold;
              padding: 5px;
            }
          }
        }
      }

      @media screen and (max-width: 992px) {
        width: 320px;
        inset: 55px auto auto -230px;
      }
    }

    .p_collectible_quantity {
      font-weight: 400;
      padding-left: 70px;

      span {
        display: block;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.2em;
      }

      b {
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;
export default HeaderWrapper;
