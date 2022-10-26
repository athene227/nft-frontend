import React, { memo } from 'react';
import CollectionIcon from 'src/assets/images/icon/collectionicon.svg';
import { ReactComponent as PriceIcon } from 'src/assets/images/minbid-icon.svg';
import Clock from 'src/components/Clock/Clock';
import { getImage } from 'src/services/ipfs';
import { INft } from 'src/types/nfts.types';

interface IProps {
  nft: INft;
  className?: string;
  clockTop?: boolean;
  height: number | string;
  onImgLoad: any;
}

const CollectionItemCard = ({ nft }: IProps) => {
  const { imageUrl, previewImageUrl } = nft;

  return (
    <div className="nft_collection_item">
      <div className="nft_collection_image">
        <img
          src={getImage(previewImageUrl || imageUrl)}
          className="lazy nft__item_preview img-fluid"
          alt=""
        />
        {nft.marketType !== 'SIMPLE' && (
          <div className="de_countdown de_countdown__bg_white">
            <Clock deadline={nft.expirationDate} />
          </div>
        )}
      </div>
      <div className="nft_collection_details">
        <div className="nft_collection_info">
          <h3>{nft.name}</h3>
          <p>
            <img src={CollectionIcon} alt="collection icon" />
            Bored Ape collection
          </p>
        </div>

        <div className="nft_collection_price d-flex align-items-end justify-content-between">
          <div className="nft_price_left">
            <h4>Price</h4>
            <p>
              <PriceIcon />
              <span>
                {nft.marketType === 'SIMPLE' ? nft.price : nft.minimumBid}{' '}
              </span>
            </p>
          </div>
          <div className="nft_price_right">
            <button className="btn-main btn-grad">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CollectionItemCard);
