import React from 'react';
import { MARKET_TYPE } from 'src/enums';

interface IProps {
  marketType: MARKET_TYPE;
  onTab: (marketType: MARKET_TYPE) => void;
}

export default function MarketTypeTabs(props: IProps) {
  const { marketType, onTab } = props;
  return (
    <div>
      <h5>Select method</h5>
      <div className="de_tab tab_methods">
        <ul className="de_nav">
          <li
            id="btn1"
            className={marketType === MARKET_TYPE.SIMPLE ? 'active' : ''}
            onClick={() => onTab(MARKET_TYPE.SIMPLE)}
          >
            <span>
              <i className="fa fa-tag"></i>
              Fixed price
            </span>
          </li>
          <li
            id="btn2"
            className={marketType === MARKET_TYPE.AUCTION ? 'active' : ''}
            onClick={() => onTab(MARKET_TYPE.AUCTION)}
          >
            <span>
              <i className="fa fa-hourglass-1"></i>
              Timed auction
            </span>
          </li>
          {/* <li id='btn3' className={marketType === MARKET_TYPE.MORE ? "active" : ''} onClick={() => onTab(MARKET_TYPE.MORE)}>
                    <span>
                        <i className="fa fa-users"></i>
                        Open for bids
                    </span>
                </li> */}
        </ul>
      </div>
    </div>
  );
}
