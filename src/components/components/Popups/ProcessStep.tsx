import React from 'react';
import { BsCheckLg, BsRecordCircle, BsXCircle } from 'react-icons/bs';
import Loader from 'src/components/components/Loader';
import { ITEM_CREATE_STATUS } from 'src/enums';
import { MarketItemCreateProgress } from 'src/types/nfts.types';

interface IProps {
  value: ITEM_CREATE_STATUS;
  text: string;
  progress: MarketItemCreateProgress;
}

const ProcessStep = (props: IProps) => {
  const { value, text, progress } = props;
  const { status, error } = progress;

  return (
    <div className="stepper-container">
      <div className="step-status">
        {status > value ? (
          <BsCheckLg color="green" />
        ) : status === value ? (
          error ? (
            <BsXCircle color="red" />
          ) : (
            <Loader size={30} />
          )
        ) : (
          <BsRecordCircle color="grey" />
        )}
      </div>
      <div className={`step-title ${status === value ? 'current' : ''}`}>
        {text}
      </div>
    </div>
  );
};

export default ProcessStep;
