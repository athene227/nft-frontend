import { createGlobalStyle } from 'styled-components';

import * as theme from './themeVariables';

// [Table of contents]
// *
// *
// *

//   color / $white
//   font / @import
//   general / html
//   dropdown / .dropdown-custom.btn
//   navbar / .navbar
//   breadcumb / .breadcumb
//   home / .subheading
//   icon scroll / .icon-scroll-wraper
//   footer / footer
//   portofolio / AppContainer
//   contact / .form-side
//   news / .post-content
//   create file / .d-create-file
//   activity / .filter__l
//   feature box / .feature-box .inner
//   column nft / .nft_coll
//   countdown / .de_countdown
//   author list / .author_list
//   icon box / .icon-box
//   carousel / .d-carousel
//   filter / .items_filter
//   colection / #profile_banner
//   item details / .item_info
//   wallet / .box-

//   login / .field-set label
//   all icon / .demo-icon-wrap-s2
//   element / .card-header

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors['background']};
    font-family: "DM Sans", Helvetica, Arial, sans-serif;
    font-family: 'Neulis Alt';
    font-weight: 300;
    font-size: 16px;
    color: ${({ theme }) => theme.colors['general']};
    word-spacing: 0px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  /* Heading */
  h1,
h2,
h4,
h3,
h5,
h6,
.h1_big,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  margin-top: 0;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textHeading};
}
h1,.h1 {
  font-size: 50px;
  margin-bottom: 20px;
  line-height: 1.2em;
  letter-spacing: -1px;
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none; 
}

h1{
  &.s1 {
    letter-spacing: 30px;
    font-size: 26px;
  }
  .label {
    display: inline-block;
    font-size: 36px;
    padding: 0 6px;
    margin-left: 10px;
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
  }
  .small-border {
    margin-top: 30px;
  } 
  &.big,
  &.h1_big {
    font-size: 64px;
    margin: 0;
    line-height: 70px;
  }
  &.very-big {
    font-size: 120px;
    letter-spacing: -5px;
  }
  &.ultra-big {
    font-size: 140px;
    line-height: 120px;
    letter-spacing: -6px;
    font-weight: 700;
    margin-bottom: 0;
    span {
      display: inline-block;
      &.underline{
          span {
          display: block;
          border-bottom: solid 12px ${({ theme }) => theme.colors.white};
          position: relative;
          margin-top: -5px;
        }
      }
    }
  }
  &.very-big-2 {
    font-size: 90px;
    letter-spacing: 25px;
    text-transform: uppercase;
    font-weight: bold;
  }
}

.h2_title {
  font-size: 28px;
  display: block;
  margin-top: 0;
  line-height: 1.2em;
}

h2{
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 36px;
  line-height: 46px;
  .small-border {
    margin-left: 0;
    margin-bottom: 15px;
    width: 40px;
  }
  .uptitle {
  display: block;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0;
  font-weight: 500;
} 
&.style-2 {
  font-size: 30px;
  margin-bottom: 20px;
  }
  &.big {
  font-size: 48px;
  line-height: 1.3em;
  margin-bottom: 0;
  }
  &.s1,
  &.h2_s1 {
    font-size: 24px;
  }
  &.deco-text{
    span {
      font-family: "Parisienne";
      display: block;
      line-height: 0.85em;
      font-weight: lighter;
      -webkit-transform: rotate(-5deg);
      -moz-transform: rotate(-5deg);
      -o-transform: rotate(-5deg);
      transform: rotate(-5deg);
    }
    .md {
      font-size: 80px;
    }
    .lg {
      font-size: 120px;
    }
    .xl {
      font-size: 150px;
    }
  }
}

h3 {
  font-size: 22px;
  margin-bottom: 25px;
}

h4 {
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 10px;
  &.teaser {
    font-weight: 300;
    font-size: 22px;
  }
  &.s1 {
    letter-spacing: 10px;
    font-weight: 400;
    font-size: 16px;
  }
  &.s2 {
    font-family: "Inter", Arial, Helvetica, sans-serif;
    font-weight: 200;
    line-height: 1.8em;
  }
  &.s3 {
    font-family: "Parisienne";
    font-size: 60px;
    font-weight: lighter;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 15px;
  }
}

.subtitle.s2 {
  font-size: 20px;
  font-weight: 500;
  line-height: 32px;
}

.subtitle.s2 span {
  margin-right: 20px;
  padding-left: 20px;
}

.subtitle.s2 i {
  margin-right: 10px;
}

.subtitle.s2 span:first-child {
  padding-left: 0;
}

.call-to-action h4 {
  text-transform: none;
  font-size: 20px;
}

h1.slogan_big {
  font-weight: 400;
  font-size: 64px;
  line-height: 64px;
  letter-spacing: -2px;
  padding: 0;
  margin: 0px 0 30px 0;
}

h1.title {
  font-size: 64px;
  letter-spacing: 10px;
}

h1.title strong {
  text-transform: none;
  letter-spacing: 0;
  font-weight: normal;
}

h1.hs1 {
  font-family: "Parisienne";
  font-size: 96px;
  display: inline-block;
  -webkit-transform: rotate(-5deg);
  -moz-transform: rotate(-5deg);
  -o-transform: rotate(-5deg);
  transform: rotate(-5deg);
}

h1.hs2 {
  font-family: "Parisienne";
  font-size: 72px;
  display: inline-block;
  font-weight: lighter;
}

h2.subtitle {
  margin-top: 0;
}

h2.name {
  color: ${({ theme }) => theme.colors.white};
  font-size: 84px;
  line-height: 50px;
}

h2.name span {
  display: block;
  font-size: 32px;
}

h2.name-s1 {
  color: ${({ theme }) => theme.colors.white};
  font-size: 84px;
  font-weight: 700;
  line-height: 50px;
}

h2.name-s1 span {
  display: block;
  font-size: 32px;
}

h2.hw {
  display: block;
  font-family: "Parisienne";
  font-size: 48px;
  text-transform: none;
  font-weight: lighter;
}

h2.deco {
  text-align: center;
  font-weight: 600;
  font-size: 20px;
}

h2.deco span {
  display: inline-block;
  position: relative;
}

h2.deco span:before,
h2.deco span:after {
  content: "";
  position: absolute;
  border-top: 1px solid #bbb;
  top: 10px;
  width: 100px;
}

h2.deco span:before {
  right: 100%;
  margin-right: 15px;
}

h2.deco span:after {
  left: 100%;
  margin-left: 15px;
}

h2.hs1 {
  font-size: 40px;
}

h2.hs1 i {
  font-size: 48px;
  position: relative;
  top: 10px;
  color: #ff0042;
  margin: 0 10px 0 10px;
}

h2.hs1 span {
  font-size: 48px;
  position: relative;
  top: 10px;
  font-family: "Miama";
  margin: 0 15px 0 10px;
  font-weight: normal;
}

h2 .de_light .text-light h2 {
  color: ${({ theme }) => theme.colors.white};
}

.text-light h2.deco span:before,
.text-light h2.deco span:after {
  border-top: 1px solid rgba(255, 255, 255, 0.5);
}

h2.s2 {
  font-weight: 400;
}

h2.s3 {
  font-size: 36px;
  margin-bottom: 20px;
}

h4.style-2 {
  font-size: 18px;
}

h4.title {
  border-bottom: solid 1px ${({ theme }) => theme.colors['light-gray']};
  padding-bottom: 10px;
  margin-bottom: 20px;
}

h5.s2 {
  letter-spacing: 1px;
  font-size: 14px;
}

h5 {
  font-size: 18px;
}

h4.s1 {
  font-size: 12px;
  letter-spacing: 20px;
  text-transform: uppercase;
  font-weight: 500;
}
/* Heading */
p.lead {
  font-size: 18px;
  line-height: 1.7em;
  margin-top: 0;
  font-weight: 400;
}

.span-red {
  color: red;
}

