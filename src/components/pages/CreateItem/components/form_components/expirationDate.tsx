import moment from 'moment';
import { MARKET_TYPE } from 'src/enums';

import InputField from '../../../../components/Input/InputField';

function ExpirationDate(props) {
  const { setExpirationDate, marketType, dateRange, starttime, endtime } =
    props;
  let { type } = '7 Days';
  const openExpirationPopup = () => {
    setExpirationDate(true);
  };
  {
    marketType === MARKET_TYPE.AUCTION && (type = '7 Days');
  }
  {
    marketType === MARKET_TYPE.SIMPLE && (type = '3 Months');
  }

  let expiryInputValue = '';
  if (dateRange[0].endDate) {
    expiryInputValue = `${moment(dateRange[0].startDate).format(
      'MMM DD, YYYY (hh:mm A)'
    )} - ${moment(dateRange[0].endDate).format('MMM DD, YYYY (hh:mm A)')}`;
  } else {
    expiryInputValue = '-- -- -- -- --';
  }

  return (
    <InputField
      label="Expiration date"
      type="text"
      required="yes"
      openPopup={openExpirationPopup}
      name="expirationDate"
      id="bid_expiration_date"
      icon="EXP"
      value={expiryInputValue}
      moreInfo={['Service fee 2%']}
      className={`form-control input__holder__single calendar-input mt-2`}
      placeholder={'7 Days'}
    />
  );
}

export default ExpirationDate;
