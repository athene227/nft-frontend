import React, { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import { ALERT_TYPE, COIN, ERRORS, MARKET_CONTRACT_EVENTS } from 'src/enums';
import { INft } from 'src/types/nfts.types';
import { getErrorMessage } from 'src/utils';
import Loader from 'src/components/components/Loader';
import * as selectors from '../../../store/selectors';
import Alert from '../Alert';
import TransactionHash from '../TransactionHash';

interface IProps {
  nft: INft;
  terminateAuctionState: { error: null | string; loader: boolean };
  onClose: (value: boolean) => void;
  submit: (values: unknown, resetForm: unknown) => void;
}

const TerminateAuctionPopUp = (props: IProps) => {
  const { nft, onClose, submit, terminateAuctionState } = props;
  const [balanceState, setBalanceState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });
  const [balance, setBalance] = useState(0);
  const web3State = useSelector(selectors.web3State);
  const { web3, accounts } = web3State.web3.data;
  const nftEvents = useSelector(selectors.nftEvents);
  const terminateTransactionHash = nftEvents.find(
    ({
      eventName,
      tokenId,
      listingId
    }: {
      eventName: string;
      tokenId: string;
      listingId: string;
    }) =>
      eventName === MARKET_CONTRACT_EVENTS.TerminateAuctionEvent &&
      tokenId === nft.tokenId &&
      listingId === nft.listingId
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

  const getInitialValue = () => {
    const result = {
      amount: 1
    };
    return result;
  };

  const displayCancelListingForm = () => {
    return (
      <Form>
        <div className="heading">
          <h3>Terminate Auction</h3>
        </div>
        <p>
          You are about to terminate Auction item:{' '}
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
        {terminateTransactionHash && (
          <TransactionHash hash={terminateTransactionHash} />
        )}
        {terminateAuctionState.loader ? (
          <Loader />
        ) : (
          terminateTransactionHash === undefined && (
            <input
              type="submit"
              id="submit"
              className="btn-main"
              value="Teminate Auction"
            />
          )
        )}

        {terminateAuctionState.error && (
          <Alert text={terminateAuctionState.error} type={ALERT_TYPE.DANGER} />
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
      />
    );
  };

  return (
    <div className="maincheckout">
      <button
        className="btn-close"
        onClick={() => onClose(terminateTransactionHash !== undefined)}
      >
        x
      </button>
      {renderView()}
    </div>
  );
};

export default memo(TerminateAuctionPopUp);
