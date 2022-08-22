/*** footer ***/
import styled from "styled-components";
const FooterWrapper = styled.div`
footer {
    padding: 80px 0 0 0;
    background: ${({theme})=> theme.colors.footerBg};
  
    &.footer-light {
      border-top: solid 1px rgba(255, 255, 255, 0.025);
      color: #a2a2a2;
  
      a {
        color: #a2a2a2;
        font-weight: 400;
        text-decoration: none !important;
  
        &:hover {
          color: $pink_col;
        }
      }
  
      #form_subscribe {
        input[type="text"] {
          width: 80%;
          float: left;
          border-radius: 30px 0 0 30px;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          border: solid 1px #333333;
          border-right-color: rgb(51, 51, 51);
          border-right-style: solid;
          border-right-width: 1px;
          border-right: none;
          padding: 6px 12px;
          margin-bottom: 0;
          box-shadow: 2px 2px 20px 0px rgba(20, 20, 20, 0.05);
        }
  
        #btn-subscribe i {
          text-align: center;
          font-size: 28px;
          float: left;
          width: 20%;
          background: ${({theme})=> theme.colors.pink_col};;
          color: #ffffff;
          display: table-cell;
          padding: 5px 0 5px 0;
          border-radius: 0 30px 30px 0;
        }
      }
  
      .subfooter {
        margin-top: 40px;
        padding: 20px 0 20px 0;
        border-top: solid 1px rgba(255, 255, 255, 0.1);
  
        span {
          cursor: pointer;
  
          img {
            margin-right: 30px;
  
            &.f-logo.d-1 {
              display: inline-block;
            }
  
            &.f-logo.d-3 {
              display: none;
            }
          }
  
          &.copy {
            cursor: default;
            margin: 0;
          }
        }
  
        .social-icons {
          display: inline-block;
  
          span {
            color: #595d69;
  
            i {
              text-shadow: none;
              color: ${({theme})=> theme.colors.white};
              background: #171c27;
              padding: 12px 10px 8px 10px;
              width: 34px;
              height: 34px;
              text-align: center;
              font-size: 16px;
              border-radius: 5px;
              margin: 0 5px 0 5px;
              transition: 0.3s;
            }
  
            &:hover i {
              color: ${({theme})=> theme.colors.black};
              background: ${({theme})=> theme.colors.white};
              transition: 0.3s;
            }
          }
        }
      }
    }
  
    .widget {
      margin-bottom: 30px;
      padding-bottom: 30px;
  
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
  
        li {
          margin: 5px 0;
        }
      }
  
      h5 {
        margin-bottom: 20px;
      }
    }
  }
  `;
export default FooterWrapper;
  
  