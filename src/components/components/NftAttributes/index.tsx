import React from 'react';
import { ATTRIBUTE_TYPE } from 'src/enums';
import { INft, INftAttribute } from 'src/types/nfts.types';

import BoostNumberAttribute from './BoostNumberAttribute';
import BoostPercentageAttribute from './BoostPercentageAttribute';
import DateAttribute from './DateAttribute';
import NumberAttribute from './NumberAttribute';
import RankingAttribute from './RankingAttribute';
import StringAttribute from './StringAttribute';

const NftAttribute = (props: INftAttribute) => {
  const attrMap = {
    [ATTRIBUTE_TYPE.BOOST_NUMBER]: BoostNumberAttribute,
    [ATTRIBUTE_TYPE.BOOST_PERCENTAGE]: BoostPercentageAttribute,
    [ATTRIBUTE_TYPE.DATE]: DateAttribute,
    [ATTRIBUTE_TYPE.NUMBER]: NumberAttribute,
    [ATTRIBUTE_TYPE.STRING]: StringAttribute,
    [ATTRIBUTE_TYPE.RANKING]: RankingAttribute
  };
  const AttributeComponent =
    attrMap[props.display_type as keyof typeof attrMap] || StringAttribute;

  return <AttributeComponent data={props} />;
};

export const renderAttributes = (nft: INft) => {
  const properties: INftAttribute[] = [],
    boosts: INftAttribute[] = [],
    rankings: INftAttribute[] = [];

  nft?.attributes?.forEach((attr) => {
    const type = attr.display_type;

    if (
      type === ATTRIBUTE_TYPE.BOOST_NUMBER ||
      type === ATTRIBUTE_TYPE.BOOST_PERCENTAGE
    ) {
      boosts.push(attr);
    } else if (type === ATTRIBUTE_TYPE.RANKING) {
      rankings.push(attr);
    } else {
      properties.push(attr);
    }
  });
  return (
    <div>
      {properties.length > 0 && <h6>Properties</h6>}
      <div className="nft-attr-container">
        {properties.map((attr, index) => (
          <NftAttribute key={index} {...attr} />
        ))}
      </div>
      <div className="spacer-10" />
      {boosts.length > 0 && <h6>Boosts</h6>}
      <div className="nft-attr-container">
        {boosts.map((attr, index) => (
          <NftAttribute key={index} {...attr} />
        ))}
      </div>
      <div className="spa cer-10" />
      {rankings.length > 0 && <h6>Rankings</h6>}
      <div className="nft-attr-container">
        {rankings.map((attr, index) => (
          <NftAttribute key={index} {...attr} />
        ))}
      </div>
    </div>
  );
};

export default NftAttribute;