.btn-main {
  display: block;
  width: max-content;
  text-align: center;
  color:${({ theme }) => theme.colors['white']}!important;
  background: ${({ theme }) => theme.colors['pink_col']};
  border-radius: 30px;
  letter-spacing: normal;
  outline: 0;
  font-weight: 600;
  text-decoration: none;
  padding: 8px 40px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  box-shadow: 2px 2px 20px 0px rgba(131, 100, 226, 0);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 2px 2px 20px 0px ${({ theme }) => theme.colors['pink_col']};
    transition: all 0.3s ease;
  }

  &.inline {
    display: inline-block;
    margin-right: 15px;

    &.white {
      color: ${({ theme }) => theme.colors['color_more']}!important;
      background: ${({ theme }) => theme.colors['white']};
    }
  }
}
//
.btn2 {
  background: rgb(246, 246, 246);
  color: rgb(51, 51, 51) !important;
}

.li-disable {
  pointer-events: none;
}

.strong-opacity {
  opacity: 0.2; 
}

.btn__gradient {
  background: linear-gradient(95.16deg, ${({ theme }) =>
    theme.colors.color_primary} 2.64%, ${({ theme }) =>
  theme.colors.color_secondary} 100%);
  // border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  border: none;
  display: block;
  width: 100%;
  line-height: 20px;
}

.btn__simple {
  background: none;
  text-align: center;
  display: block;
  width: 100%;

  span {
    gap: 0px;
    background: -webkit-linear-gradient(180deg, ${({ theme }) =>
      theme.colors.color_primary} 0%, ${({ theme }) =>
  theme.colors.color_secondary} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.btn-grad {
  color: white;
  background-image: linear-gradient(270deg, ${({ theme }) =>
    theme.colors.color_primary} 0%, ${({ theme }) =>
  theme.colors.color_secondary} 100%);
  border-radius: ${({ theme }) => theme.colors.btn_border};
  font-size: ${({ theme }) => theme.colors.btn_font};
  position: relative;
  z-index: 1;

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
}

.btn-sec {
  color: ${({ theme }) => theme.colors.black} !important;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.colors.btn_border};
  font-size: ${({ theme }) => theme.colors.btn_font};
  position: relative;
  z-index: 1;

  &:hover {
    box-shadow: none;
    transition: all 0.3s ease;

    &::before {
      opacity: 1;
    }
  }

  &::before {
  }
}
.btn-grad-outline {
  border-radius: ${({ theme }) => theme.colors.btn_border};
  padding: 1rem;
  padding: 0.5rem 3rem;
  color:${({ theme }) => theme.colors['text-btn-light']}!important;
  /* box-shadow: 0 0 6px 0 rgba(157, 96, 212, 0.5); */
  border: solid 3px transparent;
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),
    linear-gradient(101deg, ${({ theme }) => theme.colors.color_secondary}, ${({
  theme
}) => theme.colors.color_primary});
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow:2px 1000px 1px inset ${({ theme }) =>
    theme.colors['btn_bx_shadow']};

  /* @include theme("themeDark", box-shadow, 2px 1000px 1px $color_bg_secondary inset);
  @include theme("themeLight", box-shadow, 2px 1000px 1px #f5e6fa inset); */
  // box-shadow: 2px 1000px 1px $color_bg_secondary inset;
  /* box-shadow: 2px 1000px linear-gradient(90deg, rgba(244, 5, 201, 0.1) -1.88%, rgba(57, 147, 255, 0.1) 129.09%); */
  transition: all ease-in-out 0.3s;
  border-image-source: linear-gradient(270deg, ${({ theme }) =>
    theme.colors.color_primary} 0%, ${({ theme }) =>
  theme.colors.color_secondary} 100%);

  &:hover {
    box-shadow: none;
  }
}
#routerhang {
  transform: unset !important;
  transform-origin: unset !important;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.br {
  display: block;
  white-space: pre-wrap;
}

strong {
  font-weight: bold;
}

section {
  padding: 90px 0;

  &.no-top {
    padding-top: 0 !important;
  }

  &.no-bottom {
    padding-bottom: 0 !important;
  }

  .small-border {
    display: block;
    width: 50px;
    height: 2px;
    background: ${({ theme }) => theme.colors['pink_col']};
    border-left: none;
    border-left-color: currentcolor;
    border-right: none;
    border-right-color: currentcolor;
    margin: 18px auto 30px;
  }

  &.bg-gray {
    background: rgb(247, 244, 253);
  }
}

.wraper {
  padding: 0;
  display: block;
  overflow: hidden;
  width: 100%;

  .wraperitem {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}

.m-2-hor {
  padding: 0 7%;
  max-width: 1500px;
  margin: 0 auto !important;
}

.m-10-hor {
  display: flex;
  justify-content: space-between;
  padding-left: 10%;
  padding-right: 10%;
  max-width: 1500px;
  margin: 0 auto;
}
.ml-1 {
  margin-left: 0.25rem !important;
}

.ml-2 {
  margin-left: 0.5rem !important;
}

.ml-3 {
  margin-left: 0.75rem !important;
}

.mr-1 {
  margin-right: 0.25rem !important;
}

.mr-2 {
  margin-right: 0.5rem !important;
}

.mr-3 {
  margin-right: 0.75rem !important;
}

.mt-1 {
  margin-top: 0.25rem !important;
}

.mt-2 {
  margin-top: 0.5rem !important;
}

.mt-3 {
  margin-top: 0.75rem !important;
}

.mb-1 {
  margin-bottom: 0.25rem !important;
}

.mb-2 {
  margin-bottom: 0.5rem !important;
}

.mb-3 {
  margin-bottom: 0.75rem !important;
}
.white {
  color: ${({ theme }) => theme.colors['black']};
  background: ${({ theme }) => theme.colors['white']};
}

.black_more {
  background: ${({ theme }) => theme.colors['black_more']};
}

.color {
  color: ${({ theme }) => theme.colors['pink_col']};
}

.btn {
  position: relative;
  overflow: hidden;
  font-size: 11pt;
  color: ${({ theme }) => theme.colors['white']};
  background: none;
  border: 2px solid ${({ theme }) => theme.colors['pink_col']};
  border-radius: 0;
  padding: 10px 44px;
  -webkit-transition-delay: 0s;
  transition-delay: 0s;
  z-index: 0;

  span {
    color: ${({ theme }) => theme.colors['white']};
    position: relative;
    z-index: 1;
  }

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    background-image: ${({ theme }) => theme.colors['gradient3toLeft']};
    opacity: 0;
    z-index: 1;
    transition: all 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
    transition: all 0.3s ease;
  }

  &:hover {
    .shine {
      -webkit-animation: sheen 0.6s alternate;
      animation: sheen 0.6s alternate;
    }
  }
}
.nav-link {
  color: ${({ theme }) => theme.colors['white']};;

  &:hover {
    color: ${({ theme }) => theme.colors['color_more']};
  }
}
.shine {
  content: "";
  position: absolute !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: -50px;
  background: -webkit-linear-gradient(top, transparent, rgba(${({ theme }) =>
    theme.colors['white']}, 0.2) 5%, transparent);
  background: linear-gradient(to bottom, transparent, rgba(${({ theme }) =>
    theme.colors['white']}, 0.2) 5%, transparent);
  -webkit-transform: rotateZ(60deg) translate(-1em, 5.5em);
  transform: rotateZ(60deg) translate(-1em, 5.5em);
}

@-webkit-keyframes sheen {
  0% {
    opacity: 1;
    -webkit-transform: rotateZ(60deg) translate(0, 6em);
    transform: rotateZ(60deg) translate(0, 6em);
  }

  90% {
    opacity: 1;
    -webkit-transform: rotateZ(60deg) translate(0, -12em);
    transform: rotateZ(60deg) translate(0, -12em);
  }

  100% {
    opacity: 0;
    -webkit-transform: rotateZ(60deg) translate(0, -12em);
    transform: rotateZ(60deg) translate(0, -12em);
  }
}

@keyframes sheen {
  0% {
    opacity: 1;
    -webkit-transform: rotateZ(60deg) translate(0, 6em);
    transform: rotateZ(60deg) translate(0, 6em);
  }

  90% {
    opacity: 1;
    -webkit-transform: rotateZ(60deg) translate(0, -12em);
    transform: rotateZ(60deg) translate(0, -12em);
  }

  100% {
    opacity: 0;
    -webkit-transform: rotateZ(60deg) translate(0, -12em);
    transform: rotateZ(60deg) translate(0, -12em);
  }
}

.text-gradient {
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  background: ${({ theme }) => theme.colors.gradient3toBottom};
}

.de-flex {
  display: flex;
  justify-content: space-between;
}

.de-flex>.de-flex-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

/**** divider ***/

.spacer-single {
  width: 100%;
  height: 30px;
  display: block;
  clear: both;
}

.spacer-double {
  width: 100%;
  height: 60px;
  display: block;
  clear: both;
}

.spacer-half {
  width: 100%;
  height: 15px;
  display: block;
  clear: both;
}

.spacer-10 {
  width: 100%;
  height: 10px;
  display: block;
  clear: both;
}

.spacer-20 {
  width: 100%;
  height: 20px;
  display: block;
  clear: both;
}

.spacer-30 {
  width: 100%;
  height: 30px;
  display: block;
  clear: both;
}

.spacer-40 {
  width: 100%;
  height: 40px;
  display: block;
  clear: both;
}

.spacer-50 {
  width: 100%;
  height: 50px;
  display: block;
  clear: both;
}

.spacer-60 {
  width: 100%;
  height: 60px;
  display: block;
  clear: both;
}

hr {
  display: block;
  clear: both;
  border-top: solid 1px ${({ theme }) => theme.colors['light-gray']};
  margin: 40px 0 40px 0;
}

.mr15 {
  margin-right: 15px;
}

/* dropdown */

.dropdown-custom.btn {
  font-size: 14px;
  border: 0px;
  position: relative;
  top: -1px;
  overflow: unset !important;
  letter-spacing: normal;
  font-weight: 600;
  padding: 0 20px 0 0;
  background: none !important;

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 19px;
    width: max-content;
    height: auto;
    padding: 30px 40px;
    background: 0;
  }

  &::after {
    margin-left: 5px !important;
  }

  &:focus {
    box-shadow: none !important;
  }

  &:hover {
    color:${({ theme }) => theme.colors['pink_col']};
  }
}

