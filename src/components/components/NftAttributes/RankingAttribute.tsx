import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { INftAttribute } from 'src/types/nfts.types';

const RankingAttribute = ({ data }: { data: INftAttribute }) => {
  const maxValue = data.max_value || (data.value as number);
  const percent = ((data.value as number) * 100) / maxValue;
  const cls = data.max_value && data.max_value >= data.value ? '' : 'danger';

  return (
    <div className={`nft-attr-ranking ${cls}`}>
      <div className="d-flex justify-content-between mb-1">
        <span className="nft-attr-name">{data.trait_type}</span>
        <span className="nft-attr-value">
          {data.value} of {maxValue}
        </span>
      </div>
      <ProgressBar now={percent} />
    </div>
  );
};

export default RankingAttribute;
