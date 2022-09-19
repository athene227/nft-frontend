import React from 'react';
import { Link } from '@reach/router';
import FooterWrapper from './footer/footer.styled';

const footer = () => (
  <FooterWrapper>
  <footer className="footer-light">
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>Marketplace</h5>
            <ul>
              <li>
                <Link to="explore2">All NFTs</Link>
              </li>
              <li>
                <Link to="">Art</Link>
              </li>
              <li>
                <Link to="">Music</Link>
              </li>
              <li>
                <Link to="">Sports</Link>
              </li>
              <li>
                <Link to="">Collectibles</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>Resources</h5>
            <ul>
              <li>
                <Link to="helpcenter">Help Center</Link>
              </li>
              <li>
                <Link to="contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>Community</h5>
            <ul>
              <li>
                <Link to="">Community Guidelines</Link>
              </li>
              <li>
                <Link to="news">Blog</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>NFT News</h5>
            <p>Stay up to date on hot drops.</p>
            <form
              action="#"
              className="row form-dark"
              id="form_subscribe"
              method="post"
              name="form_subscribe"
            >
              <div className="col text-center">
                <input
                  className="form-control"
                  id="txt_subscribe"
                  name="txt_subscribe"
                  placeholder="enter your email"
                  type="text"
                />
                <Link to="" id="btn-subscribe">
                  <i className="arrow_right bg-color-secondary"></i>
                </Link>
                <div className="clearfix"></div>
              </div>
            </form>
            <div className="spacer-10"></div>
          </div>
        </div>
      </div>
    </div>
    <div className="subfooter">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex">
              <div className="de-flex-col">
                <span onClick={() => window.open('', '_self')}>
                  <span className="copy">
                    &copy; NFTonPulse 2022 | All Rights Reserved.{' '}
                    <Link to="">Terms of Service</Link> |{' '}
                    <Link to="">Privacy Policy</Link>
                  </span>
                </span>
              </div>
              <div className="de-flex-col">
                <div className="social-icons">
                  <span onClick={() => window.open('', '_self')}>
                    <i className="fa fa-twitter fa-lg"></i>
                  </span>
                  <span onClick={() => window.open('', '_self')}>
                    <i className="fa fa-youtube fa-lg"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  </FooterWrapper>
);
export default footer;
