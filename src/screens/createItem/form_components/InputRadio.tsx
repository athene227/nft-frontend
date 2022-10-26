import { Field } from 'formik';

interface IProps {
  name: string;
  checked: boolean;
  size: string;
  type: string;
  component: any;
  onChangeInputName: (e: any) => void;
}

const RadioField = ({
  name,
  checked,
  size,
  type,
  component,
  onChangeInputName
}: IProps) => (
  <>
    <Field
      checked={checked}
      type={type}
      name={name}
      component={component}
      size={size}
      onChange={onChangeInputName}
    />
  </>
);
export default RadioField;