.dropdown-toggle::after {
  font-family: FontAwesome;
  content: "\f078";
  color: rgba(255, 255, 255, 0.5);
  padding-left: 2px;
  font-size: 8px;
  top: -1px;
  position: absolute;
  top: 6px;
  right: 5px;
  border: none;
}

.item-dropdown {
  width: max-content;
  position: absolute;
  background: rgba(33, 36, 40, 0.9);
  border-radius: 5px;
  inset: 50px auto auto 0;
  padding: 0 0;
  animation: smoothDrop 0.2s ease;
  -webkit-animation: smoothDrop 0.2s ease;
  box-shadow: 0 4px 20px 0 rgba(10, 10, 10, 0.4);
  z-index: 1;

  .dropdown {
    position: relative;
    text-align: center;
    box-shadow: 0 4px 20px 0 rgba(10, 10, 10, 0.4);

    a {
      color: ${({ theme }) => theme.colors['white']}!important;
      text-transform: none;
      font-weight: normal;
      letter-spacing: normal;
      display: block;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 8px 20px 8px 20px;
      min-width: 210px;
      width: 100%;
      text-align: left;

      &:hover {
        color: ${({ theme }) => theme.colors['white']}!important;
        background: ${({ theme }) => theme.colors['pink_col']};
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.imgslickz {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.centered {
  display: flex;
  align-items: center;
  justify-content: center;
}


.navbar-item {
  pointer-events: auto;
}

.navbar-item a.active {
  /*pointer-events: none;*/
} 
/* disable click active */


/*** item details ***/

.item_info {
  padding-left: 10px;

  .de_countdown {
    position: relative;
    display: inline-block;
    margin: 0;
    margin-bottom: 0px;
    margin-left: 0px;
    right: 0;
    border: none;
    padding: 0;
    margin-bottom: 10px;
    margin-left: 10px;
  }

  .item_info_counts {
    display: flex;
    align-items: stretch;
    margin-bottom: 20px;

    >div {
      margin-right: 10px;
      font-weight: 400;
      padding: 2px 10px;
      font-size: 14px;
      text-align: center;
      min-width: 80px;
      background: rgba(255, 255, 255, 0.025);
      border-top: solid 1px rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      -moz-border-radius: 3px;
      -webkit-border-radius: 3px;

      i {
        margin-right: 5px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }

  h6 {
    margin-bottom: 15px;
    font-size: 12px;
  }

  .item_author .author_list_info {
    padding-top: 10px;
    padding-left: 70px;
    color:${({ theme }) => theme.colors['white']};;
    font-weight: bold;
  }

  .de_nav {
    text-align: left;
    margin-bottom: 30px;
  }
}

.p_list {
  margin-bottom: 30px;
}

.p_list_pp {
  position: absolute;
  display: inline-block;
  width: 50px;
  height: auto;
  margin-left: 0px;
  margin-top: -3px;
  z-index: 10;

  img {
    width: 100%;
    border-radius: 100% !important;
  }

  i {
    color: ${({ theme }) => theme.colors['white']};;
    background: ${({ theme }) => theme.colors['pink_col']};;
    font-size: 10px;
    padding: 3px;
    position: absolute;
    right: 0;
    bottom: 0;
    border-radius: 100%;
    -moz-border-radius: 100%;
    -webkit-border-radius: 100%;
  }
}

.p_list_info {
  font-weight: 400;
  padding-left: 70px;

  span {
    display: block;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2em;
  }

  b {
    color: ${({ theme }) => theme.colors['white']};;
  }
}

img.img-rounded {
  border-radius: 3px;
}

// item details 
/*** slider ***/

.jumbotron {
  position: relative;
  padding: 0;
  margin: 0;
  background-color: ${({ theme }) => theme.colors.background};
  background-image: url(${({ theme }) => theme.colors.bannerImage});
}

.slider-wrapper {
  position: relative;
  height: 100vh;
  overflow: hidden;

  .previousButton,
  .nextButton {
    opacity: 0;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  &:hover {

    .previousButton,
    .nextButton {
      opacity: 1;
      transition: all 0.3s ease;
    }
  }
}

.slide {
  background-size: cover !important;
}

.slide::before {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  bottom: 0;
  left: 0;
}

.previousButton,
.nextButton {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  text-align: center;

  svg {
    display: none;
  }
}

.previousButton::before,
.nextButton::before {
  content: "\f054";
  font-family: FontAwesome;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: normal;
  color: ${({ theme }) => theme.colors['white']};
  opacity: 0.8;
}

.previousButton:hover,
.nextButton:hover {}

.previousButton {
  left: 0;
  -webkit-transform: rotate(180deg) translateY(calc(50% + 0px));
  transform: rotate(180deg) translateY(calc(50% + 0px));
}

.previousButton {
  left: 4%;
}

.nextButton {
  right: 4%;
}

.slider-content {
  text-align: left;
}

.slider-content .inner {
  padding: 0 12%;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.slider-content .inner button {
  font-weight: 500;
  position: relative;
  overflow: hidden;
  font-size: 11pt;
  letter-spacing: 1px;
  color:${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.pink_col};
  background: none;
  border-radius: 0;
  padding: 0 44px;
  height: 45px;
  -webkit-transition-delay: 0s;
  transition-delay: 0s;
  z-index: 0;

  span {
    position: relative;
    z-index: 1;
  }

  &::before {
    content: "";
    width: 180%;
    height: 180%;
    top: -100%;
    left: -100%;
    position: absolute;
    background-image: linear-gradient(to left, ${({ theme }) =>
      theme.colors.pink_col},  ${({ theme }) => theme.colors.color_more});
    opacity: 0;
    z-index: 1;
    transition: all 0.3s ease;
  }

  &:hover::before {
    top: 0;
    left: 0;
    opacity: 1;
    transition: all 0.3s ease;
  }

  &:hover {
    .shine {
      -webkit-animation: sheen 0.6s alternate;
      animation: sheen 0.6s alternate;
    }
  }
}

.slider-content .inner h1 {
  font-weight: 600;
  max-width: 840px;
  color: ${({ theme }) => theme.colors['white']};
  font-size: 53px;
}

.slider-content .inner p {
  color: ${({ theme }) => theme.colors['white']};
  font-size: 40px;
  line-height: 1.3;
  max-width: 640px;
  margin-bottom: 30px;
}

.slider-content section {
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.slider-content section span {
  color: ${({ theme }) => theme.colors['white']};
}

.slider-content section span {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  display: inline-block;
  text-align: left;
  line-height: 1.4;
  vertical-align: middle;
  margin-left: 10px;
}

.slider-content section img {
  width: 40px;
  height: 40px;
  border: solid 2px rgba(255, 255, 255, 0.5);
  border-radius: 100%;
  vertical-align: middle;
}

.slider-content section span strong {
  color: ${({ theme }) => theme.colors['white']};
  font-size: 14px;
  display: block;
}

@media (max-height: 500px) {

  .slider-wrapper,
  .slide {
    height: calc(100vh - 75px);
  }
}

@media (max-width: 640px) {

  .slider-wrapper,
  .slide {
    height: calc(80vh - 75px);
  }
}

@media (max-height: 600px) {
  .slider-content .inner h1 {
    font-size: 32px;
  }
}

@media (max-width: 640px) {
  .slider-content .inner h1 {
    font-size: 32px;
  }

  .slider-content .inner p {
    font-size: 21px;
  }
}

.slide h1 {
  transition: all 0.3s ease;
  -webkit-transform: translateY(-20px);
  transform: translateY(-20px);
  opacity: 0;
}

.slide button {
  transition: all 0.3s ease;
  -webkit-transform: translateY(20px);
  transform: translateY(20px);
  opacity: 0;
}

.slide p {
  transition: all 0.3s ease;
  -webkit-transform: translateY(20px);
  transform: translateY(20px);
  opacity: 0;
}

.slide section * {
  transition: all 0.3s ease;
}

.slide section img {
  -webkit-transform: translateX(-10px);
  transform: translateX(-10px);
  opacity: 0;
}

.slide section span {
  -webkit-transform: translateY(-10px);
  transform: translateY(-10px);
  opacity: 0;
}

.slide section span strong {
  -webkit-transform: translateY(10px);
  transform: translateY(10px);
  opacity: 0;
}

.slide.animateIn.previous h1,
.slide.current h1,
.slide.animateIn.next h1,
.slide.animateIn.previous button,
.slide.current button,
.slide.animateIn.next button,
.slide.animateIn.previous p,
.slide.current p,
.slide.animateIn.next p,
.slide.animateIn.previous section *,
.slide.current section *,
.slide.animateIn.next section * {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  -webkit-transition-delay: 0.9s;
  transition-delay: 0.9s;
  opacity: 1;
}

.slide.animateIn.previous p,
.slide.animateIn.next p {
  -webkit-transition-delay: 1.1s;
  transition-delay: 1.1s;
}

.slide.animateIn.previous button,
.slide.animateIn.next button {
  -webkit-transition-delay: 1.3s;
  transition-delay: 1.3s;
}

.slide.animateIn.previous section img,
.slide.animateIn.next section img {
  -webkit-transition-delay: 1.3s;
  transition-delay: 1.3s;
}

.slide.animateIn.previous section span,
.slide.animateIn.next section span {
  -webkit-transition-delay: 1.4s;
  transition-delay: 1.4s;
}

.slide.animateIn.previous section span strong,
.slide.animateIn.next section span strong {
  -webkit-transition-delay: 1.5s;
  transition-delay: 1.5s;
}

.slide.animateOut h1 {
  -webkit-transition-delay: 0.3s;
  transition-delay: 0.3s;
}

.slide.animateOut p {
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
}

.slide.animateOut section span {
  -webkit-transition-delay: 0.1s;
  transition-delay: 0.1s;
}

.slide.animateOut section span strong {
  -webkit-transition-delay: 0s;
  transition-delay: 0s;
}

/* new */
/*** breadcumb ***/

.breadcumb {
  border-radius: 0;
  margin: 0;
  padding: 0 0;
  background-size: cover;
  width: 100%;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(to bottom, ${({ theme }) =>
      theme.colors['black']}, rgba(0, 0, 0, 0.1));
    opacity: 0.5;
  }

  &.no-bg::before {
    content: unset;
  }

  .mainbreadcumb {
    padding: 130px 0 110px;

    h1 {
      margin-bottom: 0;
      color: ${({ theme }) => theme.colors.textHeading};
    }

    p {
      color: ${({ theme }) => theme.colors.white};;
      margin-top: 15px;
    }

    .list {
      position: relative;
      bottom: -20px;
      display: flex;
      justify-content: right;
      font-size: 0.86rem;
      font-weight: 400;
      letter-spacing: 4px;

      .dash {
        padding: 0 10px;
      }

      .link {
        color: ${({ theme }) => theme.colors.white};
        font-weight: 500;
        line-height: 1.3;
        letter-spacing: 1px;
        margin: 0;
        padding: 0;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          color: ${({ theme }) => theme.colors.pink_col};;
          transition: all 0.3s ease;
        }
      }
    }
  }

  .homebread {
    width: 100%;
    padding: 180px 0 140px;

    .heading {
      line-height: 1.3;
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 15px;
    }

    .subheading {
      font-size: 2.1rem;
      margin-bottom: 0;
    }

    .content {
      max-width: 500px;
      margin-bottom: 0;
      margin-bottom: 30px;
    }
  }

  &.h-vh {
    height: 100vh;
    display: flex;
    align-items: center;
    background-position: center;
    background-size: cover;
  }
}

/* home */

.subheading {
  font-size: 1.3rem;
  margin-bottom: 15px;
}

.heading {
  font-size: 2.3rem;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 15px;
  letter-spacing: 1px;
}

.content {
  margin-bottom: 0.5rem;
}

.col-feature {
  display: block;

  .sub-color {
    color: ${({ theme }) => theme.colors.pink_col};
    font-size: 1.6rem;
    font-weight: 700;
  }

  .heading {
    font-size: 1.1rem;
    font-weight: 500;
    margin: 5px 0;
  }

  .content {}
}

.border-radius {
  border-radius: 0px;
  box-shadow: 0 10px 12px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: none;
    transition: all 0.3s ease;
  }
}

/* icon scroll */

.icon-scroll-wraper {
  position: absolute;
  width: 100%;
  bottom: 5vh;
  left: 0;
}

.icon-scroll {
  position: relative;
  margin: 0 auto;
}

.icon-scroll:before {
  position: absolute;
}

.icon-scroll {
  width: 26px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.3);
  z-index: 1;
  border-radius: 25px;
  height: 38px;
}

.icon-scroll:before {
  content: "";
  width: 3px;
  height: 6px;
  background: rgba(255, 255, 255, 0.6);
  left: 12px;
  top: 8px;
  border-radius: 4px;
  -webkit-animation-duration: 1.5s;
  animation-duration: 1.5s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-name: scroll;
  animation-name: scroll;
}

@-webkit-keyframes scroll {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    -webkit-transform: translateY(20px);
    transform: translateY(20px);
  }
}

@keyframes scroll {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    -webkit-transform: translateY(20px);
    transform: translateY(20px);
  }
}

.features {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 60px;
  overflow: hidden;

  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    position: relative;
    text-align: center;

    .heading {
      color: ${({ theme }) => theme.colors.pink_col};;
      font-weight: 500;
      font-size: 1.2rem;
      margin-bottom: 10px;
    }

    .con-text {
      font-size: 0.9rem;
    }

    .link {
      width: max-content;
      font-weight: 500;
      position: relative;
      overflow: hidden;
      font-size: 11pt;
      letter-spacing: 1px;
      color: ${({ theme }) => theme.colors['white']};
      border: 2px solid ${({ theme }) => theme.colors.pink_col};;
      background: none;
      border-radius: 0;
      padding: 0 44px;
      height: 45px;
      line-height: 40px;
      margin: 20px auto 0;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: ${({ theme }) => theme.colors.pink_col};;
        border: 2px solid rgba(0, 0, 0, 0);
        transition: all 0.3s ease;

        .shine {
          -webkit-animation: sheen 0.6s alternate;
          animation: sheen 0.6s alternate;
        }
      }
    }
  }
}

// Global search
.global-search {

  label,
  input,
  svg {
    color:${({ theme }) => theme.colors['white_black']};
  }

  fieldset {
    border-color: transparent;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors['gradient1']};
    // @include theme("themeLight", background, $background_light);
    color: ${({ theme }) => theme.colors['text-light']};
    //
  }

  .MuiAutocomplete-inputRoot:hover fieldset {
    border-color: ${({ theme }) => theme.colors.color_primary};
  }
}

// Global Search
/** portofolio **/

.AppContainer {
  color: ${({ theme }) => theme.colors['white']};;
  position: relative;
  z-index: 99;
  height: 100%;
  width: 100%;
  background: none;

  .gallery-container {
    .react-photo-gallery--gallery {
    }
  }
}

.react-photo-gallery--gallery {
  margin-top: 15px;
}

.lightbox-portal {
  position: relative;
  z-index: 999;

  h4 {
    font-weight: 700;
  }
}

.btnLright {
  color: ${({ theme }) => theme.colors['white']};;
  font-size: 21px !important;
  right: 10px !important;
}

.btnLleft {
  color: ${({ theme }) => theme.colors['white']};;
  font-size: 21px !important;
  left: 10px !important;
}

.closeL {
  font-size: 21px !important;
  position: absolute;
  top: 10px;
  right: 10px;
}

.ConMainGimg {
  border-radius: 5px;
  overflow: hidden;
}

.MainGimg {
  transform: scale(1);
  transition: 0.7s;

  .overlayCap {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 1rem;
    width: 100%;
    bottom: 15px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors['white']};
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.7s;
    outline: none;
    z-index: 1;

    &:before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: ${({ theme }) => theme.colors['color_more']};;
      z-index: 0;
      opacity: 0.8;
    }

    span {
      position: relative;
      z-index: 2;
    }
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 10px 12px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transition: 0.7s;
    z-index: 2;

    .overlayCap {
      opacity: 1;
    }
  }
}

