/* eslint-disable react/jsx-no-bind */
import React, { memo } from 'react';
import styled from 'styled-components';
import Clock from 'src/components/components/Clock/Clock';
import { navigate } from '@reach/router';
import { useSelector } from 'react-redux';
import * as selectors from 'src/store/selectors';
import { STATUS, MARKET_TYPE } from 'src/enums';
import { INft } from 'src/types/nfts.types';
import { dateHasPassed } from 'src/utils';
import { getImage } from 'src/services/ipfs';
import { ImageList } from '@mui/material';
import classes from './ExploreItems.module.scss';
import UserAvatar from 'src/components/components/UserAvatar';

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

const ExploreItemCard = ({
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
  const navigateToItemDetail = () => {
    if (nft.multiple) {
      navigateTo(`/ItemDetailMultiple/${nft.tokenId}/${nft.nftAddress}`);
    } else {
      navigateTo(`/ItemDetail/${nft.tokenId}/${nft.nftAddress}`);
    }
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

  return (
    <div className={className}>
      <div className="d-item">
        <div className={`nft__item nft-item-custom`}>
          <div className="nft-item-customcontent">
            <div className={` nft_item__top_image`}>
              <span onClick={() => navigateTo(`/author/${nft.ownerAddress}`)}>
                <UserAvatar
                  className="lazy img_hover"
                  image={nft.owner[0]?.profileImage}
                  userAddress={nft.owner[0]?.publicAddress}
                  blockSize={3}
                  size={30}
                />
              </span>
            </div>
            {nft.marketType !== 'SIMPLE' && (
              <div className={`de_countdown de_countdown__bg_white`}>
                <Clock deadline={nft.expirationDate} />
              </div>
            )}
            <div className={`nft__item_wrap`}>
              <Outer>
                <span>
                  <img
                    src={getImage(nft.imageUrl)}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </span>
              </Outer>
            </div>
            <div className="nft__item_info d-flex flex-column ">
              <div className="col-12 d-flex justify-content-between mb-2">
                <div>
                  <h4 className={`mb-0 nft__item__name_hover`}>{nft.name}</h4>
                </div>

                <div className="col-3">
                  <div className={`author_list_pp pulse_bottom`}>
                    <span>
                      <img className={''} src="./img/eth.png" alt=""></img>
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-12 d-flex justify-content-between">
                <div className={`nft__item_user nft__item__name_hover`}>
                  {nft?.owner[0]?.username}
                </div>
              </div>

              <div
                className={`col-12 pb-1 mt-3 pr-1 d-flex justify-content-between action_row_custom`}
              >
                <div
                  className={`nft__item_action btn-grad mb-2 btn_grad_custom`}
                >
                  {nft.ownerAddress !== userAddress && (
                    <span onClick={() => navigateToItemDetail()}>
                      {getBuyOrPlaceBid()}
                    </span>
                  )}
                  {nft.ownerAddress === userAddress && (
                    <span onClick={() => navigateToItemDetail()}>Listed</span>
                  )}
                </div>

                <div className={`nft__item_price`}>
                  {nft.marketType === 'SIMPLE' ? nft.price : nft.minimumBid}
                  <img
                    className={`icon_margin`}
                    src="./img/items/PulseChain-Logo-Shape.png"
                    alt=""
                  ></img>
                  PLS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ExploreItemCard);
