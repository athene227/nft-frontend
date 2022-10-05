import { ErrorMessage } from 'formik';
import React from 'react';
import { ROYALTIES_TYPE } from 'src/enums';

import InputField from '../../../../components/Input/InputField';

interface IProps {
  isSingle: boolean;
  royaltiesType: ROYALTIES_TYPE;
  onTabChange: (royaltiesType: ROYALTIES_TYPE) => void;
  value: number;
}

function Royalties(props: IProps) {
  const { onTabChange, isSingle, royaltiesType, onChangeInputName, value } =
    props;
  // onTabChange(ROYALTIES_TYPE.PERCENT5)
  return (
    <div className="nft__form_field">
      <h5 className="form-label label-sub label-icon">Royalties</h5>
      <p className="sublabel">
        the % you will earn of each future sale on our marketplace.
      </p>

      {/* New */}
      <div className="createNft_royalty">
        <ul>
          <li
            id="btn1"
            className={
              royaltiesType === ROYALTIES_TYPE.CUSTOM
                ? 'active nft-attr-royalties-active'
                : 'nft-attr-royalties-disabled'
            }
            onClick={() => onTabChange(ROYALTIES_TYPE.CUSTOM)}
          >
            <span>Custom</span>
          </li>
          <li
            id="btn2"
            className={
              // isSingle ?
              royaltiesType === ROYALTIES_TYPE.PERCENT5
                ? 'active  nft-attr-royalties-active'
                : ''
              // : 'li-disable nft-attr-royalties-disabled'
            }
            onClick={() => onTabChange(ROYALTIES_TYPE.PERCENT5)}
          >
            <span>5%</span>
          </li>

          <li
            id="btn2"
            className={
              // isSingle ?
              royaltiesType === ROYALTIES_TYPE.PERCENT10
                ? 'active nft-attr-royalties-active'
                : ''
              // : 'li-disable nft-attr-royalties-disabled'
            }
            onClick={() => onTabChange(ROYALTIES_TYPE.PERCENT10)}
          >
            <span>10%</span>
          </li>

          <li
            id="btn2"
            className={
              // isSingle ?
              royaltiesType === ROYALTIES_TYPE.PERCENT15
                ? 'active nft-attr-royalties-active'
                : ''
              // : 'li-disable nft-attr-royalties-disabled'
            }
            onClick={() => onTabChange(ROYALTIES_TYPE.PERCENT15)}
          >
            <span>15%</span>
          </li>

          <li
            id="btn2"
            className={
              // isSingle ?
              royaltiesType === ROYALTIES_TYPE.PERCENT20
                ? 'active nft-attr-royalties-active'
                : ''
              // : 'li-disable nft-attr-royalties-disabled'
            }
            onClick={() => onTabChange(ROYALTIES_TYPE.PERCENT20)}
          >
            <span>20%</span>
          </li>
        </ul>
        {/* {royaltiesType === ROYALTIES_TYPE.CUSTOM && ( */}
        <div className="mt-4">
          <InputField
            name="royalties"
            type="number"
            required="yes"
            onChangeInputName={onChangeInputName}
            placeholder="Custom"
            className={`form-control input__holder__single`}
            hidden={royaltiesType !== ROYALTIES_TYPE.CUSTOM}
            value={value}
          />
        </div>
        {/* )} */}
      </div>
    </div>
  );
}

export default Royalties;