/* new */
// NFT Item
/*** column nft ***/

.nft_coll {
  padding-bottom: 10px;
  border-top: solid 1px rgba(255, 255, 255.1);
  border-radius: 10px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
  margin: 10px;

  img {
    transition: 0.7s;
    width: 330px;
    height: 330px;
  }

  &:hover {
    img {
      transform: scale(1.05);
      transition: 0.7s;
    }
  }
}

.nft_wrap {
  position: relative;
  width: 100%;
  height: 200%;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
  -moz-border-radius: 10px 10px 0 0;
  -webkit-border-radius: 10px 10px 0 0;
}

.nft_coll_pp {
  width: 60px;
  display: block;
  margin: 0 auto;
  margin-top: -30px;
  margin-bottom: 10px;
  position: relative;

  span {
    cursor: pointer;
  }
}

.nft_coll_pp img {
  width: 60px;
  height: auto;
  border-radius: 100%;
  -moz-border-radius: 100%;
  -webkit-border-radius: 100%;
  border: solid 5px ${({ theme }) => theme.colors['white']};;
  background: ${({ theme }) => theme.colors['white']};;
}

.nft_coll_pp i {
  font-size: 10px;
  color: ${({ theme }) => theme.colors['white']};;
  background: ${({ theme }) => theme.colors['pink_col']};;
  border-radius: 100%;
  -moz-border-radius: 100%;
  -webkit-border-radius: 100%;
  padding: 3px;
  position: absolute;
  bottom: 4px;
  right: 5px;
}

