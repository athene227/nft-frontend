/* eslint-disable react/jsx-no-bind */
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { navigate } from '@reach/router';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import CollectionIcon from 'src/assets/images/icon/collectionicon.svg';
import { ReactComponent as PriceIcon } from 'src/assets/images/minbid-icon.svg';
import Clock from 'src/components/Clock/Clock';
import { MARKET_TYPE, STATUS } from 'src/enums';
import { getImage } from 'src/services/ipfs';
import { fetchNftsByCollection } from 'src/store/actions/thunks';
import * as selectors from 'src/store/selectors';
import { INft } from 'src/types/nfts.types';

import { NftCollectionItemSettings } from './NftCollectionItemSettings';

interface IProps {
  collectionId: string;
  collectionName: string;
}

const NftDetailCollectionNew = (props: IProps) => {
  const { collectionId, collectionName } = props;
  const dispatch = useDispatch();
  const nftsState = useSelector(selectors.nftsByCollectionState);

  useEffect(() => {
    dispatch(fetchNftsByCollection(collectionId));
  }, [dispatch]);

  const navigateToDetails = (nft: INft) => {
    if (nft.multiple) {
      navigate(`/ItemDetailMultiple/${nft.tokenId}/${nft.nftAddress}`);
    } else {
      navigate(`/ItemDetail/${nft.tokenId}/${nft.nftAddress}`);
    }
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
      <Slider {...NftCollectionItemSettings}>
        {nftsState &&
          nftsState.map((nft, index) => (
            // eslint-disable-next-line react/jsx-key
            <div className="nft__collection_main">
              <div className="nft_collection_item" key={index}>
                <div className="nft_collection_image">
                  <img
                    onClick={() => navigateToDetails(nft)}
                    src={getImage(nft.previewImageUrl || nft.imageUrl)}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                  {nft.marketType !== 'SIMPLE' && (
                    <div className="de_countdown de_countdown__bg_white">
                      <Clock deadline={nft.expirationDate} />
                    </div>
                  )}
                </div>
                <div
                  className="nft_collection_details"
                  onClick={() => navigateToDetails(nft)}
                >
                  <div className="nft_collection_info">
                    <h3>{nft.name}</h3>
                    <p>
                      <img src={CollectionIcon} alt="collection icon" />
                      {collectionName}
                    </p>
                  </div>

                  <div className="nft_collection_price d-flex align-items-end justify-content-between">
                    <div className="nft_price_left">
                      <h4>Price</h4>
                      <p>
                        <PriceIcon />
                        <span>
                          {nft.marketType === 'SIMPLE'
                            ? nft.price
                            : nft.minimumBid}{' '}
                        </span>
                      </p>
                    </div>
                    <div className="nft_price_right">
                      <button className="btn-main btn-grad">
                        {getBuyOrPlaceBid(nft)}
                      </button>
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

export default memo(NftDetailCollectionNew);
