import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Clock from '../components/Clock/Clock';
import Footer from '../components/footer';
import * as selectors from '../../store/selectors';
import { fetchNftDetail } from '../../store/actions/thunks/nfts';
import BuyPopUp from '../components/BuyPopUp';
import PlaceBidPopUp from '../components/PlaceBidPopUp';

import {
  dateHasPassed,
  formatDate,
  getErrorMessage,
  getProfileImage,
  getMyBalance,
  getPriceAfterPercent,
  cancelSimpleListing,
  cancelAuctionListing,
  approveContract,
  placeBid,
  terminateAuction,
  buySimple,
  getNetworkId,
  getAuctionMarketItem
} from 'src/utils';
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
import Loader from 'src/components/components/Loader';
import { navigate } from '@reach/router';
import { IAuctionMarketItem, ISimpleMarketItem } from 'src/types/nfts.types';
import { IBid } from 'src/types/bids.types';
import Alert from '../components/Alert';
import CancelListingPopUp from '../components/CancelListingPopUp';
import notification from 'src/services/notification';
import moment from 'moment';
import { renderAttributes } from '../components/NftAttributes';
import { getImage } from 'src/services/ipfs';
import { clearEvents } from 'src/store/actions';
import { fetchBids } from 'src/store/actions/thunks/bids';
import TerminateAuctionPopup from '../components/Popups/TerminateAuctionPopup';
import UserAvatar from '../components/UserAvatar';

enum TAB_TYPE {
  BIDS = 'BIDS',
  HISTORY = 'HISTORY'
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
  const [nftHistory, setNftHistory] = React.useState<any[]>([]);

  const SINGLE = 1;

  const pressTab = (tabType: TAB_TYPE) => {
    setTab(tabType);
  };

