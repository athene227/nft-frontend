/* eslint-disable react/jsx-no-bind */
import { navigate } from '@reach/router';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { MARKET_TYPE, STATUS } from 'src/enums';
import { getImage } from 'src/services/ipfs';
import { INft } from 'src/types/nfts.types';
import { dateHasPassed } from 'src/utils';
import styled from 'styled-components';

import * as selectors from '../../store/selectors';
import Clock from './Clock/Clock';
const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

interface IProps {
  nft: INft;
  className?: string;
  clockTop?: boolean;
  height: number | string;
  onImgLoad: any;
}
const NftCard = ({
  nft,
  className = 'd-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4',
  clockTop = true,
  height,
  onImgLoad
}: IProps) => {
  const web3State = useSelector(selectors.web3State);
  const { accounts } = web3State.web3.data;
  const userAddress = accounts[0];

  const navigateTo = (link: string) => {
    navigate(link);
  };

  const getBuyOrPlaceBid = () => {
    if (nft.status === STATUS.ON_SELL) {
      if (nft.marketType === MARKET_TYPE.SIMPLE) {
        return 'Buy Now';
      } else if (nft.marketType === MARKET_TYPE.AUCTION) {
        return 'Place a bid';
      }
    } else {
      return <br />;
    }
  };

  const renderPrice = () => {
    if (nft.status === STATUS.ON_SELL) {
      const bidCount = nft?.bids?.length || 0;
      return nft.marketType === MARKET_TYPE.SIMPLE ? (
        nft.price
      ) : (
        <div>
          <p>from {nft.minimumBid}</p>
          {bidCount > 0 && (
            <p className="text-right">
              <span>
                Current: {bidCount} bids
                {nft?.totalBid && (
                  <span>, {nft.totalBid.toPrecision(3)} ETH Total</span>
                )}
              </span>
            </p>
          )}
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <div className="nft__item m-0">
        {nft.item_type === 'single_items' ? (
          <div className="icontype">
            <i className="fa fa-bookmark"></i>
          </div>
        ) : (
          <div className="icontype">
            <i className="fa fa-shopping-basket"></i>
          </div>
        )}
        {nft.multiple && (
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 4,
              width: '100%',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            multiple
          </div>
        )}

        {nft.marketType === MARKET_TYPE.AUCTION &&
          nft.status === STATUS.ON_SELL &&
          clockTop && (
            <div className="de_countdown">
              <Clock deadline={nft.expirationDate} />
            </div>
          )}
        <div className="author_list_pp">
          <span onClick={() => navigateTo(`/author/${nft.ownerAddress}`)}>
            <img
              className="lazy"
              src={getImage(nft?.owner?.[0]?.profileImage)}
              alt=""
            />
            <i className="fa fa-check"></i>
          </span>
        </div>

        <div className="nft__item_wrap" style={{ height: `${height}px` }}>
          <Outer>
            <span>
              <img
                className="lazy nft__item_preview"
                onLoad={onImgLoad}
                src={getImage(nft.imageUrl)}
                alt=""
              />
            </span>
          </Outer>
        </div>

        <div
          className="nft__item_info"
          onClick={(e) => {
            if (nft.multiple) {
              navigateTo(
                `/ItemDetailMultiple/${nft.tokenId}/${nft.nftAddress}`
              );
            } else {
              navigateTo(`/ItemDetail/${nft.tokenId}/${nft.nftAddress}`);
            }
          }}
        >
          {nft?.nftCollection?.length > 0 && (
            <div style={{}}>collection: {nft.nftCollection[0].name}</div>
          )}

          <span>
            <h4>{nft.name}</h4>
          </span>

          <div className="nft__item_price">{renderPrice()}</div>

          {nft.ownerAddress !== userAddress && (
            <div className="nft__item_action">
              <span onClick={() => navigateTo(nft.bidLink)}>
                {getBuyOrPlaceBid()}
              </span>
            </div>
          )}
          {nft.ownerAddress === userAddress && (
            <div className="nft__item_action">
              <span>
                {nft.status === STATUS.NOT_LISTED ? 'Not listed' : 'Listed'}
              </span>
            </div>
          )}
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{nft.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(NftCard);
