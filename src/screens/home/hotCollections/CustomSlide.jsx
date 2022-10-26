import React, { memo } from 'react';
import UserAvatar from 'src/components/UserAvatar';

const CustomSlide = ({
  index,
  avatar,
  banner,
  username,
  uniqueId,
  userAddress
}) => {
  return (
    <div className={'itm '} index={index}>
      <div className={`nft_coll hot-collection-col nft_coll__holder`}>
        <div className={`nft_wrap  nft_wrap__holder`}>
          <span>
            <img src={banner} className="lazy img-fluid" alt="" />
          </span>
        </div>
        <div className={`hot-collection-content nft_col_content_holder`}>
          <div className={`nft_coll_pp nft_coll_pp`}>
            <span onClick={() => window.open('/home', '_self')}>
              <UserAvatar
                className={`lazy nft__item_author_img`}
                image={avatar}
                userAddress={userAddress}
                blockSize={8}
                size={80}
              />
            </span>
            <i className="fa fa-check"></i>
          </div>
          <div className={`nft_coll_info nft_coll_info`}>
            <h4 onClick={() => window.open('/home', '_self')}>{username}</h4>
            <span>{uniqueId}</span>
          </div>
          <div className="col-12 d-flex justify-content-center align-items-center">
            <div className="nft__item_price_sec">932,756,89 PLS</div>
            <div className="nft__item_author">
              <img
                className={`image_position`}
                src="./img/eth.png"
                alt=""
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomSlide);
