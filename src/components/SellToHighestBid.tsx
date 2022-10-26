import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from 'src/components/Loader';
import { ALERT_TYPE, COIN, COMISSION_PERCENTAGE, INPUT_ERROS } from 'src/enums';
import { IBid } from 'src/types/bids.types';
import { INft } from 'src/types/nfts.types';
import { getErrorMessage } from 'src/utils';
import { createGlobalStyle } from 'styled-components';
import * as Yup from 'yup';

import * as selectors from '../store/selectors';
import Alert from './Alert';

const GlobalStyles = createGlobalStyle`
.heading h3, .description h3{
  color: #333;
}
`;
interface IProps {
  nft: INft;
  highestBid: IBid;
  onClose: () => void;
  submit: () => void;
  sellToHighestBidState: { error: null | string; loader: boolean };
}

const SignupSchema = Yup.object().shape({
  price: Yup.number().required(INPUT_ERROS.requiredField)
});

const BuyPopUp = (props: IProps) => {
  const { nft, onClose, submit, sellToHighestBidState, highestBid } = props;

  return (
    <div className="maincheckout">
      <button className="btn-close" onClick={onClose}>
        x
      </button>
      <div className="heading">
        <h3>Sell to the highest bid</h3>
      </div>
      <p>
        You are about to sell a <span className="bold">{`${nft.name} `}</span>
        <span className="bold">to {highestBid.buyer[0].username}</span>
      </p>
      <div className="detailcheckout mt-4">
        <div className="listcheckout">
          <h6>His bid ({COIN})</h6>
          <h6>{highestBid.price}</h6>
        </div>
      </div>

      <div className="heading">
        <p>You will get</p>
        <div className="subtotal">
          {highestBid.price} {COIN}
        </div>
      </div>
      {sellToHighestBidState.loader ? (
        <Loader />
      ) : (
        <input
          type="submit"
          id="submit"
          className="btn-main"
          value="Sell to the highest bid"
          onClick={submit}
        />
      )}

      {sellToHighestBidState.error && (
        <Alert text={sellToHighestBidState.error} type={ALERT_TYPE.DANGER} />
      )}
    </div>
  );
};

export default memo(BuyPopUp);
