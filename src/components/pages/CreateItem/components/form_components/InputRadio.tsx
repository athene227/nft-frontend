import { Field } from 'formik';

const RadioField = ({
  name,
  checked,
  size,
  type,
  component,
  onChangeInputName
}) => (
  <>
    <Field
      checked={checked}
      type={type}
      name={name}
      component={component}
      size={size}
      defaultChecked
      onChange={onChangeInputName}
    />
  </>
);
export default RadioField;
