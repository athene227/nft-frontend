import { Form, Formik, FormikProps } from 'formik';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from 'src/components/Loader';
import { ALERT_TYPE, COIN, ERRORS, MARKET_CONTRACT_EVENTS } from 'src/enums';
import { getImage } from 'src/services/ipfs';
import { INft } from 'src/types/nfts.types';
import { getErrorMessage } from 'src/utils';
import * as Yup from 'yup';

import * as selectors from '../store/selectors';
import Alert from './Alert';
import TransactionHash from './TransactionHash';

interface IProps {
  nft: INft | undefined;
  cancelOfferState: {
    error: null | string;
    loader: boolean;
    selectedOffer: any | null;
  };
  multiple: boolean;
  onClose: (shouldRefresh: boolean) => void;
  submit: (offer: any, resetForm: any) => void;
}

const CancelOfferPopUp = (props: IProps) => {
  const { nft, cancelOfferState, multiple, onClose, submit } = props;
  const [balanceState, setBalanceState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });
  const [balance, setBalance] = useState(0);
  const web3State = useSelector(selectors.web3State);
  const { web3, accounts } = web3State.web3.data;
  const nftEvents = useSelector(selectors.nftEvents);
  const cancelOfferTransactionHash = nftEvents.find(
    ({
      eventName,
      offerId,
      ownerAddress
    }: {
      eventName: string;
      offerId: string;
      ownerAddress: string;
    }) =>
      eventName === MARKET_CONTRACT_EVENTS.OfferCancelled &&
      offerId === cancelOfferState.selectedOffer.offerId &&
      ownerAddress === cancelOfferState.selectedOffer.offererAddress
  )?.transactionHash;

  const getScheme = () => {
    return {};
  };

  const buySchema = Yup.object().shape(getScheme());

  const getInitialValue = () => {
    const result: any = {};
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
    return (
      <Form>
        <div className="modal-header">
          <div className="heading">
            {/* <h5 className='modal-title'>Buy nft</h5> */}
            <h5 className="modal-title">Cancel Offer</h5>
          </div>
          <button className="btn-close">x</button>
        </div>
        <div className="modal-content">
          <div className="row">
            <div className="col-md-7">
              <div className="form-header">
                <p>
                  You are about to cancel your offer for {` `}
                  <span className="bold">{`${nft?.name}`}</span>
                </p>
              </div>
              <div className="buy-detail-table cancel-listing-table">
                <div className="heading mt-3">
                  <p>Your offer amount</p>
                  <div className="subtotal">
                    {Number(cancelOfferState.selectedOffer.amount).toFixed(8)}{' '}
                    {cancelOfferState.selectedOffer.pricetoken[0]?.name}
                  </div>
                </div>

                <div className="detail_button">
                  {cancelOfferTransactionHash && !cancelOfferState.loader && (
                    <TransactionHash hash={cancelOfferTransactionHash} />
                  )}
                  {cancelOfferState.loader ? (
                    <Loader />
                  ) : (
                    cancelOfferTransactionHash === undefined && (
                      <input
                        type="submit"
                        id="submit"
                        className="btn-main btn-grad"
                        value="Cancel Offer"
                      />
                    )
                  )}

                  {cancelOfferState.error && (
                    <Alert
                      text={cancelOfferState.error}
                      type={ALERT_TYPE.DANGER}
                    />
                  )}
                </div>
              </div>
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
          submit(cancelOfferState.selectedOffer, actions.resetForm);
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
        onClick={() => onClose(cancelOfferTransactionHash !== undefined)}
      >
        x
      </button>
      {renderView()}
    </div>
  );
};

export default memo(CancelOfferPopUp);
