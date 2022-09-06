// import { createGlobalStyle } from 'styled-components';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from 'src/components/components/Loader';
import {
  ALERT_TYPE,
  COIN,
  COMISSION_PERCENTAGE,
  ERRORS,
  INPUT_ERROS
} from 'src/enums';
import { getImage } from 'src/services/ipfs';
import { IBid } from 'src/types/bids.types';
import {
  IAuctionBidItem,
  IAuctionMarketItem,
  INft
} from 'src/types/nfts.types';
import {
  getAuctionBids,
  getAuctionMarketItem,
  getErrorMessage
  // placeBid
} from 'src/utils';
import * as Yup from 'yup';

import * as selectors from '../../store/selectors';
import Alert from './Alert';

// const GlobalStyles = createGlobalStyle`
// .heading h3, .description h3{
//   color: #333;
// }
// `;
interface IProps {
  nft: INft;
  onClose: (value: boolean) => void;
  submit: (values: any, resetForm: () => void) => void;
  bids: IBid[];
  lastBid: IBid | null;
  placeBidState: { error: null | string; loader: boolean };
}

const BuyPopUp = (props: IProps) => {
  const { nft, onClose, submit, placeBidState, lastBid, bids } = props;
  const [balance, setBalance] = useState(0);
  const [highestBidAmount, setHighestBidAmount] = useState('');
  const [dataState, setDataState] = useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });
  const [marketItem, setAuctionMarketItem] = useState<IAuctionMarketItem>({
    nftContract: '',
    nftTokenId: '',
    priceTokenAddress: '',
    startPrice: '',
    ownerAddress: '',
    deadline: 0,
    isClosed: false
  });

  const web3State = useSelector(selectors.web3State);
  const { web3, accounts, nftMarketAuctionContract } = web3State.web3.data;

  const _getMyBalance = async () => {
    const wei_balance = await web3.eth.getBalance(accounts[0]);
    const eth_balance = web3?.utils.fromWei(wei_balance, 'ether');
    return eth_balance;
  };

  const _getAuctionMarketItem = async () => {
    const _marketItem = await getAuctionMarketItem({
      nftMarketAuctionContract,
      listingId: Number(nft.listingId)
    });
    return _marketItem;
  };

  const _getAuctionBids = async (): Promise<IAuctionBidItem[]> => {
    const _auctionBids = await getAuctionBids({
      nftMarketAuctionContract,
      listingId: Number(nft.listingId)
    });

    return _auctionBids;
  };

  const _getData = async (isUpdate = false) => {
    try {
      if (!nft) return;
      setDataState({ loader: !isUpdate, error: null });

      const _eth_balance = await _getMyBalance();
      const _marketItem = await _getAuctionMarketItem();
      const _auctionBids = await _getAuctionBids();
      setBalance(_eth_balance);
      setAuctionMarketItem(_marketItem);
      let _highestBidAmount = Number(_marketItem.startPrice);

      for (let i = 0; i < _auctionBids.length; i++) {
        if (_highestBidAmount < Number(_auctionBids[i].bidAmount))
          _highestBidAmount = Number(_auctionBids[i].bidAmount);
      }
      setHighestBidAmount(String(_highestBidAmount));
      setDataState({ loader: false, error: null });
    } catch (error) {
      console.log('error in getData in place bid popup');
      setDataState({ loader: false, error: getErrorMessage(error) });
    }
  };

  useEffect(() => {
    const isUpdate = marketItem.nftTokenId !== '';
    _getData(isUpdate);
  }, [bids.length]);

  const getLastBid = () => {
    if (!nft) return;
    if (Number(highestBidAmount)) {
      const eth_balance = web3?.utils.fromWei(highestBidAmount, 'ether');
      return eth_balance;
    }
    return Number(nft.minimumBid);
  };

  const buySchema = Yup.object().shape({
    price: Yup.number()
      .typeError('you must specify a number')
      .moreThan(Number(nft?.minimumBid), INPUT_ERROS.tooShort)
      .required(INPUT_ERROS.requiredField)
  });

  const getInitialValue = () => {
    const result: any = {
      price: 0
    };
    return result;
  };

  const displayBuyForm = ({
    handleSubmit,
    values,
    submitCount,
    setValues,
    setFieldValue,
    errors,
    touched,
    handleChange,
    getFieldProps
  }: FormikProps<{ price: number }>) => {
    const getComission = (): number => {
      if (!values.price) return 0;
      return (Number(values.price) * COMISSION_PERCENTAGE) / 100;
    };
    const getTotal = (): number => {
      if (!values.price) return 0;
      return Number(values.price) + getComission();
    };

    return (
      <Form>
        <div className="modal-header">
          <h5 className="modal-title">Place a Bid</h5>
          <button
            className="btn-close"
            onClick={() => onClose(lastBid !== null)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-content">
          <div className="row">
            <div className="col-md-7">
              <div className="form-header">
                <p>
                  You are about to purchase a{' '}
                  <span className="bold">{`${nft?.name} `}</span>
                  <span className="bold">
                    from{' '}
                    {nft?.owner[0]?.username || nft?.owner[0]?.publicAddress}
                  </span>
                </p>
              </div>
              <div className="buy-detail-table">
                <div className="bid_options">
                  <p>
                    Minimum Bid is{' '}
                    <span className="bold">{`${nft?.minimumBid} `}</span>
                  </p>
                  <p>
                    Highest Bid is{' '}
                    <span className="bold">{`${getLastBid()} `}</span>
                  </p>
                  <div className="detailcheckout mt-4">
                    <div className="listcheckout">
                      <h6>Your bid ({nft?.priceToken[0]?.name || COIN})</h6>
                      <Field
                        type="number"
                        name="price"
                        id="item_price"
                        className="form-control"
                        placeholder={'Enter bid price'}
                      />
                      <ErrorMessage name="price">
                        {(msg) => <div className="error-form">{msg}</div>}
                      </ErrorMessage>
                    </div>
                  </div>
                </div>

                <div className="heading mt-3">
                  <p>Your balance</p>
                  <div className="subtotal">
                    {Number(balance).toFixed(8)}{' '}
                    {nft?.priceToken[0]?.name || COIN}
                  </div>
                </div>

                <div className="heading">
                  <p>Service fee 1%</p>
                  <div className="subtotal">
                    {getComission()} {nft?.priceToken[0]?.name || COIN}
                  </div>
                </div>
              </div>
              <div className="total-pay">
                <div className="heading">
                  <p>You will pay</p>
                  <div className="subtotal">
                    {getTotal()} {nft?.priceToken[0]?.name || COIN}
                  </div>
                </div>
              </div>
              <div className="detail_button">
                {placeBidState.loader ? (
                  <Loader />
                ) : (
                  !lastBid && (
                    <input
                      type="submit"
                      id="submit"
                      className="btn-main"
                      value="Place Bid"
                    />
                  )
                )}
              </div>
              {lastBid && !placeBidState.loader && (
                <div className="bid-transaction-info mt-3">
                  <h6>Your Bid is placed! Transaction Hash is:</h6>
                  <a
                    className="transaction-hash"
                    target="_blank"
                    rel="noreferrer"
                    href={`https://goerli.etherscan.io/tx/${lastBid.transactionHash}`}
                  >
                    {lastBid.transactionHash}
                  </a>
                </div>
              )}
              {placeBidState.error && (
                <Alert text={placeBidState.error} type={ALERT_TYPE.DANGER} />
              )}
            </div>
            <div className="col-md-5">
              <div className="buy-popup-image">
                <div className="buy-popup-img">
                  <img
                    className="img-fluid"
                    src={getImage(nft?.imageUrl)}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="buy-popup-imgdesc">
                  <h2>{nft?.name}</h2>
                  <p>{nft?.description}</p>
                  <div className="buy-popup-price">
                    {nft.price > 0 && (
                      <p className="item_detail_price">
                        <i>
                          <img src="./../../img/icon/price-pulse.png" />
                        </i>{' '}
                        <strong>
                          {nft?.price} {COIN}
                        </strong>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    );
  };

  const renderView = () => {
    if (!web3) {
      return (
        <Alert text={ERRORS.NOT_CONNECTED_TO_WALLET} type={ALERT_TYPE.DANGER} />
      );
    }
    if (dataState.loader) {
      return <Loader size={20} />;
    }
    if (dataState.error) {
      return <Alert text={dataState.error} type={ALERT_TYPE.DANGER} />;
    }
    return (
      <Formik
        initialValues={getInitialValue()}
        onSubmit={(values, actions) => {
          submit(values, actions.resetForm);
        }}
        render={displayBuyForm}
        validationSchema={buySchema}
      />
    );
  };

  return (
    <div className="maincheckout modal-style-1">
      <button className="btn-close" onClick={() => onClose(lastBid !== null)}>
        x
      </button>
      {renderView()}
    </div>
  );
};

export default memo(BuyPopUp);
