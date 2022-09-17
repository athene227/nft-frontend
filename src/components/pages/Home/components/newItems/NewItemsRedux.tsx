/* eslint-disable react/jsx-no-bind */
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { navigate } from '@reach/router';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import Clock from 'src/components/components/Clock/Clock';
import UserAvatar from 'src/components/components/UserAvatar';
import { MARKET_TYPE, STATUS } from 'src/enums';
import { getImage } from 'src/services/ipfs';
import { fetchNewNfts } from 'src/store/actions/thunks';
import * as selectors from 'src/store/selectors';
import { INft } from 'src/types/nfts.types';
import styled from 'styled-components';

import { newItemsSettings } from './newItemsSettings';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 180px;
  overflow: hidden;
  border-radius: 3px;
`;

const NewItemsRedux = () => {
  const dispatch = useDispatch();
  const nftsState = useSelector(selectors.newNftsState);
  const web3State = useSelector(selectors.web3State);
  const { accounts } = web3State.web3.data;
  const userAddress = accounts[0];

  useEffect(() => {
    dispatch(fetchNewNfts());
  }, [dispatch]);

  const navigateToDetails = (nft: INft) => {
    if (nft.multiple) {
      navigate(`/ItemDetailMultiple/${nft.tokenId}/${nft.nftAddress}`);
    } else {
      navigate(`/ItemDetail/${nft.tokenId}/${nft.nftAddress}`);
    }
  };

  const navigateToUser = (publicAddress: string) => {
    navigate(`/author/${publicAddress}`);
  };

  const getBuyOrPlaceBid = (nft: INft) => {
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
    <div className="nft">
      <Slider {...newItemsSettings}>
        {nftsState &&
          nftsState.map((nft, index) => (
            <div className="itm" key={index}>
              <div className="d-item">
                <div className="nft-item-custom nft__item">
                  <div className="nft-item-customcontent">
                    <div
                      className="nft_item__top_image"
                      onClick={() =>
                        navigateToUser(nft.owner[0]?.publicAddress)
                      }
                    >
                      <span>
                        <UserAvatar
                          className="lazy img_hover"
                          image={nft.owner[0]?.profileImage}
                          userAddress={nft.ownerAddress}
                          blockSize={3}
                          size={30}
                        />
                      </span>
                    </div>
                    {nft.marketType !== 'SIMPLE' && (
                      <div className="de_countdown de_countdown__bg_white">
                        <Clock deadline={nft.expirationDate} />
                      </div>
                    )}
                    <div className="nft__item_wrap">
                      <Outer>
                        <span>
                          <img
                            onClick={() => navigateToDetails(nft)}
                            src={getImage(nft.previewImageUrl || nft.imageUrl)}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </span>
                      </Outer>
                    </div>
                    <div
                      className="nft__item_info d-flex flex-column"
                      onClick={() => navigateToDetails(nft)}
                    >
                      <div className="col-12 d-flex justify-content-between mb-0 pl-0">
                        <div>
                          <h4 className="mb-0 nft__item__name_hover">
                            {nft.name}
                          </h4>
                        </div>

                        <div className="col-3">
                          <div
                            className={`author_list_pp ${
                              nft.expirationDate
                                ? 're_pulse_bottom'
                                : 'pulse_bottom'
                            }`}
                          >
                            <span>
                              <img
                                className={''}
                                src="./img/eth.png"
                                alt=""
                              ></img>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 d-flex p-0">
                        <div className={`nft__item_user nft__item__name_hover`}>
                          {nft.owner[0]?.username}
                        </div>
                      </div>

                      <div
                        className={`col-12 pb-1 mt-3 pr-1 d-flex justify-content-between action_row_custom`}
                      >
                        {nft.ownerAddress !== userAddress && (
                          <div
                            className={`nft__item_action btn-grad mb-2 btn_grad_custom`}
                          >
                            <span>{getBuyOrPlaceBid(nft)}</span>
                          </div>
                        )}
                        <div className={`nft__item_price`}>
                          {nft.marketType === 'SIMPLE'
                            ? nft.price
                            : nft.minimumBid}{' '}
                          <img
                            src="./img/items/PulseChain-Logo-Shape.png"
                            alt=""
                          ></img>{' '}
                          PLS
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default memo(NewItemsRedux);
