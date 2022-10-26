import Tooltip from '@mui/material/Tooltip';
import { Field } from 'formik';
import { Switch } from 'formik-material-ui';
import { ReactComponent as IconInfo } from 'src/assets/images/icon/info.svg';
import Alert from 'src/components/Alert';
import InputField from 'src/components/Input/InputField';
import Loader from 'src/components/Loader';
import { ALERT_TYPE, COIN, MARKET_TYPE } from 'src/enums';

import ExpirationDate from './expirationDate';
import InputRadio from './InputRadio';
import NftType from './nftType';

interface IProps {
  price: number;
  minimumBid: number;
  marketType: MARKET_TYPE;
  submitCreateState: any;
  setPriceInput: (e: any) => void;
  setMinimumBidInput: (e: any) => void;
  onTab: (marketType: MARKET_TYPE) => void;
  onChangeLazyMint: (e: any) => void;
  setFieldValue: any;
  setExpirationDate: any;
  isSingle: boolean;
  dateRange: any;
  enableListing: boolean;
  setEnableListing: any;
}

function ListOnMarketPlace(props: IProps) {
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
    dateRange,
    enableListing,
    setEnableListing,
    onChangeLazyMint
  } = props;

  const switchEnableContent = (e: any) => {
    setFieldValue('enableListing', e.target.checked);
    setEnableListing(!enableListing);
  };

  const onChangePrice = (e: any) => {
    if (e.target.value.length > 18) {
      return false;
    }
    setFieldValue('price', e.target.value);
    setPriceInput && setPriceInput(e.target.value);
  };

  const onChangeMinimumBid = (e: any) => {
    if (e.target.value.length > 18) {
      return false;
    }
    setFieldValue('minimumBid', e.target.value);
    setMinimumBidInput && setMinimumBidInput(e.target.value);
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
        <NftType
          isSingle={isSingle}
          marketType={marketType}
          dateRange={dateRange}
          onTab={onTab}
        />

        {marketType === MARKET_TYPE.SIMPLE && (
          <>
            <InputField
              value={price}
              type="number"
              required={true}
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
              sublabel=""
              hidden={false}
              as=""
            />
          </>
        )}

        {marketType === MARKET_TYPE.AUCTION && (
          <InputField
            value={minimumBid}
            label="Minimum bid"
            sublabel="Bids below this amount bids won’t be allowed."
            type="number"
            required={true}
            onChangeInputName={onChangeMinimumBid}
            name="minimumBid"
            id="item_price_bid"
            icon="PLS"
            className={`form-control input__holder__single`}
            placeholder={'Enter minimum bid'}
            moreInfo=""
            as=""
            hidden={false}
          />
        )}

        <ExpirationDate
          setExpirationDate={setExpirationDate}
          dateRange={dateRange}
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
