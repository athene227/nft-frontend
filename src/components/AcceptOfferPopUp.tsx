/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from 'src/components/Loader';
import {
  ALERT_TYPE,
  COIN,
  COMISSION_PERCENTAGE,
  ERRORS,
  INPUT_ERROS,
  MARKET_CONTRACT_EVENTS
} from 'src/enums';
import { getImage } from 'src/services/ipfs';
import { INft } from 'src/types/nfts.types';
import { IOffer } from 'src/types/offers.types';
import { getErrorMessage } from 'src/utils';
import * as Yup from 'yup';

import * as selectors from '../store/selectors';
import Alert from './Alert';
import TransactionHash from './TransactionHash';

interface IProps {
  nft: INft | undefined;
  acceptOfferState: {
    error: null | string;
    loader: boolean;
    selectedOffer: any | null;
  };
  multiple: boolean;
  onClose: (shouldRefresh: boolean) => void;
  submit: (offer: any, acceptedAmount: number, resetForm: any) => void;
}

const AcceptOfferPopUp = (props: IProps) => {
  const { nft, onClose, submit, acceptOfferState, multiple } = props;
  console.log(
    '🚀 ~ file: AcceptOfferPopUp.tsx ~ line 38 ~ AcceptOfferPopUp ~ nft',
    nft
  );
  const [userBalance, setUserBalance] = useState(0);
  const [dataState, setDataState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });

  const web3State = useSelector(selectors.web3State);
  const { web3, accounts } = web3State.web3.data;
  const nftEvents = useSelector(selectors.nftEvents);
  const userAddress = accounts[0];

  const acceptofferTransactionHash = nftEvents.find(
    ({
      eventName,
      tokenId,
      nftAddress
    }: {
      eventName: string;
      tokenId: string;
      nftAddress: string;
    }) =>
      eventName === MARKET_CONTRACT_EVENTS.OfferAccepted &&
      tokenId === nft?.tokenId &&
      nftAddress === nft?.nftAddress
  )?.transactionHash;

  const _getMyBalance = async () => {
    const wei_balance = await web3.eth.getBalance(userAddress);
    const eth_balance = web3.utils.fromWei(wei_balance, 'ether');
    return eth_balance;
  };

  const _getData = async () => {
    try {
      if (!nft) return;
      setDataState({ loader: true, error: null });
      const _eth_balance = await _getMyBalance();
      setUserBalance(_eth_balance);
      setDataState({ loader: false, error: null });
    } catch (error) {
      console.log('error in getData in buy popup');
      setDataState({ loader: false, error: getErrorMessage(error) });
    }
  };

  useEffect(() => {
    _getData();
  }, []);

  const getScheme = () => {
    if (nft?.multiple) {
      return {
        amount: Yup.number()
          .typeError('you must specify a number')
          .moreThan(0, INPUT_ERROS.tooShort)
          .lessThan(Number(acceptOfferState.selectedOffer?.quantity) + 1)
          .required(INPUT_ERROS.requiredField)
      };
    } else {
      return {
        amount: Yup.number()
          .typeError('you must specify a number')
          .moreThan(0, INPUT_ERROS.tooShort)
          .required(INPUT_ERROS.requiredField)
      };
    }
  };

  const buySchema = Yup.object().shape(getScheme());

  const getInitialValue = () => {
    const result: any = {
      amount: Number(acceptOfferState.selectedOffer?.quantity)
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
  }: FormikProps<{ amount: number }>) => {
    const getComission = (): number => {
      if (!nft || !acceptOfferState.selectedOffer) return 0;
      if (isNaN(acceptOfferState.selectedOffer?.amount)) return 0;
      return (
        (Number(values.amount) *
          Number(acceptOfferState.selectedOffer?.amount) *
          COMISSION_PERCENTAGE) /
        100
      );
    };

    const getTotal = (): number => {
      if (!nft || !acceptOfferState.selectedOffer) return 0;
      if (isNaN(values.amount)) return 0;
      return (
        Number(values.amount) * Number(acceptOfferState.selectedOffer?.amount) +
        getComission()
      );
    };

    return (
      <div>
        <div className="modal-header">
          <div className="heading">
            {/* <h5 className='modal-title'>Buy nft</h5> */}
            <h5 className="modal-title">Accept Offer</h5>
          </div>
          <button
            className="btn-close"
            onClick={() => onClose(acceptofferTransactionHash !== undefined)}
          >
            x
          </button>
        </div>
        <div className="modal-content">
          <div className="row">
            <div className="col-md-7">
              <Form>
                <div className="form-header">
                  <p>
                    You are about to accept an offer to{' '}
                    <span className="bold">{`${nft?.name} `}</span>
                    <span className="bold">
                      from{' '}
                      {nft?.owner[0]?.username ||
                        nft?.owner[0]?.publicAddress ||
                        nft?.ownerAddress}
                    </span>
                  </p>
                </div>
                <div className="buy-detail-table">
                  {multiple ? (
                    <div className="detailcheckout mt-4">
                      <div className="listcheckout">
                        <h6>Quantity</h6>
                        <Field
                          type="number"
                          name="amount"
                          id="item_amount"
                          className="form-control"
                          placeholder={'Enter amount'}
                          min="1"
                          step="1"
                        />
                        <ErrorMessage name="amount">
                          {(msg) => <div className="error-form">{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}

                  <div className="heading">
                    <p>Offer price</p>
                    <div className="subtotal">
                      {acceptOfferState.selectedOffer?.amount}{' '}
                      {acceptOfferState.selectedOffer?.pricetoken[0]?.name ||
                        COIN}
                    </div>
                  </div>
                  <div className="heading">
                    <p>Service fee 1%</p>
                    <div className="subtotal">
                      {getComission()}{' '}
                      {acceptOfferState.selectedOffer?.pricetoken[0]?.name ||
                        COIN}
                    </div>
                  </div>
                </div>
                <div className="total-pay">
                  <div className="heading">
                    <p>Total Earnings</p>
                    <div className="subtotal">
                      {getTotal()}{' '}
                      {acceptOfferState.selectedOffer?.pricetoken[0]?.name ||
                        COIN}
                    </div>
                  </div>
                </div>
                <div className="detail_button">
                  {acceptofferTransactionHash && !acceptOfferState.loader && (
                    <TransactionHash hash={acceptofferTransactionHash} />
                  )}
                  {acceptOfferState.loader ? (
                    <Loader />
                  ) : (
                    acceptofferTransactionHash === undefined &&
                    nft?.ownerAddress === userAddress && (
                      <input
                        type="submit"
                        id="submit"
                        className="btn-main"
                        value="Accept Offer"
                      />
                    )
                  )}
                  {acceptOfferState.error && (
                    <Alert
                      text={acceptOfferState.error}
                      type={ALERT_TYPE.DANGER}
                    />
                  )}
                </div>
              </Form>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          submit(
            acceptOfferState.selectedOffer,
            values.amount,
            actions.resetForm
          );
        }}
        render={displayBuyForm}
        validationSchema={buySchema}
      />
    );
  };

  return <div className="maincheckout modal-style-1">{renderView()}</div>;
};

export default memo(AcceptOfferPopUp);
