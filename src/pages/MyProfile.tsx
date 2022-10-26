// import social icons
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BsSnapchat } from 'react-icons/bs';
import { FaDiscord, FaTiktok } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Loader from 'src/components/Loader';
import { ALERT_TYPE } from 'src/enums';
import { getImage } from 'src/services/ipfs';
import notification from 'src/services/notification';
import { createGlobalStyle } from 'styled-components';

import Alert from '../components/Alert';
import UserAvatar from '../components/UserAvatar';
import * as selectors from '../store/selectors';
import NftsAndCollections from './NftsAndCollections';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    // background: #171C27;
  }
`;

const MyProfile = function () {
  // function classChanger(){
  //   console.log('function is working');
  if (document.getElementsByClassName('nft-profile-details').length) {
    document.body.classList.add('profile-header');
  } else {
    document.body.classList.remove('profile-header');
  }
  // }
  // document.body.addEventListener("change", classChanger);

  const web3State = useSelector(selectors.web3State);
  const { accounts } = web3State.web3.data;

  //* user
  const userState = useSelector(selectors.userState);
  const user = userState.user.data;
  const userLoader = userState.user.loading;
  const userError = userState.user.error;

  const onCopy = () => {
    notification.success(`Copied - ${user?.publicAddress}`);
  };

  const renderProfile = () => {
    if (userLoader) {
      return <Loader />;
    }
    if (userError) {
      return <Alert text={userError} type={ALERT_TYPE.DANGER} />;
    }

    return (
      <div className="d_profile ">
        <div className="de-flex profile-banner-details">
          <div className="de-flex-col">
            <div className="profile_avatar">
              <div className="profile-avatar-image">
                <UserAvatar
                  image={user?.profileImage}
                  userAddress={user?.publicAddress}
                  blockSize={10}
                  size={150}
                />
                <i className="fa fa-check"></i>
              </div>
              <div className="profile_name">
                <h4>
                  {user?.firstName} {user?.lastName}
                </h4>
                <div className="profile-username-cta">
                  <div className="profile-username">
                    {user?.username && (
                      <span className="profile_username">
                        @{user?.username}
                      </span>
                    )}
                  </div>
                  <div className="profile-cta">
                    <span id="wallet" className="profile_wallet">
                      {user?.publicAddress}
                    </span>
                    <CopyToClipboard
                      text={user?.publicAddress || ''}
                      onCopy={onCopy}
                    >
                      <span
                        id="btn_copy"
                        title="Copy Text"
                        className="fa fa-copy"
                      ></span>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="profile_follow de-flex">
            <div className="de-flex-col">
              <div className="profile_follower">
                <span>500</span> followers
              </div>
              <div className="profile_follower">
                <span>500</span> following
              </div>
            </div>
            <div className="de-flex-col">
              <span className="btn-main btn-grad">Follow</span>
            </div>
          </div>
        </div>
        <div className="profileDescription">
          <p>
            A brand for the metaverse. Built by the community. Azuki starts with
            a collection of 10,000 avatars that give you membership access to
            The Garden: a corner of the internet where artists, builders, and
            web3 enthusiasts meet to create a decentralized future. Azuki
            holders receive access exclusi...More
          </p>
        </div>
        <ul className="profileSocial">
          <li>
            <a href="#">
              <TwitterIcon />
            </a>
          </li>
          <li>
            <a href="#">
              <FaDiscord />
            </a>
          </li>
          <li>
            <a href="#">
              <YouTubeIcon />
            </a>
          </li>
          <li>
            <a href="#">
              <FacebookRoundedIcon />
            </a>
          </li>
          <li>
            <a href="#">
              <FaTiktok />
            </a>
          </li>
          <li>
            <a href="#">
              <BsSnapchat />
            </a>
          </li>
        </ul>
      </div>
    );
  };
  console.log(
    '🚀 ~ file: MyProfile.tsx ~ line 90 ~ MyProfile ~ getImage(user?.bannerImage)',
    getImage(user?.bannerImage)
  );
  return (
    <div>
      <GlobalStyles />

      <section
        id="profile_banner"
        className="jumbotron breadcumb no-bg"
        style={{
          // backgroundImage: `url(${'./img/author_single/author_banner.jpg'})`
          backgroundImage: `url(${getImage(user?.bannerImage)})`
        }}
      >
        <div className="mainbreadcumb"></div>
      </section>

      <section className="nft-profile-details">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{renderProfile()}</div>
          </div>
        </div>

        {accounts.length > 0 && (
          <NftsAndCollections userAddress={accounts[0]} />
        )}
      </section>
    </div>
  );
};
export default MyProfile;
