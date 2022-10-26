import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getSimpleMarketItem,
  getUserNftQuantityFromNftContract
} from 'src/utils';

import * as selectors from '../store/selectors';

const OwnerAndQuantity = (props: {
  userAddress: string;
  listingId: number;
  tokenId: number;
}) => {
  const { userAddress, listingId, tokenId } = props;
  const [marketItem, setMarketItem] = React.useState<{
    nftContract: string;
    tokenId: string;
    price: string;
    originalQuantity: string;
    remainingQuantity: string;
    ownerAddress: string;
  }>({
    nftContract: '',
    tokenId: '',
    price: '',
    originalQuantity: '',
    remainingQuantity: '',
    ownerAddress: ''
  });
  const [nftBalance, setNftBalance] = React.useState<string>('');

  const web3State = useSelector(selectors.web3State);
  const { web3, nftMarketContract, nftContract } = web3State.web3.data;

  const _getNftQuantityOwnInMarketContract = async () => {
    if (!listingId) return;
    const marketItem = await getSimpleMarketItem({
      nftMarketContract,
      listingId: Number(listingId)
    });
    console.log(
      '🚀 ~ file: OwnerAndQuantity.tsx ~ line 42 ~ getNftQuantityOwnInMarketContract ~ marketItem',
      marketItem
    );
    setMarketItem(marketItem);
  };
  const _getUserNftQuantity = async () => {
    if (!tokenId) return;
    const _nftBalance = await getUserNftQuantityFromNftContract({
      nftContract,
      userAddress,
      tokenId
    });
    console.log(
      '🚀 ~ file: OwnerAndQuantity.tsx ~ line 52 ~ getUserNftQuantity ~ _nftBalance',
      _nftBalance
    );
    setNftBalance(_nftBalance);
  };

  useEffect(() => {
    if (nftMarketContract && nftContract) {
      _getNftQuantityOwnInMarketContract();
      _getUserNftQuantity();
    }
  }, [nftMarketContract, nftContract, listingId, tokenId]);

  const getRemaining = () => {
    const _remainingQuantity = Number(marketItem.remainingQuantity);
    const _nftBalance = Number(nftBalance);
    return _remainingQuantity > 0 ? (
      <p>
        {_remainingQuantity}/{_remainingQuantity + _nftBalance} on sale for{' '}
        <b>{web3?.utils.fromWei(marketItem.price, 'ether')}</b>
      </p>
    ) : (
      <p>{_nftBalance} editions not for sale</p>
    );
  };

  return <div>{getRemaining()}</div>;
};

export default OwnerAndQuantity;
