import React, { useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'src/components/components/Loader';
import { ALERT_TYPE } from 'src/enums';
import notification from 'src/services/notification';
import { createGlobalStyle } from 'styled-components';

import { fetchOwnerDetails } from '../../store/actions/thunks/users';
import * as selectors from '../../store/selectors';
import Alert from '../components/Alert';
import Footer from '../components/footer';
import UserAvatar from '../components/UserAvatar';
import NftsAndCollections from './NftsAndCollections';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #171C27;
  }
`;

const Author = function (props: { publicAddress: string }) {
  const { publicAddress } = props;

  const dispatch = useDispatch();
  const userState = useSelector(selectors.userState);
  const owner = userState.ownerDetailes.data;
  const ownerLoading = userState.ownerDetailes.loading;
  const ownerError = userState.ownerDetailes.error;

  useEffect(() => {
    if (publicAddress) {
      dispatch(fetchOwnerDetails({ publicAddress }));
    }
    return;
  }, [publicAddress]);

  const onCopy = () => {
    notification.success(`Copied - ${publicAddress}`);
  };

  const renderOwnerProfile = () => {
    if (ownerLoading) {
      return <Loader />;
    }
    if (ownerError) {
      return <Alert text={ownerError} type={ALERT_TYPE.DANGER} />;
    }
    return (
      <div className="d_profile de-flex">
        <div className="de-flex-col">
          <div className="profile_avatar">
            <UserAvatar
              image={owner?.profileImage}
              userAddress={owner?.publicAddress}
              blockSize={10}
              size={150}
            />
            <i className="fa fa-check"></i>
            <div className="profile_name">
              <h4>
                {owner?.firstName} {owner?.lastName}
                {owner?.username && (
                  <span className="profile_username">@{owner?.username}</span>
                )}
                <span id="wallet" className="profile_wallet">
                  {owner?.publicAddress}
                </span>
                <CopyToClipboard
                  text={owner?.publicAddress || ''}
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

  return (
    <div>
      <GlobalStyles />

      <section
        id="profile_banner"
        className="jumbotron breadcumb no-bg"
        style={{
          backgroundImage: `url(${'./img/author_single/author_banner.jpg'})`
        }}
      >
        <div className="mainbreadcumb"></div>
      </section>

      <section className="container no-bottom">
        <div className="row">
          <div className="col-md-12">{renderOwnerProfile()}</div>
        </div>
      </section>

      <NftsAndCollections userAddress={publicAddress} />
      <Footer />
    </div>
  );
};
export default Author;
