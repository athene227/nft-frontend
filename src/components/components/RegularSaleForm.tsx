import React from 'react';
import { Field, Form, Formik, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ALERT_TYPE, COIN, INPUT_ERROS } from 'src/enums';
import Loader from 'src/components/components/Loader';
import { INft } from 'src/types/nfts.types';
import Alert from './Alert';
// import { sellNft } from 'src/store/actions/thunks/nfts';

interface IProps {
  nft: INft;
  submit: (values: any, resetForm: () => void) => void;
  setPriceInput: (val: string) => void;
  setAmountInput?: (val: string) => void;
  submitSaleState: { error: null | string; loading: boolean };
}

export default function RegularSaleForm(props: IProps) {
  const { nft, submit, submitSaleState, setPriceInput, setAmountInput } = props;

  const SignupSchema = Yup.object().shape({
    price: Yup.number()
      .typeError('you must specify a number')
      .moreThan(0, INPUT_ERROS.tooShort)
      .required(INPUT_ERROS.requiredField),
    numberOfCopies: Yup.number()
      .typeError('you must specify a number')
      .moreThan(0, INPUT_ERROS.tooShort)
      .required(INPUT_ERROS.requiredField)
  });

  const getInitialValue = () => {
    const result = {
      price: 0,
      numberOfCopies: 1
    };
    return result;
  };

  const displayBuyForm = ({
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
    const onChangePrice = (e: any) => {
      setFieldValue('price', e.target.value);
      setPriceInput && setPriceInput(e.target.value);
    };
    const onChangeAmount = (e: any) => {
      setFieldValue('numberOfCopies', e.target.value);
      setAmountInput && setAmountInput(e.target.value);
    };

    return (
      <Form onSubmit={handleSubmit}>
        <div style={{ marginTop: 150 }}>
          <h5>Price</h5>
          <Field
            type="number"
            name="price"
            id="item_price"
            className="form-control"
            placeholder={`Enter price for one item (${COIN})`}
            onChange={onChangePrice}
          />
          <ErrorMessage name="price">
            {(msg) => <div className="error-form">{msg}</div>}
          </ErrorMessage>
          <div className="spacer-10"></div>

          {nft?.multiple && (
            <div>
              <h5>Number of copies</h5>
              <Field
                type="number"
                name="numberOfCopies"
                id="item_numberOfCopies"
                className="form-control"
                placeholder={'Enter number of copies'}
                onChange={onChangeAmount}
                min="1"
                step="1"
              />
              <ErrorMessage name="numberOfCopies">
                {(msg) => <div className="error-form">{msg}</div>}
              </ErrorMessage>
              <div className="spacer-10"></div>
            </div>
          )}

          {submitSaleState.loading ? (
            <Loader />
          ) : (
            <input
              type="submit"
              id="submit"
              className="btn-main"
              value="SELL"
            />
          )}
          <div className="spacer-10"></div>
          {submitSaleState.error && (
            <Alert text={submitSaleState.error} type={ALERT_TYPE.DANGER} />
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
      render={displayBuyForm}
      validationSchema={SignupSchema}
    />
  );
}