.nft_coll_info {
  text-align: center;
  padding-bottom: 10px;

  span {
    cursor: pointer;
  }
}

.nft_coll h4 {
  font-size: 16px;
  margin-bottom: 0px;
}

.nft_coll span {
  font-size: 14px;
}

.nft_coll p {
  margin-top: 10px;
}

.nft_coll_by {
  font-weight: bold;
}

.nft {
  width: 100%;
  // margin-left: 0;
  // margin-right: 0;

  .slick-prev {
    left: -12px;
    background:${({ theme }) => theme.colors['slick_nav_bg']};
    border-radius: 45px;
    display: block;
    width: 45px;
    height: 45px;
    line-height: 45px;
    z-index: 1;
    transition: all 0.3s ease;

    &::before {
      content: "\f053" !important;
      font-size: 1rem;
      font-family: FontAwesome !important;
      font-style: normal;
      font-weight: normal;
      color:${({ theme }) => theme.colors['text-btn-light']};
      background:${({ theme }) => theme.colors['slick_nav_bg']};
      border: 1px solid rgba(255, 255, 255, 0.1);
      /* @include theme("themeLight", border-color, $white); */
      border-radius: 45px;
      display: block;
      width: 45px;
      height: 45px;
      line-height: 45px;
    }

    &:hover {
      background:${({ theme }) => theme.colors['white']};
      box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.2);
    }
  }

  .slick-next {
    right: -12px;
    color:${({ theme }) => theme.colors['text-btn-light']};
    background:${({ theme }) => theme.colors['slick_nav_bg']};
    border-radius: 45px;
    display: block;
    width: 45px;
    height: 45px;
    line-height: 45px;
    transition: all 0.3s ease;

    &::before {
      content: "\f054" !important;
      font-size: 1rem;
      font-family: FontAwesome !important;
      font-style: normal;
      font-weight: normal;
      color:${({ theme }) => theme.colors['text-btn-light']};
      background:${({ theme }) => theme.colors['slick_nav_bg']};
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 45px;
      display: block;
      width: 45px;
      height: 45px;
      line-height: 45px;
    }

    &:hover {
      background:${({ theme }) => theme.colors['white']};
      box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.2);
    }
  }

  &:hover {

    .slick-prev,
    .slick-next {
      opacity: 1;
      transition: all 0.3s ease;
    }
  }

  .blockquote {
    font-size: 0.98rem;
    text-align: left;
    margin: 15px 30px 30px;
    display: flex;

    .fa {
      font-size: 1.3rem;
      display: inline-block;
      margin: 5px 15px 0 0;
      color: ${({ theme }) => theme.colors['white']};
      height: max-content;
    }

    p {
      line-height: 1.8;
      display: inline-block;
    }

    .bytesti {
      font-size: 0.9rem;
      font-weight: 400;
    }
  }

  .slick-dots {
    bottom: -40px;

    li.slick-active button::before {
      opacity: 0.75;
      color: ${({ theme }) => theme.colors['white']};
    }

    li button::before {
      color: ${({ theme }) => theme.colors['white']};
    }
  }
}

