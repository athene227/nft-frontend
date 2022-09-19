import 'react-circular-progressbar/dist/styles.css';

import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { BsFillLightningFill } from 'react-icons/bs';
import { INftAttribute } from 'src/types/nfts.types';

const BoostPercentageAttribute = ({ data }: { data: INftAttribute }) => (
  <div className={`nft-attr-bsnumber ${data.value > 100 ? 'danger' : ''}`}>
    <div className="boost-progress-wrapper" style={{ width: '60px' }}>
      <CircularProgressbarWithChildren value={data.value as number}>
        <BsFillLightningFill className="text-white" />
      </CircularProgressbarWithChildren>
    </div>
    <div className="boost-label-wrapper">
      <h6 className="nft-attr-name">{data.trait_type}</h6>
      <div className="nft-attr-value">+{data.value}%</div>
    </div>
  </div>
);

export default BoostPercentageAttribute;
