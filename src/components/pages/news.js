import React from 'react';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #171C27;
  }
`;

const news = () => (
  <div>
    <GlobalStyles />

    <section className="jumbotron breadcumb no-bg">
      <div className="mainbreadcumb">
        <div className="container">
          <div className="row m-10-hor">
            <div className="col-12 text-center">
              <h1>News</h1>
              <p>Learn more about NFTs</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="container">
      <div className="row">
        <div className="col-lg-4 col-md-6 mb30">
          <div className="bloglist item">
            <div className="post-content">
              <div className="post-image">
                <img
                  alt=""
                  src="./img/news/nftTricksAndTips-nftonpulse.jpeg"
                  className="lazy"
                />
              </div>
              <div className="post-text">
                <span className="p-tagline">Tips &amp; Tricks</span>
                <span className="p-date">FEB 2022</span>
                <h4>
                  <span>
                    The next big trend in crypto<span></span>
                  </span>
                </h4>
                <p>
                  Dolore officia sint incididunt non excepteur ea mollit commodo
                  ut enim reprehenderit cupidatat labore ad laborum consectetur
                  consequat...
                </p>
                <span className="btn-main">Read more</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb30">
          <div className="bloglist item">
            <div className="post-content">
              <div className="post-image">
                <img
                  alt=""
                  src="./img/news/nftGenerativeArt-nftonpulse.jpeg"
                  className="lazy"
                />
              </div>
              <div className="post-text">
                <span className="p-tagline">NFT &amp; ART</span>
                <span className="p-date">FEB 2022</span>
                <h4>
                  <span>
                    Generative Art NFT<span></span>
                  </span>
                </h4>
                <p>
                  It’s a visual art genre where artists can generate a process
                  or system in creating the output. As the name suggests, it’s
                  an art that’s generated.
                </p>
                <span className="btn-main">Read more</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb30">
          <div className="bloglist item">
            <div className="post-content">
              <div className="post-image">
                <img
                  alt=""
                  src="./img/news/nftGenerativeArt-nftonpulse.jpeg"
                  className="lazy"
                />
              </div>
              <div className="post-text">
                <span className="p-tagline">NFT &amp; PROJECTS</span>
                <span className="p-date">FEB 2022</span>
                <h4>
                  <span>
                    NFT Projects Worth Checking Out<span></span>
                  </span>
                </h4>
                <p>
                  As non-fungible tokens (NFTs) continue to gain immense
                  popularity, there have been a BUNCH of NFT projects, art
                  collections, and even games for people to invest in.
                </p>
                <span className="btn-main">Read more</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb30">
          <div className="bloglist item">
            <div className="post-content">
              <div className="post-image">
                <img
                  alt=""
                  src="./img/news/nftmusic-nftonpulse.jpeg"
                  className="lazy"
                />
              </div>
              <div className="post-text">
                <span className="p-tagline">NFT &amp; MUSIC</span>
                <span className="p-date">FEB 2022</span>
                <h4>
                  <span>
                    What It Is And How You Can Grab Ahold Of It<span></span>
                  </span>
                </h4>
                <p>
                  Music NFTs are set to change the WHOLE industry. Streaming
                  platforms definitely have to watch their back! Let’s maneuver
                  through the music industry to understand why NFTs have been
                  making so much buzz in the music business.
                </p>
                <span className="btn-main">Read more</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb30">
          <div className="bloglist item">
            <div className="post-content">
              <div className="post-image">
                <img
                  alt=""
                  src="./img/news/nftgames-nftonpulse.jpeg"
                  className="lazy"
                />
              </div>
              <div className="post-text">
                <span className="p-tagline">NFT &amp; GAMES</span>
                <span className="p-date">FEB 2022</span>
                <h4>
                  <span>
                    Top NFT Games Of 2021<span></span>
                  </span>
                </h4>
                <p>
                  NFTs have broken into the GAMING INDUSTRY with great
                  free-to-play games, play-to-earn games, and other popular
                  types of free NFT games that have popular game themes.
                </p>
                <span className="btn-main">Read more</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb30">
          <div className="bloglist item">
            <div className="post-content">
              <div className="post-image">
                <img
                  alt=""
                  src="./img/news/nftstocks-nftonpulse.jpeg"
                  className="lazy"
                />
              </div>
              <div className="post-text">
                <span className="p-tagline">NFT &amp; STOCKS</span>
                <span className="p-date">FEB 2022</span>
                <h4>
                  <span>
                    Everything You Need To Know<span></span>
                  </span>
                </h4>
                <p>
                  Investing in NFT stocks means investing in the COMPANY
                  associated with the digital assets on any stock exchange or
                  cryptocurrency exchange (e.g., Binance, Robinhood, etc.)
                </p>
                <span className="btn-main">Read more</span>
              </div>
            </div>
          </div>
        </div>

        <div className="spacer-single"></div>

        <ul className="pagination">
          <li>
            <span className="a">Prev</span>
          </li>
          <li className="active">
            <span className="a">1</span>
          </li>
          <li>
            <span className="a">2</span>
          </li>
          <li>
            <span className="a">3</span>
          </li>
          <li>
            <span className="a">4</span>
          </li>
          <li>
            <span className="a">5</span>
          </li>
          <li>
            <span className="a">Next</span>
          </li>
        </ul>
      </div>
    </section>

    <Footer />
  </div>
);
export default news;