.nft__item {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 20px 10px;
  margin: 10px;
  border-top: solid 1px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  -moz-border-radius: 15px;
  -webkit-border-radius: 15px;
  margin-bottom: 25px;
  background: rgba(255, 255, 255, 0.025);
  transition: 0.7s;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(33.1712px);
  position: relative;

  &:hover {
    box-shadow: 2px 2px 30px 0px rgba(10, 10, 10, 0.1);
    transition: 0.7s;
  }

  &.nft-item-custom {
    border-color: ${({ theme }) =>
      theme.colors['transparent_border']}!important;
    box-shadow: ${({ theme }) => theme.colors['nft_light_bxshadow']}!important;
    background: ${({ theme }) => theme.colors['new__item_bg']};
    border: 0.829279px solid #282A53;
        border-radius: 8.2928px;
    /* background: ${({ theme }) =>
      theme.colors['nft_custom_bg']} !important; */
    .nft-item-customcontent{
       /* &:before{
        content: '';    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top:0;
       } */
    }
    &:hover {
      .nft-item-customcontent {
        /* position: relative; */
        /* z-index: 1;
        background: ${({ theme }) => theme.colors['new__item_bg']}; */
        /* margin: -20px -10px; */
        /* padding: 20px 10px; */
        /* border: 0.829279px solid #282A53;
        border-radius: 8.2928px; */
}
.nft__item_info{
  background: rgba(0, 0, 0, 0.01);
  backdrop-filter: blur(14px);
}
      }
/* 
      &:after {
        content: "";
        background: linear-gradient(to left, ${({ theme }) =>
          theme.colors['color_secondary']}, ${({ theme }) =>
  theme.colors['color_primary']}) !important;
          width: 102.5%;
          height: 102%;
          position: absolute;
          top: -1%;
          // left: -1%;
          left: -1.2%;
          z-index: -2;
          border-radius: 5px;
          transition: 0.3s all ease-in;
          -webkit-transition: 0.3s all ease-in;
          -moz-transition: 0.3s all ease-in;
          -ms-transition: 0.3s all ease-in;
          -o-transition: 0.3s all ease-in;
      } */

    }

  }
  
  .custom_col & {
    &.nft-item-custom {
      &:hover {
        .themeLight & {
          .nft-item-customcontent {
            margin: -20px -10px;
            padding: 20px 10px;
          }

          &:after {
            content: "";
            width: 102.5%;
            height: 102%;
            top: -1%;
            // left: -1%;
          }
        }
      }
    }
  }
}

.nft__item_info {
  cursor: pointer;
  line-height: 28px;
  margin-bottom: -20px;
  height: 110px;
  transition: 0.3s all ease-in;
  /* backdrop-filter: blur(14px); */
  margin-left: -10px;
    margin-right: -10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top:32px;
    margin-top: -28px;
/* Note: backdrop-filter has minimal browser support */

border-radius: 8px;
}

.nft__item h4 {
  /* font-weight: 800; */
  font-size: 14px;
  margin-bottom: 5px;
  white-space: nowrap;
  line-height:17px;
  font-weight: 700;
    text-decoration: none;
}

.nft__item_price {
  font-size: 14px;
  font-weight: 600;
  display: block;
}

.nft__item_price span {
  margin-left: 10px;
  color: ${({ theme }) => theme.colors['white']};;
  font-weight: 700;
}

.nft__item_action {
  font-size: 14px;
  position: absolute;
  bottom: 30px;
  left: 0;

  span {
    /* font-weight: 400; */
    color: ${({ theme }) => theme.colors['pink_col']};;
  }
}

.nft__item_like {
  position: relative;
  bottom: 22px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors['light-gray']};
  float: right;

  span {
    color: ${({ theme }) => theme.colors['gray']};
    margin-left: 5px;
    font-size: 12px;
  }

  &:hover i {
    color: pink;
  }
}

// NFT Item
/* new */


// need to apply into specific file
// Filters
// .general-custom-filters {



  .price__select {
  border: 2px solid #282a53;

  div,
  fieldset {
    border: none;
  }
}

.price__select__input {
  fieldset {
    border: 2px solid #282a53 !important;
  }
}

.filter-button {
  white-space: pre;
  background-color:${({ theme }) => theme.colors['fiter_button_bg']};
  min-height: 40px;
  padding-left: 10px;
  padding-right: 16px;
  min-width: auto;
  border: 1px solid transparent;
  border-radius: 40px;
  font-size: 13px;
  font-weight: 900;
  font-family: inherit;
  transition: all 0.15s ease-in-out 0s;
  transform-origin: center center;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  color:${({ theme }) => theme.colors['text-light']};
  padding-top: 5px;
  padding-bottom: 5px;

  svg {
    color:${({ theme }) => theme.colors['text-light']};
  }

  span {
    color:${({ theme }) => theme.colors['text-light']};
  }

  &:active {
    transform: scale(0.95);
  }

  &:hover,
  &:focus {
    background: transparent;
    color: rgb(232, 232, 241);
    border-color: rgba(222, 222, 236, 0.18);
  }
}

.filter__button {
  border: none;
  display: block;
  border-radius: 0;
  width: 100%;
  text-align: left;

  span {
    opacity: 0.5;
    font-size: 14px;
  }

  .button__icon {
    opacity: 0.5;
  }
}

.popover__collection {
  border: 1px solid;
  border-image-slice: 1;
  border-radius: 1;
  border-image-source: linear-gradient(to left, ${({ theme }) =>
    theme.colors['color_primary']}, ${({ theme }) =>
  theme.colors['color_secondary']});

  .arrow {
    display: none;
  }

  .text__custom_field {
    border: 1.3px solid #282a53;
    backdrop-filter: blur(40px);
    border-radius: 5px;

    &:focus,
    &:active {
      background: transparent;
    }
  }

  .list__item__custom {
    padding-left: 0;
  }

  .custom__avatar__holder {
    min-width: 43px;
  }

  .selected__item {
    color: ${({ theme }) => theme.colors['white']};
  }

  .custom__avatar {
    width: 35px;
    height: 35px;
    min-width: 35px;
  }

  .checkbox__custom {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px -12px 0px 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    padding: 9px;
    border-radius: 50%;
    color: rgba(0, 0, 0, 0.6);

    .circle {
      width: 24px;
      height: 24px;
      background: transparent;
      border-radius: 25px;
      border: 1.5px solid #282a53;
    }

    .check__circle__icon {
      background: linear-gradient(180deg, ${({ theme }) =>
        theme.colors['color_primary']} 0%, ${({ theme }) =>
  theme.colors['color_secondary']} 100%);
      width: 24px;
      border-radius: 50%;
      height: 24px;
      position: relative;
    }
  }
}

.sort__popover {
  border: 1px solid;
  border-image-slice: 1;
  border-radius: 5;
  border-image-source: linear-gradient(to left, ${({ theme }) =>
    theme.colors['color_primary']}, ${({ theme }) =>
  theme.colors['color_secondary']});

  .arrow {
    display: none;
  }
}

// }
// Filters

.explore_items_filer {
  .price_filer_holder {
    background: ${({ theme }) => theme.colors['gradient1']};;
    border-radius: 5px;
    font-size: 14px !important;
  }
  .explore-filtermain{
    display: flex;
    flex-direction: row;
    overflow: auto;
    grid-gap: 10px;
    margin-bottom: 15px;
  }
}

.popover.bs-popover-bottom {
  width: 230px;
  background-color:${({ theme }) => theme.colors['popover_bottom']};
  border: 2px solid white;
  border-radius: 16px;

  // box-shadow: 2px 3px 8px rgb(255 255 255 / 22%);
  &.popover-collection-filter {
    width: 280px;
  }

  .popover-header {
    color: ${({ theme }) => theme.colors['white']};
    font-size: 17px !important;
    font-weight: 700;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    background: none;
    border-bottom: 1px solid white;

    &::before {
      border-bottom: none;
    }
  }

  .price-network-select {
    width: 100%;
    color:${({ theme }) => theme.colors['text-light']};

    div[class*="MuiSelect-select"] {
      padding: 7px 5px;
    }

    svg {
      color:${({ theme }) => theme.colors['text-light']};
    }

    &:hover fieldset {
      border-color: #00b2eb;
    }
  }

  .input-price {

    label,
    input {
      color:${({ theme }) => theme.colors['text-light']};
    }

    &.danger,
    &.danger:hover {
      fieldset {
        border-color: rgb(255, 70, 70);
      }
    }
  }

  .input-search {
    width: 100%;
    // margin: 0px;
    border: 1.3px solid #000;
    backdrop-filter: blur(40px);
    border-radius: 5px;

    .MuiInputBase-root {
      margin-top: 0;
    }
  }

  button:active {
    transform: scale(0.95);
  }

  label,
  svg,
  input {
    color:${({ theme }) => theme.colors['text-light']};
  }
  input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none; 
}

  .checkbox-collection svg {
    color: unset;
  }

  div[class*="MuiTextField-root"] {
    &:hover fieldset {
      border-color: #00b2eb;
    }
  }

  fieldset {
    border-color: rgba(255, 255, 255, 0.616);
  }

  .popover-body {
    color:${({ theme }) => theme.colors['text-light']};
    /* may be we will remove this */
    opacity: 0.6;

    .MuiList-root {
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
  }
}

