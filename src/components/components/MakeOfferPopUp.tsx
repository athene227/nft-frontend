/* eslint-disable @typescript-eslint/no-explicit-any */
// import { createGlobalStyle } from 'styled-components';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Loader from 'src/components/components/Loader';
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
import { getErrorMessage } from 'src/utils';
import * as Yup from 'yup';

import * as selectors from '../../store/selectors';
import Alert from './Alert';
import { ApiService } from '../../core/axios';
import { IPriceToken } from 'src/types/priceTokens.types';
import TransactionHash from './TransactionHash';

// const GlobalStyles = createGlobalStyle`
// .heading h3, .description h3{
//   color: #333;
// }
// `;
interface IProps {
  nft: INft;
  onClose: (value: boolean) => void;
  submit: (values: any, resetForm: () => void) => void;
  makeOfferState: { error: null | string; loader: boolean };
}

const MakeOfferPopUp = (props: IProps) => {
  const { nft, onClose, submit, makeOfferState } = props;
  const [balance, setBalance] = useState(0);
  const [currentPriceTokenType, setCurrentPriceTokenType] = useState('');
  const [priceTokens, setPriceTokens] = useState<Array<IPriceToken>>([]);
  const [dataState, setDataState] = useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });

  const web3State = useSelector(selectors.web3State);
  const { web3, accounts } = web3State.web3.data;
  const nftEvents = useSelector(selectors.nftEvents);

  const userAddress = accounts[0];
  console.log(
    '🚀 ~ file: MakeOfferPopUp.tsx ~ line 54 ~ MakeOfferPopUp ~ userAddress',
    userAddress
  );

  const offerTransactionHash = nftEvents.find(
    ({
      eventName,
      tokenId,
      nftAddress,
      offererAddress
    }: {
      eventName: string;
      tokenId: string;
      nftAddress: string;
      offererAddress: string;
    }) =>
      eventName === MARKET_CONTRACT_EVENTS.OfferCreated &&
      tokenId === nft.tokenId &&
      nftAddress === nft.nftAddress &&
      offererAddress === userAddress
  )?.transactionHash;

  const _getMyBalance = async () => {
    const wei_balance = await web3.eth.getBalance(accounts[0]);
    const eth_balance = web3?.utils.fromWei(wei_balance, 'ether');
    return eth_balance;
  };

  const _getData = async (isUpdate = false) => {
    try {
      if (!nft) return;
      setDataState({ loader: !isUpdate, error: null });

      const _eth_balance = await _getMyBalance();
      setBalance(_eth_balance);
      setDataState({ loader: false, error: null });
    } catch (error) {
      console.log('error in getData in place bid popup');
      setDataState({ loader: false, error: getErrorMessage(error) });
    }
  };

  useEffect(() => {
    const isUpdate = false;
    _getData(isUpdate);
  }, []);

  useEffect(() => {
    const getPriceTokens = async () => {
      const res = await ApiService.getPriceTokens();
      const pricetokens = res.data as Array<IPriceToken>;
      setPriceTokens(pricetokens);
      setCurrentPriceTokenType(pricetokens[0]?.name);
    };
    getPriceTokens();
  }, []);

  const offerSchema = Yup.object().shape({
    quantity: Yup.number()
      .typeError('you must specify a number')
      .moreThan(0, INPUT_ERROS.higherThanZero),
    price: Yup.number()
      .typeError('you must specify a number')
      .moreThan(0, INPUT_ERROS.higherThanZero)
      .required(INPUT_ERROS.requiredField),
    expirationDates: Yup.string(),
    expirationDay: Yup.date().when('expirationDates', {
      is: (expirationDates: any) => expirationDates === '0',
      then: Yup.date()
        .min(moment(new Date()).add(1, 'hours'), INPUT_ERROS.oneHourMinimun)
        .required(INPUT_ERROS.requiredField)
    })
  });

  const getInitialValue = () => {
    const result: any = {
      quantity: 1,
      price: 0,
      expirationDates: '1',
      pricetokentype: priceTokens[0]?.name || 'MRT'
    };
    return result;
  };

  const displayOfferForm = ({
    values,
    setFieldValue
  }: FormikProps<{
    price: number;
    quantity: number;
    expirationDates: string;
    expirationDay: Date;
    pricetokentype: string;
  }>) => {
    const [isDateTimeInputDisabled, setDateTimeInputDisable] = useState(true);
    const onChangePriceTokenType = (e: any) => {
      setFieldValue('pricetokentype', e.target.value);
      setCurrentPriceTokenType(e.target.value);
      console.log(e.target.value);
    };
    const onChangeOfferDateList = (e: any) => {
      setFieldValue('expirationDates', e.target.value);
      e.target.value === '0'
        ? setDateTimeInputDisable(false)
        : setDateTimeInputDisable(true);
      console.log(e.target.value);
    };
    const onChangeExpirationDateInput = (e: any) => {
      setFieldValue('expirationDay', e.target.value);
      console.log(
        '🚀 ~ file: MakeOfferPopUp.tsx ~ line 118 ~ onChangeExpirationDateInput ~ e.target.value',
        e.target.value
      );
    };
    const getComission = (): number => {
      if (!values.price) return 0;
      return (Number(values.price) * COMISSION_PERCENTAGE) / 100;
    };
    const getTotal = (): number => {
      if (!values.price) return 0;
      return Number(values.price) + getComission();
    };

    const pricetokenSelectComponent = (props: any) => {
      // setTokenType(priceTokens[0]?.name);
      return (
        <select id="pet-select" {...props}>
          {priceTokens?.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      );
    };

    const expirationdaysSelectComponent = (props: any) => {
      const list = [
        { name: '1 day', value: 1 },
        { name: '3 days', value: 3 },
        { name: '7 days', value: 7 },
        { name: '1 month', value: 31 },
        { name: 'Custom date', value: 0 }
      ];

      return (
        <select id="pet-select" {...props}>
          {list.map((item) => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      );
    };

    return (
      <Form>
        <div className="modal-header">
          <h5 className="modal-title">Make an Offer</h5>
          <button
            className="btn-close"
            onClick={() => onClose(offerTransactionHash !== undefined)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-content">
          <div className="row">
            <div className="col-md-7">
              <div className="form-header">
                <p>
                  You are about to offer a{' '}
                  <span className="bold">{`${nft?.name} `}</span>
                  <span className="bold">
                    from{' '}
                    {nft?.owner[0]?.username || nft?.owner[0]?.publicAddress}
                  </span>
                </p>
              </div>
              <div className="buy-detail-table">
                <div className="bid_options">
                  <div className="detailcheckout mt-4">
                    <div className="listcheckout">
                      {nft?.multiple && (
                        <>
                          <h6>Quantity</h6>
                          <Field
                            type="number"
                            name="quantity"
                            className="form-control"
                            placeholder={'Enter quantity'}
                          />
                          <ErrorMessage name="quantity">
                            {(msg) => <div className="error-form">{msg}</div>}
                          </ErrorMessage>
                        </>
                      )}

                      <h6>Your offer ({currentPriceTokenType || COIN})</h6>
                      <div className="row">
                        <div className="col-4">
                          <Field
                            name="pricetokentype"
                            as={pricetokenSelectComponent}
                            placeholder="PriceTokenType"
                            className={`form-control`}
                            onChange={onChangePriceTokenType}
                          />
                        </div>
                        <div className="col-8">
                          <Field
                            type="number"
                            name="price"
                            className="form-control"
                            placeholder={'Enter offer price'}
                          />
                        </div>
                      </div>
                      <ErrorMessage name="price">
                        {(msg) => <div className="error-form">{msg}</div>}
                      </ErrorMessage>
                      <h6>Offer Expiration</h6>
                      <div className="row">
                        <div className="col-4">
                          <Field
                            name="expirationDates"
                            as={expirationdaysSelectComponent}
                            placeholder="expirationDates"
                            className={`form-control`}
                            onChange={onChangeOfferDateList}
                          />
                        </div>
                        <div className="col-8">
                          <Field
                            type="datetime-local"
                            name="expirationDay"
                            disabled={isDateTimeInputDisabled}
                            className={`form-control input__holder__single`}
                            onChange={onChangeExpirationDateInput}
                            min={moment().add(1, 'hours')}
                          />
                        </div>
                      </div>
                      <ErrorMessage name="expirationDay">
                        {(msg) => <div className="error-form">{msg}</div>}
                      </ErrorMessage>
                    </div>
                  </div>
                </div>

                <div className="heading mt-3">
                  <p>Your balance</p>
                  <div className="subtotal">
                    {Number(balance).toFixed(8)} {currentPriceTokenType || COIN}
                  </div>
                </div>

                <div className="heading">
                  <p>Service fee 1%</p>
                  <div className="subtotal">
                    {getComission()} {currentPriceTokenType || COIN}
                  </div>
                </div>
              </div>
              <div className="total-pay">
                <div className="heading">
                  <p>You will pay</p>
                  <div className="subtotal">
                    {getTotal()} {currentPriceTokenType || COIN}
                  </div>
                </div>
              </div>
              <div className="detail_button">
                {offerTransactionHash && !makeOfferState.loader && (
                  <TransactionHash hash={offerTransactionHash} />
                )}
                {makeOfferState.loader ? (
                  <Loader />
                ) : (
                  offerTransactionHash === undefined && (
                    <input
                      type="submit"
                      id="submit"
                      className="btn-main"
                      value="Make Offer"
                    />
                  )
                )}
              </div>
              {makeOfferState.error && (
                <Alert text={makeOfferState.error} type={ALERT_TYPE.DANGER} />
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
          let pricetokenaddress = '';
          priceTokens.forEach((item) => {
            if (item.name === values.pricetokentype)
              pricetokenaddress = item.address;
          });
          submit({ ...values, pricetokenaddress }, actions.resetForm);
        }}
        render={displayOfferForm}
        validationSchema={offerSchema}
      />
    );
  };

  return (
    <div className="maincheckout modal-style-1">
      <button
        className="btn-close"
        onClick={() => onClose(offerTransactionHash !== undefined)}
      >
        x
      </button>
      {renderView()}
    </div>
  );
};

export default memo(MakeOfferPopUp);
