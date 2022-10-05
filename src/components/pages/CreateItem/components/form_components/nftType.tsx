import React from 'react';
import { MARKET_TYPE } from 'src/enums';

interface IProps {
  isSingle: boolean;
  marketType: MARKET_TYPE;
  onTab: (marketType: MARKET_TYPE) => void;
}

function NftType(props: IProps) {
  const { onTab, isSingle, marketType } = props;
  return (
    <div className="de_tab tab_methods marketplace-tabs ">
      <ul className={'de_nav dynamic-tab-buttons'}>
        <li
          id="btn1"
          className={marketType === MARKET_TYPE.SIMPLE ? 'active' : ''}
          onClick={() => onTab(MARKET_TYPE.SIMPLE)}
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
          onClick={() => onTab(MARKET_TYPE.AUCTION)}
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