.btn-normal {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-flow: row nowrap;
  white-space: nowrap;
  background-color: rgba(128, 128, 131, 0.08);
  line-height: 40px;
  height: 40px;
  padding-left: 22px;
  padding-right: 22px;
  min-width: auto;
  border: 1px solid transparent;
  border-radius: 40px;
  font-size: 13px;
  font-weight: 900;
  font-family: inherit;
  transition: all 0.15s ease-in-out 0s;
  transform-origin: center center;
  user-select: none;
  cursor: pointer;
  color: white;

  label {
    color:${({ theme }) => theme.colors['text-light']};
  }
}

.btn-filled {
  border-color: rgb(0, 102, 255);
  color: rgb(255, 255, 255);
  background: rgb(0, 102, 255);
}

.themeSwitcher {
  display: block;
  flex: initial;

  @media screen and (max-width:1199px) {
    position: absolute;
    top: 17px;
    right: 149px;
    width: 60px;
  }
}

.swiper-arrow-btn {
  svg {
    circle {
      fill:${({ theme }) => theme.colors['swiper_btn_fill']};
      stroke:${({ theme }) => theme.colors['swiper_btn_stroke']};
    }

    path {
      stroke:${({ theme }) => theme.colors['swiper_btn_path']};
    }
  }

  &:hover {
    svg {
      circle {
        fill: ${({ theme }) => theme.colors['white']};
        stroke: ${({ theme }) => theme.colors['white']};
      }

      path {
        stroke: #0e1e45;
      }
    }
  }
}

// dynamic nav tabs
.de_nav {
  overflow: hidden;
  padding-left: 0;
  margin: 0;
  padding: 0;
  text-align: center;
  font-weight: bold;

  &.text-left {
    text-align: left;
    margin: 10px;
  }

  li {
    float: none;
    display: inline-block;
    margin-right: 5px;

    span {
      position: relative;
      padding: 10px 20px;
      margin-right: 5px;
      display: block;
      background: none;
      text-decoration: none;
      color: ${({ theme }) => theme.colors['gray']};
      border: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 15px;
      cursor: poInter;
      -webkit-border-radius: 3px;

      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    &.active span {
      color: ${({ theme }) => theme.colors['white']};
      background: none;
    }
  }
}
.container-nospace{
  @media screen and (max-width:641px){
    padding-left: 0px!important;
    padding-right: 0px!important;
  }
}

// Nft style
  /*** countdown ***/
  
  .de_countdown {
    position: relative;
    /* font-size: 0.8rem; */
    font-size:12px;
    line-height:15px;
    font-weight:700;
    position: absolute;
    right: 20px;
    background: #171c27;
    padding: 6px 10px;
    letter-spacing: 0.01em;
    border-radius: 30px;
    -moz-border-radius: 30px;
    -webkit-border-radius: 30px;
    border: solid 2px ${({ theme }) => theme.colors['pink_col']};
    display: flex;
    z-index: 1;
    color: ${({ theme }) => theme.colors['white']};
    padding-top: 8px;
    box-shadow: 0px 4px 8px rgba(0, 2, 88, 0.5);
    padding-bottom: 7px;
  
    .Clock-days {
      font-weight: bold;
      display: inline-block;
      margin-right: 5px;
    }
  
    .Clock-hours {
      font-weight: bold;
      display: inline-block;
      margin-right: 5px;
    }
  
    .Clock-minutes {
      font-weight: bold;
      display: inline-block;
      margin-right: 5px;
    }
  
    .Clock-seconds {
      font-weight: bold;
      display: inline-block;
      margin-right: 5px;
    }
    &:before{
      content:'🔥';
      display:inline-block;
      margin-right:3px;
    }
    &:after{
      content:'Left';
      display:inline-block;
      margin-right:3px;
      color:#202A5D80;
      padding-left: 3px;
    }
  }
  
  .author_list_pp {
    cursor: pointer;
    position: absolute;
    display: inline-block;
    width: 50px;
    height: 50px;
    /* background: ${({ theme }) => theme.colors['pink_col']}; */
    margin-left: 10px;
    margin-top: -3px;
    border-radius: 100% !important;
    z-index: 1;
    transition: 0.3s;
  
    &:hover img {
      padding: 3px;
      -webkit-box-shadow: 0px 0px 0px 2px ${({ theme }) =>
        theme.colors['pink_col']};
      transition: 0.3s;
    }
  }
  
  .author_list_pp img {
    width: 100%;
    height: 100%;
    border-radius: 100% !important;
    -moz-border-radius: 100% !important;
    -webkit-border-radius: 100% !important;
    position: relative;
    z-index: 1;
  }
  
  .author_list_pp i {
    color: ${({ theme }) => theme.colors['white']};
    background: ${({ theme }) => theme.colors['pink_col']};
    font-size: 10px;
    padding: 3px;
    position: absolute;
    right: 0;
    bottom: 0;
    border-radius: 100%;
    -moz-border-radius: 100%;
    -webkit-border-radius: 100%;
    z-index: 2;
  }
  
  .nft__item_wrap {
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    justify-content: center;
    position: relative;
  }
  
  .nft__item_wrap span {
    display: block;
    width: 100%;
  }
  
  .nft__item img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
  }
  
  /*** author list ***/
  
  .author_list {
    column-count: 4;
    column-gap: 20px;
  
    li {
      margin-bottom: 30px;
    }
  
    .author_list_pp {
      position: absolute;
      display: inline-block;
      width: 50px;
      height: auto;
      margin-left: 10px;
      margin-top: -3px;
      cursor: pointer;
      z-index: 10;
  
      &:hover {
        img {
          padding: 1px;
          background: ${({ theme }) => theme.colors['gray']};
          box-shadow: 0px 0px 0px 4px rgba(131, 100, 226, 1);
          transition: 0.2s ease;
        }
      }
  
      img {
        transition: 0.2s ease;
      }
    }
  
    .author_list_info {
      font-weight: bold;
      padding-left: 70px;
  
      span {
        cursor: pointer;
        color: ${({ theme }) => theme.colors['white']};;
      }
  
      .bot {
        color: ${({ theme }) => theme.colors['gray']};;
        display: block;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.2em;
      }
    }
  }
  /*** filter ***/
  
  .items_filter {
    width: 100%;
    font-size: 14px;
    margin-bottom: 30px;
    margin-top: -14px;
  
    .dropdownSelect {
      display: inline-block;
      width: 225px;
      position: relative;
      margin-right: 10px;
      margin-bottom: 5px;
      z-index: 2;
  
      .css-1okebmr-indicatorSeparator {
        background: none;
      }
  
      &.one {
        z-index: 9;
      }
  
      &.two {
        z-index: 8;
      }
  
      &.three {
        z-index: 7;
      }
    }
  
    &.centerEl {
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: center;
    }
  }

// filter end

// general input
.form-control {
  padding: 1rem;
  margin-bottom: 20px;
  border: none;
  border: solid 1px rgba(255, 255, 255, 0.1);
  background:${({ theme }) => theme.colors['form_control_bg']};
  border-radius: 3px;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  height: auto;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  color:${({ theme }) => theme.colors['text-light']};

  &:focus {
    background-color: inherit;
    color:${({ theme }) => theme.colors['text-light']};
    border-color: #86b7fe;
    outline: 0;
  }
}

