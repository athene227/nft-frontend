import React from 'react';
import UserAvatar from 'src/components/UserAvatar';
import { numberWithCommas, numFormatter } from 'src/utils';

interface IProps {
  user: any;
  index: any;
}
const UserItem = (props: IProps) => {
  const { user, index } = props;
  return (
    <>
      <div className={`useritem-index mr-2`}>{parseInt(index) + 1}</div>
      <div className={`author_list_pp`}>
        <span>
          <UserAvatar
            className="lazy"
            image={user?.userInfo[0]?.profileImage}
            userAddress={user?.userInfo[0]?.publicAddress}
            blockSize={5}
            size={50}
          />
          <img className={`check_icon`} src="./img/check-icon.png" alt=""></img>
        </span>
      </div>
      <div className={'d-flex justify-content-between w-100'}>
        <div className={`d-flex flex-column seller_info`}>
          {user?.userInfo[0]?.username ? (
            <p className={`useritem-username m-0`}>
              {user?.userInfo[0]?.username}
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

export default UserItem;
