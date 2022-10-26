import { addDays } from 'date-fns';
import { MARKET_TYPE } from 'src/enums';

interface IProps {
  isSingle: boolean;
  marketType: MARKET_TYPE;
  onTab: (marketType: MARKET_TYPE) => void;
  dateRange: any;
}

function NftType(props: IProps) {
  const { onTab, isSingle, marketType, dateRange } = props;
  const expirationDateUpdate = () => {
    dateRange[0]['startDate'] = new Date();
    marketType === MARKET_TYPE.AUCTION
      ? (dateRange[0]['endDate'] = addDays(new Date(), 3 * 30))
      : (dateRange[0]['endDate'] = addDays(new Date(), 7));
  };

  return (
    <div className="de_tab tab_methods marketplace-tabs ">
      <ul className={'de_nav dynamic-tab-buttons'}>
        <li
          id="btn1"
          className={marketType === MARKET_TYPE.SIMPLE ? 'active' : ''}
          onClick={() => {
            onTab(MARKET_TYPE.SIMPLE), expirationDateUpdate();
          }}
        >
          <span className={`bg__market`}>
            <strong>
              <i>
                <img src="./img/tab-img1.png" />
              </i>
              Fixed price
            </strong>
          </span>
        </li>
        <li
          id="btn2"
          className={
            isSingle
              ? marketType === MARKET_TYPE.AUCTION
                ? 'active'
                : ''
              : 'li-disable'
          }
          onClick={() => {
            onTab(MARKET_TYPE.AUCTION);
            expirationDateUpdate();
          }}
        >
          <span>
            <strong className={isSingle ? '' : 'strong-opacity'}>
              <i>
                <img src="./img/tab-img2.png" alt="tab-img" />
              </i>
              Timed auction
            </strong>
          </span>
        </li>
      </ul>
    </div>
  );
}

export default NftType;
