import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import { ErrorMessage } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import { getImage } from 'src/services/ipfs';

import CollectionImg from 'src/assets/images/collection-img.png';
import { ReactComponent as IconQuestion } from 'src/assets/images/icon/icon-Question.svg';
import { CollectionSelect, SelectWrapper } from './style';

const InputSelect = (props) => {
  const {
    value,
    onClick,
    onChange,
    collectionData,
    menuItem,
    className,
    hasImage,
    name
  } = props;
  // tooltip configurations
  const [show, setShow] = useState(false);
  const target = useRef(null);
  // tooltip configurations
  return (
    <SelectWrapper className={className}>
      <div className="form-control-select">
        <FormControl fullWidth>
          <Select
            name={name}
            value={value}
            onChange={onChange}
            displayEmpty
            defaultValue={menuItem[0].value}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            {menuItem.map((value, index) => {
              return (
                <MenuItem
                  key={index}
                  value={value.value}
                  className="form-control-item"
                >
                  {hasImage && <img src={value.image} />}
                  {value.title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </SelectWrapper>
  );
};
export default InputSelect;
