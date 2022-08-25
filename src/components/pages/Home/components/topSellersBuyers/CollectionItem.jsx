import React from 'react';
import { getImage } from 'src/services/ipfs';
import { numberWithCommas, numFormatter } from 'src/utils';

const CollectionItem = ({ user, index }) => {
  return (
    <>
      <div className={`useritem-index mr-2`}>{parseInt(index) + 1}</div>
      <div className={`author_list_pp`}>
        <span>
          {user?.creator[0]?.profileImage ? (
            <img
              className="lazy"
              src={getImage(user?.creator[0]?.profileImage)}
              alt=""
            />
          ) : null}
          <img className={`check_icon`} src="./img/check-icon.png" alt=""></img>
        </span>
      </div>
      <div className={'d-flex justify-content-between w-100'}>
        <div className={`d-flex flex-column cseller-info seller_info`}>
          {user?.creator[0]?.username ? (
            <p className={`useritem-username m-0`}>
              {user?.creator[0]?.username}
            </p>
          ) : null}
          {user?.price ? (
            <p className={`useritem-price m-0`}>
              ${numberWithCommas(numFormatter(user?.price))}
            </p>
          ) : null}
        </div>
        <div className={'d-flex align-items-center'}>
          <p className={`useritem-percentage m-0 pr-5`}>+26.52%</p>
          {/* <span className="col-6 btn-main btn-grad-outline mx-3" >Follow</span> */}
        </div>
      </div>
    </>
  );
};

export default CollectionItem;
