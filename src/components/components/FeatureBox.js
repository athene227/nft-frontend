import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from '@emotion/react';

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const featurebox = () => (
  <div className="row">
    <div className="col-lg-4 col-md-6 mb-3">
      <div className="feature-box f-boxed style-3">
        {/* <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
                    <i className="bg-color-2 i-boxed icon_wallet"></i>
                  </Reveal> */}
        <div className="text">
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={100}
            duration={600}
            triggerOnce
          >
            <h4 className="">1. Create a profile</h4>
          </Reveal>
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={200}
            duration={600}
            triggerOnce
          >
            <p className="">
              Click on "Connect Wallet". Approve connection to this site and
              allow MetaMask to connect to PulseChain. Then head over to My
              Profile!
            </p>
          </Reveal>
        </div>
        <i className="wm icon_wallet"></i>
      </div>
    </div>

    <div className="col-lg-4 col-md-6 mb-3">
      <div className="feature-box f-boxed style-3">
        {/* <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
                  <i className=" bg-color-2 i-boxed icon_cloud-upload_alt"></i>
                </Reveal> */}
        <div className="text">
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={100}
            duration={600}
            triggerOnce
          >
            <h4 className="">2. Create an NFT</h4>
          </Reveal>
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={200}
            duration={600}
            triggerOnce
          >
            <p className="">
              Go to "Create" and upload your NFT. Double check the image, title
              and description. This information cannot be changed, it's
              immutable!
            </p>
          </Reveal>
        </div>
        <i className="wm icon_cloud-upload_alt"></i>
      </div>
    </div>

    <div className="col-lg-4 col-md-6 mb-3">
      <div className="feature-box f-boxed style-3">
        {/* <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
                  <i className=" bg-color-2 i-boxed icon_tags_alt"></i>
                </Reveal> */}
        <div className="text">
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={100}
            duration={600}
            triggerOnce
          >
            <h4 className="">3. Sell your NFT</h4>
          </Reveal>
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={200}
            duration={600}
            triggerOnce
          >
            <p className="">
              All your NFTs are visible on "My Profile". Click on the NFT you'd
              like to sell. Choose "Buy Now" or "Auction", set the price, set
              the royalties and list it!{' '}
            </p>
          </Reveal>
        </div>
        <i className="wm icon_tags_alt"></i>
      </div>
    </div>
  </div>
);
export default featurebox;