input:-internal-autofill-selected {
  background-color:${({ theme }) => theme.colors['background']}!important;
}

// general input

// Profile detail input
.icontype {
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 0.8rem;
  opacity: 0.2;
}

.icon_wallet{
  &:before {
    content: "\e100";
    font-family: "ElegantIcons";
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    transition: 0.7s;
  }
}
.has_offers {
  .through {
    text-decoration: line-through;
  }
}
// Pagination
.pagination {
  margin: 0 auto;
  font-weight: 500;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  li{
    .a {
      font-size: 14px;
      color: ${({ theme }) => theme.colors['white']};
      border: solid 1px rgba(255, 255, 255, 0.1);
      border-right: none;
      background: none;
      padding: 15px 20px 15px 20px;
      border-radius: 0;
      cursor: pointer;
    }
    &:last-child{}
  }
}

.pagination li:last-child .a {
  border-right: solid 1px rgba(255, 255, 255, 0.1);
}

.dark-scheme .pagination li:last-child .a {
  border-right-color: rgba(255, 255, 255, 0.1);
}

.pagination>.active>.a {
  color: ${({ theme }) => theme.colors['white']};
  background: ${({ theme }) => theme.colors['pink_col']};
}
.pagination {
  margin: 0 auto;
  font-weight: 500;
  border-radius: 3px;

  li {
    span {
      border: solid 1px rgba(255, 255, 255, 0.1);
      padding: 15px 20px 15px 20px;
      color: ${({ theme }) => theme.colors['white']};
      cursor: pointer;
    }
  }

  li.active {
    span {
      border-color: ${({ theme }) => theme.colors['pink_col']};
      border-right: none;
      background: ${({ theme }) => theme.colors['pink_col']};
    }
  }
}

// Pagination End

// Search page user card / common user card
.user-card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 13px;
  border-radius: 25px;
  color: white;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    border: 2px solid #52c8cd;
  }

  .MuiAvatar-root {
    margin-right: 8px;
  }
}
// Search page user card / common user card

// Pricing Component
.sequence {
  .mb30 {
    margin-bottom: 30px;
  }

  .pricing-s1 {
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.025);
    background-size: auto;
    box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.05);

    .top {
      padding: 30px;
      text-align: center;

      h2 {
        color: ${({ theme }) => theme.colors['color_more']};
      }
    }

    .mid {
      padding: 40px;
      text-align: center;
      background: ${({ theme }) => theme.colors['color_more']};

      .m.opt-1 {
        font-size: 48px;
        font-weight: 500;
      }
    }

    .bottom {
      border-top: 0px;
      text-align: center;

      ul {
        display: block;
        list-style: none;
        list-style-type: none;
        list-style-type: none;
        margin: 30px 0;
        padding: 0px;
        text-align: left;
        overflow: hidden;

        li {
          padding: 10px 30px;
          color: #505050;

          i {
            margin-right: 10px;
            color: ${({ theme }) => theme.colors['color_more']};
          }
        }
      }
    }

    .action {
      text-align: center;
      padding: 40px 0;
      border-top: solid 1px rgba(255, 255, 255, 0.1);

      .btn-main {
        margin: 0 auto;
      }
    }
  }
}
// Pricing component End

// Progress bar 
.skill-bar {
  margin-bottom: 40px;

  &.style-2 {
    .de-progress {
      background: rgba(0, 0, 0, 0.1);
      background-size: auto;
      width: 100%;
      height: 8px;
      background: ${({ theme }) => theme.colors['light-gray']};
      margin-top: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      overflow: hidden;

      .progress-bar {
        background: ${({ theme }) => theme.colors['color_more']};
        height: 8px;
        box-shadow: none;
      }
    }
  }
}
// Progress bar 
// Card
.card {
  background: rgba(255, 255, 255, 0.025);
}
.card-header {
  padding: 1rem 1.25rem;

  .btn {
    width: 100%;
    height: 100%;
    text-align: left;
    color: ${({ theme }) => theme.colors['general']};
    padding: 0;
    margin: 0;
    border: 0;

    &:before {
      content: unset;
    }

    &:focus {
      box-shadow: unset;
    }
  }
}

.card-body {
  padding: 1rem 1.25rem;
}
// Card
// Checkbox Filter Component
/*** filter option ***/

.item_filter_group {
  border: solid 1px rgba(255, 255, 255, 0.075);
  margin-bottom: 25px;
  padding: 30px;
  border-radius: 12px;

  .de_checkbox {
    position: relative;
    display: block;
    padding-left: 25px;

    input[type="checkbox"] {
      display: none;
      appearance: none;
      border: none;
      outline: none;
    }
  }

  .de_form input[type="checkbox"]:checked+label {
    border: none;
  }

  .de_form input[type="checkbox"]+label::before {
    position: absolute;
    content: "";
    display: inline-block;
    font-family: "FontAwesome";
    margin-right: 10px;
    border: solid 2px rgba(255, 255, 255, 0.2);
    width: 16px;
    height: 16px;
    margin-top: 5px;
    left: 0;
    font-size: 11px;
    padding: 1px 3px 0 3px;
    line-height: 15px;
    border-radius: 4px;
  }

  .de_form input[type="checkbox"]:checked+label::before {
    content: "\f00c";
    color: ${({ theme }) => theme.colors['white']};
    border: rgba(0, 0, 0, 0);
    background: ${({ theme }) => theme.colors['pink_col']};
  }
}
.nft-count {
  color: #00b2eb;
  margin-left: 4px;
}
// Checkbox Filter Component


/*** login ***/

.field-set label {
  color: #606060;
  font-weight: 500;
}

.list.s3 {
  display: inline;
  margin: 0;
  padding: 0;

  li {
    display: inline;
    list-style: none;
    margin-right: 20px;

    span {
      color: ${({ theme }) => theme.colors['pink_col']};
      font-weight: 600;
      cursor: pointer;
    }
  }
}
.bannerLayer svg ellipse {
  fill: ${({ theme }) => theme.colors.bannerLayer};
  }
.main-jumbo {
    margin-top:4rem;
    background-size: contain;
    background-repeat: no-repeat !important;
    padding: 5%;
    padding-bottom: 0;
    border-bottom: none;
  }

  /* homepage last section */
  /*** wallet ***/

.box-url {
  position: relative;
  padding: 30px;
  color: #a2a2a2;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: block;
  border-radius: 20px;
  box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.1);
  transition: 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    transition: 0.3s;
  }

  .box-url-label {
    font-weight: bold;
    position: absolute;
    right: 30px;
    color: ${({ theme }) => theme.colors['white']};
    padding: 2px 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }
}
.mb30 {
  margin-bottom: 30px;
}
.mb20 {
  margin-bottom: 20px;
}
#scroll-to-top {
  cursor: pointer;
  width: max-content;
  height: max-content;
  position: fixed;
  right: 10px;
  z-index: 999;

  &.init {
    bottom: -60px;
    transition: all 0.3s ease;
  }

  &.show {
    bottom: 15px;
    transition: all 0.3s ease;
  }

  div {
    font-size: 0.8rem;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 30px;
    background: ${({ theme }) => theme.colors['pink_col']};
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
      transition: all 0.3s ease;
    }

    i {
      font-style: normal;

      &:before {
        font-family: "FontAwesome";
        font-size: 18px;
        content: "\f106";
        color: ${({ theme }) => theme.colors['white']}!important;
        position: relative;
      }
    }
  }
}
.light{
        background-color:${theme.light.colors.header};
}
.dark{
    background-color:${theme.dark.colors.header};
}
.ant-table-thead > tr > th{
  background-color:${({ theme }) => theme.colors.tableHeader};
  color:${({ theme }) => theme.colors.tableHeaderText};
}
`;

export default GlobalStyle;
