import React from 'react';
import { COIN, MARKET_TYPE } from 'src/enums';
import { getImage } from 'src/services/ipfs';
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
  };
  marketType?: MARKET_TYPE;
  timer?: boolean;
  multiple: boolean;
  expirationDateInput?: string;
}

export default function PreviewNft(props: IProps) {
  const {
    imageUrl,
    userImage,
    nft,
    marketType,
    timer,
    expirationDateInput,
    multiple
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

  return (
    <div className="nft__item m-0">
      {timer && marketType === MARKET_TYPE.AUCTION && (
        <div className="de_countdown">
          <Clock deadline={expirationDateInput || 'December, 30, 2021'} />
        </div>
      )}
      <div className="author_list_pp">
        <span>
          <img className="lazy" src={getImage(userImage)} alt="" />
          <i className="fa fa-check"></i>
        </span>
      </div>
      <div className="nft__item_wrap">
        <span>
          <img
            src={getImage(imageUrl)}
            id="get_file_2"
            className="lazy nft__item_preview"
            alt=""
          />
        </span>
      </div>
      <div className="nft__item_info">
        <span>
          <h4>{nft?.name || 'Pinky Ocean'}</h4>
        </span>
        <div className="nft__item_price">
          {nft?.price || 0} {COIN}
          {<span>{getNumberOfCopies()}</span>}
        </div>
        <div className="nft__item_action">
          <span>
            {marketType === MARKET_TYPE.SIMPLE ? 'Buy Now' : 'Place a bid'}
          </span>
        </div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>50</span>
        </div>
      </div>
    </div>
  );
}
