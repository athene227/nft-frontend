import { Avatar } from '@mui/material';
import { navigate } from '@reach/router';
import React from 'react';
import { IUser } from 'src/types/users.types';
import { getImage } from 'src/services/ipfs';

const UserCard = (props: { data: IUser }) => {
  const { data } = props;

  return (
    <div
      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4 user-card"
      onClick={() => navigate(`/author/${data.publicAddress}`)}
    >
      <Avatar src={getImage(data.profileImage)} />
      <span>{data.username}</span>
    </div>
  );
};

export default UserCard;
