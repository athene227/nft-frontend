import React from 'react';
import { useSelector } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import * as selectors from '../../store/selectors';

import { ALERT_TYPE } from 'src/enums';
import Loader from 'src/components/components/Loader';
import Alert from '../components/Alert';
import notification from 'src/services/notification';
import { getImage } from 'src/services/ipfs';
import NftsAndCollections from './NftsAndCollections';
import UserAvatar from '../components/UserAvatar';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #171C27;
  }
`;

const MyProfile = function () {
  //* web3
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
      <div className="d_profile de-flex">
        <div className="de-flex-col">
          <div className="profile_avatar">
            <UserAvatar
              image={user?.profileImage}
              userAddress={user?.publicAddress}
              blockSize={10}
              size={150}
            />
            <i className="fa fa-check"></i>
            <div className="profile_name">
              <h4>
                {user?.firstName} {user?.lastName}
                {user?.username && (
                  <span className="profile_username">@{user?.username}</span>
                )}
                <span id="wallet" className="profile_wallet">
                  {user?.publicAddress}
                </span>
                <CopyToClipboard
                  text={user?.publicAddress || ''}
                  onCopy={onCopy}
                >
                  <button id="btn_copy" title="Copy Text">
                    Copy
                  </button>
                </CopyToClipboard>
              </h4>
            </div>
          </div>
        </div>
        <div className="profile_follow de-flex">
          <div className="de-flex-col">
            <div className="profile_follower">500 followers</div>
          </div>
          <div className="de-flex-col">
            <span className="btn-main">Follow</span>
          </div>
        </div>
      </div>
    );
  };
  console.log('getImage(user?.bannerImage)', getImage(user?.bannerImage));
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

      <section className="container no-bottom">
        <div className="row">
          <div className="col-md-12">{renderProfile()}</div>
        </div>
      </section>

      {accounts.length > 0 && <NftsAndCollections userAddress={accounts[0]} />}
    </div>
  );
};
export default MyProfile;
