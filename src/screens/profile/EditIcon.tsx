/* eslint-disable react/jsx-no-bind */
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { PropTypes } from 'prop-types';
import React from 'react';
const styles = {
  color: 'blue',
  background: 'white',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  padding: '5px'
};

const Input = styled('input')({
  display: 'none'
});

const EditIconWrap = (props) => {
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    props.onChange(file);
    props.displayChange(URL.createObjectURL(file));
  };

  return (
    <>
      <label>
        <Input accept="image/*" type="file" onChange={handleChange} />
        <IconButton component="span">
          <EditIcon sx={styles} />
        </IconButton>
      </label>
    </>
  );
};

export default EditIconWrap;

EditIconWrap.propTypes = {
  onChange: PropTypes.any,
  displayChange: PropTypes.any
};
