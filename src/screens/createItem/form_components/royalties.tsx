import InputField from 'src/components/Input/InputField';
import { ROYALTIES_TYPE } from 'src/enums';

interface IProps {
  royaltiesType: ROYALTIES_TYPE;
  onRoyaltyChange: (royaltiesType: ROYALTIES_TYPE) => void;
  onChangeInputName: (e: any) => void;
  value: number;
}

function Royalties(props: IProps) {
  const { onRoyaltyChange, royaltiesType, onChangeInputName, value } = props;
  // onRoyaltyChange(ROYALTIES_TYPE.PERCENT5)
  return (
    <div className="nft__form_field">
      <h5 className="form-label label-sub label-icon">Royalties</h5>
      <p className="sublabel">
        The % you will earn of each future sale on our marketplace.
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
            onClick={() => onRoyaltyChange(ROYALTIES_TYPE.CUSTOM)}
          >
            <span>Custom</span>
          </li>
          <li
            id="btn2"
            className={
              royaltiesType === ROYALTIES_TYPE.PERCENT5
                ? 'active  nft-attr-royalties-active'
                : ''
            }
            onClick={() => onRoyaltyChange(ROYALTIES_TYPE.PERCENT5)}
          >
            <span>5%</span>
          </li>

          <li
            id="btn2"
            className={
              royaltiesType === ROYALTIES_TYPE.PERCENT10
                ? 'active nft-attr-royalties-active'
                : ''
            }
            onClick={() => onRoyaltyChange(ROYALTIES_TYPE.PERCENT10)}
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
            onClick={() => onRoyaltyChange(ROYALTIES_TYPE.PERCENT15)}
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
            onClick={() => onRoyaltyChange(ROYALTIES_TYPE.PERCENT20)}
          >
            <span>20%</span>
          </li>
        </ul>
        {/* {royaltiesType === ROYALTIES_TYPE.CUSTOM && ( */}
        <div className="mt-4">
          <InputField
            name="royalties"
            type="number"
            required={true}
            onChangeInputName={onChangeInputName}
            placeholder="Custom"
            className={`form-control input__holder__single`}
            hidden={royaltiesType !== ROYALTIES_TYPE.CUSTOM}
            value={value}
            label=""
            sublabel=""
            id="item_royalties"
            as=""
            moreInfo=""
            icon=""
          />
        </div>
        {/* )} */}
      </div>
    </div>
  );
}

export default Royalties;
