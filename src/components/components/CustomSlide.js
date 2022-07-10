import React, { memo } from 'react';
import { navigate } from '@reach/router';

const CustomSlide = ({ index, item, avatar, banner, username, uniqueId }) => {
  const _navigate = (e, url) => {
    e.stopPropagation();
    navigate(url);
  };

  return (
    <div
      className="itm"
      index={index}
      onClick={(e) => _navigate(e, `/collection/${uniqueId}`)}
    >
      <div className="nft_coll">
        <div className="nft_wrap">
          <span>
            <img src={banner} className="lazy img-fluid" alt="" />
          </span>
        </div>
        <div className="nft_coll_pp">
          <span
            onClick={(e) =>
              _navigate(e, `/author/${item?.creator[0].publicAddress}`)
            }
          >
            <img className="lazy" src={avatar} alt="" />
          </span>
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <span
            onClick={(e) =>
              _navigate(e, `/author/${item?.creator[0].publicAddress}`)
            }
          >
            <h4>{username}</h4>
          </span>
          {/* <span>{uniqueId}</span> */}
        </div>
      </div>
    </div>
  );
};

export default memo(CustomSlide);
