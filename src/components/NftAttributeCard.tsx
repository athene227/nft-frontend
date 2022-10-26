import React from 'react';
import { INftAttribute } from 'src/types/nfts.types';

const NftAttributeCard = ({ data }: { data: INftAttribute }) => (
  <div className="nft-attribute-card">
    <div className="nft-attribute-name">{data.trait_type}</div>
    <div className="nft-attribute-value">{data.value}</div>
  </div>
);

export default NftAttributeCard;
