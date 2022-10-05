import { navigate } from '@reach/router';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
// import { INft } from 'src/types/nfts.types';
import { ICollection } from 'src/collections.types';
import Clock from 'src/components/components/Clock/Clock';
import UserAvatar from 'src/components/components/UserAvatar';
import { MARKET_TYPE, STATUS } from 'src/enums';
import { getImage } from 'src/services/ipfs';
import * as selectors from 'src/store/selectors';
import styled from 'styled-components';

import CollectionIcon from '../../../../../assets/images/icon/collectionicon.svg';
import Eth from '../../../../../assets/images/icon/eth-icon.svg';
import Profileuser from '../../../../../assets/images/icon/profile-user.svg';
import Profileverify from '../../../../../assets/images/icon/profile-verify.svg';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

interface IProps {
  collection: ICollection;
  className?: string;
  clockTop?: boolean;
  height: number | string;
  onImgLoad: any;
}

const ExploreCollectionCard = ({
  collection,
  className = 'explore-collection-card'
}: IProps) => {
  const web3State = useSelector(selectors.web3State);
  const { accounts } = web3State.web3.data;
  const userAddress = accounts[0];
  const { imageUrl } = collection;

  const navigateTo = (link: string) => {
    navigate(link);
  };

  const navigateToCollectionDetail = () => {
    // if (nft?.multiple) {
    //   navigate(`/ItemDetailMultiple/${nft?.tokenId}/${nft?.nftAddress}`);
    // } else {
    //   navigate(`/ItemDetail/${nft?.tokenId}/${nft?.nftAddress}`);
    // }
  };

  return (
    <div className={className}>
      <div className="explore-collection-card">
        <div className={`explore-collection-image`}>
          <Outer className="nft__collection_image">
            <span>
              <img
                onClick={() => navigateToCollectionDetail()}
                src={getImage(imageUrl)}
                className="lazy nft__item_preview img-fluid"
                alt=""
              />
            </span>
          </Outer>
          <div className="">
            <div className="d-flex nft__collection_details">
              <div className="collection-user-image">
                <span>
                  <img src={Profileuser} alt="profile user image" />
                  <i>
                    <img src={Profileverify} alt="profile verified" />
                  </i>
                </span>
              </div>
              <div className="collection-user-details">
                <h4>
                  <img src={CollectionIcon} alt="collection icon" />{' '}
                  {collection.name}
                </h4>
                <ul>
                  <li>
                    24% <small>24h Vol</small>{' '}
                  </li>
                  <li>
                    <img src={Eth} alt="etherium icon" /> 6.9k{' '}
                    <small>Floor</small>{' '}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ExploreCollectionCard);