  const dispatch = useDispatch();
  const nftDetailState = useSelector(selectors.nftDetailState);
  const nft = nftDetailState.data;
  const nftLoader = nftDetailState.loading; // nft details loader
  const nftError = nftDetailState.error; // nft details error
  const web3State = useSelector(selectors.web3State);
  const {
    web3,
    accounts,
    nftMarketContract,
    mockERC20Contract,
    nftMarketSimpleContract,
    nftMarketAuctionContract,
    nftContract
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
  const [openCancelListing, setOpenCancelListing] = React.useState(false);
  const [openTerminateAuction, setOpenTerminateAuction] = React.useState(false);

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

  const closePlaceBidPopup = () => {
    setPlaceBidState({ loader: false, error: null });
    setOpenPlaceBid(false);
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

      setFetchHistoryState({ loader: false, error: null });
    } catch (error) {
      setFetchHistoryState({ loader: false, error: getErrorMessage(error) });
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
    }
  }, [nft?._id, tabType]);

  useEffect(() => {
    if (nft?.marketType === MARKET_TYPE.SIMPLE) {
      setTab(TAB_TYPE.HISTORY);
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
      const itemSold = await buySimple({
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
      console.log('error in buy', getErrorMessage(error));
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
      const currentBid = Number(auctionMarketItem.currentBid);
      const myBalanceinWei = await getMyBalance(userAddress, web3);
      const bidInWei = web3.utils.toWei(data.price.toString(), 'ether');
      const bidWithCommissionWeiValue =
        Number(bidInWei) + getPriceAfterPercent(Number(bidInWei), 1);

      if (Number(myBalanceinWei) < bidWithCommissionWeiValue) {
        notification.error(ERRORS.NOT_ENOUGH_BALANCE);
        throw new Error(ERRORS.NOT_ENOUGH_BALANCE);
      }
      if (bidInWei <= currentBid) {
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
        spender: nftMarketAuctionContract.options.address,
        owner: userAddress,
        amount: bidWithCommissionWeiValue
      });

      //* place bid on contract
      await placeBid({
        nftMarketAuctionContract,
        userAddress,
        listingId: Number(nft.listingId),
        bid: bidWithCommissionWeiValue
      });

      //* turn off loader
      setPlaceBidState({ loader: false, error: null });
    } catch (error) {
      setPlaceBidState({ loader: false, error: getErrorMessage(error) });
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
        status: STATUS.ON_SELL
      };

      let res;
      if (nft.marketType === MARKET_TYPE.SIMPLE) {
        //* mongo - before cacneling
        // const nftResult = await ApiService.createdNft({ ...nftItem, progressStatus: STATUS.BEFORE_CANCELING, });

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
        res = await cancelSimpleListing({
          nftMarketSimpleContract,
          userAddress,
          listingId: Number(nft.listingId)
        });
      } else if (nft.marketType === MARKET_TYPE.AUCTION) {
        //* mongo - before cacneling
        // const nftResult = await ApiService.createdNft({ ...nftItem, progressStatus: STATUS.BEFORE_CANCELING, });

        const auctionMarketItem: IAuctionMarketItem =
          await nftMarketAuctionContract.methods
            .auctionListingIdToMarketItem(Number(nft.listingId))
            .call();
        const ZERO_ADDRESS = web3.utils.padLeft('0x0', 40);
        const now = moment().unix();

        if (auctionMarketItem.ownerAddress.toLowerCase() !== nft.ownerAddress) {
          notification.error(ERRORS.ONLY_OWNER_CAN_CANCEL);
          throw new Error(ERRORS.ONLY_OWNER_CAN_CANCEL);
        }
        // if deadline is bigger than now you can cancel
        // if now is bigger than auction dedline===>error
        console.log('deadling', Number(auctionMarketItem.deadline));
        console.log('now', now);

        if (Number(auctionMarketItem.deadline) < now) {
          notification.error(ERRORS.AUCTION_IS_CLOSED);
          throw new Error(ERRORS.AUCTION_IS_CLOSED);
        }
        if (auctionMarketItem.isClosed) {
          notification.error(ERRORS.AUCTION_IS_CLOSED);
          throw new Error(ERRORS.AUCTION_IS_CLOSED);
        }
        if (auctionMarketItem.currentBidderAddress !== ZERO_ADDRESS) {
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
        res = await cancelAuctionListing({
          nftMarketAuctionContract,
          userAddress,
          listingId: Number(nft.listingId)
        });
      }

      //* turn off loader
      setCancelListingState({ loader: false, error: null });
    } catch (error) {
      console.log('error in cancelListing', error);
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
      const ZERO_ADDRESS = web3.utils.padLeft('0x0', 40);
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

      if (auctionMarketItem.currentBidderAddress === ZERO_ADDRESS) {
        //* create tracking before terminate auction
        await ApiService.createProcessTracking({
          ...nftItem,
          userAddress,
          action: PROCESS_TRAKING_ACTION.TERMINATE_AUCTION_NOT_SOLD,
          processStatus: PROCESS_TRAKING_STATUS.BEFORE
        });
        //* terminate on contract
        await terminateAuction({
          nftMarketAuctionContract,
          userAddress,
          listingId: Number(nft.listingId)
        });

        setTerminateAuctionState({ loader: false, error: null });
      } else {
        //* create tracking before terminate auction
        await ApiService.createProcessTracking({
          ...nftItem,
          userAddress,
          action: PROCESS_TRAKING_ACTION.TERMINATE_AUCTION_SOLD,
          processStatus: PROCESS_TRAKING_STATUS.BEFORE
        });
        //* terminate on contract
        await terminateAuction({
          nftMarketAuctionContract,
          userAddress,
          listingId: Number(nft.listingId)
        });

        //* turn off loader
        setTerminateAuctionState({ loader: false, error: null });
      }
    } catch (error) {
      console.log('error in _terminateAuction', error);
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

  const renderTimeClock = () => {
    if (!nft) return;
    if (
      nft.status === STATUS.ON_SELL &&
      nft.marketType === MARKET_TYPE.AUCTION
    ) {
      if (dateHasPassed(nft.expirationDate)) {
        return (
          <div>
            <div>Auction ended</div>
            <button
              className="btn-main lead mb-5 mt-3"
              onClick={openTerminateAuctionPopUp}
              disabled={terminateAuctionState.loader}
            >
              {terminateAuctionState.loader ? <Loader /> : 'Terminate Auction'}
            </button>
          </div>
        );
      } else {
        return (
          <div>
            Auction ends in
            {formatDate(nft?.expirationDate)}
            <div className="de_countdown">
              <Clock
                deadline={nft?.expirationDate}
                onTimeout={onAuctionTimeout}
              />
            </div>
          </div>
        );
      }
    }
  };
  //
  const renderBuyButtons = () => {
    if (!nft) return;
    if (
      nft.ownerAddress !== userAddress &&
      nft.status === STATUS.ON_SELL &&
      !dateHasPassed(nft.expirationDate)
    ) {
      return (
        <div className="d-flex flex-row mt-5">
          {nft.marketType === MARKET_TYPE.SIMPLE && (
            <button className="btn-main lead mb-5 mr15" onClick={openBuyPopUp}>
              Buy Now
            </button>
          )}
          {nft.marketType === MARKET_TYPE.AUCTION && (
            <button className="btn-main lead mb-5" onClick={openPlaceBidPopUp}>
              Place Bid
            </button>
          )}
        </div>
      );
    }
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
      return (
        <div className="tab-1 onStep fadeIn">
          {bidsState.data[nft.listingId] &&
            bidsState.data[nft.listingId].map((bid, index) => (
              <div className="p_list" key={index}>
                <div
                  className="author_list_pp"
                  onClick={() => navigateToUserPage(bid.buyerAddress)}
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
                    {bid.price} {COIN}
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
            ))}
        </div>
      );
    }
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
                </div>
              );
            })}
        </div>
      );
    }
  };

  const renderCancelButton = () => {
    if (!nft) return;
    if (nft.ownerAddress === userAddress && nft.status === STATUS.ON_SELL) {
      return (
        <div style={{ position: 'absolute', right: 0 }}>
          {cancelListingState.loader ? (
            <Loader />
          ) : (
            <button className="btn-main" onClick={openCancelListingPopUp}>
              Cancel listing
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
      <div className="row mt-md-5 pt-md-4" style={{}}>
        <div className="col-md-6 text-center">
          <img
            src={getImage(nft?.imageUrl)}
            className="img-fluid img-rounded mb-sm-30"
            alt=""
            loading="lazy"
          />
        </div>
        <div className="col-md-6" style={{ position: 'relative' }}>
          {renderCancelButton()}
          <div className="item_info">
            {renderTimeClock()}
            <h2>{nft?.name}</h2>
            <p>{nft?.description}</p>
            {nft?.nftCollection?.length > 0 && (
              <div style={{}}>Collection: {nft.nftCollection[0].name}</div>
            )}
            {nft?.category && (
              <span className="text-white">
                Category: <strong>{nft.category}</strong>
              </span>
            )}
            {nft.price > 0 && (
              <p>
                Price: {nft?.price} {COIN}
              </p>
            )}
            {nft.marketType === MARKET_TYPE.AUCTION &&
              nft?.status === STATUS.ON_SELL && (
                <p>
                  Minimum bid: {nft?.minimumBid} {COIN}
                </p>
              )}

            {renderBuyButtons()}
            <h6>Creator</h6>
            <div
              className="item_author"
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
              {nft?.creator[0]?.username && (
                <div className="author_list_info">
                  <span>{nft?.creator[0].username}</span>
                </div>
              )}
            </div>

            <div className="spacer-20"></div>
            <div className="spacer-40"></div>
            <h6>Owner</h6>
            <div
              className="item_author"
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
              {nft?.owner[0]?.username && (
                <div className="author_list_info">
                  <span>{nft?.owner[0]?.username}</span>
                </div>
              )}
            </div>
            <div className="spacer-40"></div>
            {renderAttributes(nft)}
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
                      <span onClick={() => pressTab(TAB_TYPE.BIDS)}>Bids</span>
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
              </ul>

              <div className="de_tab_content">
                {tabType === TAB_TYPE.BIDS && renderBids()}

                {tabType === TAB_TYPE.HISTORY && renderNftHistory()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* <GlobalStyles /> */}
      <section className="container">{renderView()}</section>
      <Footer />
      {openBuy && nft && (
        <div className="checkout">
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
        <div className="checkout">
          <PlaceBidPopUp
            nft={nft}
            bids={bids}
            lastBid={lastBid}
            placeBidState={placeBidState}
            submit={_placeBid}
            onClose={closePlaceBidPopup}
          />
        </div>
      )}
      {openCancelListing && nft && (
        <div className="checkout">
          <CancelListingPopUp
            onClose={closeCancelListingPopUp}
            nft={nft}
            submit={_cancelListing}
            cancelListingState={cancelListingState}
          />
        </div>
      )}
      {openTerminateAuction && nft && (
        <div className="checkout">
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
