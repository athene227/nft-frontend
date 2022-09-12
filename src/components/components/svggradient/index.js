



// import 'react-circular-progressbar/dist/styles.css';

import React from 'react';
// import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import {CircleProgress} from 'react-gradient-progress';
import { BsFillLightningFill } from 'react-icons/bs';
import { INftAttribute } from 'src/types/nfts.types';


const BoostNumberAttribute = ({ data }: { data: INftAttribute }) => (
  <div className="nft-attr-bsnumber">
    <div className="boost-progress-wrapper" style={{width:'60px'}}>
      {/* <CircularProgressbarWithChildren value={100}>
        <BsFillLightningFill className="text-white" />
      </CircularProgressbarWithChildren> */}
      <CircleProgress fill="#042A53" width={70} percentage={100} strokeWidth={5} primaryColor={["#FE00C7", "#0084FE"]} secondaryColor="#515060" >
      <BsFillLightningFill className="text-white" />
        </CircleProgress>
    </div>
    <div className="boost-label-wrapper">
      <h6 className="nft-attr-name">{data.trait_type}</h6>
      <div className="nft-attr-value">+{data.percentage}</div>
    </div>
  </div>
);

export default BoostNumberAttribute;
