import React from 'react';
import { ReactComponent as IconLock } from 'src/assets/images/icon/icon-lock.svg';
import InputField from 'src/components/Input/InputField';

import InputRadio from './InputRadio';

interface IProps {
  onChangeInputName: (e: any) => void;
  switchComponent: any;
  isUnlocableContent: boolean;
  onChangeUnlockableContent: any;
  unlockableContentInput: string;
}

function UnLockableContent(props: IProps) {
  const {
    onChangeInputName,
    switchComponent,
    isUnlocableContent,
    onChangeUnlockableContent,
    unlockableContentInput
  } = props;
  return (
    <>
      <div className="nft__form_field createNft__form_field_secondary sensative-content custom-switch">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h5>
              <i>
                <IconLock />
              </i>
              Unlockable Content
            </h5>
            <p className="sublabel">
              Include unlockable content that can only be revealed by the owner
              of the item.
            </p>
          </div>

          <div className="col-md-4 text-right">
            <InputRadio
              type="checkbox"
              size="large"
              name="unlockableContentCheck"
              onChangeInputName={onChangeInputName}
              component={switchComponent}
              checked={isUnlocableContent}
            />
          </div>
        </div>
      </div>
      <div>
        {isUnlocableContent && (
          <InputField
            required={false}
            type="text"
            name="unlockableContent"
            onChangeInputName={onChangeUnlockableContent}
            id="item_Description"
            className={`form-control input__holder__single textarea`}
            placeholder={
              'Enter content (assess key, code to redeem, link to a file, etc.)'
            }
            as="textarea"
            sublabel=""
            moreInfo=""
            icon=""
            hidden={false}
            value={unlockableContentInput}
            openPopup={undefined}
            label=""
          />
        )}
      </div>
    </>
  );
}

export default UnLockableContent;
