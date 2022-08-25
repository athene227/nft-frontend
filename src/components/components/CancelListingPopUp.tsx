import { Form, Formik, FormikProps } from 'formik';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from 'src/components/components/Loader';
import { ALERT_TYPE, COIN, ERRORS, MARKET_CONTRACT_EVENTS } from 'src/enums';
import { INft } from 'src/types/nfts.types';
import { getErrorMessage } from 'src/utils';
import * as Yup from 'yup';

import * as selectors from '../../store/selectors';
import Alert from './Alert';
import TransactionHash from './TransactionHash';

interface IProps {
  nft: INft;
  cancelListingState: { error: null | string; loader: boolean };
  onClose: (value: boolean) => void;
  submit: (values: any, resetForm: () => void) => void;
}

const CancelListingPopUp = (props: IProps) => {
  const { nft, onClose, submit, cancelListingState } = props;
  const [balanceState, setBalanceState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });
  const [balance, setBalance] = useState(0);
  const web3State = useSelector(selectors.web3State);
  const { web3, accounts } = web3State.web3.data;
  const nftEvents = useSelector(selectors.nftEvents);
  const cancelTransactionHash = nftEvents.find(
    ({
      eventName,
      tokenId,
      ownerAddress
    }: {
      eventName: string;
      tokenId: string;
      ownerAddress: string;
    }) =>
      (eventName === MARKET_CONTRACT_EVENTS.SimpleItemCancelled ||
        eventName === MARKET_CONTRACT_EVENTS.AuctionCancelled) &&
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
    return () => {
      // setBalance(0);
    };
  }, []);

  const getScheme = () => {
    return {};
  };

  const buySchema = Yup.object().shape(getScheme());

  const getInitialValue = () => {
    const result: any = {
      amount: 1
    };
    return result;
  };

  const displayCancelListingForm = ({
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
    const getAmountText = () => {
      if (nft?.multiple) {
        return `${nft?.listedAmount} pieces of`;
      } else {
        return '';
      }
    };
    return (
      <Form>
        <div className="heading">
          <h3>Cancel Listing</h3>
        </div>
        <p>
          You are about to get back {getAmountText()} your{' '}
          <span className="bold">{`${nft?.name} `}</span>
        </p>

        <div className="spacer-20"></div>

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
        {cancelTransactionHash && !cancelListingState.loader && (
          <TransactionHash hash={cancelTransactionHash} />
        )}
        {cancelListingState.loader ? (
          <Loader />
        ) : (
          cancelTransactionHash === undefined && (
            <input
              type="submit"
              id="submit"
              className="btn-main"
              value="Cancel Listing"
            />
          )
        )}

        {cancelListingState.error && (
          <Alert text={cancelListingState.error} type={ALERT_TYPE.DANGER} />
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
        render={displayCancelListingForm}
        validationSchema={buySchema}
      />
    );
  };

  return (
    <div className="maincheckout modal-style-1">
      <button
        className="btn-close"
        onClick={() => onClose(cancelTransactionHash !== undefined)}
      >
        x
      </button>
      {renderView()}
    </div>
  );
};

export default memo(CancelListingPopUp);
