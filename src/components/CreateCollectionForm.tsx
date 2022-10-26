import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from 'src/components/Loader';
import { ALERT_TYPE, COIN, INPUT_ERROS } from 'src/enums';
import * as Yup from 'yup';

import * as selectors from '../store/selectors';
import Alert from './Alert';
interface IProps {
  onChangeImage: (e: any) => void;
  setNameInput: (e: any) => void;
  setDescriptionInput: (e: any) => void;
  submit: (values: any, resetForm: () => void) => void;
  submitCreateState: { error: null | string; loading: boolean };
}

export default function CreateCollectionForm(props: IProps) {
  const {
    submit,
    submitCreateState,
    onChangeImage,
    setNameInput,
    setDescriptionInput
  } = props;
  const [openCreateCollection, serCreateCollection] = useState(false);
  const web3State = useSelector(selectors.web3State);
  const { accounts } = web3State.web3.data;
  // const userAddress = accounts[0];

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, INPUT_ERROS.tooShort)
      .max(50, INPUT_ERROS.tooLong)
      .required(INPUT_ERROS.requiredField),
    description: Yup.string()
      .min(2, INPUT_ERROS.tooShort)
      .max(250, INPUT_ERROS.tooLong)
      .required(INPUT_ERROS.requiredField)
    // collection: Yup.string().min(2, INPUT_ERROS.tooShort).max(250, INPUT_ERROS.tooLong).required(INPUT_ERROS.requiredField),
  });

  const getInitialValue = () => {
    const result = {
      name: '',
      description: ''
    };
    return result;
  };

  const displayCreateCollectionForm = ({
    handleSubmit,
    values,
    submitCount,
    setValues,
    setFieldValue,
    errors,
    touched,
    handleChange,
    getFieldProps
  }: FormikProps<any>) => {
    return (
      <Form onSubmit={handleSubmit}>
        <div>
          <h5>Upload file</h5>
          <div className="d-create-file">
            <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>

            <div className="browse">
              <input
                type="button"
                id="get_file"
                className="btn-main"
                value="Browse"
              />
              <input
                id="upload_file"
                type="file"
                multiple
                onChange={onChangeImage}
              />
            </div>
          </div>
          <div className="spacer-30"></div>

          <h5>Name</h5>
          <Field
            type="text"
            name="name"
            id="item_name"
            className="form-control"
            placeholder={`enter price for one item (${COIN})`}
          />
          <ErrorMessage name="name" />
          <div className="spacer-20"></div>

          <h5>Description</h5>
          <Field
            type="text"
            name="description"
            id="item_Description"
            className="form-control"
            placeholder={`enter price for one item (${COIN})`}
          />
          <ErrorMessage name="description" />
          <div className="spacer-20"></div>

          {submitCreateState.loading ? (
            <Loader />
          ) : (
            <input
              type="submit"
              id="submit"
              className="btn-main"
              value="Create Nft"
            />
          )}
          <div className="spacer-20"></div>
          {submitCreateState.error && (
            <Alert text={submitCreateState.error} type={ALERT_TYPE.DANGER} />
          )}
        </div>
      </Form>
    );
  };

  return (
    <Formik
      initialValues={getInitialValue()}
      onSubmit={(values, actions) => {
        submit(values, actions.resetForm);
      }}
      render={displayCreateCollectionForm}
      validationSchema={SignupSchema}
    />
  );
}
