// import social icons
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as CheckIcon } from 'src/assets/images/checkIcon.svg';
import { ReactComponent as FlagIcon } from 'src/assets/images/flag-icon.svg';
import { ReactComponent as CollectionIcon } from 'src/assets/images/icon/collectionicon.svg';
import { ReactComponent as IconShare } from 'src/assets/images/icon-share.svg';
import { ReactComponent as IconStar } from 'src/assets/images/icon-star.svg';
import { ReactComponent as IconMenu } from 'src/assets/images/menu.svg';
import { ReactComponent as IconSocial } from 'src/assets/images/social-first.svg';
import { ReactComponent as IconGlobe } from 'src/assets/images/social-globe.svg';
import Alert from 'src/components/Alert';
import Loader from 'src/components/Loader';
import UserAvatar from 'src/components/UserAvatar';
import { ALERT_TYPE } from 'src/enums';
import { CollectionDetailWrapper } from 'src/screens/collectionDetail/collactionDetail.style';
import CollectionDetailProductList from 'src/screens/collectionDetail/collectionDetailComponents/collectionDetailProductList';
import { getImage } from 'src/services/ipfs';
import * as selectors from 'src/store/selectors';

const CollectionDetailScreen = function () {
  //* user
  const userState = useSelector(selectors.userState);
  const user = userState.user.data;
  const userLoader = userState.user.loading;
  const userError = userState.user.error;
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };
  const renderProfile = () => {
    if (userLoader) {
      return <Loader />;
    }
    if (userError) {
      return <Alert text={userError} type={ALERT_TYPE.DANGER} />;
    }

    return (
      <div>
        <div className="collection-banner-details">
          <div className="d-flex align-items-center justify-content-between">
            <div className="profile_avatar">
              <div className="profile-avatar-image">
                <UserAvatar
                  image={user?.profileImage}
                  userAddress={user?.publicAddress}
                  blockSize={10}
                  size={150}
                />
                <CheckIcon />
              </div>
              <div className="profile_name">
                <h4>
                  <CollectionIcon />
                  {user?.firstName} {user?.lastName}{' '}
                  <CheckIcon className="profile-check-icon" />
                </h4>
                <div className="profile-username-cta">
                  <div className="profile-username">
                    Created by{' '}
                    {user?.username && (
                      <span className="profile_username">
                        @{user?.username}
                      </span>
                    )}
                    <span id="wallet" className="profile_wallet">
                      {user?.publicAddress}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="collection-profile-links d-flex align-items-center">
              <ul className="profileSocial">
                <li>
                  <a href="#">
                    <IconSocial />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <TwitterIcon />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <YouTubeIcon />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <IconGlobe />
                  </a>
                </li>
              </ul>
              <ul className="profile-extra-icons">
                <li>
                  <a href="#">
                    <IconStar />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <IconShare />
                  </a>
                </li>
                <li>
                  <a href="javascript:;" onClick={handleClick}>
                    <IconMenu />
                  </a>

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    className="custom-dropdown"
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button'
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <FlagIcon /> Reports
                    </MenuItem>
                  </Menu>
                </li>
              </ul>
            </div>
          </div>
          <div className="profileDescription">
            <p>
              A brand for the metaverse. Built by the community. Azuki starts
              with a collection of 10,000 avatars that give you membership
              access to The Garden: a corner of the internet where artists,
              builders, and web3 enthusiasts meet to create a decentralized
              future. Azuki holders receive access exclusi...More
            </p>
            <ul className="d-flex">
              <li>
                520 <span>Items</span>
              </li>
              <li>
                55 <span>Owners</span>
              </li>
              <li>
                1.7K <span>Total volume</span>
              </li>
              <li>
                5.2K <span>Floor price</span>
              </li>
              <li>
                4.2 <span>Best offer</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  return (
    <CollectionDetailWrapper>
      <Box
        className="collection-detail-banner"
        style={{
          backgroundImage: `url(${getImage(user?.bannerImage)})`
        }}
      ></Box>

      <section className="nft-profile-details">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{renderProfile()}</div>
          </div>
        </div>
      </section>
      <section className="nft-profile-tabs">
        <CollectionDetailProductList />
      </section>
    </CollectionDetailWrapper>
  );
};
export default CollectionDetailScreen;
