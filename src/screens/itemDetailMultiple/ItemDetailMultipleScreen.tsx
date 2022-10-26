/* eslint-disable @typescript-eslint/no-explicit-any */
import SEO, { SEOProps } from '@americanexpress/react-seo';
import { Box } from '@mui/material';
import { navigate } from '@reach/router';
import { ethers } from 'ethers';
import moment from 'moment';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import MetaboxIcon from 'src/assets/images/icon/metabox.png';
import PulsescanIcon from 'src/assets/images/icon/pulsescan.png';
import ViewIcon from 'src/assets/images/icon/view.png';
import AcceptOfferPopUp from 'src/components/AcceptOfferPopUp';
import Alert from 'src/components/Alert';
import BuyPopUp from 'src/components/BuyPopUp';
import CancelListingPopUp from 'src/components/CancelListingPopUp';
import CancelOfferPopUp from 'src/components/CancelOfferPopUp';
import Loader from 'src/components/Loader';
import MakeOfferPopUp from 'src/components/MakeOfferPopUp';
import InputSelect from 'src/components/select/index';
import UserAvatar from 'src/components/UserAvatar';
import { ApiService } from 'src/core/axios';
import {
  ALERT_TYPE,
  COIN,
  ERRORS,
  MARKET_TYPE,
  PROCESS_TRAKING_ACTION,
  PROCESS_TRAKING_STATUS,
  SELECTED_NETWORK,
  STATUS
} from 'src/enums';
import BanrLayer from 'src/screens/home/landing/bannerLayer';
import NftDetailCollection from 'src/screens/itemDetail/itemDetailComponent/NftDetailCollection';
import NftDetailDescription from 'src/screens/itemDetail/itemDetailComponent/NftDetailDescription';
import NftDetailProperties from 'src/screens/itemDetail/itemDetailComponent/NftDetailProperties';
import NftHistoryChart from 'src/screens/itemDetail/itemDetailComponent/NftHistoryChart';
import { ItemDetailWrapper } from 'src/screens/itemDetailMultiple/itemdetailMultiple.style';
import NftDetailInfo from 'src/screens/itemDetailMultiple/itemDetailMultipleComponents/NftDetailInfo';
import NftDetailTable from 'src/screens/itemDetailMultiple/itemDetailMultipleComponents/NftDetailTable';
import NftOfferTable from 'src/screens/itemDetailMultiple/itemDetailMultipleComponents/NftOfferTable';
import { getImage } from 'src/services/ipfs';
import notification from 'src/services/notification';
import { clearEvents } from 'src/store/actions';
import { fetchNftMultipleDetails } from 'src/store/actions/thunks/nfts';
import * as selectors from 'src/store/selectors';
import { INft, ISimpleMarketItem } from 'src/types/nfts.types';
import {
  approveContract,
  buySimple,
  cancelSimpleListing,
  createSimpleMarketItem,
  dateHasPassed,
  formatDate,
  getErrorMessage,
  getMyBalance,
  getMyTokenBalance,
  getNetworkId,
  getPriceAfterPercent,
  getProfileImage,
  getSimpleMarketItem,
  getUserListedTokens,
  shortAddress
} from 'src/utils';

import OwnerAndQuantity from '../../components/OwnerAndQuantity';
import SellPopUp from '../../components/SellPopUp';
import { serviceFee } from '../../config';

enum TAB_TYPE {
  BIDS = 'BIDS',
  HISTORY = 'HISTORY',
  DETAILS = 'DETAILS',
  OFFERS = 'OFFERS'
}

function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

interface IProps {
  tokenId: string;
  nftAddress: string;
}

