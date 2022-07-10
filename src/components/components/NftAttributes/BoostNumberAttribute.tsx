import 'react-circular-progressbar/dist/styles.css';

import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { BsFillLightningFill } from 'react-icons/bs';
import { INftAttribute } from 'src/types/nfts.types';

const BoostNumberAttribute = ({ data }: { data: INftAttribute }) => (
  <div className="nft-attr-bsnumber">
    <div className="boost-progress-wrapper">
      <CircularProgressbarWithChildren value={100}>
        <BsFillLightningFill className="text-white" />
      </CircularProgressbarWithChildren>
    </div>
    <div className="boost-label-wrapper">
      <h6 className="nft-attr-name">{data.trait_type}</h6>
      <div className="nft-attr-value">+{data.value}</div>
    </div>
  </div>
);

export default BoostNumberAttribute;
