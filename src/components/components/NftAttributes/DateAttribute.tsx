import React from 'react';
import { BsCalendar } from 'react-icons/bs';
import { INftAttribute } from 'src/types/nfts.types';
import 'react-circular-progressbar/dist/styles.css';
import moment from 'moment';

const DateAttribute = ({ data }: { data: INftAttribute }) => (
  <div className="nft-attr-normal">
    <div className="nft-attr-name">
      <BsCalendar className="nft-date-icon" />
      <span>{data.trait_type}</span>
    </div>
    <div className="nft-attr-value">
      {new Date((data.value as number) * 1000).toDateString()}
    </div>
  </div>
);

export default DateAttribute;
