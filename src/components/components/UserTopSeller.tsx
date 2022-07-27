import React, { memo } from 'react';
import { COIN } from 'src/enums';
import { IUser } from 'src/types/users.types';
import { shortAddress } from 'src/utils';
import { navigate } from '@reach/router';
import { getImage } from 'src/services/ipfs';
import UserAvatar from './UserAvatar';

//react functional component
const UserTopSeller = ({
  user,
  totalPrice
}: {
  user: IUser[];
  totalPrice: number;
}) => {
  const navigateTo = (link: string) => {
    navigate(link);
  };

  return (
    <>
      <div className="author_list_pp">
        <span onClick={() => navigateTo(`/author/${user[0]?.publicAddress}`)}>
          <UserAvatar
            className="lazy"
            image={user[0]?.profileImage}
            userAddress={user[0]?.publicAddress}
            blockSize={5}
            size={50}
          />
          <i className="fa fa-check"></i>
        </span>
      </div>
      <div className="author_list_info">
        <span onClick={() => navigateTo(`/author/${user[0]?.publicAddress}`)}>
          {user[0]?.username || shortAddress(user[0]?.publicAddress)}
        </span>
        <span className="bot">
          {totalPrice} {COIN}
        </span>
      </div>
    </>
  );
};

export default memo(UserTopSeller);
