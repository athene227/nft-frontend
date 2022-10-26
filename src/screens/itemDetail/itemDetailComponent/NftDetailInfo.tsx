import { faClock } from '@fortawesome/free-regular-svg-icons';
import {
  faEllipsisV,
  faEye,
  faHeart,
  faRotate,
  faShareNodes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { ReactComponent as BidIcon } from 'src/assets/images/bid-icon.svg';
import { ReactComponent as FlagIcon } from 'src/assets/images/flag-icon.svg';
import CollectionIcon from 'src/assets/images/icon/collectionicon.svg';
import OwnedIcon from 'src/assets/images/icon/owned-icon.svg';
import { MARKET_TYPE, STATUS } from 'src/enums';
import { dateHasPassed } from 'src/utils';

import { NftPurchaseCard } from '../itemdetail.style';

interface IProps {
  nftname: string;
  collectionName: string;
  owner: string;
  ownerAddress: string;
  marketType: MARKET_TYPE;
  price: number;
  minimumBid: number;
  userAddress: string;
  expirationDate: Date;
  status: STATUS;
  lazyMint: boolean;
  offersCount: number;
  openPlaceBidPopUp: () => void;
  openBuyPopUp: () => void;
  openMakeOfferPopUp: () => void;
}

function NftDetailInfo(props: IProps) {
  const {
    nftname,
    collectionName,
    owner,
    ownerAddress,
    marketType,
    price,
    minimumBid,
    userAddress,
    expirationDate,
    status,
    lazyMint,
    offersCount,
    openPlaceBidPopUp,
    openBuyPopUp,
    openMakeOfferPopUp
  } = props;
  const [anchorEl, setAnchorEl] = useState(false);
  // const [anchorElShare, setAnchorElshare] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // const handleClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorElshare(event.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(false);
    setAnchorElshare(false);
  };
  return (
    <div>
      <Box
        className="item_detail_head"
        display={'flex'}
        justifyContent="space-between"
      >
        <Box>
          <h2>{nftname}</h2>
          <p>
            From Collection <img src={CollectionIcon} />
            {''} <strong>{collectionName}</strong>
          </p>
        </Box>
        <Box>
          <ul>
            <li>
              <a href="javascript:;" onClick={handleClick}>
                <FontAwesomeIcon icon={faShareNodes} />
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
                  <FlagIcon /> Copy Link
                </MenuItem>
              </Menu>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faRotate} />
              </a>
            </li>
            <li>
              <a href="javascript:;" onClick={handleClick}>
                <FontAwesomeIcon icon={faEllipsisV} />
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
        </Box>
      </Box>
      <Box className="nft-information-list">
        <ul>
          <li>
            {' '}
            <img src={OwnedIcon} alt="owned icon" /> Owned by{' '}
            <strong>{owner}</strong>
          </li>
          <li>
            {' '}
            <FontAwesomeIcon icon={faEye} /> 13.5K views
          </li>
          <li>
            {' '}
            <FontAwesomeIcon icon={faHeart} /> 14k Favorites
          </li>
        </ul>
      </Box>
      <NftPurchaseCard>
        <Box className="nft-card-header">
          <p>
            <FontAwesomeIcon icon={faClock} />
            Sale ends Sept 17, 2022 at 7:23pm GMT+5:30
          </p>
        </Box>
        <Box
          className="nft-card-content"
          display={'flex'}
          justifyContent="space-between"
        >
          <Box>
            <h4>
              {marketType == MARKET_TYPE.AUCTION
                ? 'Minimum bid'
                : 'Current price'}
            </h4>
            <h2>
              <BidIcon />
              {marketType == MARKET_TYPE.AUCTION ? minimumBid : price}{' '}
              <small>($73.88)</small>
            </h2>
          </Box>
          <Box display={'flex'} gap="18px" alignItems="center">
            {userAddress === ownerAddress ? (
              <>
                {status === STATUS.ON_SELL ? (
                  <button className="btn-main btn-grad">Cancel listing</button>
                ) : (
                  <button className="btn-main btn-grad">List for sale</button>
                )}
                <button className="btn-main btn-grad-outline">Edit</button>
              </>
            ) : (
              <>
                {marketType == MARKET_TYPE.AUCTION ? (
                  <button
                    className="btn-main btn-grad-outline"
                    onClick={openPlaceBidPopUp}
                  >
                    Place a bid
                  </button>
                ) : (
                  <>
                    {!dateHasPassed(expirationDate) &&
                      status === STATUS.ON_SELL && (
                        <button
                          className="btn-main btn-grad"
                          onClick={openBuyPopUp}
                        >
                          Buy Now
                        </button>
                      )}
                    {!lazyMint && status === STATUS.ON_SELL && (
                      <button
                        className="btn-main btn-grad-outline"
                        onClick={openMakeOfferPopUp}
                      >
                        Make Offer
                      </button>
                    )}
                  </>
                )}
              </>
            )}
          </Box>
        </Box>
        <Box
          className="nft-card-footer"
          display={'flex'}
          justifyContent="space-between"
        >
          <Box>
            <p>
              Highest bid{' '}
              <span>
                <BidIcon /> 0.040{' '}
              </span>
              <small>($67.25)</small>
            </p>
          </Box>
          <Box>
            <span>
              Total Offers <em>{offersCount}</em>
            </span>
          </Box>
        </Box>
        {/* this is the ending of prodect detail section */}
      </NftPurchaseCard>
    </div>
  );
}

export default NftDetailInfo;