const ItemDetailMultiple = (props: IProps) => {
  const { tokenId, nftAddress } = props;
  const [buyState, setBuyState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });
  const [sellState, setSellState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });
  const [cancelListingState, setCancelListingState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });
  const [tabType, setTab] = React.useState<TAB_TYPE>(TAB_TYPE.OWNERS);
  const [chosenCollectibleToBuyFrom, setCollectibleToBuyFrom] =
    React.useState<INft | null>(null);
  const [chosenCollectibleToSell, setCollectibleToSell] =
    React.useState<INft | null>(null);
  const [chosenCollectibleToCancel, setCollectibleToCancel] =
    React.useState<INft | null>(null);
  const [makeOfferState, setMakeOfferState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });
  const [fetchOffersState, setFetchOffersState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });

  const [acceptOfferState, setAcceptOfferState] = React.useState<{
    loader: boolean;
    error: null | string;
    selectedOffer: any | null;
  }>({ loader: false, error: null, selectedOffer: null });
  const options = [
    {
      title: 'View on PulseScan',
      value: 'View on PulseScan',
      image: PulsescanIcon
    },
    { title: 'View Metadata', value: 'View Metadata', image: MetaboxIcon },
    { title: 'View on IPFS', value: 'View on IPFS', image: ViewIcon }
  ];
  const [offersList, setOffersList] = React.useState<any[]>([]);
  const [openMakeOffer, setOpenMakeOffer] = React.useState(false);
  const [openAcceptOffer, setOpenAcceptOffer] = React.useState(false);
  const [openCancelOffer, setOpenCancelOffer] = React.useState(false);
  const [cancelOfferState, setCancelOfferState] = React.useState<{
    loader: boolean;
    error: null | string;
    selectedOffer: any | null;
  }>({ loader: false, error: null, selectedOffer: null });

  const pressTab = (tabType: TAB_TYPE) => {
    setTab(tabType);
  };

  const dispatch = useDispatch();
  const nftDetailState = useSelector(selectors.nftCollectibleDetailState);
  console.log(
    '🚀 ~ file: ItemDetailMultiple.tsx ~ line 76 ~ ItemDetailMultiple ~ nftDetailState',
    nftDetailState
  );
  const nftGroups = nftDetailState.data;
  const nftLoader = nftDetailState.loading; // nft details loader
  const nftError = nftDetailState.error; // nft details loader

  const web3State = useSelector(selectors.web3State);
  const {
    web3,
    accounts,
    nft721Contract,
    mockERC20Contract,
    nftMarketOffersContract,
    nftMarketSimpleContract,
    nft1155Contract
  } = web3State.web3.data;
  const userAddress = accounts[0];

  useEffect(() => {
    dispatch(
      fetchNftMultipleDetails({
        tokenId: tokenId,
        nftAddress: nftAddress
      })
    );
  }, [dispatch]);

  useEffect(() => {
    // _uploadMetadataToIPFS()
    console.log(nftGroups[0]);
    if (nftGroups[0]) {
      console.log('*********fetchNftOffers************');
      fetchNftOffers();
    }
  }, [nftGroups[0]?._id, tabType]);

  const openBuyPopUp = () => {
    if (!web3) {
      notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
      return;
    }
    if (nftGroups[0]) {
      dispatch(clearEvents());
      setCollectibleToBuyFrom(nftGroups[0]);
    }
  };

  const closeBuyPopUp = (shouldRefresh = false) => {
    setBuyState({ loader: false, error: null });
    setCollectibleToBuyFrom(null);
    const { tokenId, nftAddress } = props;
    if (shouldRefresh && tokenId && nftAddress) {
      navigate(`/ItemDetailMultiple/${tokenId}/${nftAddress}`);
    }
  };

  const openMakeOfferPopUp = () => {
    if (!web3) {
      notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
      return;
    }
    dispatch(clearEvents());
    setOpenMakeOffer(true);
  };

  const closeMakeOfferPopUp = (shouldRefresh = false) => {
    setMakeOfferState({ loader: false, error: null });
    setOpenMakeOffer(false);
    if (shouldRefresh && nftGroups[0]) {
      const { tokenId, nftAddress } = nftGroups[0];
      navigate(`/ItemDetailMultiple/${tokenId}/${nftAddress}`);
    }
  };

  const openSellCollectionPopUp = (nftItem: INft) => {
    if (!web3) {
      notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
      return;
    }
    dispatch(clearEvents());
    setCollectibleToSell(nftItem);
  };

  const closeSellCollectionPopUp = (shouldRefresh = false) => {
    setCollectibleToSell(null);
    const { tokenId, nftAddress } = props;
    if (shouldRefresh) {
      navigate(`/ItemDetailMultiple/${tokenId}/${nftAddress}`);
    }
  };
  const openCancelListingPopUp = (nftItem: INft) => {
    if (!web3) {
      notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
      return;
    }
    dispatch(clearEvents());
    setCollectibleToCancel(nftItem);
  };
  const closeCancelListingPopUp = (shouldRefresh = false) => {
    // setBuyState({ loader: false, error: null })
    setCollectibleToCancel(null);
    const { tokenId, nftAddress } = props;
    if (shouldRefresh && tokenId && nftAddress) {
      navigate(`/ItemDetailMultiple/${tokenId}/${nftAddress}`);
    }
  };

  const __buy = async (data: { amount: string }) => {
    try {
      if (!chosenCollectibleToBuyFrom) {
        console.log('no nft - _buy function ');
        return;
      }
      if (!chosenCollectibleToBuyFrom.listingId) {
        console.log('this nft is not listed yet');
        return;
      }
      if (!web3) {
        notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
        return;
      }
      //* show loader
      setBuyState({ loader: true, error: null });

      //* getting network id *//
      const networkId = await getNetworkId(web3);
      if (networkId !== SELECTED_NETWORK) {
        notification.error(ERRORS.WRONG_NETWORK);
        throw new Error(ERRORS.WRONG_NETWORK);
      }
      const simpleMarketItemBeforeBuying = await getSimpleMarketItem({
        nftMarketSimpleContract,
        listingId: Number(chosenCollectibleToBuyFrom.listingId)
      });

      //* price
      const price = Number(chosenCollectibleToBuyFrom.price);

      //* price in wei
      const weiPrice = ethers.utils.parseEther(price.toString());

      //* price times amount in wei
      const priceTimesTheAmount = weiPrice.mul(Number(data.amount));

      //* price times amount + commission
      const totalPaying = priceTimesTheAmount.add(
        priceTimesTheAmount.mul(serviceFee).div(100)
      );

      //* get balance
      const myBalance = await getMyBalance(userAddress, web3);

      //* check if remainingQuantity is ok, if not ==> show error
      if (Number(simpleMarketItemBeforeBuying.remainingQuantity) < 1) {
        notification.error(ERRORS.NO_NFTS_TO_BUY);
        throw new Error(ERRORS.NO_NFTS_TO_BUY);
      }
      //* check if balance is ok, if not ==> show error
      if (Number(myBalance) < Number(totalPaying)) {
        notification.error(ERRORS.NOT_ENOUGH_BALANCE);
        throw new Error(ERRORS.NOT_ENOUGH_BALANCE);
      }
      //* check if quantity is ok, if not ==> show error
      if (Number(data.amount) < 1) {
        notification.error(ERRORS.SET_QUANTITY);
        throw new Error(ERRORS.SET_QUANTITY);
      }

      const priceFromContractTimesAmount =
        Number(simpleMarketItemBeforeBuying.price) * Number(data.amount);
      const priceFromContractTimesAmountPlusComission =
        priceFromContractTimesAmount +
        getPriceAfterPercent(Number(priceFromContractTimesAmount), 1);
      //* check if value to send to the contract is ok, if not ==> show error
      if (priceFromContractTimesAmountPlusComission < Number(totalPaying)) {
        notification.error(ERRORS.NOT_THE_RIGHT_PRICE);
        throw new Error(ERRORS.NOT_THE_RIGHT_PRICE);
      }

      //* mongo
      const nftItem = {
        tokenId: chosenCollectibleToBuyFrom.tokenId,
        name: chosenCollectibleToBuyFrom.name,
        description: chosenCollectibleToBuyFrom.description,
        imageUrl: chosenCollectibleToBuyFrom.imageUrl,
        creatorAddress: chosenCollectibleToBuyFrom.creatorAddress,
        price: chosenCollectibleToBuyFrom.price,
        nftAddress: chosenCollectibleToBuyFrom.nftAddress,
        collectionId: chosenCollectibleToBuyFrom.collectionId,
        royalty: chosenCollectibleToBuyFrom.royalty,
        attributes: chosenCollectibleToBuyFrom.attributes,
        marketType: MARKET_TYPE.SIMPLE,
        multiple: true,
        networkId: chosenCollectibleToBuyFrom.networkId,
        isListedOnce: true
      };

      //* create tracking before buying
      await ApiService.createProcessTracking({
        ...nftItem,
        userAddress,
        ownerAddress: chosenCollectibleToBuyFrom.ownerAddress,
        action: PROCESS_TRAKING_ACTION.BUY_SIMPLE_MULTIPLE,
        processStatus: PROCESS_TRAKING_STATUS.BEFORE
      });

      //* interaction with contract
      await buySimple({
        nftMarketSimpleContract,
        userAddress,
        listingId: Number(chosenCollectibleToBuyFrom.listingId),
        quantity: Number(data.amount),
        value: totalPaying.toString()
      });

      // //* turn off loader
      setBuyState({ loader: false, error: null });
      // //* navigate to the nft multiple details page (refresh)
      // navigate(`/ItemDetailMultiple/${buyerNftResultAfterBuying.data.tokenId}/${buyerNftResultAfterBuying.data.nftAddress}`);
    } catch (error) {
      setBuyState({ loader: false, error: getErrorMessage(error) });
    }
  };

  const navigateToUserPage = async (publicAddress: string) => {
    navigate(`/author/${publicAddress}`);
  };

  const openAcceptOfferPopUp = () => {
    if (!web3) {
      notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
      return;
    }
    dispatch(clearEvents());
    setOpenAcceptOffer(true);
  };

  const closeAcceptOfferPopUp = (shouldRefresh = false) => {
    setAcceptOfferState({ loader: false, error: null, selectedOffer: null });
    setOpenAcceptOffer(false);
    if (shouldRefresh && nftGroups[0]) {
      const { tokenId, nftAddress } = nftGroups[0];
      navigate(`/ItemDetailMultiple/${tokenId}/${nftAddress}`);
    }
  };

  const openCancelOfferPopUp = () => {
    if (!web3) {
      notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
      return;
    }
    dispatch(clearEvents());
    setOpenCancelOffer(true);
  };

  const closeCancelOfferPopUp = (shouldRefresh = false) => {
    setCancelOfferState({ loader: false, error: null, selectedOffer: null });
    setOpenCancelOffer(false);
    if (shouldRefresh && nftGroups[0]) {
      const { tokenId, nftAddress } = nftGroups[0];
      navigate(`/ItemDetailMultiple/${tokenId}/${nftAddress}`);
    }
  };

  const __sell = async (data: { price: string; numberOfCopies: string }) => {
    try {
      if (!chosenCollectibleToSell) return;
      console.log(
        '🚀 ~ file: ItemDetailMultiple.tsx ~ line 270 ~ const__sell= ~ chosenCollectibleToSell',
        chosenCollectibleToSell
      );
      if (!web3) {
        notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
        return;
      }
      setSellState({ loader: true, error: null });
      const networkId = await getNetworkId(web3);
      if (networkId !== SELECTED_NETWORK) {
        notification.error(ERRORS.WRONG_NETWORK);
        throw new Error(ERRORS.WRONG_NETWORK);
      }
      // check if user already listed items with the same tokenid
      const userListedTokens = await getUserListedTokens({
        nftMarketContract: nftMarketSimpleContract,
        userAddress,
        nftAddress: chosenCollectibleToSell.nftAddress,
        tokenId: Number(chosenCollectibleToSell.tokenId)
      });
      if (Number(userListedTokens) > 0) {
        notification.error(ERRORS.ALREADY_LISTED);
        throw new Error(ERRORS.ALREADY_LISTED);
      }
      const priceInWei = web3.utils.toWei(data.price.toString(), 'ether');

      const itemToMongo = {
        tokenId: chosenCollectibleToSell.tokenId,
        name: chosenCollectibleToSell.name,
        description: chosenCollectibleToSell.description,
        imageUrl: chosenCollectibleToSell.imageUrl,
        creatorAddress: chosenCollectibleToSell.creatorAddress,
        ownerAddress: chosenCollectibleToSell.ownerAddress,
        price: data.price,
        nftAddress: chosenCollectibleToSell.nftAddress,
        collectionId: chosenCollectibleToSell.collectionId,
        royalty: chosenCollectibleToSell.royalty,
        attributes: chosenCollectibleToSell.attributes,
        marketType: MARKET_TYPE.SIMPLE,
        multiple: true,
        networkId: chosenCollectibleToSell.networkId,
        isListedOnce: true
      };

      //* create tracking before listing
      await ApiService.createProcessTracking({
        ...itemToMongo,
        userAddress,
        action: PROCESS_TRAKING_ACTION.LIST_SIMPLE_MULTIPLE,
        processStatus: PROCESS_TRAKING_STATUS.BEFORE
      });

      await nft1155Contract.methods
        .setApprovalForAll(nftMarketSimpleContract._address, true)
        .send({ from: userAddress });
      console.log('##################Approved');
      await createSimpleMarketItem({
        nftMarketSimpleContract,
        userAddress,
        nftAddress: chosenCollectibleToSell.nftAddress,
        tokenId: chosenCollectibleToSell.tokenId,
        priceInWei,
        quantity: Number(data.numberOfCopies),
        deadline: 1680000000
      });
      console.log('##################CreateSimpleMarketItem');

      setSellState({ loader: false, error: null });
    } catch (error) {
      setSellState({ loader: false, error: getErrorMessage(error) });
      console.log(
        '🚀 ~ file: ItemDetailMultiple.tsx ~ line 384 ~ sell ~ error',
        error
      );
    }
  };

  const fetchNftOffers = async () => {
    if (!nftGroups[0]) return;
    try {
      setFetchOffersState({ loader: true, error: null });
      const res: any = await ApiService.fetchNftOffers({
        tokenId: nftGroups[0].tokenId,
        nftAddress: nftGroups[0].nftAddress
      });
      console.log(
        '🚀 ~ file: ItemDetailMultipleScreen.tsx ~ line 286 ~ fetchNftOffers ~ offers',
        res.data
      );
      setOffersList(res.data);

      setFetchOffersState({ loader: false, error: null });
    } catch (error) {
      setFetchOffersState({ loader: false, error: getErrorMessage(error) });
    }
  };

  const _cancelListing = async () => {
    try {
      if (!chosenCollectibleToCancel) {
        console.log('no nft! - only for typescript need');
        return;
      }
      if (!web3) {
        notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
        return;
      }
      //* show loader
      setCancelListingState({ loader: true, error: null });

      //* getting network id *//
      const networkId = await getNetworkId(web3);
      if (networkId !== SELECTED_NETWORK) {
        notification.error(ERRORS.WRONG_NETWORK);
        throw new Error(ERRORS.WRONG_NETWORK);
      }

      const simpleMarketItemBeforeCancel: ISimpleMarketItem =
        await nftMarketSimpleContract.methods
          .simpleListingIdToMarketItem(
            Number(chosenCollectibleToCancel.listingId)
          )
          .call();

      if (
        simpleMarketItemBeforeCancel.ownerAddress.toLowerCase() !==
        chosenCollectibleToCancel.ownerAddress
      ) {
        notification.error(ERRORS.ONLY_OWNER_CAN_CANCEL);
        throw new Error(ERRORS.ONLY_OWNER_CAN_CANCEL);
      }
      if (Number(simpleMarketItemBeforeCancel.remainingQuantity) === 0) {
        notification.error(ERRORS.NOTHING_TO_CANCEL);
        throw new Error(ERRORS.NOTHING_TO_CANCEL);
      }

      const mongoitem = {
        tokenId: chosenCollectibleToCancel.tokenId,
        name: chosenCollectibleToCancel.name,
        description: chosenCollectibleToCancel.description,
        imageUrl: chosenCollectibleToCancel.imageUrl,
        creatorAddress: chosenCollectibleToCancel.creatorAddress,
        nftAddress: chosenCollectibleToCancel.nftAddress,
        collectionId: chosenCollectibleToCancel.collectionId,
        royalty: chosenCollectibleToCancel.royalty,
        price: chosenCollectibleToCancel.price,
        attributes: chosenCollectibleToCancel.attributes,
        listingId: chosenCollectibleToCancel.listingId,
        category: chosenCollectibleToCancel.category,
        marketType: MARKET_TYPE.SIMPLE,
        isListedOnce: true,
        multiple: true,
        networkId: chosenCollectibleToCancel.networkId
      };
      //* create tracking before cancel
      await ApiService.createProcessTracking({
        ...mongoitem,
        userAddress,
        action: PROCESS_TRAKING_ACTION.CANCEL_SIMPLE_MULTIPLE,
        processStatus: PROCESS_TRAKING_STATUS.BEFORE
      });

      // cancel listing on contract
      await cancelSimpleListing({
        nftMarketSimpleContract,
        userAddress,
        listingId: Number(chosenCollectibleToCancel.listingId)
      });

      //* turn off loader
      setCancelListingState({ loader: false, error: null });
    } catch (error) {
      setCancelListingState({ loader: false, error: getErrorMessage(error) });
    }
  };

  const renderOtherOwners = () => {
    if (!nftGroups.length) return;
    return (
      <div
        className="tab-1 onStep fadeIn"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div className="spacer-40"></div>

        {nftGroups.map((group, index) => (
          <div
            className="item_author"
            style={{ display: 'flex', justifyContent: 'space-between' }}
            key={index}
          >
            <div>
              <div className="author_list_pp">
                <span>
                  <UserAvatar
                    className="lazy"
                    image={group.owner[0]?.profileImage}
                    userAddress={group.ownerAddress || 'aaaaaa'}
                    blockSize={5}
                    size={50}
                  />
                  {/* <img className="lazy" src={group.owner[0]?.profileImage} alt="" /> */}
                  <i className="fa fa-check"></i>
                </span>
              </div>
              <div className="p_list_info">
                <h5>
                  {group.owner[0]?.username || shortAddress(group.ownerAddress)}
                </h5>
                db{' '}
                {group.status === STATUS.ON_SELL ? (
                  <p>
                    {group.listedAmount}/{group.totalAmount} on sale for{' '}
                    <b>{group.price}</b>
                  </p>
                ) : (
                  <p>{group.leftAmount} editions not for sale</p>
                )}
                blockchain{' '}
                <OwnerAndQuantity
                  userAddress={group.ownerAddress}
                  listingId={Number(group.listingId)}
                  tokenId={Number(group.tokenId)}
                />
                <p>tokenId {group.tokenId}</p>
                {group.listingId && <p>listingId {group.listingId}</p>}
              </div>
            </div>
            <div className="">{renderOtherOwnersButton(group)}</div>
          </div>
        ))}
      </div>
    );
  };

  const isMultipleOwner = (address: string) => {
    const nft = nftGroups.find((item) => item.ownerAddress === address);
    return nft ? true : false;
  };

  const _acceptOffer = async (
    offer: any,
    acceptedAmount: number,
    resetForm: () => void
  ) => {
    try {
      if (!nftGroups[0]) return;
      if (!web3) {
        notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
        return;
      }

      setAcceptOfferState({ loader: true, error: null, selectedOffer: offer });

      console.log(
        '🚀 ~ file: ItemDetailMultiple.tsx ~ line 652 ~ _acceptOffer ~ offer',
        offer
      );

      //* getting network id *//
      const networkId = await getNetworkId(web3);
      if (networkId !== SELECTED_NETWORK) {
        notification.error(ERRORS.WRONG_NETWORK);
        throw new Error(ERRORS.WRONG_NETWORK);
      }

      const offerTrackingItem = {
        name: nftGroups[0].name,
        description: nftGroups[0].description,
        tokenId: nftGroups[0].tokenId,
        networkId: nftGroups[0].networkId
      };

      //* create tracking before accept offer
      await ApiService.createProcessTracking({
        ...offerTrackingItem,
        userAddress,
        price: offer.amount,
        action: PROCESS_TRAKING_ACTION.ACCEPT_OFFER,
        processStatus: PROCESS_TRAKING_STATUS.BEFORE
      });

      //! Cancel Market Items
      const nft = nftGroups.find((item) => item?.ownerAddress === userAddress);
      if (nft && nft.leftAmount < acceptedAmount) {
        await cancelSimpleListing({
          nftMarketSimpleContract,
          userAddress,
          listingId: Number(nft.listingId)
        });
      }

      //* approve
      await nft1155Contract.methods
        .setApprovalForAll(nftMarketOffersContract._address, true)
        .send({ from: userAddress });

      //* accept offer on contract
      await nftMarketOffersContract.methods
        .acceptOffer(Number(offer.offerId), Number(acceptedAmount))
        .send({ from: userAddress });

      // //* turn off loader
      setAcceptOfferState({ loader: false, error: null, selectedOffer: offer });
    } catch (error) {
      setAcceptOfferState({
        loader: false,
        error: getErrorMessage(error),
        selectedOffer: offer
      });
    }
  };

  const _cancelOffer = async (offer: any, resetForm: () => void) => {
    try {
      const nft = nftGroups[0];
      if (!nft) return;
      if (!web3) {
        notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
        return;
      }

      //* getting network id *//
      const networkId = await getNetworkId(web3);
      if (networkId !== SELECTED_NETWORK) {
        notification.error(ERRORS.WRONG_NETWORK);
        throw new Error(ERRORS.WRONG_NETWORK);
      }

      setCancelOfferState({ loader: true, error: null, selectedOffer: offer });

      const offerTrackingItem = {
        name: nft.name,
        description: nft.description,
        listingId: nft.listingId,
        tokenId: nft.tokenId,
        networkId: nft.networkId
      };

      //* create tracking before accept offer
      await ApiService.createProcessTracking({
        ...offerTrackingItem,
        userAddress,
        price: offer.amount,
        action: PROCESS_TRAKING_ACTION.CANCEL_OFFER,
        processStatus: PROCESS_TRAKING_STATUS.BEFORE
      });

      await nftMarketOffersContract.methods
        .cancelOffer(Number(offer.offerId))
        .send({ from: userAddress });

      //* turn off loader
      setCancelOfferState({ loader: false, error: null, selectedOffer: offer });
    } catch (error) {
      setCancelOfferState({
        loader: false,
        error: getErrorMessage(error),
        selectedOffer: offer
      });
    }
  };

  const renderOffers = () => {
    if (!nftGroups[0]) return;
    if (fetchOffersState.loader) {
      return <Loader size={30} />;
    }
    if (fetchOffersState.error) {
      return <Alert text={fetchOffersState.error} type={ALERT_TYPE.DANGER} />;
    }
    return (
      <div className="tab-1 onStep fadeIn">
        {offersList.length > 0 &&
          offersList.map((offer, index) => (
            <>
              <div className="p_list" key={index}>
                <div
                  className="author_list_pp"
                  onClick={() => navigateToUserPage(offer?.offererAddress)}
                >
                  <span>
                    <UserAvatar
                      className="lazy"
                      image={offer?.offerer[0]?.profileImage}
                      userAddress={offer?.offererAddress}
                      blockSize={5}
                      size={50}
                    />
                    <i className="fa fa-check"></i>
                  </span>
                </div>
                <div className="p_list_info">
                  Offer{' '}
                  <b>
                    {offer?.amount} {offer?.pricetoken[0]?.name || COIN}
                  </b>
                  <b>
                    {' / '}
                    {offer?.quantity}
                  </b>
                  <span>
                    by{' '}
                    <b>
                      {offer?.offerer[0]?.username
                        ? `@${offer?.offerer[0]?.username}`
                        : offer?.offererAddress}
                    </b>{' '}
                    at {formatDate(offer?.createdAt)}
                  </span>
                </div>
                {acceptOfferState.loader &&
                acceptOfferState.selectedOffer &&
                acceptOfferState.selectedOffer.offerId === offer.offerId ? (
                  <Loader size={50} />
                ) : (
                  offer?.offererAddress !== userAddress &&
                  isMultipleOwner(userAddress) &&
                  !(
                    acceptOfferState.selectedOffer && acceptOfferState.loader
                  ) && (
                    <button
                      className="btn-main lead"
                      onClick={() => {
                        setAcceptOfferState({
                          error: null,
                          loader: false,
                          selectedOffer: offer
                        });
                        openAcceptOfferPopUp();
                      }}
                    >
                      Accept Offer
                    </button>
                  )
                )}
                {offer.offererAddress === userAddress &&
                  (cancelOfferState.loader &&
                  cancelOfferState.selectedOffer &&
                  cancelOfferState.selectedOffer.offerId === offer.offerId ? (
                    <Loader size={50} />
                  ) : (
                    <button
                      className="btn-main lead"
                      onClick={() => {
                        console.log('Cancel Offer Clicked-', offer);
                        setCancelOfferState({
                          error: null,
                          loader: false,
                          selectedOffer: offer
                        });
                        openCancelOfferPopUp();
                      }}
                    >
                      Cancel
                    </button>
                  ))}
              </div>
            </>
          ))}
      </div>
    );
  };

  const renderOtherOwnersButton = (_nft: INft) => {
    // is current user
    // eslint-disable-next-line no-constant-condition
    if (_nft.ownerAddress === userAddress) {
      if (_nft.status === STATUS.ON_SELL) {
        return (
          <button
            className="btn-main lead mb-5"
            onClick={() => openCancelListingPopUp(_nft)}
          >
            Cancel
          </button>
        );
      } else {
        return (
          <button
            className="btn-main lead mb-5"
            onClick={() => openSellCollectionPopUp(_nft)}
          >
            Sell
          </button>
        );
      }
    } else {
      // _nft.ownerAddress !== userAddress
      if (_nft.status === STATUS.ON_SELL) {
        return (
          <button
            className="btn-main lead mb-5"
            onClick={() => openBuyPopUp(_nft)}
          >
            Buy
          </button>
        );
      } else {
        return '';
      }
    }
  };

  const getCollectionTotalQuantity = () => {
    return nftGroups.reduce(
      (previousValue, currentValue) => previousValue + currentValue.totalAmount,
      0
    );
  };

  const _makeOffer = async (
    data: {
      price: string;
      quantity: number;
      expirationDates: string;
      expirationDay: string;
      pricetokentype: string;
      pricetokenaddress: string;
    },
    resetForm: () => void
  ) => {
    try {
      if (!nftGroups[0]) return;
      if (!web3) {
        notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
        return;
      }
      console.log(
        '-----------------------------------------------------',
        data
      );
      //* set loader
      setMakeOfferState({ loader: true, error: null });
      //* getting network id *//
      const networkId = await getNetworkId(web3);
      if (networkId !== SELECTED_NETWORK) {
        notification.error(ERRORS.WRONG_NETWORK);
        throw new Error(ERRORS.WRONG_NETWORK);
      }
      //* checks
      const myBalanceinWei = await getMyTokenBalance(
        userAddress,
        data.pricetokenaddress,
        web3
      );
      const offerInWei = ethers.utils.parseEther(data.price.toString());
      const offerWithCommissionWeiValue = offerInWei.add(
        offerInWei.mul(serviceFee).div(100)
      );
      if (
        offerWithCommissionWeiValue
          .mul(Number(data.quantity))
          .gt(myBalanceinWei)
      ) {
        notification.error(ERRORS.NOT_ENOUGH_BALANCE);
        throw new Error(ERRORS.NOT_ENOUGH_BALANCE);
      }
      const offerTrackingItem = {
        name: nftGroups[0].name,
        description: nftGroups[0].description,
        listingId: nftGroups[0].listingId,
        tokenId: nftGroups[0].tokenId,
        networkId: nftGroups[0].networkId
      };
      const offerDeadline = Number(
        data.expirationDates === '0'
          ? moment(data.expirationDay)
          : moment(new Date()).add(Number(data.expirationDates), 'days')
      );
      console.log(
        '🚀 ~ file: ItemDetailMultiple.tsx ~ line 549 ~ ItemDetailSingle ~ offerDeadline',
        offerDeadline
      );
      //* create tracking before make offer
      await ApiService.createProcessTracking({
        ...offerTrackingItem,
        userAddress,
        price: data.price,
        action: PROCESS_TRAKING_ACTION.OFFER,
        processStatus: PROCESS_TRAKING_STATUS.BEFORE
      });
      //* approve contract
      await approveContract({
        mockERC20Contract,
        spender: nftMarketOffersContract._address,
        owner: userAddress,
        amount: offerWithCommissionWeiValue
          .mul(Number(data.quantity))
          .toString()
      });
      //* make offer on contract
      console.log(
        '🚀 ~ file: ItemDetailSingle.tsx ~ line 583 ~ ItemDetailSingle ~ offerOnNFTParams',
        { offerInWei, offerDeadline, pricetokenAddress: data.pricetokenaddress }
      );
      console.log(
        '++++++++++++++++++++++++++++++++++',
        data.quantity,
        data.pricetokenaddress,
        offerInWei,
        offerDeadline
      );
      await nftMarketOffersContract.methods
        .offerOnNft(
          nftGroups[0].nftAddress,
          Number(nftGroups[0].tokenId),
          data.quantity,
          data.pricetokenaddress,
          offerInWei,
          offerDeadline
        )
        .send({ from: userAddress });
      //* turn off loader
      setMakeOfferState({ loader: false, error: null });
    } catch (error) {
      setMakeOfferState({ loader: false, error: getErrorMessage(error) });
    }
  };

  const renderView = () => {
    if (nftLoader) {
      return (
        <div
          className=""
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Loader size={300} />
        </div>
      );
    }
    if (nftError) {
      return <Alert text={nftError} type={ALERT_TYPE.DANGER} />;
    }
    if (!nftGroups[0]) {
      return <Alert text={'no nft'} type={ALERT_TYPE.DANGER} />;
    }
    return (
      <>
        <Container>
          <Row className="nft-detail" style={{}}>
            <BanrLayer />
            <Col md={5} className="text-center nft-detail-left">
              <Box className="nft-detail-image">
                <img
                  src={getImage(nftGroups[0]?.imageUrl)}
                  style={{
                    width: '100%'
                  }}
                  className="img-fluid img-rounded mb-sm-30"
                  alt=""
                  loading="lazy"
                />
              </Box>
              <Box className="nft-bottom-detail">
                <NftDetailDescription description={nftGroups[0]?.description} />

                <NftDetailProperties attributes={nftGroups[0]?.attributes} />

                <InputSelect
                  hasImage
                  className="nft-detail-select"
                  menuItem={options}
                />
              </Box>
            </Col>
            <Col md={7} style={{ position: 'relative' }}>
              <Box className="item_info">
                <NftDetailInfo
                  nftname={nftGroups[0]?.name}
                  collectionName={nftGroups[0]?.nftCollection[0]?.name}
                  owner={
                    nftGroups[0]?.owner[0]?.username
                      ? nftGroups[0]?.owner[0]?.username
                      : nftGroups[0]?.owner[0].publicAddress
                  }
                  ownerAddress={nftGroups[0]?.owner[0].publicAddress}
                  price={nftGroups[0]?.price}
                  minimumBid={nftGroups[0]?.minimumBid}
                  userAddress={userAddress}
                  expirationDate={nftGroups[0]?.expirationDate}
                  status={nftGroups[0]?.status}
                  lazyMint={nftGroups[0]?.lazyMint}
                  openMakeOfferPopUp={openMakeOfferPopUp}
                  offersCount={offersList.length}
                  supply={nftGroups[0]?.totalAmount}
                  leftAmount={nftGroups[0]?.leftAmount}
                  openBuyPopUp={openBuyPopUp}
                />

                <NftOfferTable
                  offersList={offersList}
                  navigateToUserPage={navigateToUserPage}
                  fetchOffersState={fetchOffersState}
                  userAddress={userAddress}
                  ownerAddress={nftGroups[0]?.owner[0].publicAddress}
                  setCancelOfferState={setCancelOfferState}
                  openCancelOfferPopUp={openCancelOfferPopUp}
                  openAcceptOfferPopUp={openAcceptOfferPopUp}
                  cancelOfferState={cancelOfferState}
                  acceptOfferState={acceptOfferState}
                  setAcceptOfferState={setAcceptOfferState}
                />
                <NftHistoryChart />
              </Box>
            </Col>
            <Col md={12}>
              <NftDetailTable />
            </Col>
          </Row>
        </Container>
        <Box>
          <NftDetailCollection
            collectionId={nftGroups[0]?.collectionId}
            collectionName={nftGroups[0]?.nftCollection[0]?.name}
          />
        </Box>
      </>
    );
  };
  const SeoConfig: SEOProps = {
    title: nftGroups[0]?.name || '',
    description: nftGroups[0]?.description || '',
    siteUrl: `https://nftonpulse.io/ItemDetail/${nftGroups[0]?.tokenId}/${nftGroups[0]?.nftAddress}`,
    image: {
      src: getImage(nftGroups[0]?.imageUrl) || '',
      alt: nftGroups[0]?.name || ''
    },
    keywords: [
      nftGroups[0]?.name || '',
      ...(nftGroups[0]?.description?.split(' ') || []),
      'nft',
      'pulse'
    ]
  };

  return (
    <ItemDetailWrapper>
      <div className="nft-detail-page">
        <SEO {...SeoConfig} />
        <section className="nft-detail-section">{renderView()}</section>
        {!!chosenCollectibleToBuyFrom?._id && (
          <div className="checkout">
            <BuyPopUp
              onClose={closeBuyPopUp}
              nft={chosenCollectibleToBuyFrom}
              submit={__buy}
              placeBidState={buyState}
              multiple={true}
              isLazyMint={false}
            />
          </div>
        )}
        {!!chosenCollectibleToSell?._id && (
          <div className="checkout">
            <SellPopUp
              onClose={closeSellCollectionPopUp}
              nft={chosenCollectibleToSell}
              submit={__sell}
              sellState={sellState}
            />
          </div>
        )}
        {!!chosenCollectibleToCancel?._id && (
          <div className="checkout">
            <CancelListingPopUp
              onClose={closeCancelListingPopUp}
              nft={chosenCollectibleToCancel}
              submit={_cancelListing}
              cancelListingState={cancelListingState}
            />
          </div>
        )}

        {openMakeOffer && nftGroups[0] && (
          <div className="checkout nft_detail_popup">
            <MakeOfferPopUp
              nft={nftGroups[0]}
              makeOfferState={makeOfferState}
              submit={_makeOffer}
              onClose={closeMakeOfferPopUp}
              totalQuantity={getCollectionTotalQuantity()}
            />
          </div>
        )}
        {openAcceptOffer && acceptOfferState.selectedOffer && nftGroups[0] && (
          <div className="checkout nft_detail_popup">
            <AcceptOfferPopUp
              nft={nftGroups.find((item) => item.ownerAddress === userAddress)}
              onClose={closeAcceptOfferPopUp}
              submit={_acceptOffer}
              acceptOfferState={acceptOfferState}
              multiple={true}
            />
          </div>
        )}
        {openCancelOffer && cancelOfferState.selectedOffer && nftGroups[0] && (
          <div className="checkout nft_detail_popup">
            <CancelOfferPopUp
              nft={nftGroups[0]}
              onClose={closeCancelOfferPopUp}
              submit={_cancelOffer}
              cancelOfferState={cancelOfferState}
              multiple={false}
            />
          </div>
        )}
      </div>
    </ItemDetailWrapper>
  );
};

export default memo(ItemDetailMultiple);
