import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNftDetail } from '../../store/actions/thunks/nfts';
import * as selectors from '../../store/selectors';

import Footer from '../components/footer';
// import { createGlobalStyle } from 'styled-components';
import RegularSaleForm from '../components/RegularSaleForm';
import AuctionSaleForm from '../components/AuctionSaleForm';
import { INft } from 'src/types/nfts.types';
import {
  ALERT_TYPE,
  ERRORS,
  MARKET_TYPE,
  PROCESS_TRAKING_ACTION,
  PROCESS_TRAKING_STATUS,
  SELECTED_NETWORK,
  STATUS
} from 'src/enums';
import Alert from 'src/components/components/Alert';
import {
  createAuctionMarketItem,
  createSimpleMarketItem,
  getErrorMessage,
  getNetworkId,
  getUserNftQuantityFromNftContract
} from 'src/utils';
import { ApiService } from 'src/core/axios';
import { navigate } from '@reach/router';
import PreviewNft from '../components/PreviewNft';
import Loader from '../components/Loader';
import MarketTypeTabs from '../components/MarketTypeTabs';
import notification from 'src/services/notification';
import moment from 'moment';

const Createpage = (props: { tokenId: string; nftAddress: string }) => {
  const dispatch = useDispatch();

  const [marketType, setMarketType] = useState<MARKET_TYPE>(MARKET_TYPE.SIMPLE);
  const [submitSaleState, setSubmitSaleState] = useState<{
    error: null | string;
    loading: boolean;
  }>({ error: null, loading: false });

  const [expirationDateInput, setExpirationDateInput] = useState<string>('');
  const [priceInput, setPriceInput] = useState<string>('');

  const web3State = useSelector(selectors.web3State);

  const { web3, accounts, nftMarketContract, nftContract } =
    web3State.web3.data;
  const userAddress = accounts[0];
  const nftDetailState = useSelector(selectors.nftDetailState);
  const nft = nftDetailState.data as INft;
  useEffect(() => {
    dispatch(
      fetchNftDetail({ tokenId: props.tokenId, nftAddress: props.nftAddress })
    );
  }, []);

  const onTab = (tab: MARKET_TYPE) => {
    setMarketType(tab);

    // reset fields
    setExpirationDateInput('');
    setPriceInput('');
  };
  interface InftInputs {
    minimumBid: string;
    startingDate: string;
    expirationDate: string;
    price: string;
  }

  const _submit = async (data: InftInputs, resetForm: Function) => {
    if (!nft) return;
    if (!web3) {
      notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
      return;
    }
    try {
      //* show loader
      setSubmitSaleState({ error: null, loading: true });
      //* getting network id *//
      const networkId = await getNetworkId(web3);
      if (networkId !== SELECTED_NETWORK) {
        notification.error(ERRORS.WRONG_NETWORK);
        throw new Error(ERRORS.WRONG_NETWORK);
      }
      console.log('getUserNftQuantityFromNftContract params');
      console.log({ nftContract, userAddress, tokenId: Number(nft.tokenId) });

      const _nftBalance = await getUserNftQuantityFromNftContract({
        nftContract,
        userAddress,
        tokenId: Number(nft.tokenId)
      });
      if (Number(_nftBalance) < 1) {
        notification.error(ERRORS.CANT_LIST_NFT_YOU_DONT_HAVE);
        throw new Error(ERRORS.CANT_LIST_NFT_YOU_DONT_HAVE);
      }

      // item to mongo
      // const { _id, ...restNft } = nft;
      const itemToCreate: any = {
        name: nft.name,
        description: nft.description,
        imageUrl: nft.imageUrl,
        creatorAddress: nft.creatorAddress,
        collectionId: nft.collectionId,
        nftAddress: nft.nftAddress,
        ownerAddress: nft.ownerAddress,
        royalty: nft.royalty,
        tokenId: nft.tokenId,
        attributes: nft.attributes,
        networkId,
        marketType,
        isListedOnce: true,
        multiple: false,
        listedAt: new Date()
      };
      // const myBalance = await getMyBalance(userAddress, web3)

      const tokenId = nft.tokenId;
      //* dates
      const ts1 = moment(data.expirationDate).unix();
      const expirationDate = data.expirationDate; // "2022-05-14T21:30"
      const _date = new Date(data.expirationDate); //Sat May 14 2022 21:30:00 GMT+0300 (Israel Daylight Time)

      if (marketType === MARKET_TYPE.AUCTION) {
        if (data.minimumBid) {
          itemToCreate.minimumBid = data.minimumBid;
        }
        if (data.expirationDate) {
          itemToCreate.expirationDate = _date;
        }
      }

      let listingId;
      const frontData = {
        name: nft.name,
        description: nft.description,
        imageUrl: nft.imageUrl,
        attributes: nft.attributes,
        multiple: false,
        collectionId: nft.collectionId,
        category: nft.category
      };
      if (marketType === MARKET_TYPE.SIMPLE) {
        const SINGLE = 1;
        const priceInWei = web3.utils.toWei(data.price.toString(), 'ether');
        if (priceInWei <= 0) {
          notification.error(ERRORS.SET_PRICE);
          throw new Error(ERRORS.SET_PRICE);
        }

        //* create tracking before listing
        await ApiService.createProcessTracking({
          ...itemToCreate,
          userAddress,
          tokenId,
          listingId,
          action: PROCESS_TRAKING_ACTION.LIST_SIMPLE_SINGLE,
          processStatus: PROCESS_TRAKING_STATUS.BEFORE
        });

        //* create on contract
        listingId = await createSimpleMarketItem({
          nftMarketContract,
          userAddress,
          nftAddress: nft.nftAddress,
          tokenId,
          priceInWei,
          quantity: SINGLE,
          frontData
        });
        //* create new row on the db
      } else if (marketType === MARKET_TYPE.AUCTION) {
        const startPriceInWei = web3.utils.toWei(
          data.minimumBid.toString(),
          'ether'
        );

        if (startPriceInWei <= 0) {
          notification.error(ERRORS.SET_PRICE);
          throw new Error(ERRORS.SET_PRICE);
        }

        //* create tracking before listing
        await ApiService.createProcessTracking({
          ...itemToCreate,
          userAddress,
          tokenId,
          listingId,
          action: PROCESS_TRAKING_ACTION.LIST_AUCTION,
          processStatus: PROCESS_TRAKING_STATUS.BEFORE
        });

        //* create on contract
        listingId = await createAuctionMarketItem({
          nftMarketContract,
          userAddress,
          nftAddress: nft.nftAddress,
          tokenId,
          startPriceInWei,
          deadline: ts1,
          frontData
        });
      }

      //* create new row on the db
      // const afterListingItem = await ApiService.createdNft({ ...itemToCreate, listingId, status: STATUS.ON_SELL });

      //* create tracking before listing
      await ApiService.createProcessTracking({
        ...itemToCreate,
        userAddress,
        tokenId,
        listingId,
        action:
          marketType === MARKET_TYPE.SIMPLE
            ? PROCESS_TRAKING_ACTION.LIST_SIMPLE_SINGLE
            : PROCESS_TRAKING_ACTION.LIST_AUCTION,
        processStatus: PROCESS_TRAKING_STATUS.AFTER
      });

      setSubmitSaleState({ error: null, loading: false });
      navigate('/myProfile');
    } catch (error) {
      console.log('error in listing', getErrorMessage(error));
      setSubmitSaleState({ error: getErrorMessage(error), loading: false });
    }
  };

  const renderForm = () => {
    if (marketType === MARKET_TYPE.SIMPLE) {
      return (
        <RegularSaleForm
          nft={nft}
          submit={_submit}
          submitSaleState={submitSaleState}
          setPriceInput={(val: string) => setPriceInput(val)}
        />
      );
    } else if (marketType === MARKET_TYPE.AUCTION) {
      if (nft.multiple) {
        return 'no auction on collectibale item';
      }
      return (
        <AuctionSaleForm
          nft={nft}
          submit={_submit}
          submitSaleState={submitSaleState}
          setMinimumBidInput={(val: string) => setPriceInput(val)}
          setExpirationDateInput={(val: string) => setExpirationDateInput(val)}
        />
      );
    }
    return 'no form';
  };

  const renderPreviewItem = () => {
    if (nftDetailState.loading) {
      return <Loader />;
    }
    if (nftDetailState.error) {
      return <Alert text={nftDetailState.error} type={ALERT_TYPE.DANGER} />;
    }
    if (nft) {
      return (
        <PreviewNft
          imageUrl={nft.imageUrl}
          userImage={nft?.owner[0]?.profileImage}
          nft={{ ...nft, price: priceInput }}
          multiple={nft.multiple}
          marketType={marketType}
          expirationDateInput={expirationDateInput}
          timer
        />
      );
    }
  };

  return (
    <div>
      {/* <GlobalStyles /> */}

      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">Listing</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* {!web3 &&
        <Alert text={ERRORS.NOT_CONNECTED_TO_WALLET} type={ALERT_TYPE.DANGER} />
      } */}
      <section className="container">
        {nftDetailState.error ? (
          <Alert text={nftDetailState.error} type={ALERT_TYPE.DANGER} />
        ) : (
          <div>
            <div className="row">
              <div className="col-lg-7 offset-lg-1 mb-5">
                {/* <form id="form-create-item" className="form-border" action="#"> */}
                <div className="field-set">
                  <div className="spacer-single"></div>

                  {nft?.status === STATUS.ON_SELL ? (
                    'This item is alreay on sale!'
                  ) : (
                    <div>
                      <MarketTypeTabs marketType={marketType} onTab={onTab} />
                      <div className="spacer-20"></div>
                      {renderForm()}
                    </div>
                  )}

                  <div className="spacer-20"></div>
                </div>
                {/* </form> */}
              </div>

              <div className="col-lg-3 col-sm-6 col-xs-12">
                <h5>Preview item</h5>
                {renderPreviewItem()}
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};
export default Createpage;
