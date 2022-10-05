import Tooltip from '@mui/material/Tooltip';
import { Field } from 'formik';
import { Switch } from 'formik-material-ui';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { BsInfo, BsInfoCircleFill } from 'react-icons/bs';
import InputField from 'src/components/components/Input/InputField';
import Loader from 'src/components/components/Loader';
import { ALERT_TYPE, COIN, MARKET_TYPE } from 'src/enums';

import { ReactComponent as IconInfo } from '../../../../../assets/images/icon/info.svg';
import ExpirationDate from './expirationDate';
import InputRadio from './InputRadio';
import NftType from './nftType';

function ListOnMarketPlace(props: any) {
  const {
    price,
    minimumBid,
    marketType,
    submitCreateState,
    setPriceInput,
    setMinimumBidInput,
    onTab,
    setFieldValue,
    setExpirationDate,
    isSingle,
    starttime,
    endtime,
    setDateRange,
    dateRange,
    selectStartTime,
    selectEndTime,
    enableListing,
    setEnableListing,
    onChangeLazyMint
  } = props;
  const switchEnableContent = (e: any) => {
    setFieldValue('enableListing', e.target.checked);
    setEnableListing(!enableListing);
  };

  const onChangePrice = (e: any) => {
    let newValue = e.target.value;
    newValue =
      Math.abs(Number(newValue)) >= 1.0e15
        ? (Math.abs(Number(newValue)) / 1.0e15).toFixed(2) + ' QT'
        : Math.abs(Number(newValue)) >= 1.0e12
        ? (Math.abs(Number(newValue)) / 1.0e12).toFixed(2) + ' T'
        : Math.abs(Number(newValue)) >= 1.0e9
        ? (Math.abs(Number(newValue)) / 1.0e9).toFixed(2) + ' B'
        : Math.abs(Number(newValue)) >= 1.0e6
        ? (Math.abs(Number(newValue)) / 1.0e6).toFixed(2) + ' M'
        : Math.abs(Number(newValue)) >= 1.0e3
        ? (Math.abs(Number(newValue)) / 1.0e3).toFixed(2) + ' K'
        : Math.abs(Number(newValue));
    setFieldValue('price', newValue);
    setPriceInput && setPriceInput(newValue);
  };

  const onChangeMinimumBid = (e: any) => {
    let newValue = e.target.value;
    newValue =
      Math.abs(Number(newValue)) >= 1.0e15
        ? (Math.abs(Number(newValue)) / 1.0e15).toFixed(2) + ' QT'
        : Math.abs(Number(newValue)) >= 1.0e12
        ? (Math.abs(Number(newValue)) / 1.0e12).toFixed(2) + ' T'
        : Math.abs(Number(newValue)) >= 1.0e9
        ? (Math.abs(Number(newValue)) / 1.0e9).toFixed(2) + ' B'
        : Math.abs(Number(newValue)) >= 1.0e6
        ? (Math.abs(Number(newValue)) / 1.0e6).toFixed(2) + ' M'
        : Math.abs(Number(newValue)) >= 1.0e3
        ? (Math.abs(Number(newValue)) / 1.0e3).toFixed(2) + ' K'
        : Math.abs(Number(newValue));
    setFieldValue('minimumBid', newValue);
    setMinimumBidInput && setMinimumBidInput(newValue);
  };

  return (
    <div className="marketplace-bottom-content ">
      <div className="content-heading justify-content-between align-items-center d-flex">
        <div>
          <h3>List on marketplace</h3>
          <p>Put your new NFT on NFTonPulse marketplace</p>
        </div>
        <div className="custom-switch">
          <InputRadio
            checked={enableListing}
            type="checkbox"
            name="enableListing"
            size="large"
            onChangeInputName={switchEnableContent}
            component={Switch}
          />
        </div>
      </div>
      <div
        className={
          !enableListing
            ? 'marketplace-content-disabled marketplace-content'
            : 'marketplace-content'
        }
      >
        <NftType isSingle={isSingle} marketType={marketType} onTab={onTab} />

        {marketType === MARKET_TYPE.SIMPLE && (
          <>
            <InputField
              value={price}
              type="number"
              required="yes"
              label="Price"
              name="price"
              onChangeInputName={onChangePrice}
              id="item_price"
              className={`form-control input__holder__single`}
              placeholder={`Enter price for one item (${COIN})`}
              icon="PLS"
              moreInfo={[
                'Estimated Value ( ~$23,437) ',
                // eslint-disable-next-line react/jsx-key
                <Tooltip
                  title="Calculated using past 24 hour average price"
                  placement="right-start"
                >
                  <span>
                    <IconInfo className="cursor-pointer" />
                  </span>
                </Tooltip>
              ]}
            />
          </>
        )}

        {marketType === MARKET_TYPE.AUCTION && (
          <InputField
            value={minimumBid}
            label="Minimum bid"
            sublabel="Bids below this amount bids won’t be allowed."
            type="number"
            required="yes"
            onChangeInputName={onChangeMinimumBid}
            name="minimumBid"
            id="item_price_bid"
            icon="PLS"
            className={`form-control input__holder__single`}
            placeholder={'Enter minimum bid'}
          />
        )}

        <ExpirationDate
          marketType={marketType}
          setExpirationDate={setExpirationDate}
          starttime={starttime}
          endtime={endtime}
          dateRange={dateRange}
          setDateRange={setDateRange}
          selectStartTime={selectStartTime}
          selectEndTime={selectEndTime}
        />
        <hr />
      </div>
      {isSingle && marketType === MARKET_TYPE.SIMPLE && (
        <div className="form-cfield form-ccfield sensative-content">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h5>
                <i
                  className="fa fa-exclamation-triangle"
                  aria-hidden="true"
                ></i>
                Lazy Mint
              </h5>
              <p className="sublabel">
                Mint nft when someone buy this item&nbsp;&nbsp;
                <i className="fa fa-info-circle" aria-hidden="true"></i>
              </p>
            </div>
            <div className="col-md-4 text-right">
              <Field
                type="checkbox"
                name="lazyMint"
                component={Switch}
                size="large"
                onChange={onChangeLazyMint}
              />
            </div>
          </div>
        </div>
      )}
      {submitCreateState.loading ? (
        <Loader />
      ) : (
        <input
          type="submit"
          id="submit"
          className="btn-main btn-main-submit"
          value="Create Nft"
        />
      )}
      <div className="spacer-20"></div>
      {submitCreateState.error && (
        <Alert text={submitCreateState.error} type={ALERT_TYPE.DANGER} />
      )}
    </div>
  );
}

export default ListOnMarketPlace;
