import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Loader from 'src/components/components/Loader';
import { ALERT_TYPE, INPUT_ERROS } from 'src/enums';
import { INft } from 'src/types/nfts.types';
import { IPriceToken } from 'src/types/priceTokens.types';
import * as Yup from 'yup';

import { ApiService } from '../../core/axios';
import Alert from './Alert';
interface IProps {
  nft: INft;
  submit: (values: any, resetForm: () => void) => void;
  setMinimumBidInput: (val: string) => void;
  setTokenType: (val: string) => void;
  setExpirationDateInput: (val: string) => void;
  submitSaleState: { error: null | string; loading: boolean };
}

export default function AuctionSaleForm(props: IProps) {
  const {
    nft,
    submit,
    submitSaleState,
    setExpirationDateInput,
    setMinimumBidInput,
    setTokenType
  } = props;

  const [priceTokens, setPriceTokens] = useState<Array<IPriceToken>>([]);

  useEffect(() => {
    const getPriceTokens = async () => {
      const res = await ApiService.getPriceTokens();
      const pricetokens = res.data as Array<IPriceToken>;
      setPriceTokens(pricetokens);
      setTokenType(pricetokens[0].name);
    };
    getPriceTokens();
  }, []);

  const SignupSchema = Yup.object().shape({
    minimumBid: Yup.number()
      .moreThan(0, INPUT_ERROS.tooShort)
      .required(INPUT_ERROS.requiredField),
    expirationDate: Yup.date()
      .min(moment(new Date()).add(1, 'minutes'), INPUT_ERROS.oneHourMinimun)
      .required(INPUT_ERROS.requiredField),
    // price: Yup.number().required(INPUT_ERROS.requiredField),
    royalties: Yup.number().max(25)
  });

  const getInitialValue = () => {
    const result = {
      minimumBid: '',
      expirationDate: '',
      price: '',
      royalties: '',
      pricetokentype: 'MTK'
    };
    return result;
  };

  const royaltiesComponent = (props: any) => (
    <select id="pet-select" {...props}>
      <option value={0}>0</option>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={15}>15</option>
      <option value={20}>20</option>
      <option value={25}>25</option>
    </select>
  );

  const displayAuctionForm = ({
    handleSubmit,
    values,
    submitCount,
    setValues,
    setFieldValue,
    errors,
    touched,
    handleChange,
    getFieldProps
  }: FormikProps<any>) => {
    const onChangeMinimumBid = (e: any) => {
      setFieldValue('minimumBid', e.target.value);
      setMinimumBidInput && setMinimumBidInput(e.target.value);
    };

    const onChangExpirationDate = (e: any) => {
      setFieldValue('expirationDate', e.target.value);
      setExpirationDateInput && setExpirationDateInput(e.target.value);
    };

    const onChangePriceTokenType = (e: any) => {
      setFieldValue('pricetokentype', e.target.value);
      setTokenType && setTokenType(e.target.value);
    };

    const pricetokenSelectComponent = (props: any) => {
      setTokenType(priceTokens[0]?.name);
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

    return (
      <Form onSubmit={handleSubmit}>
        <div style={{ marginTop: 150 }}>
          <h5>Minimum bid</h5>
          <div className="row">
            <div className="col-9">
              <Field
                type="text"
                name="minimumBid"
                id="item_price_bid"
                className={`form-control`}
                placeholder="Enter minimum bid"
              />
            </div>
            <div className="col-3">
              <Field
                name="pricetokentype"
                as={pricetokenSelectComponent}
                placeholder="PriceTokenType"
                className={`form-control`}
                onChange={onChangePriceTokenType}
              />
            </div>
          </div>
          <ErrorMessage name="minimumBid">
            {(msg) => <div className="error-form">{msg}</div>}
          </ErrorMessage>

          <div className="spacer-10"></div>

          <h5>Expiration date</h5>
          <Field
            type="datetime-local"
            name="expirationDate"
            id="bid_expiration_date"
            className="form-control"
            onChange={onChangExpirationDate}
            min={moment().add(1, 'hours')}
          />
          <ErrorMessage name="expirationDate">
            {(msg) => <div className="error-form">{msg}</div>}
          </ErrorMessage>

          <div className="spacer-10"></div>

          <div className="spacer-10"></div>

          {/* <h5>Royalties</h5>
                <Field type="text" name="item_royalties" id="item_royalties" className="form-control" placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%" />
                <ErrorMessage name="item_royalties" /> */}

          {!nft?.isListedOnce && (
            <div>
              <h5>Royalties</h5>
              <Field
                name="royalties"
                as={royaltiesComponent}
                placeholder="First Name"
                className="form-control"
              />
              <ErrorMessage name="royalties">
                {(msg) => <div className="error-form">{msg}</div>}
              </ErrorMessage>

              <div className="spacer-10"></div>
            </div>
          )}
          {submitSaleState.loading ? (
            <Loader />
          ) : (
            <input
              type="submit"
              id="submit"
              className="btn-main"
              value="SELL"
            />
          )}
          <div className="spacer-10"></div>
          {submitSaleState.error && (
            <Alert text={submitSaleState.error} type={ALERT_TYPE.DANGER} />
          )}
        </div>
      </Form>
    );
  };

  return (
    <Formik
      initialValues={getInitialValue()}
      onSubmit={(values, actions) => {
        submit(values, actions.resetForm);
      }}
      render={displayAuctionForm}
      validationSchema={SignupSchema}
    ></Formik>
  );
}
