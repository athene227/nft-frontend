import React from 'react';
import { MARKET_TYPE } from 'src/enums';
interface IProps {
  marketType: MARKET_TYPE;
  onTab: (marketType: MARKET_TYPE) => void;
}

export default function MarketTypeTabs(props: IProps) {
  const { marketType, onTab } = props;
  return (
    <div className="marketplace-tabs-main">
      <h5>Put on marketplace</h5>
      <p>Put your new NFT on NFTonPulse marketplace</p>
      <div className="de_tab tab_methods marketplace-tabs">
        <ul className={'de_nav dynamic-tab-buttons'}>
          <li
            id="btn1"
            className={marketType === MARKET_TYPE.SIMPLE ? 'active' : ''}
            onClick={() => onTab(MARKET_TYPE.SIMPLE)}
          >
            <span
              style={
                {
                  // backgroundImage: `url(${'./img/background/bg-radius.png'})`,
                  // height: 'fit-content'
                }
              }
              className={`bg__market`}
            >
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
            className={marketType === MARKET_TYPE.AUCTION ? 'active' : ''}
            onClick={() => onTab(MARKET_TYPE.AUCTION)}
          >
            <span>
              <strong>
                <i>
                  <img src="./img/tab-img2.png" alt="tab-img" />
                </i>
                Timed auction
              </strong>
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
