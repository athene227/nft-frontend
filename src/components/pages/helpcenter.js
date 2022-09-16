import React from 'react';
import Footer from '../components/footer';
import { Link } from '@reach/router';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  .navbar {
    border-bottom: solid 1px rgba(255, 255, 255, .1) !important;
  }
`;

const logintwo = () => (
  <div>
    <GlobalStyles />

    <section className="jumbotron breadcumb no-bg">
      <div className="mainbreadcumb">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2 text-center">
              <h1>Help Center</h1>
              <div className="spacer-20"></div>
              <form className="row" id="form_sb" name="myForm">
                <div className="col text-center">
                  <input
                    className="form-control"
                    id="name_1"
                    name="name_1"
                    placeholder="how can we help you today? start typing..."
                    type="text"
                  />{' '}
                  <button id="btn-submit">
                    <i className="arrow_right"></i>
                  </button>
                </div>
              </form>
              <div className="spacer-20"></div>

              <p className="mt-0"></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="container">
      <div className="row">
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
            <div className="text">
              <h4>Getting Started</h4>
              <p>
                Learn how to create an account, set up your wallet, edit your
                profile and more.
              </p>
              <Link to="" className="btn-main m-auto">
                Read more
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
            <div className="text">
              <h4>Buying</h4>
              <p>
                Learn how to purchase your NFT and understand how to store it
                the right way.
              </p>
              <Link to="" className="btn-main m-auto">
                Read more
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
            <div className="text">
              <h4>Selling</h4>
              <p>Learn how to list your NFTs for sale.</p>
              <Link to="" className="btn-main m-auto">
                Read more
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
            <div className="text">
              <h4>Create</h4>
              <p>Learn how to create a single or multiple.</p>
              <Link to="" className="btn-main m-auto">
                Read more
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
            <div className="text">
              <h4>Partners</h4>
              <p>Let us showcase your next drop.</p>
              <Link to="" className="btn-main m-auto">
                Read more
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
            <div className="text">
              <h4>Design</h4>
              <p>Learn how to design your NFTs and list it for sale.</p>
              <Link to="" className="btn-main m-auto">
                Read more
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
            <div className="text">
              <h4>FAQ</h4>
              <p>Most common question from the community.</p>
              <Link to="" className="btn-main m-auto">
                Read more
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
            <div className="text">
              <h4>User Safety</h4>
              <p>What we do to keep our users safe.</p>
              <Link to="" className="btn-main m-auto">
                Read more
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
            <div className="text">
              <h4>Developers</h4>
              <p>Come build with us</p>
              <Link to="" className="btn-main m-auto">
                Coming Soon
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);
export default logintwo;
