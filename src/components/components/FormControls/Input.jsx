import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { PropTypes } from 'prop-types';
import classes from './Input.module.scss';

const Input = (props) => {
  return (
    <>
      {props.label && (
        <h5 className={`${classes.form_label}`}>
          {props.label}
          <span className={`${classes.required}`}>
            {props.required ? '*' : null}
          </span>
        </h5>
      )}
      <Field
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        className="form-control"
        {...props}
      />
      <ErrorMessage name={props.name} />
    </>
  );
};

export default Input;
Input.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  as: PropTypes.string,
  rows: PropTypes.number,
  component: PropTypes.any,
  className: PropTypes.string,
  onChange: PropTypes.any,
  checked: PropTypes.bool,
  render: PropTypes.elementType
};
