/* eslint-disable @typescript-eslint/no-explicit-any */
import SEO, { SEOProps } from '@americanexpress/react-seo';
import { navigate } from '@reach/router';
import moment from 'moment';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'src/components/components/Loader';
import { ApiService } from 'src/core/axios';
import {
  ALERT_TYPE,
  COIN,
  ERRORS,
  MARKET_CONTRACT_EVENTS,
  MARKET_TYPE,
  PROCESS_TRAKING_ACTION,
  PROCESS_TRAKING_STATUS,
  SELECTED_NETWORK,
  STATUS
} from 'src/enums';
import { getImage } from 'src/services/ipfs';
import notification from 'src/services/notification';
import { clearEvents } from 'src/store/actions';
import { fetchBids } from 'src/store/actions/thunks/bids';
import { IBid } from 'src/types/bids.types';
import {
  IAuctionBidItem,
  IAuctionMarketItem,
  ISimpleMarketItem
} from 'src/types/nfts.types';
import {
  approveContract,
  buySimple,
  cancelAuctionListing,
  cancelSimpleListing,
  dateHasPassed,
  formatDate,
  getAuctionBids,
  getAuctionMarketItem,
  getErrorMessage,
  getMyBalance,
  getMyTokenBalance,
  getNetworkId,
  getPriceAfterPercent,
  getProfileImage,
  placeBid,
  terminateAuction
} from 'src/utils';

import { fetchNftDetail } from '../../store/actions/thunks/nfts';
import * as selectors from '../../store/selectors';
import AcceptOfferPopUp from '../components/AcceptOfferPopUp';
import Alert from '../components/Alert';
import BuyPopUp from '../components/BuyPopUp';
import CancelListingPopUp from '../components/CancelListingPopUp';
import CancelOfferPopUp from '../components/CancelOfferPopUp';
import Clock from '../components/Clock/Clock';
import Footer from '../components/footer';
import MakeOfferPopUp from '../components/MakeOfferPopUp';
import { renderAttributes } from '../components/NftAttributes';
import PlaceBidPopUp from '../components/PlaceBidPopUp';
import TerminateAuctionPopup from '../components/Popups/TerminateAuctionPopup';
import UserAvatar from '../components/UserAvatar';
import BanrLayer from './../pages/Home/components/landing/bannerLayer';

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

