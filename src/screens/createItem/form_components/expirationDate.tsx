import moment from 'moment';
import InputField from 'src/components/Input/InputField';
import { MARKET_TYPE } from 'src/enums';
import { getDaysBetween } from 'src/store/utils';

interface INExpirationProps {
  setExpirationDate?: any;
  dateRange: any;
}

function ExpirationDate(props: INExpirationProps) {
  const { setExpirationDate, dateRange } = props;
  const openExpirationPopup = () => {
    setExpirationDate(true);
  };

  function isFloat(x: number) {
    return !!(x % 1);
  }

  const today = new Date();
  let expiryInputValue = '';
  if (
    dateRange[0]['startDate'] &&
    dateRange[0]['startDate'].toDateString() === today.toDateString()
  ) {
    const totalDays = getDaysBetween(
      dateRange[0]['startDate'],
      dateRange[0]['endDate']
    );
    if (isFloat(totalDays / 30)) {
      expiryInputValue = `${totalDays} Days`;
    } else {
      expiryInputValue = `${totalDays / 30} Month`;
    }
  } else {
    expiryInputValue = `${moment(dateRange[0].startDate).format(
      'MMM DD, YYYY (hh:mm A)'
    )} - ${moment(dateRange[0].endDate).format('MMM DD, YYYY (hh:mm A)')}`;
  }

  return (
    <InputField
      label="Expiration date"
      type="text"
      required={true}
      openPopup={openExpirationPopup}
      name="expirationDate"
      id="bid_expiration_date"
      icon="EXP"
      value={expiryInputValue}
      moreInfo={['Service fee 2%']}
      className={`form-control input__holder__single calendar-input mt-2`}
      placeholder={'Expiration Date'}
      sublabel=""
      onChangeInputName={() => {}}
      as=""
      hidden={false}
    />
  );
}

export default ExpirationDate;
