import React from 'react';
import { INftAttribute } from 'src/types/nfts.types';

const NumberAttribute = ({ data }: { data: INftAttribute }) => (
  <div className="nft-attr-normal">
    <div className="nft-attr-name">{data.trait_type}</div>
    <div className="nft-attr-value">{data.value}</div>
  </div>
);

export default NumberAttribute;
