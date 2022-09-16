import React, { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Field, Form, Formik, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  ALERT_TYPE,
  COIN,
  COMISSION_PERCENTAGE,
  ERRORS,
  INPUT_ERROS,
  MARKET_CONTRACT_EVENTS
} from 'src/enums';
import { INft, ISimpleMarketItem } from 'src/types/nfts.types';
import Loader from 'src/components/components/Loader';
import Alert from './Alert';
import * as selectors from '../../store/selectors';
import { getErrorMessage } from 'src/utils';
import { getSimpleMarketItem } from 'src/utils';
import TransactionHash from './TransactionHash';

interface IProps {
  nft: INft;
  placeBidState: { error: null | string; loader: boolean };
  multiple: boolean;
  onClose: (shouldRefresh: boolean) => void;
  submit: (values: any, resetForm: any) => void;
}

const BuyPopUp = (props: IProps) => {
  const { nft, onClose, submit, placeBidState, multiple } = props;
  const [userBalance, setUserBalance] = useState(0);
  const [dataState, setDataState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });

  const [marketItem, setSimpleMarketItem] = React.useState<ISimpleMarketItem>({
    nftContract: '',
    tokenId: '',
    price: '',
    originalQuantity: '',
    remainingQuantity: '',
    ownerAddress: ''
  });

  const web3State = useSelector(selectors.web3State);
  const { web3, accounts, nftMarketContract } = web3State.web3.data;
  const nftEvents = useSelector(selectors.nftEvents);

  const buyTransactionHash = nftEvents.find(
    ({ eventName, tokenId }: { eventName: string; tokenId: string }) =>
      eventName === MARKET_CONTRACT_EVENTS.BuySimpleEvent &&
      tokenId === nft.tokenId
  )?.transactionHash;

  const _getMyBalance = async () => {
    const wei_balance = await web3.eth.getBalance(accounts[0]);
    const eth_balance = web3.utils.fromWei(wei_balance, 'ether');
    return eth_balance;
  };

  const _getSimpleMarketItem = async () => {
    const marketItem = await getSimpleMarketItem({
      nftMarketContract,
      listingId: Number(nft.listingId)
    });
    return marketItem;
  };

  const _getData = async () => {
    try {
      if (!nft) return;
      setDataState({ loader: true, error: null });
      const _eth_balance = await _getMyBalance();
      const _marketItem = await _getSimpleMarketItem();
      setUserBalance(_eth_balance);
      setSimpleMarketItem(_marketItem);
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
          .lessThan(Number(marketItem.remainingQuantity) + 1)
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
      amount: 1
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
      if (!nft) return 0;
      if (isNaN(values.amount)) return 0;
      return (
        (Number(values.amount) * Number(nft.price) * COMISSION_PERCENTAGE) / 100
      );
    };

    const getTotal = (): number => {
      if (!nft) return 0;
      if (isNaN(values.amount)) return 0;
      return Number(values.amount) * Number(nft.price) + getComission();
    };
    console.log('buyTransactionHash in buy pop up', buyTransactionHash);

    return (
      <Form>
        <div className="heading">
          <h3>Buy nft</h3>
        </div>
        <p>
          You are about to purchase a{' '}
          <span className="bold">{`${nft?.name} `}</span>
          <span className="bold">
            from{' '}
            {nft?.owner[0]?.username ||
              nft?.owner[0]?.publicAddress ||
              nft?.ownerAddress}
          </span>
        </p>
        {multiple && <p>available: {marketItem.remainingQuantity}</p>}
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
          <div className="spacer-20"></div>
        )}

        <div className="heading mt-3">
          <p>Your balance</p>
          <div className="subtotal">
            {Number(userBalance).toFixed(8)} {COIN}
          </div>
        </div>

        <div className="heading">
          <p>Nft price</p>
          <div className="subtotal">
            {nft?.price} {COIN}
          </div>
        </div>
        <div className="heading">
          <p>Service fee 1%</p>
          <div className="subtotal">
            {getComission()} {COIN}
          </div>
        </div>
        <div className="heading">
          <p>You will pay</p>
          <div className="subtotal">
            {getTotal()} {COIN}
          </div>
        </div>
        {buyTransactionHash && <TransactionHash hash={buyTransactionHash} />}
        {placeBidState.loader ? (
          <Loader />
        ) : (
          buyTransactionHash === undefined && (
            <input
              type="submit"
              id="submit"
              className="btn-main"
              value="Buy Now"
            />
          )
        )}
        {placeBidState.error && (
          <Alert text={placeBidState.error} type={ALERT_TYPE.DANGER} />
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
    <div className="maincheckout">
      <button
        className="btn-close"
        onClick={() => onClose(buyTransactionHash !== undefined)}
      >
        x
      </button>
      {renderView()}
    </div>
  );
};

export default memo(BuyPopUp);
