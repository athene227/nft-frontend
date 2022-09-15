import { navigate } from '@reach/router';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'src/components/components/Alert';
import { ApiService } from 'src/core/axios';
import {
  ALERT_TYPE,
  ERRORS,
  MARKET_TYPE,
  PROCESS_TRAKING_ACTION,
  PROCESS_TRAKING_STATUS,
  SELECTED_NETWORK,
  STATUS
} from 'src/enums';
import notification from 'src/services/notification';
import { INft } from 'src/types/nfts.types';
import {
  createAuctionMarketItem,
  createSimpleMarketItem,
  getErrorMessage,
  getNetworkId,
  getUserNftQuantityFromNftContract
} from 'src/utils';

import { fetchNftDetail } from '../../store/actions/thunks/nfts';
import * as selectors from '../../store/selectors';
import AuctionSaleForm from '../components/AuctionSaleForm';
import Footer from '../components/footer';
import Loader from '../components/Loader';
import MarketTypeTabs from '../components/MarketTypeTabs';
import PreviewNft from '../components/PreviewNft';
// import { createGlobalStyle } from 'styled-components';
import RegularSaleForm from '../components/RegularSaleForm';

const Createpage = (props: { tokenId: string; nftAddress: string }) => {
  const dispatch = useDispatch();

  const [marketType, setMarketType] = useState<MARKET_TYPE>(MARKET_TYPE.SIMPLE);
  const [submitSaleState, setSubmitSaleState] = useState<{
    error: null | string;
    loading: boolean;
  }>({ error: null, loading: false });
  const [priceTokenType, setTokenType] = useState('MTK');
  const [expirationDateInput, setExpirationDateInput] = useState<string>('');
  const [priceInput, setPriceInput] = useState<string>('');

  const web3State = useSelector(selectors.web3State);

  const {
    web3,
    accounts,
    nftMarketSimpleContract,
    nftMarketAuctionContract,
    mockERC20Contract,
    nft721Contract
  } = web3State.web3.data;
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
    priceTokenId: string;
    expirationDate: string;
    price: string;
  }

  const _submit = async (data: InftInputs, resetForm: () => void) => {
    if (!nft) return;
    if (!web3) {
      notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
      return;
    }
    console.log(
      '🚀 ~ file: Listing.tsx ~ line 134 ~ const_submit= ~ data',
      data
    );
    console.log('🚀 ~ file: Listing.tsx ~ line 134 ~ const_submit= ~ nft', nft);
    try {
      //* show loader
      setSubmitSaleState({ error: null, loading: true });
      //* getting network id *//
      const networkId = await getNetworkId(web3);
      if (networkId !== SELECTED_NETWORK) {
        notification.error(ERRORS.WRONG_NETWORK);
        throw new Error(ERRORS.WRONG_NETWORK);
      }

      const _nftBalance = await getUserNftQuantityFromNftContract({
        nftContract: nft721Contract,
        userAddress
      });
      console.log(
        '🚀 ~ file: Listing.tsx ~ line 107 ~ const_submit= ~ _nftBalance',
        _nftBalance
      );
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
        priceTokenId: '',
        category: nft.category,
        networkId,
        marketType,
        isListedOnce: true,
        multiple: false,
        totalAmount: 1,
        leftAmount: 0,
        listedAmount: 1,
        listedAt: new Date()
      };
      // const myBalance = await getMyBalance(userAddress, web3)

      const tokenId = nft.tokenId;
      //* dates
      const ts1 = moment(data.expirationDate).unix();

      const _date = new Date(data.expirationDate); //Sat May 14 2022 21:30:00 GMT+0300 (Israel Daylight Time)

      if (marketType === MARKET_TYPE.AUCTION) {
        if (data.minimumBid) {
          itemToCreate.minimumBid = data.minimumBid;
        }
        if (data.priceTokenId) {
          itemToCreate.priceTokenId = data.priceTokenId;
        }
        if (data.expirationDate) {
          itemToCreate.expirationDate = _date;
        }
      }

      if (marketType === MARKET_TYPE.SIMPLE) {
        if (data.price) {
          itemToCreate.price = data.price;
        }
      }

      let marketitem;
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
          action: PROCESS_TRAKING_ACTION.LIST_SIMPLE_SINGLE,
          processStatus: PROCESS_TRAKING_STATUS.BEFORE
        });

        await nft721Contract.methods
          .setApprovalForAll(nftMarketSimpleContract._address, true)
          .send({ from: userAddress });

        //* create on contract
        marketitem = await createSimpleMarketItem({
          nftMarketSimpleContract,
          userAddress,
          nftAddress: nft.nftAddress,
          tokenId,
          priceInWei,
          quantity: SINGLE,
          deadline: 1680000000
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
          action: PROCESS_TRAKING_ACTION.LIST_AUCTION,
          processStatus: PROCESS_TRAKING_STATUS.BEFORE
        });

        await nft721Contract.methods
          .setApprovalForAll(nftMarketAuctionContract._address, true)
          .send({ from: userAddress });

        //* create on contract
        marketitem = await createAuctionMarketItem({
          nftMarketAuctionContract,
          userAddress,
          priceTokenAddress: mockERC20Contract._address,
          nftAddress: nft.nftAddress,
          tokenId,
          startPriceInWei,
          deadline: ts1
        });
      }

      console.log(
        '🚀 ~ file: Listing.tsx ~ line 206 ~ const_submit= ~ marketitem',
        marketitem
      );
      //* create new row on the db
      const res = await ApiService.createdNft({
        transactionHash: marketitem.transactionHash,
        data: {
          ...itemToCreate,
          listingId: marketitem.returnValues.listingId,
          status: STATUS.ON_SELL
        }
      });
      console.log(
        '🚀 ~ file: Listing.tsx ~ line 225 ~ const_submit= ~ res',
        res
      );

      //* create tracking before listing
      await ApiService.createProcessTracking({
        ...itemToCreate,
        userAddress,
        tokenId,
        action:
          marketType === MARKET_TYPE.SIMPLE
            ? PROCESS_TRAKING_ACTION.LIST_SIMPLE_SINGLE
            : PROCESS_TRAKING_ACTION.LIST_AUCTION,
        processStatus: PROCESS_TRAKING_STATUS.AFTER
      });

      setSubmitSaleState({ error: null, loading: false });
      navigate('/myProfile');
    } catch (error) {
      console.log(
        '🚀 ~ file: Listing.tsx ~ line 237 ~ listing ~ getErrorMessage(error)',
        getErrorMessage(error)
      );
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
        return 'no auction on collectible item';
      }
      return (
        <AuctionSaleForm
          nft={nft}
          submit={_submit}
          setTokenType={setTokenType}
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
          tokentype={
            marketType === MARKET_TYPE.AUCTION ? priceTokenType : 'ETH'
          }
          isPreview={true}
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
                    'This item is already on sale!'
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
