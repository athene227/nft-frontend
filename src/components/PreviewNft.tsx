import moment from 'moment';
import { MARKET_TYPE } from 'src/enums';
import { getImage } from 'src/services/ipfs';

//import price from '../pages/price';
import Clock from './Clock/Clock';

interface IProps {
  imageUrl: string;
  userImage: string | undefined;
  nft: {
    name: string;
    description: string;
    price: number | string;
    minimumBid: number | string;
    totalAmount?: number | undefined;
    leftAmount?: number;
    collection?: string;
  };
  selectCollection?: string;
  marketType?: MARKET_TYPE;
  tokentype: string;
  isPreview?: boolean;
  multiple: boolean;
  dateRange: any;
}

export default function PreviewNft(props: IProps) {
  const {
    imageUrl,
    userImage,
    nft,
    dateRange,
    marketType,
    tokentype,
    isPreview,
    multiple,
    selectCollection
  } = props;

  const getNumberOfCopies = () => {
    if (multiple) {
      if (nft?.totalAmount) {
        return `${nft?.leftAmount}/${nft?.totalAmount}`;
      }
      return 'X0';
    } else {
      return '1/1';
    }
  };

  const convert = (value: number | string) => {
    const length = (value + '').length,
      index = Math.ceil((length - 3) / 3),
      suffix = ['K', 'M', 'G', 'T', 'QT'];

    if (length < 4) return value;

    return (
      (value / Math.pow(1000, index)).toFixed(1).replace(/\.0$/, '') +
      ' ' +
      suffix[index - 1]
    );
  };
  const auctionExpiryDate =
    dateRange?.length &&
    moment(dateRange[0].endDate).format('MMM, DD, YYYY hh:mm');

  return (
    <div className="col-lg-5 createNft__preview">
      <div className="createNft__preview_img">
        <div className="nft__item m-0">
          <div className="nft__item_wrap">
            <span>
              <img
                src={getImage(imageUrl)}
                id="get_file_2"
                className="lazy nft__item_preview"
                alt=""
              />
            </span>
            {marketType === MARKET_TYPE.AUCTION && (
              <div className="de_countdown">
                <Clock deadline={auctionExpiryDate || 'December, 30, 2022'} />
              </div>
            )}
          </div>
          <div className="nft__item_info">
            <div className="col-12 d-flex justify-content-between mb-0 pl-0">
              <span>
                <h4>{nft?.name || '-- -- -- -- --'}</h4>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="nft-collection-name">
                      <img
                        className={''}
                        src="./img/collectionIcon.png"
                        alt=""
                      ></img>
                      {selectCollection?.valueOf() || '-- -- -- -- -- --'}
                    </p>
                  </div>
                </div>
              </span>
              <div className="nft-supply-details">
                {nft.totalAmount && nft.totalAmount > 1 && (
                  <p>
                    <span>
                      {nft?.totalAmount}/{nft?.totalAmount}
                    </span>
                    Supply
                  </p>
                )}
              </div>
            </div>
            <span className="price-heading">
              {marketType === MARKET_TYPE.SIMPLE && nft?.price
                ? 'price'
                : marketType === MARKET_TYPE.AUCTION && nft?.price
                ? 'min bid'
                : 'price'}
            </span>

            <div className="d-flex justify-content-between align-items-center">
              <div className="nft__item_price">
                <div className="author_list_pp pulse_bottom">
                  <img
                    className={''}
                    src="./img/currency-icon.svg"
                    alt=""
                  ></img>
                </div>
                <div>
                  {marketType === MARKET_TYPE.SIMPLE && nft?.price
                    ? convert(nft.price)
                    : marketType === MARKET_TYPE.AUCTION && nft?.minimumBid
                    ? convert(nft.minimumBid)
                    : '0.00'}
                  {<span className="d-none">{getNumberOfCopies()}</span>}
                </div>
              </div>
              {isPreview && (
                <div className="nft__item_action">
                  <span>
                    {marketType === MARKET_TYPE.SIMPLE && nft?.price
                      ? 'Buy Now'
                      : marketType === MARKET_TYPE.AUCTION && nft?.price
                      ? 'Place a Bid'
                      : '-- -- -- --'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
