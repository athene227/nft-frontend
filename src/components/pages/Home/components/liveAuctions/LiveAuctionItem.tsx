import { navigate } from '@reach/router';
import React from 'react';
import UserAvatar from 'src/components/components/UserAvatar';
import { MARKET_TYPE } from 'src/enums';
import { getImage } from 'src/services/ipfs';
import { INft } from 'src/types/nfts.types';
import styled from 'styled-components';

import Clock from '../../../../components/Clock/Clock';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 360px;
  overflow: hidden;
  border-radius: 8px;
`;

interface IProps {
  hotAuction: INft;
}

function LiveAuctionItem({ hotAuction }: IProps) {
  //console.log(hotAuction);

  const onClickAuction = () => {
    navigate(`/ItemDetail/${hotAuction.tokenId}/${hotAuction.nftAddress}`);
  };

  return (
    <div className="itm">
      <div className="d-item">
        <div className={`nft__item sec-bg live_bg_col`}>
          <div className="nft-item-customcontent">
            {hotAuction.deadline && (
              <div className="de_countdown">
                <Clock deadline={hotAuction.deadline} />
              </div>
            )}
            <div className={`nft__item_wrap live_item`}>
              <Outer className="nft-outer">
                <span>
                  <img
                    src={getImage(
                      hotAuction.previewImageUrl || hotAuction.imageUrl
                    )}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </span>
              </Outer>
              {hotAuction.marketType !== 'SIMPLE' && (
                <div className={`stats d-flex flex-column pt-2`}>
                  <div className="col-12 d-flex justify-content-between">
                    <p className={`col-7 p-0 text-left stats_info`}>
                      Highest Bid
                    </p>
                    <p className={`col-5 p-0 text-left stats_info`}>Ends In</p>
                  </div>
                  <div className="col-12 d-flex d-flex justify-content-between">
                    <p className={`col-6 p-0 text-left stats_price`}>
                      {hotAuction.minimumBid} PLS
                    </p>
                    <Clock
                      className={`stats_timer`}
                      deadline={hotAuction.expirationDate}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="nft__item_info d-flex flex-column ">
              <div className="col-12 d-flex justify-content-between align-items-center">
                <div className="col-11 pl-0">
                  <div className="author_list_pp">
                    <span>
                      {/* <img className="lazy" src={getProfileImage(nft?.owner[0]?.[0].profileImage)} alt="" /> */}
                      <UserAvatar
                        className="lazy img_hover"
                        image={hotAuction.owner[0]?.profileImage}
                        userAddress={hotAuction.owner[0]?.publicAddress}
                        blockSize={5}
                        size={50}
                      />
                      {/* <img
                        className="lazy"
                        src={hotAuction.owner[0].profileImage}
                        alt=""
                      /> */}
                      <i className="fa fa-check"></i>
                    </span>
                  </div>
                  <div className="spacer-double"></div>
                </div>
                <div className="col-1">
                  <i className={`icon_font fa fa-ellipsis-h`}></i>
                </div>
              </div>

              <div className="col-12 d-flex justify-content-between mb-1">
                <div onClick={() => window.open('/#', '_self')}>
                  <h4>{hotAuction.owner[0].firstName}</h4>
                </div>

                {/*<div className="col-3 text-right">
                  <div
                    className={`author_list_dimensions author_list_pp author_icon_custom`}
                  >
                    <span onClick={() => window.open('/home1', '_self')}>
                      <img className="lazy" src={'./img/eth.png'} alt="" />
                    </span>
                  </div>
                </div>*/}
              </div>

              <div className="col-12 d-flex justify-content-between">
                <div className="nft__item_user">
                  {hotAuction.owner[0].username}
                </div>

                <div className="nft__item_price">
                  {hotAuction.marketType === MARKET_TYPE.SIMPLE
                    ? hotAuction.price
                    : hotAuction.minimumBid}{' '}
                  <img
                    className={`icon_margin`}
                    src="./img/items/PulseChain-Logo-Shape.png"
                    alt=""
                  ></img>{' '}
                  PLS
                </div>
              </div>

              <div className="spacer-single"></div>
              <div className="nft__item_action col-12 mb-2">
                <span
                  className="btn-main btn-grad w-100"
                  onClick={onClickAuction}
                >
                  {hotAuction.marketType === MARKET_TYPE.SIMPLE
                    ? 'Buy Now'
                    : 'Place Bid'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveAuctionItem;
