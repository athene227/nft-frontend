import styled from "styled-components";

const TabWrapper = styled.div`
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
`;
export default TabWrapper;