import { faClock } from '@fortawesome/free-regular-svg-icons';
import {
  faEllipsisV,
  faEye,
  faHeart,
  faRotate,
  faShareNodes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box } from '@mui/material';
import { ReactComponent as BidIcon } from 'src/assets/images/bid-icon.svg';
import CollectionIcon from 'src/assets/images/icon/collectionicon.svg';
import OwnedIcon from 'src/assets/images/icon/owned-icon.svg';
import { STATUS } from 'src/enums';
import { NftPurchaseCard } from 'src/screens/itemDetailMultiple/itemdetailMultiple.style';
import { dateHasPassed } from 'src/utils';

interface IProps {
  nftname: string;
  collectionName: string;
  owner: string;
  ownerAddress: string;
  price: number;
  minimumBid: number;
  userAddress: string;
  expirationDate: Date;
  status: STATUS;
  lazyMint: boolean;
  offersCount: number;
  supply: number;
  leftAmount: number;
  openBuyPopUp: () => void;
  openMakeOfferPopUp: () => void;
}

function NftDetailInfo(props: IProps) {
  const {
    nftname,
    collectionName,
    owner,
    ownerAddress,
    price,
    userAddress,
    expirationDate,
    status,
    lazyMint,
    offersCount,
    supply,
    leftAmount,
    openBuyPopUp,
    openMakeOfferPopUp
  } = props;
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
              <a href="#">
                <FontAwesomeIcon icon={faShareNodes} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faRotate} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faEllipsisV} />
              </a>
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
            <h4>Current price</h4>
            <h2>
              <BidIcon />
              {price}
              <small>($73.88)</small>
            </h2>
            <h4>Total amount</h4>
            <h2>{supply}</h2>
            <h4>Left amount</h4>
            <h2>{leftAmount}</h2>
          </Box>

          <Box display={'flex'} gap="18px" alignItems="center">
            {userAddress === ownerAddress ? (
              <>
                {status !== STATUS.ON_SELL && (
                  <button className="btn-main btn-grad">List for sale</button>
                )}
                <button className="btn-main btn-grad-outline">Edit</button>
              </>
            ) : (
              <>
                <>
                  {!dateHasPassed(expirationDate) && status === STATUS.ON_SELL && (
                    <button
                      className="btn-main btn-grad"
                      onClick={openBuyPopUp}
                    >
                      Buy Now
                    </button>
                  )}
                  {!lazyMint && (
                    <button
                      className="btn-main btn-grad-outline"
                      onClick={openMakeOfferPopUp}
                    >
                      Make Offer
                    </button>
                  )}
                </>
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
