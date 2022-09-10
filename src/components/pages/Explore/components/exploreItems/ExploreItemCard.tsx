import { navigate } from '@reach/router';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import Clock from 'src/components/components/Clock/Clock';
import UserAvatar from 'src/components/components/UserAvatar';
import { MARKET_TYPE, STATUS } from 'src/enums';
import { getImage } from 'src/services/ipfs';
import * as selectors from 'src/store/selectors';
import { INft } from 'src/types/nfts.types';
import styled from 'styled-components';

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
  className = 'd-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4'
}: IProps) => {
  const web3State = useSelector(selectors.web3State);
  const { accounts } = web3State.web3.data;
  const userAddress = accounts[0];
  const { imageUrl, previewImageUrl } = nft;

  const navigateTo = (link: string) => {
    navigate(link);
  };
  const navigateToItemDetail = () => {
    if (nft?.multiple) {
      navigate(`/ItemDetailMultiple/${nft?.tokenId}/${nft?.nftAddress}`);
    } else {
      navigate(`/ItemDetail/${nft?.tokenId}/${nft?.nftAddress}`);
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
                    onClick={() => navigateToItemDetail()}
                    src={getImage(previewImageUrl || imageUrl)}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </span>
              </Outer>
            </div>
            <div className="nft__item_info d-flex flex-column ">
              <div className="col-12 d-flex justify-content-between mb-0 pl-0">
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

              <div className="d-flex justify-content-between">
                <div className={`nft__item_user nft__item__name_hover`}>
                  <span className="nft__publisher">
                    {nft?.owner[0]?.username}
                  </span>
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
                  ></img>{' '}
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
