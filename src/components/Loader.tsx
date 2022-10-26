import React from 'react';
import Loader from 'react-loader-spinner';

const _Loader = (props: { size?: number }) => {
  //other logic
  const { size } = props;
  return (
    <Loader
      type="Puff"
      color="#00BFFF"
      height={size || 100}
      width={size || 100}
    />
  );
};

export default _Loader;
