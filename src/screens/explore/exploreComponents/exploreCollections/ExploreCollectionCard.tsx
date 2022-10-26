import { navigate } from '@reach/router';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import CollectionIcon from 'src/assets/images/icon/collectionicon.svg';
import Profileuser from 'src/assets/images/icon/profile-user.svg';
import Profileverify from 'src/assets/images/icon/profile-verify.svg';
import { getImage } from 'src/services/ipfs';
import * as selectors from 'src/store/selectors';
// import { INft } from 'src/types/nfts.types';
import { ICollection } from 'src/types/collections.types';
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
            <div className="d-flex nft__collection_details align-items-end">
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
                {/* <ul>
                  <li>
                    24% <small>24h Vol</small>{' '}
                  </li>
                  <li>
                    <img src={Eth} alt="etherium icon" /> 6.9k{' '}
                    <small>Floor</small>{' '}
                  </li>
                </ul>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ExploreCollectionCard);
