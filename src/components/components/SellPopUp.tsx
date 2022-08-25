// import { createGlobalStyle } from 'styled-components';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from 'src/components/components/Loader';
import {
  ALERT_TYPE,
  COIN,
  ERRORS,
  INPUT_ERROS,
  MARKET_CONTRACT_EVENTS
} from 'src/enums';
import { INft } from 'src/types/nfts.types';
import { getErrorMessage } from 'src/utils';
import * as Yup from 'yup';

import * as selectors from '../../store/selectors';
import Alert from './Alert';
import TransactionHash from './TransactionHash';

interface IProps {
  nft: INft;
  onClose: (value: boolean) => void;
  submit: (values: any, resetForm: () => void) => void;
  sellState: { error: null | string; loader: boolean };
}

const SellPopUp = (props: IProps) => {
  const { nft, onClose, submit, sellState } = props;
  const [balance, setBalance] = useState(0);
  const [balanceState, setBalanceState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });
  const web3State = useSelector(selectors.web3State);
  const { web3, accounts } = web3State.web3.data;
  const nftEvents = useSelector(selectors.nftEvents);
  const listingTransactionHash = nftEvents.find(
    ({
      eventName,
      tokenId,
      ownerAddress
    }: {
      eventName: string;
      tokenId: string;
      ownerAddress: string;
    }) =>
      eventName === MARKET_CONTRACT_EVENTS.SimpleItemCreated &&
      tokenId === nft.tokenId &&
      ownerAddress === nft.ownerAddress
  )?.transactionHash;

  const getMyBalance = async () => {
    try {
      setBalanceState({ loader: true, error: null });
      const wei_balance = await web3.eth.getBalance(accounts[0]);
      const eth_balance = await web3.utils.fromWei(wei_balance, 'ether');
      setBalance(eth_balance);
      setBalanceState({ loader: false, error: null });
    } catch (error) {
      setBalanceState({ loader: false, error: getErrorMessage(error) });
    }
  };
  useEffect(() => {
    getMyBalance();
  }, []);

  const getScheme = () => {
    if (nft?.multiple) {
      return {
        price: Yup.number()
          .required(INPUT_ERROS.requiredField)
          .typeError('you must specify a number')
          .moreThan(0, INPUT_ERROS.tooShort),
        numberOfCopies: Yup.number()
          .required(INPUT_ERROS.requiredField)
          .typeError('you must specify a number')
          .moreThan(0, INPUT_ERROS.tooShort)
          .lessThan(nft.leftAmount + 1, INPUT_ERROS.numberIsHigher)
      };
    } else {
      return {
        price: Yup.number()
          .required(INPUT_ERROS.requiredField)
          .typeError('you must specify a number')
          .moreThan(0, INPUT_ERROS.tooShort),
        numberOfCopies: Yup.number()
          .required(INPUT_ERROS.requiredField)
          .typeError('you must specify a number')
          .moreThan(0, INPUT_ERROS.tooShort)
      };
    }
  };

  const buySchema = Yup.object().shape(getScheme());

  const getInitialValue = () => {
    const result: any = {
      price: 0,
      numberOfCopies: 0
    };
    return result;
  };

  const displaySellForm = ({
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
    return (
      <Form>
        <div className="heading">
          <h3>Sell</h3>
        </div>
        <p>
          You are about to sell a{' '}
          <span className="bold">{`${nft?.name} `}</span>
        </p>
        <p>available: {nft?.leftAmount}</p>
        <div className="detailcheckout mt-4">
          <div className="listcheckout">
            <h6>Your price for one piece ({COIN})</h6>
            <Field
              type="number"
              name="price"
              id="item_price"
              className="form-control"
              placeholder={'Enter price'}
            />
            <ErrorMessage name="price">
              {(msg) => <div className="error-form">{msg}</div>}
            </ErrorMessage>
          </div>
        </div>
        <div className="detailcheckout mt-4">
          <div className="listcheckout">
            <h6>Number of copies</h6>
            <Field
              type="number"
              name="numberOfCopies"
              id="item_price"
              className="form-control"
              placeholder={'Enter Number of copies'}
              min="1"
              step="1"
            />
            <ErrorMessage name="numberOfCopies">
              {(msg) => <div className="error-form">{msg}</div>}
            </ErrorMessage>
          </div>
        </div>

        <div className="heading mt-3">
          <p>Your balance</p>
          {balanceState.loader ? (
            <Loader size={20} />
          ) : (
            <div className="subtotal">
              {Number(balance).toFixed(8)} {COIN}
            </div>
          )}
        </div>

        {listingTransactionHash && !sellState.loader && (
          <TransactionHash hash={listingTransactionHash} />
        )}
        {sellState.loader ? (
          <Loader />
        ) : (
          listingTransactionHash === undefined && (
            <input
              type="submit"
              id="submit"
              className="btn-main"
              value="Sell"
            />
          )
        )}
        {sellState.error && (
          <Alert text={sellState.error} type={ALERT_TYPE.DANGER} />
        )}
      </Form>
    );
  };

  const renderView = () => {
    if (!web3) {
      return (
        <Alert text={ERRORS.NOT_CONNECTED_TO_WALLET} type={ALERT_TYPE.DANGER} />
      );
    }
    return (
      <Formik
        initialValues={getInitialValue()}
        onSubmit={(values, actions) => {
          submit(values, actions.resetForm);
        }}
        render={displaySellForm}
        validationSchema={buySchema}
      />
    );
  };
  return (
    <div className="maincheckout">
      <button
        className="btn-close"
        onClick={() => onClose(listingTransactionHash !== undefined)}
      >
        x
      </button>
      {renderView()}
    </div>
  );
};

export default memo(SellPopUp);
