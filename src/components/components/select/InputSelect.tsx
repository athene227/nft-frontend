import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import { ErrorMessage } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import { getImage } from 'src/services/ipfs';

import CollectionImg from '../../../assets/images/collection-img.png';
import { ReactComponent as IconQuestion } from '../../../assets/images/icon/icon-Question.svg';
import { CollectionSelect, SelectWrapper } from './style';

const InputSelect = (props) => {
  const { value, onClick, onChange, collectionData } = props;
  // tooltip configurations
  const [show, setShow] = useState(false);
  const target = useRef(null);
  // tooltip configurations
  return (
    <CollectionSelect className="nft__form_field">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="form-label label-sub label-icon">
          <img
            className={'p-2'}
            src="./img/collectionIcon.png"
            width={40}
            alt=""
          ></img>
          Collection
          <Tooltip
            title="If left blank a collection name related to your
             user name or a untitled numerical collection will be generated."
            placement="right-start"
          >
            {/* <div ref={target} onClick={() => setShow(!show)}> */}
            <IconQuestion className="cursor-pointer" />
            {/* </div> */}
          </Tooltip>
        </h5>
        <p className="sublabel p-info">This is a folder for your NFT.</p>
      </div>
      <SelectWrapper>
        <div className="form-control-select">
          <FormControl fullWidth className="teset">
            <Select
              className="collection-select-list"
              name="collectionId"
              value={value}
              onChange={onChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem
                className="form-control-item"
                key={''}
                value={''}
                disabled
              >
                Select Collection
              </MenuItem>

              {collectionData.length > 0 &&
                collectionData.map((collection: any, index: number) => {
                  return (
                    <MenuItem
                      key={index}
                      value={collection.id}
                      className="form-control-item"
                    >
                      <img src={getImage(collection.imageUrl)} />
                      {collection.name}
                    </MenuItem>
                  );
                })}

              <MenuItem className="form-control-item" value="create_collection">
                <button
                  type="button"
                  className="btn-main btn-grad create-collection"
                  onClick={onClick}
                >
                  + Create simple collection
                </button>
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        <ErrorMessage name="collectionId">
          {(msg) => <div className="error-form">{msg}</div>}
        </ErrorMessage>
      </SelectWrapper>
    </CollectionSelect>
  );
};
export default InputSelect;
