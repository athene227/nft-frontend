/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo } from 'react';
import { Row, Col, FormLabel } from 'react-bootstrap';
import { Field, Form, Formik, FormikProps } from 'formik';
import { ATTRIBUTE_TYPE } from 'src/enums';

import NftAttribute from './NftAttributes';

interface IProps {
  onClose: () => void;
  submitAttrType: (
    values: { type: ATTRIBUTE_TYPE },
    resetForm: () => void
  ) => void;
}

const AddAttributePopup = (props: IProps) => {
  const { onClose, submitAttrType } = props;

  const getInitialValue = () => ({ type: 'string' });

  const displayCreateCollectionForm = ({
    handleSubmit,
    setFieldValue
  }: FormikProps<any>) => {
    return (
      <Form onSubmit={handleSubmit}>
        <div className="modal-header">
          <h5 className="modal-title">Select Attribute Type</h5>
          <button className="btn-close" onClick={onClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-content">
          <Row>
            <Col
              className=""
              md={3}
              sm={6}
              onClick={() => setFieldValue('type', ATTRIBUTE_TYPE.STRING)}
            >
              <div className="attr-type-container">
                <Field type="radio" name="type" value={ATTRIBUTE_TYPE.STRING} />
                <FormLabel>String</FormLabel>
                <NftAttribute
                  trait_type="Color"
                  value="yellow"
                  display_type={ATTRIBUTE_TYPE.STRING}
                />
              </div>
            </Col>
            <Col
              md={5}
              sm={6}
              onClick={() => setFieldValue('type', ATTRIBUTE_TYPE.DATE)}
            >
              <div className="attr-type-container">
                <Field type="radio" name="type" value={ATTRIBUTE_TYPE.DATE} />
                <FormLabel>Date</FormLabel>
                <NftAttribute
                  trait_type="Birthday"
                  display_type={ATTRIBUTE_TYPE.DATE}
                  value={923546360800}
                />
              </div>
            </Col>
            <Col
              md={4}
              sm={6}
              onClick={() => setFieldValue('type', ATTRIBUTE_TYPE.NUMBER)}
            >
              <div className="attr-type-container">
                <Field type="radio" name="type" value={ATTRIBUTE_TYPE.NUMBER} />
                <FormLabel>Number</FormLabel>
                <NftAttribute
                  trait_type="Eyes"
                  display_type={ATTRIBUTE_TYPE.NUMBER}
                  value={1}
                />
              </div>
            </Col>
            <Col
              sm={6}
              onClick={() => setFieldValue('type', ATTRIBUTE_TYPE.BOOST_NUMBER)}
            >
              <div className="attr-type-container">
                <Field
                  type="radio"
                  name="type"
                  value={ATTRIBUTE_TYPE.BOOST_NUMBER}
                />
                <FormLabel>Boost Number</FormLabel>
                <NftAttribute
                  trait_type="Aqua Power"
                  display_type={ATTRIBUTE_TYPE.BOOST_NUMBER}
                  value={3}
                />
              </div>
            </Col>
            <Col
              sm={6}
              onClick={() =>
                setFieldValue('type', ATTRIBUTE_TYPE.BOOST_PERCENTAGE)
              }
            >
              <div className="attr-type-container">
                <Field
                  type="radio"
                  name="type"
                  value={ATTRIBUTE_TYPE.BOOST_PERCENTAGE}
                />
                <FormLabel>Boost Percentage</FormLabel>
                <NftAttribute
                  trait_type="Stamina Increase"
                  display_type={ATTRIBUTE_TYPE.BOOST_PERCENTAGE}
                  value={10}
                />
              </div>
            </Col>
            <Col
              sm={12}
              onClick={() => setFieldValue('type', ATTRIBUTE_TYPE.RANKING)}
            >
              <div className="attr-type-container">
                <Field
                  type="radio"
                  name="type"
                  value={ATTRIBUTE_TYPE.RANKING}
                />
                <FormLabel>Ranking</FormLabel>
                <NftAttribute
                  trait_type="Level"
                  display_type={ATTRIBUTE_TYPE.RANKING}
                  value={2}
                  max_value={10}
                />
              </div>
            </Col>
          </Row>
          <div className="spacer-20"></div>
          <input
            type="submit"
            id="submit"
            className="btn-main btn_gradient"
            value="Add Attribute"
          />
        </div>
      </Form>
    );
  };

  return (
    <div className="maincheckout add-attr-popup modal-style-1">
      <Formik
        initialValues={getInitialValue()}
        onSubmit={(values, actions) => {
          submitAttrType(values as { type: ATTRIBUTE_TYPE }, actions.resetForm);
        }}
        render={displayCreateCollectionForm}
      />
    </div>
  );
};

export default memo(AddAttributePopup);
