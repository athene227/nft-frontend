import moment from 'moment';
import React, { useEffect } from 'react';
import { MARKET_TYPE } from 'src/enums';
import { getImage } from 'src/services/ipfs';

import price from '../pages/price';
import Clock from './Clock/Clock';

interface IProps {
  imageUrl: string;
  userImage: string | undefined;
  nft: {
    name: string;
    description: string;
    price: number | string;
    totalAmount?: number;
    leftAmount?: number;
    collection?: string;
  };
  selectCollection?: string;
  marketType?: MARKET_TYPE;
  tokentype: string;
  isPreview?: boolean;
  timer?: boolean;
  multiple: boolean;
}

export default function PreviewNft(props: IProps) {
  const {
    imageUrl,
    userImage,
    nft,
    starttime,
    endtime,
    dateRange,
    marketType,
    tokentype,
    isPreview,
    timer,
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

  const auctionExpiryDate = moment(dateRange[0].endDate).format(
    'MMM, DD, YYYY hh:mm'
  );

  console.log('Auction Expiray Date', auctionExpiryDate);
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
                {nft.totalAmount > 1 && (
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
                : '-- -- --'}
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
                  {nft?.price || '-- -- --'} {nft?.price ? tokentype : ''}
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