const ItemDetailSingle = (props: { tokenId: string; nftAddress: string }) => {
  const [buyState, setBuyState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });
  const [placeBidState, setPlaceBidState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });
  const [makeOfferState, setMakeOfferState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });
  const [acceptOfferState, setAcceptOfferState] = React.useState<{
    loader: boolean;
    error: null | string;
    selectedOffer: any | null;
  }>({ loader: false, error: null, selectedOffer: null });
  const [cancelListingState, setCancelListingState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });
  const [terminateAuctionState, setTerminateAuctionState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });
  const [tabType, setTab] = React.useState<TAB_TYPE>(TAB_TYPE.BIDS);
  const [fetchHistoryState, setFetchHistoryState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });
  const [fetchOffersState, setFetchOffersState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });
  const [nftHistory, setNftHistory] = React.useState<any[]>([]);
  const [offersList, setOffersList] = React.useState<any[]>([]);

  const SINGLE = 1;

  const pressTab = (tabType: TAB_TYPE) => {
    setTab(tabType);
  };

  const dispatch = useDispatch();
  const nftDetailState = useSelector(selectors.nftDetailState);
  const nft = nftDetailState.data;
  console.log(
    '🚀 ~ file: ItemDetailSingle.tsx ~ line 100 ~ ItemDetailSingle ~ nft',
    nft
  );
  const nftLoader = nftDetailState.loading; // nft details loader
  const nftError = nftDetailState.error; // nft details error
  const web3State = useSelector(selectors.web3State);
  const {
    web3,
    accounts,
    mockERC20Contract,
    nft721Contract,
    nftMarketSimpleContract,
    nftMarketAuctionContract,
    nftMarketOffersContract
  } = web3State.web3.data;
  const userAddress = accounts[0];

  const bidsState = useSelector((state) => selectors.bidsState(state));
  const listingId = nft?.status === STATUS.ON_SELL ? nft.listingId : '0';
  const bids = useMemo(
    () => bidsState.data[listingId] || [],
    [bidsState, listingId]
  );
  const previousBids = usePrevious(bids);
  const [lastBid, setLastBid] = useState<IBid | null>(null);

  const [openBuy, setOpenBuy] = React.useState(false);
  const [openPlaceBid, setOpenPlaceBid] = React.useState(false);
  const [openMakeOffer, setOpenMakeOffer] = React.useState(false);
  const [openAcceptOffer, setOpenAcceptOffer] = React.useState(false);
  const [openCancelListing, setOpenCancelListing] = React.useState(false);
  const [openTerminateAuction, setOpenTerminateAuction] = React.useState(false);
  const [openCancelOffer, setOpenCancelOffer] = React.useState(false);
  const [cancelOfferState, setCancelOfferState] = React.useState<{
    loader: boolean;
    error: null | string;
    selectedOffer: any | null;
  }>({ loader: false, error: null, selectedOffer: null });

  const nftEvents = useSelector(selectors.nftEvents);

  useEffect(() => {
    dispatch(
      fetchNftDetail({ tokenId: props.tokenId, nftAddress: props.nftAddress })
    );
  }, []);

  useEffect(() => {
    if (previousBids?.length) {
      setLastBid(bids[0]);
    }
  }, [bids.length]);

  const openBuyPopUp = () => {
    dispatch(clearEvents());
    if (!web3) {
      notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
      return;
    }
    setOpenBuy(true);
  };

  const closeBuyPopUp = (shouldRefresh = false) => {
    setBuyState({ loader: false, error: null });
    setOpenBuy(false);
    if (shouldRefresh && nft) {
      const { tokenId, nftAddress } = nft;
      navigate(`/ItemDetail/${tokenId}/${nftAddress}`);
    }
  };

  const openPlaceBidPopUp = () => {
    if (!web3) {
      notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
      return;
    }
    dispatch(clearEvents());
    setOpenPlaceBid(true);
  };

  const closePlaceBidPopUp = (shouldRefresh = false) => {
    setPlaceBidState({ loader: false, error: null });
    setOpenPlaceBid(false);
    if (shouldRefresh && nft) {
      const { tokenId, nftAddress } = nft;
      navigate(`/ItemDetail/${tokenId}/${nftAddress}`);
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
    if (shouldRefresh && nft) {
      const { tokenId, nftAddress } = nft;
      navigate(`/ItemDetail/${tokenId}/${nftAddress}`);
    }
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
    if (shouldRefresh && nft) {
      const { tokenId, nftAddress } = nft;
      navigate(`/ItemDetail/${tokenId}/${nftAddress}`);
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
    if (shouldRefresh && nft) {
      const { tokenId, nftAddress } = nft;
      navigate(`/ItemDetail/${tokenId}/${nftAddress}`);
    }
  };

  const openCancelListingPopUp = () => {
    if (!web3) {
      notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
      return;
    }
    dispatch(clearEvents());
    setOpenCancelListing(true);
  };
  const closeCancelListingPopUp = (shouldRefresh = false) => {
    setOpenCancelListing(false);
    setCancelListingState({ loader: false, error: null });
    if (shouldRefresh && nft) {
      const { tokenId, nftAddress } = nft;
      navigate(`/ItemDetail/${tokenId}/${nftAddress}`);
    }
  };
  const openTerminateAuctionPopUp = () => {
    if (!web3) {
      notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
      return;
    }
    dispatch(clearEvents());
    setOpenTerminateAuction(true);
  };
  const closeTerminateAuctionPopUp = (shouldRefresh = false) => {
    setOpenTerminateAuction(false);
    setTerminateAuctionState({ loader: false, error: null });
    if (shouldRefresh && nft) {
      const { tokenId, nftAddress } = nft;
      navigate(`/ItemDetail/${tokenId}/${nftAddress}`);
    }
  };

  const fetchNftBids = async () => {
    if (!nft) return;

    dispatch(
      fetchBids({
        listingId: nft.listingId,
        nftAddress: nft.nftAddress
      })
    );
  };

  const fetchNftHistory = async () => {
    if (!nft) return;
    try {
      setFetchHistoryState({ loader: true, error: null });
      const res = await ApiService.fetchNftHistory({
        tokenId: nft.tokenId,
        nftAddress: nft.nftAddress
      });
      setNftHistory(res.data);
      console.log(
        '🚀 ~ file: ItemDetailSingle.tsx ~ line 326 ~ fetchNftHistory ~ res.data',
        res.data
      );

      setFetchHistoryState({ loader: false, error: null });
    } catch (error) {
      setFetchHistoryState({ loader: false, error: getErrorMessage(error) });
    }
  };

  const fetchNftOffers = async () => {
    if (!nft) return;
    try {
      setFetchOffersState({ loader: true, error: null });
      const res: any = await ApiService.fetchNftOffers({
        tokenId: nft.tokenId,
        nftAddress: nft.nftAddress
      });
      console.log(
        '🚀 ~ file: ItemDetailSingle.tsx ~ line 286 ~ fetchNftOffers ~ offers',
        res.data
      );
      setOffersList(res.data);

      setFetchOffersState({ loader: false, error: null });
    } catch (error) {
      setFetchOffersState({ loader: false, error: getErrorMessage(error) });
    }
  };

  useEffect(() => {
    // _getUri()
    if (nft) {
      if (
        tabType === TAB_TYPE.BIDS &&
        nft?.marketType === MARKET_TYPE.AUCTION
      ) {
        console.log('*********fetchNftBids************');
        fetchNftBids();
      }
      if (tabType === TAB_TYPE.HISTORY) {
        console.log('*********fetchNftHistory************');
        fetchNftHistory();
      }
      if (tabType === TAB_TYPE.DETAILS) {
        console.log('*********fetchNftDetails************');
        // fetchNftHistory();
      }
      if (tabType === TAB_TYPE.OFFERS) {
        console.log('*********fetchNftOffers************');
        fetchNftOffers();
      }
    }
  }, [nft?._id, tabType]);

  useEffect(() => {
    if (
      nft?.marketType === MARKET_TYPE.SIMPLE ||
      nft?.status === STATUS.NOT_LISTED
    ) {
      setTab(TAB_TYPE.HISTORY);
    } else if (nft?.marketType === MARKET_TYPE.AUCTION) {
      setTab(TAB_TYPE.BIDS);
    }
  }, [nft?._id]);

  const listONSellContract = async () => {
    navigate(`/listing/${props.tokenId}/${props.nftAddress}`);
  };

  const navigateToUserPage = async (publicAddress: string) => {
    navigate(`/author/${publicAddress}`);
  };

  const _buy = async () => {
    try {
      if (!nft) {
        return;
      }
      if (!web3) {
        notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
        return;
      }
      //* show loader
      setBuyState({ loader: true, error: null });
      dispatch(clearEvents());
      //* getting network id *//
      const networkId = await getNetworkId(web3);
      if (networkId !== SELECTED_NETWORK) {
        notification.error(ERRORS.WRONG_NETWORK);
        throw new Error(ERRORS.WRONG_NETWORK);
      }
      //* check if user not buying from himself
      if (nft.ownerAddress === userAddress) {
        throw new Error(ERRORS.CANT_BUY_FROM_YOURSELF);
      }

      const price = Number(nft.price);
      const weiPrice = web3.utils.toWei(price.toString(), 'ether');
      const value =
        Number(weiPrice) + getPriceAfterPercent(Number(weiPrice), 1);
      const myBalance = await getMyBalance(userAddress, web3);
      //* getting the market item from the contract
      const simpleMarketItem: ISimpleMarketItem =
        await nftMarketSimpleContract.methods
          .simpleListingIdToMarketItem(Number(nft.listingId))
          .call();

      const priceFromContractPlusCommission =
        Number(simpleMarketItem.price) +
        getPriceAfterPercent(Number(simpleMarketItem.price), 1);
      //* check if balance is ok, if not ==> show error
      if (Number(myBalance) < Number(value)) {
        notification.error(ERRORS.NOT_ENOUGH_BALANCE);
        throw new Error(ERRORS.NOT_ENOUGH_BALANCE);
      }
      //* check if value to send to the contract is ok, if not ==> show error
      if (priceFromContractPlusCommission < Number(value)) {
        notification.error(ERRORS.NOT_THE_RIGHT_PRICE);
        throw new Error(ERRORS.NOT_THE_RIGHT_PRICE);
      }

      //* mongo
      // const { _id, ...restNft } = nft;
      const nftItem = {
        tokenId: nft.tokenId,
        name: nft.name,
        description: nft.description,
        imageUrl: nft.imageUrl,
        nftAddress: nft.nftAddress,
        creatorAddress: nft.creatorAddress,
        networkId: nft.networkId,
        royalty: nft.royalty,
        collectionId: nft.collectionId,
        attributes: nft.attributes,
        category: nft.category,
        listingId: '',
        isListedOnce: true,
        multiple: false,
        status: STATUS.NOT_LISTED,
        marketType: MARKET_TYPE.SIMPLE
      };

      //* create tracking before buying
      await ApiService.createProcessTracking({
        ...nftItem,
        userAddress,
        ownerAddress: nft.ownerAddress,
        action: PROCESS_TRAKING_ACTION.BUY_SIMPLE_SINGLE,
        processStatus: PROCESS_TRAKING_STATUS.BEFORE
      });

      //* interaction with the nft market contract
      await buySimple({
        nftMarketSimpleContract,
        userAddress,
        listingId: Number(nft.listingId),
        quantity: SINGLE,
        value
      });

      //* turn off loader
      setBuyState({ loader: false, error: null });
      //* close popup
      // setOpenBuy(false);
    } catch (error) {
      setBuyState({ loader: false, error: getErrorMessage(error) });
      console.log(
        '🚀 ~ file: ItemDetailSingle.tsx ~ line 350 ~ buy ~ getErrorMessage(error)',
        getErrorMessage(error)
      );
    }
  };

  const _placeBid = async (data: { price: string }, resetForm: () => void) => {
    try {
      if (!nft) return;
      if (!web3) {
        notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
        return;
      }
      //* set loader
      setPlaceBidState({ loader: true, error: null });
      setLastBid(null);

      //* getting network id *//
      const networkId = await getNetworkId(web3);
      if (networkId !== SELECTED_NETWORK) {
        notification.error(ERRORS.WRONG_NETWORK);
        throw new Error(ERRORS.WRONG_NETWORK);
      }

      //* getting the market item from the contract
      const auctionMarketItem = await getAuctionMarketItem({
        nftMarketAuctionContract,
        listingId: Number(nft.listingId)
      });

      //* checks
      // const auctionBids: IAuctionBidItem[] =
      //   await nftMarketAuctionContract.methods
      //     .getAuctionBids(Number(nft.listingId))
      //     .call();
      // const currentBid = Number(auctionMarketItem.currentBid);

      const myBalanceinWei = await getMyTokenBalance(
        userAddress,
        nft?.priceToken[0]?.address,
        web3
      );
      const bidInWei = web3.utils.toWei(data.price.toString(), 'ether');
      const bidWithCommissionWeiValue =
        Number(bidInWei) + getPriceAfterPercent(Number(bidInWei), 1);

      if (Number(myBalanceinWei) < bidWithCommissionWeiValue) {
        notification.error(ERRORS.NOT_ENOUGH_BALANCE);
        throw new Error(ERRORS.NOT_ENOUGH_BALANCE);
      }
      if (Number(bidInWei) <= Number(auctionMarketItem.startPrice)) {
        notification.error(ERRORS.NOT_ABOVE_MINIMUM_PRICE);
        throw new Error(ERRORS.NOT_ABOVE_MINIMUM_PRICE);
      }
      if (auctionMarketItem.isClosed) {
        notification.error(ERRORS.AUCTION_IS_CLOSED);
        throw new Error(ERRORS.AUCTION_IS_CLOSED);
      }
      const now = moment().unix();
      const deadline = Number(auctionMarketItem.deadline);

      if (now > deadline) {
        notification.error(ERRORS.AUCTION_IS_FINISHED);
        throw new Error(ERRORS.AUCTION_IS_FINISHED);
      }

      const bidItem = {
        name: nft.name,
        description: nft.description,
        listingId: nft.listingId,
        tokenId: nft.tokenId,
        nftAddress: nft.nftAddress,
        networkId: nft.networkId
      };

      //* create tracking before place a bid

      await ApiService.createProcessTracking({
        ...bidItem,
        userAddress,
        price: data.price,
        action: PROCESS_TRAKING_ACTION.BID,
        processStatus: PROCESS_TRAKING_STATUS.BEFORE
      });

      //* approve contract
      await approveContract({
        mockERC20Contract,
        spender: nftMarketAuctionContract._address,
        owner: userAddress,
        amount: bidWithCommissionWeiValue
      });
      console.log(
        '🚀 ~ file: ItemDetailSingle.tsx ~ line 434 ~ placeBid ~ nftMarketAuctionContract._address',
        nftMarketAuctionContract._address
      );

      console.log('🚀 ~ file: ItemDetailSingle.tsx ~ line 452 ~ placeBid');
      //* place bid on contract
      await placeBid({
        nftMarketAuctionContract,
        userAddress,
        listingId: Number(nft.listingId),
        bid: bidInWei
      });

      //* turn off loader
      setPlaceBidState({ loader: false, error: null });
    } catch (error) {
      setPlaceBidState({ loader: false, error: getErrorMessage(error) });
    }
  };

  const _makeOffer = async (
    data: {
      price: string;
      quantity: number;
      expirationDates: string;
      expirationDay: string;
      pricetokentype: string;
      pricetokenaddress: string;
      priceTokenId: string;
    },
    resetForm: () => void
  ) => {
    try {
      if (!nft) return;
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
      const offerInWei = web3.utils.toWei(data.price.toString(), 'ether');
      const offerWithCommissionWeiValue =
        Number(offerInWei) + getPriceAfterPercent(Number(offerInWei), 1);
      console.log(myBalanceinWei, offerWithCommissionWeiValue);
      if (Number(myBalanceinWei) < offerWithCommissionWeiValue) {
        notification.error(ERRORS.NOT_ENOUGH_BALANCE);
        throw new Error(ERRORS.NOT_ENOUGH_BALANCE);
      }
      const offerTrackingItem = {
        name: nft.name,
        description: nft.description,
        listingId: nft.listingId,
        tokenId: nft.tokenId,
        nftAddress: nft.nftAddress,
        networkId: nft.networkId
      };
      const offerDeadline = Number(
        data.expirationDates === '0'
          ? moment(data.expirationDay)
          : moment(new Date()).add(Number(data.expirationDates), 'days')
      );
      console.log(
        '🚀 ~ file: ItemDetailSingle.tsx ~ line 549 ~ ItemDetailSingle ~ offerDeadline',
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
        amount: offerWithCommissionWeiValue * data.quantity
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
          nft.nftAddress,
          Number(nft.tokenId),
          data.quantity,
          data.pricetokenaddress,
          offerInWei,
          offerDeadline
        )
        .send({ from: userAddress });

      //* create tracking after make offer
      await ApiService.createProcessTracking({
        ...offerTrackingItem,
        userAddress,
        price: data.price,
        action: PROCESS_TRAKING_ACTION.OFFER,
        processStatus: PROCESS_TRAKING_STATUS.AFTER
      });
      //* turn off loader
      setMakeOfferState({ loader: false, error: null });
    } catch (error) {
      setMakeOfferState({ loader: false, error: getErrorMessage(error) });
    }
  };

  const _acceptOffer = async (
    offer: any,
    acceptedAmount: number,
    resetForm: () => void
  ) => {
    try {
      if (!nft) return;
      if (!web3) {
        notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
        return;
      }

      console.log(
        '🚀 ~ file: ItemDetailSingle.tsx ~ line 652 ~ _acceptOffer ~ offer',
        offer
      );

      //* getting network id *//
      const networkId = await getNetworkId(web3);
      if (networkId !== SELECTED_NETWORK) {
        notification.error(ERRORS.WRONG_NETWORK);
        throw new Error(ERRORS.WRONG_NETWORK);
      }

      setAcceptOfferState({ loader: true, error: null, selectedOffer: offer });

      const offerTrackingItem = {
        name: nft.name,
        description: nft.description,
        listingId: nft.listingId,
        tokenId: nft.tokenId,
        nftAddress: nft.nftAddress,
        networkId: nft.networkId
      };

      //* create tracking before accept offer
      await ApiService.createProcessTracking({
        ...offerTrackingItem,
        userAddress: offer.offererAddress,
        price: offer.amount,
        action: PROCESS_TRAKING_ACTION.ACCEPTOFFER,
        processStatus: PROCESS_TRAKING_STATUS.BEFORE
      });

      //! Cancel Market Items
      if (nft.status !== STATUS.NOT_LISTED) {
        if (nft.marketType === MARKET_TYPE.AUCTION) {
          await cancelAuctionListing({
            nftMarketAuctionContract,
            userAddress,
            listingId: Number(nft.listingId)
          });
        } else {
          await cancelSimpleListing({
            nftMarketSimpleContract,
            userAddress,
            listingId: Number(nft.listingId)
          });
        }
      }

      //* approve
      await nft721Contract.methods
        .approve(nftMarketOffersContract._address, Number(nft.tokenId))
        .send({ from: userAddress });

      //* accept offer on contract
      await nftMarketOffersContract.methods
        .acceptOffer(Number(offer.offerId), Number(acceptedAmount))
        .send({ from: userAddress });

      //* create tracking before accept offer
      await ApiService.createProcessTracking({
        ...offerTrackingItem,
        userAddress: offer.offererAddress,
        price: offer.amount,
        action: PROCESS_TRAKING_ACTION.ACCEPTOFFER,
        processStatus: PROCESS_TRAKING_STATUS.AFTER
      });

      //* turn off loader
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
        nftAddress: nft.nftAddress,
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

      await ApiService.createProcessTracking({
        ...offerTrackingItem,
        userAddress,
        price: offer.amount,
        action: PROCESS_TRAKING_ACTION.CANCEL_OFFER,
        processStatus: PROCESS_TRAKING_STATUS.AFTER
      });

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

  const _cancelListing = async () => {
    try {
      if (!nft) {
        console.log('no nft! - for typescript need');
        return;
      }
      if (!web3) {
        notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
        return;
      }
      //* set loader
      setCancelListingState({ loader: true, error: null });

      //* getting network id *//
      const networkId = await getNetworkId(web3);
      if (networkId !== SELECTED_NETWORK) {
        notification.error(ERRORS.WRONG_NETWORK);
        throw new Error(ERRORS.WRONG_NETWORK);
      }

      //* mongo item
      const nftItem = {
        tokenId: nft.tokenId,
        listingId: nft.listingId,
        name: nft.name,
        description: nft.description,
        imageUrl: nft.imageUrl,
        creatorAddress: nft.creatorAddress,
        nftAddress: nft.nftAddress,
        collectionId: nft.collectionId,
        royalty: nft.royalty,
        marketType: nft.marketType,
        networkId: nft.networkId,
        isListedOnce: nft.isListedOnce,
        multiple: nft.multiple,
        attributes: nft.attributes,
        ownerAddress: userAddress,
        priceTokenId: nft.priceTokenId,
        status: STATUS.ON_SELL
      };

      if (nft.marketType === MARKET_TYPE.SIMPLE) {
        const simpleMarketItem: ISimpleMarketItem =
          await nftMarketSimpleContract.methods
            .simpleListingIdToMarketItem(Number(nft.listingId))
            .call();

        if (simpleMarketItem.ownerAddress.toLowerCase() !== nft.ownerAddress) {
          notification.error(ERRORS.ONLY_OWNER_CAN_CANCEL);
          throw new Error(ERRORS.ONLY_OWNER_CAN_CANCEL);
        }
        if (Number(simpleMarketItem.remainingQuantity) === 0) {
          notification.error(ERRORS.NOTHING_TO_CANCEL);
          throw new Error(ERRORS.NOTHING_TO_CANCEL);
        }

        //* create tracking before canceling
        await ApiService.createProcessTracking({
          ...nftItem,
          userAddress,
          action: PROCESS_TRAKING_ACTION.CANCEL_SIMPLE_SINGLE,
          processStatus: PROCESS_TRAKING_STATUS.BEFORE
        });

        //* cancel simple listing on contract
        await cancelSimpleListing({
          nftMarketSimpleContract,
          userAddress,
          listingId: Number(nft.listingId)
        });
      } else if (nft.marketType === MARKET_TYPE.AUCTION) {
        const auctionMarketItem: IAuctionMarketItem =
          await nftMarketAuctionContract.methods
            .auctionListingIdToMarketItem(Number(nft.listingId))
            .call();
        const auctionBids: IAuctionBidItem[] = await getAuctionBids({
          nftMarketAuctionContract,
          listingId: Number(nft.listingId)
        });
        const now = moment().unix();

        if (auctionMarketItem.ownerAddress.toLowerCase() !== nft.ownerAddress) {
          notification.error(ERRORS.ONLY_OWNER_CAN_CANCEL);
          throw new Error(ERRORS.ONLY_OWNER_CAN_CANCEL);
        }
        // if deadline is bigger than now you can cancel
        // if now is bigger than auction deadline===>err

        if (Number(auctionMarketItem.deadline) < now) {
          notification.error(ERRORS.AUCTION_IS_CLOSED);
          throw new Error(ERRORS.AUCTION_IS_CLOSED);
        }
        if (auctionMarketItem.isClosed) {
          notification.error(ERRORS.AUCTION_IS_CLOSED);
          throw new Error(ERRORS.AUCTION_IS_CLOSED);
        }
        if (auctionBids.length !== 0) {
          notification.error(ERRORS.THERE_ARE_BIDS);
          throw new Error(ERRORS.THERE_ARE_BIDS);
        }
        //* create tracking before canceling
        await ApiService.createProcessTracking({
          ...nftItem,
          userAddress,
          action: PROCESS_TRAKING_ACTION.CANCEL_AUCTION,
          processStatus: PROCESS_TRAKING_STATUS.BEFORE
        });

        //* cancel auction listing on contract
        await cancelAuctionListing({
          nftMarketAuctionContract,
          userAddress,
          listingId: Number(nft.listingId)
        });
      }

      //* turn off loader
      setCancelListingState({ loader: false, error: null });
    } catch (error) {
      console.log(
        '🚀 ~ file: ItemDetailSingle.tsx ~ line 583 ~ cancelListing ~ error',
        error
      );
      setCancelListingState({ loader: false, error: getErrorMessage(error) });
    }
  };

  const _terminateAuction = async () => {
    if (!web3) {
      notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
      return;
    }
    try {
      if (!nft) {
        console.log('no nft! - only for typescript need');
        return;
      }

      //* set loader
      setTerminateAuctionState({ loader: true, error: null });

      //* getting network id *//
      const networkId = await getNetworkId(web3);
      if (networkId !== SELECTED_NETWORK) {
        notification.error(ERRORS.WRONG_NETWORK);
        throw new Error(ERRORS.WRONG_NETWORK);
      }

      //* checks
      const auctionMarketItem: IAuctionMarketItem =
        await nftMarketAuctionContract.methods
          .auctionListingIdToMarketItem(Number(nft.listingId))
          .call();

      const now = moment().unix();

      if (auctionMarketItem.isClosed) {
        notification.error(ERRORS.AUCTION_IS_CLOSED);
        throw new Error(ERRORS.AUCTION_IS_CLOSED);
      }
      // if now is bigger than deadline you can terminate
      // if deadline is bigger than now you can't terminate
      if (Number(auctionMarketItem.deadline) > now) {
        notification.error(ERRORS.AUCTION_HASNT_ENDED);
        throw new Error(ERRORS.AUCTION_HASNT_ENDED);
      }

      //* mongo
      const nftItem = {
        tokenId: nft.tokenId,
        name: nft.name,
        description: nft.description,
        imageUrl: nft.imageUrl,
        creatorAddress: nft.creatorAddress,
        nftAddress: nft.nftAddress,
        collectionId: nft.collectionId,
        royalty: nft.royalty,
        listingId: nft.listingId,
        attributes: nft.attributes,
        marketType: MARKET_TYPE.AUCTION,
        isListedOnce: true,
        multiple: false,
        networkId: nft.networkId,
        minimumBid: nft.minimumBid
      };
      const auctionBids: IAuctionBidItem[] = await getAuctionBids({
        nftMarketAuctionContract,
        listingId: Number(nft.listingId)
      });
      //* create tracking before terminate auction
      await ApiService.createProcessTracking({
        ...nftItem,
        userAddress,
        action: auctionBids.length
          ? PROCESS_TRAKING_ACTION.TERMINATE_AUCTION_SOLD
          : PROCESS_TRAKING_ACTION.TERMINATE_AUCTION_NOT_SOLD,
        processStatus: PROCESS_TRAKING_STATUS.BEFORE
      });
      //* terminate on contract
      await terminateAuction({
        nftMarketAuctionContract,
        userAddress,
        listingId: Number(nft.listingId)
      });

      setTerminateAuctionState({ loader: false, error: null });
    } catch (error) {
      console.log(
        '🚀 ~ file: ItemDetailSingle.tsx ~ line 682 ~ terminateAuction ~ error',
        error
      );
      setTerminateAuctionState({
        loader: false,
        error: getErrorMessage(error)
      });
    }
  };

  const onAuctionTimeout = () => {
    if (nft) {
      const { tokenId, nftAddress } = nft;
      navigate(`/ItemDetail/${tokenId}/${nftAddress}`);
    }
  };

  const _convertActionToText = (action: string) => {
    let res: string;
    switch (action) {
      case PROCESS_TRAKING_ACTION.CREATE_SINGLE:
        res = 'minted a single NFT';
        break;
      case PROCESS_TRAKING_ACTION.TERMINATE_AUCTION_SOLD:
        res = 'terminated an auction';
        break;
      case PROCESS_TRAKING_ACTION.ACCEPTOFFER:
        res = 'offer accepted';
        break;
      case PROCESS_TRAKING_ACTION.BUY_SIMPLE_SINGLE:
        res = 'bought a simple item';
        break;
      case PROCESS_TRAKING_ACTION.LIST_SIMPLE_SINGLE:
        res = 'listed a simple item';
        break;
      case PROCESS_TRAKING_ACTION.LIST_AUCTION:
        res = 'listed an auction item';
        break;
      case PROCESS_TRAKING_ACTION.OFFER:
        res = 'created an offer';
        break;
      case PROCESS_TRAKING_ACTION.BID:
        res = 'placed a bid';
        break;
      case PROCESS_TRAKING_ACTION.CANCEL_OFFER:
        res = 'cancelled an offer';
        break;
      default:
        res = '';
        break;
    }
    return res;
  };

  const renderTimeClock = () => {
    if (!nft) return;
    if (
      nft.status === STATUS.ON_SELL &&
      nft.marketType === MARKET_TYPE.AUCTION
    ) {
      if (dateHasPassed(nft.expirationDate)) {
        return (
          <div className="detail_button">
            <div className="auction_ended">Auction ended</div>
            <button
              className="btn-main btn-grad lead mb-5 mt-3"
              onClick={openTerminateAuctionPopUp}
              disabled={terminateAuctionState.loader}
            >
              {terminateAuctionState.loader ? <Loader /> : 'Terminate Auction'}
            </button>
          </div>
        );
      } else {
        return (
          <div className="auction_endsin">
            {/* {formatDate(nft?.expirationDate)} */}
            <div className="de_countdown">
              <Clock
                deadline={nft?.expirationDate}
                onTimeout={onAuctionTimeout}
              />
              <p>Auction ends in</p>
            </div>
          </div>
        );
      }
    }
  };
  //

  const renderBuyButtons = () => {
    if (!nft) return;
    return (
      <div className="d-flex flex-row mt-5">
        {nft.ownerAddress !== userAddress &&
          nft.status === STATUS.ON_SELL &&
          !dateHasPassed(nft.expirationDate) &&
          nft.marketType === MARKET_TYPE.SIMPLE && (
            <button className="btn-main lead mb-5 mr-5" onClick={openBuyPopUp}>
              Buy Now
            </button>
          )}
        {nft.ownerAddress !== userAddress &&
          nft.status === STATUS.ON_SELL &&
          !dateHasPassed(nft.expirationDate) &&
          nft.marketType === MARKET_TYPE.AUCTION && (
            <button
              className="btn-main lead mb-5 mr-5"
              onClick={openPlaceBidPopUp}
            >
              Place Bid
            </button>
          )}
        {nft.ownerAddress !== userAddress && (
          <button className="btn-main lead mb-5" onClick={openMakeOfferPopUp}>
            Make Offer
          </button>
        )}
      </div>
    );
  };

  const renderBids = () => {
    if (!nft) return;
    if (bidsState.loading || placeBidState.loader) {
      return <Loader size={30} />;
    }
    if (bidsState.error) {
      return <Alert text={bidsState.error} type={ALERT_TYPE.DANGER} />;
    }
    if (
      nft.status === STATUS.ON_SELL &&
      nft.marketType === MARKET_TYPE.AUCTION
    ) {
      console.log(
        '🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀',
        bids
      );
      return (
        <div className="tab-1 onStep fadeIn">
          {bids &&
            bids.map(
              (bid, index) =>
                bid &&
                bid.buyer &&
                bid?.buyer[0] && (
                  <div className="p_list" key={index}>
                    <div
                      className="author_list_pp"
                      onClick={() => navigateToUserPage(bid?.buyerAddress)}
                    >
                      <span>
                        <UserAvatar
                          className="lazy"
                          image={bid?.buyer[0]?.profileImage}
                          userAddress={bid?.buyerAddress}
                          blockSize={5}
                          size={50}
                        />
                        <i className="fa fa-check"></i>
                      </span>
                    </div>
                    <div className="p_list_info">
                      Bid{' '}
                      <b>
                        {bid?.price} {nft?.priceToken[0]?.name || COIN}
                      </b>
                      <span>
                        by{' '}
                        <b>
                          {bid?.buyer[0]?.username
                            ? `@${bid?.buyer[0]?.username}`
                            : bid?.buyerAddress}
                        </b>{' '}
                        at {formatDate(bid.createdAt)}
                      </span>
                    </div>
                  </div>
                )
            )}
        </div>
      );
    }
  };

  const renderOffers = () => {
    if (!nft) return;
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
                {nft.ownerAddress === userAddress &&
                  (acceptOfferState.loader &&
                  acceptOfferState.selectedOffer &&
                  acceptOfferState.selectedOffer.offerId === offer.offerId ? (
                    <Loader size={50} />
                  ) : (
                    offer?.offererAddress !== userAddress &&
                    !(
                      acceptOfferState.selectedOffer && acceptOfferState.loader
                    ) && (
                      <button
                        className="btn-main lead"
                        onClick={() => {
                          // _acceptOffer(offer);
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
                  ))}
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

  const renderNftHistory = () => {
    if (!nft) return;
    if (fetchHistoryState.loader) {
      return <Loader size={30} />;
    }
    if (fetchHistoryState.error) {
      return <Alert text={fetchHistoryState.error} type={ALERT_TYPE.DANGER} />;
    }
    if (tabType === TAB_TYPE.HISTORY) {
      return (
        <div className="tab-1 onStep fadeIn">
          {nftHistory.length > 0 &&
            nftHistory.map((item, index) => {
              const userAddress: string =
                item?.user[0]?.publicAddress || item.userAddress;

              return (
                <div className="p_list" key={index}>
                  <div
                    className="author_list_pp"
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={() => navigateToUserPage(userAddress)}
                  >
                    <span>
                      <UserAvatar
                        className="lazy"
                        image={item.user[0]?.profileImage}
                        userAddress={item.user[0]?.publicAddress}
                        blockSize={5}
                        size={50}
                      />
                      {/* <i className="fa fa-check"></i> */}
                    </span>
                  </div>
                  <div className="p_list_info">
                    <span>
                      {' '}
                      <b>
                        {item?.user[0]?.username
                          ? `@${item.user[0].username}`
                          : userAddress}
                      </b>
                    </span>
                  </div>
                  <p className="ml-2">
                    {`${_convertActionToText(item?.action)}`}
                  </p>
                </div>
              );
            })}
        </div>
      );
    }
  };

  const renderNftDetails = () => {
    return (
      nft && (
        <div className="tab-1 onStep fadeIn">
          {/* {renderBuyButtons()} */}
          <div className="detail_properties">{renderAttributes(nft)}</div>
        </div>
      )
    );
  };

  const renderCancelButton = () => {
    if (!nft) return;
    if (nft.ownerAddress === userAddress && nft.status === STATUS.ON_SELL) {
      return (
        <div className="d-flex flex-row mt-5">
          {cancelListingState.loader ? (
            <Loader />
          ) : (
            <button
              className="btn-main lead mb-5"
              onClick={openCancelListingPopUp}
            >
              Cancel Listing
            </button>
          )}
          {/* {cancelListingState.error && <Alert text={cancelListingState.error} type={ALERT_TYPE.DANGER} />} */}
        </div>
      );
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
    if (!nft) {
      return <Alert text={'no nft'} type={ALERT_TYPE.DANGER} />;
    }
    return (
      <div className="container">
        <div className="row nft-detail" style={{}}>
          <BanrLayer />
          <div className="col-md-5 text-center nft-detail-left">
            <div className="nft-detail-image">
              <img
                src={getImage(nft?.imageUrl)}
                style={{
                  width: '100%'
                }}
                className="img-fluid img-rounded mb-sm-30"
                alt=""
                loading="lazy"
              />
            </div>
            <div className="nft-bottom-detail">
              <h3>Details</h3>
              <ul>
                <li>
                  <a href="#">
                    <i>
                      <img
                        src="../../../img/icon/pulsescan.png"
                        alt="item-detail-icon"
                      />
                    </i>
                    <span>View on PulseScan</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i>
                      <img
                        src="../../../img/icon/metabox.png"
                        alt="item-detail-icon"
                      />
                    </i>
                    <span>View Metadata</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i>
                      <img
                        src="../../../img/icon/view.png"
                        alt="item-detail-icon"
                      />
                    </i>
                    <span>View on IPFS</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-7" style={{ position: 'relative' }}>
            <div className="item_info">
              <div className="item_detail_head">
                <h2>{nft?.name}</h2>
                <p>{nft?.description}</p>
              </div>
              <div className="item_detail_content">
                {/* {nft?.creator[0]?.username && (
                  <div style={{}}>
                    <p>
                      Created by: <strong>{nft?.creator[0].username}</strong>
                    </p>
                  </div>
                )} */}
                {nft?.nftCollection?.length > 0 && (
                  <div style={{}}>
                    <p>
                      Collection: <strong>{nft.nftCollection[0].name}</strong>
                    </p>
                  </div>
                )}
                {nft?.category && (
                  <p>
                    Category: <strong>{nft.category}</strong>
                  </p>
                )}
                {nft.price > 0 && (
                  <p className="item_detail_price">
                    <i>
                      <img src="./../../img/icon/price-pulse.png" />
                    </i>{' '}
                    <strong>
                      {nft.price} {COIN}
                    </strong>
                  </p>
                )}
                {nft.marketType === MARKET_TYPE.AUCTION &&
                  nft?.status === STATUS.ON_SELL && (
                    <p>
                      Minimum bid:{' '}
                      <strong>
                        {nft?.minimumBid} {nft?.priceToken[0]?.name || COIN}
                      </strong>
                    </p>
                  )}

                <div className="row author-details align-items-center">
                  <div className="col-lg-6">
                    <div
                      className="item_author d-flex align-items-center"
                      onClick={() =>
                        navigateToUserPage(
                          nft?.creator[0]?.publicAddress || nft?.creatorAddress
                        )
                      }
                    >
                      <div className="author_list_pp">
                        <span>
                          <UserAvatar
                            className="lazy"
                            image={nft?.creator[0]?.profileImage}
                            userAddress={nft?.creator[0]?.publicAddress}
                            blockSize={5}
                            size={50}
                          />
                          <i className="fa fa-check"></i>
                        </span>
                      </div>
                      <div className="author_list_info">
                        <h6>Creator</h6>
                        {nft?.creator[0]?.username && (
                          <span>{nft?.creator[0].username}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div
                      className="item_author d-flex align-items-center"
                      onClick={() =>
                        navigateToUserPage(
                          nft?.owner[0]?.publicAddress || nft?.ownerAddress
                        )
                      }
                    >
                      <div className="author_list_pp">
                        <span>
                          <UserAvatar
                            className="lazy"
                            image={nft?.owner[0]?.profileImage}
                            userAddress={nft?.owner[0]?.publicAddress}
                            blockSize={5}
                            size={50}
                          />
                          <i className="fa fa-check"></i>
                        </span>
                      </div>
                      <div className="author_list_info">
                        <h6>Owner</h6>
                        {nft?.owner[0]?.username && (
                          <span>{nft?.owner[0]?.username}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {renderTimeClock()}
                </div>

                <div className="spacer-40"></div>
                {nft?.ownerAddress === userAddress &&
                  nft?.status !== STATUS.ON_SELL && (
                    <button
                      className="btn-main lead mb-5"
                      onClick={() => listONSellContract()}
                    >
                      SELL
                    </button>
                  )}
                <div className="de_tab">
                  <ul className="de_nav">
                    {nft.marketType === MARKET_TYPE.AUCTION &&
                      nft.status === STATUS.ON_SELL && (
                        <li
                          id="Mainbtn"
                          className={tabType === TAB_TYPE.BIDS ? 'active' : ''}
                        >
                          <span onClick={() => pressTab(TAB_TYPE.BIDS)}>
                            Bids
                          </span>
                        </li>
                      )}
                    <li
                      id="Mainbtn1"
                      className={tabType === TAB_TYPE.HISTORY ? 'active' : ''}
                    >
                      <span onClick={() => pressTab(TAB_TYPE.HISTORY)}>
                        History
                      </span>
                    </li>
                    <li
                      id="Mainbtn1"
                      className={tabType === TAB_TYPE.OFFERS ? 'active' : ''}
                    >
                      <span onClick={() => pressTab(TAB_TYPE.OFFERS)}>
                        Offers
                      </span>
                    </li>

                    <li
                      id="Mainbtn1"
                      className={tabType === TAB_TYPE.DETAILS ? 'active' : ''}
                    >
                      <span onClick={() => pressTab(TAB_TYPE.DETAILS)}>
                        Details
                      </span>
                    </li>
                  </ul>

                  <div className="de_tab_content">
                    {tabType === TAB_TYPE.BIDS && renderBids()}
                    {tabType === TAB_TYPE.HISTORY && renderNftHistory()}
                    {tabType === TAB_TYPE.OFFERS && renderOffers()}

                    {tabType === TAB_TYPE.DETAILS && renderNftDetails()}
                    {/* && renderAttributes(nft) */}
                  </div>
                </div>
                <div className="ssf"></div>
                {/* {renderTimeClock()} */}
                <div className="detail_button">
                  {renderCancelButton()}
                  {renderBuyButtons()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const SeoConfig: SEOProps = {
    title: nft?.name || '',
    description: nft?.description || '',
    siteUrl: `https://nftonpulse.io/ItemDetail/${nft?.tokenId}/${nft?.nftAddress}`,
    image: {
      src: getImage(nft?.imageUrl) || '',
      alt: nft?.name || ''
    },
    keywords: [
      nft?.name || '',
      ...(nft?.description?.split(' ') || []),
      'nft',
      'pulse'
    ]
  };

  return (
    <div>
      <SEO {...SeoConfig} />
      <section className="nft-detail-page jumbotron">{renderView()}</section>
      {openBuy && nft && (
        <div className="checkout nft_detail_popup">
          <BuyPopUp
            onClose={closeBuyPopUp}
            nft={nft}
            submit={_buy}
            placeBidState={buyState}
            multiple={false}
          />
        </div>
      )}
      {openPlaceBid && nft && (
        <div className="checkout nft_detail_popup">
          <PlaceBidPopUp
            nft={nft}
            bids={bids}
            lastBid={lastBid}
            placeBidState={placeBidState}
            submit={_placeBid}
            onClose={closePlaceBidPopUp}
          />
        </div>
      )}
      {openMakeOffer && nft && (
        <div className="checkout nft_detail_popup">
          <MakeOfferPopUp
            nft={nft}
            makeOfferState={makeOfferState}
            submit={_makeOffer}
            onClose={closeMakeOfferPopUp}
            totalQuantity={1}
          />
        </div>
      )}
      {openAcceptOffer && acceptOfferState.selectedOffer && nft && (
        <div className="checkout nft_detail_popup">
          <AcceptOfferPopUp
            nft={nft}
            onClose={closeAcceptOfferPopUp}
            submit={_acceptOffer}
            acceptOfferState={acceptOfferState}
            multiple={false}
          />
        </div>
      )}
      {openCancelOffer && cancelOfferState.selectedOffer && nft && (
        <div className="checkout nft_detail_popup">
          <CancelOfferPopUp
            nft={nft}
            onClose={closeCancelOfferPopUp}
            submit={_cancelOffer}
            cancelOfferState={cancelOfferState}
            multiple={false}
          />
        </div>
      )}
      {openCancelListing && nft && (
        <div className="checkout nft_detail_popup">
          <CancelListingPopUp
            onClose={closeCancelListingPopUp}
            nft={nft}
            submit={_cancelListing}
            cancelListingState={cancelListingState}
          />
        </div>
      )}
      {openTerminateAuction && nft && (
        <div className="checkout nft_detail_popup">
          <TerminateAuctionPopup
            onClose={closeTerminateAuctionPopUp}
            nft={nft}
            submit={_terminateAuction}
            terminateAuctionState={terminateAuctionState}
          />
        </div>
      )}
    </div>
  );
};

export default memo(ItemDetailSingle);
