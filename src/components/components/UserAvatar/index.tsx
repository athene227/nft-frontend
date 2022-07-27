import React from 'react';
import Blockies from 'react-blockies';

import { getImage } from 'src/services/ipfs';
import './index.scss';

interface IProps {
  image: string | undefined;
  userAddress: string | undefined;
  blockSize?: number;
  size: number;
  className?: string;
}

const UserAvatar = (props: IProps) => {
  const { image, size, userAddress, className, blockSize } = props;
  const scale = blockSize || 5;
  const address = userAddress || 'aaaaaaa';

  return image ? (
    <img className={`user-avatar ${className}`} src={getImage(image)} alt="" />
  ) : (
    <Blockies
      className={`user-avatar ${className}`}
      seed={address}
      size={size / scale}
      scale={scale}
    />
  );
};

export default UserAvatar;
