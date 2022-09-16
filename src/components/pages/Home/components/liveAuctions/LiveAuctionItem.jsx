import React, { useEffect } from 'react';
import Clock from '../../../../components/Clock/Clock';
import styled from 'styled-components';
import { getImage } from 'src/services/ipfs';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 360px;
  overflow: hidden;
  border-radius: 8px;
`;

function LiveAuctionItem({ hotAuction }) {
  //console.log(hotAuction);
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
              <Outer>
                <span>
                  <img
                    src={getImage(hotAuction.imageUrl)}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </span>
              </Outer>
              <div className={`stats d-flex flex-column pt-2`}>
                <div className="col-12 d-flex justify-content-between">
                  <p className={`col-7 p-0 text-left stats_info`}>
                    Highest Bid
                  </p>
                  <p className={`col-5 p-0 text-left stats_info`}>Ends In</p>
                </div>
                <div className="col-12 d-flex d-flex justify-content-between">
                  <p className={`col-6 p-0 text-left stats_price`}>0.72 PLS</p>
                  <Clock className={`stats_timer`} deadline={'2022-03-30'} />
                </div>
              </div>
            </div>
            <div className="nft__item_info d-flex flex-column ">
              <div className="col-12 d-flex justify-content-between align-items-center">
                <div className="col-11 pl-0">
                  <div className="author_list_pp">
                    <span>
                      {/* <img className="lazy" src={getProfileImage(nft?.owner[0]?.[0].profileImage)} alt="" /> */}
                      <img
                        className="lazy"
                        src={hotAuction.owner[0].profileImage}
                        alt=""
                      />
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

                <div className="col-3 text-right">
                  <div
                    className={`author_list_dimensions author_list_pp author_icon_custom`}
                  >
                    <span onClick={() => window.open('/home1', '_self')}>
                      <img className="lazy" src={'./img/eth.png'} alt="" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-12 d-flex justify-content-between">
                <div className="nft__item_user">
                  {hotAuction.owner[0].username}
                </div>

                <div className="nft__item_price">{hotAuction.price} PLS</div>
              </div>

              <div className="spacer-single"></div>
              <div className="nft__item_action col-12 mb-2">
                <span className="btn-main btn-grad w-100">Place a Bid</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveAuctionItem;
