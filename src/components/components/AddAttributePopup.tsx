import React, { memo } from 'react';
import { Row, Col, FormLabel } from 'react-bootstrap';
import { Field, Form, Formik, FormikProps } from 'formik';
import NftAttribute from './NftAttributes';
import { ATTRIBUTE_TYPE } from 'src/enums';

interface IProps {
  onClose: () => void;
  submitAttrType: (values: { type: string }, resetForm: Function) => void;
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
        <button className="btn-close" onClick={onClose}>
          x
        </button>
        <div className="heading">
          <h3>Select Attribute Type</h3>
        </div>
        <div className="container">
          <Row>
            <Col
              className="attr-type-container"
              md={3}
              sm={6}
              onClick={() => setFieldValue('type', ATTRIBUTE_TYPE.STRING)}
            >
              <Field type="radio" name="type" value={ATTRIBUTE_TYPE.STRING} />
              <FormLabel>String</FormLabel>
              <NftAttribute
                trait_type="Color"
                value="yellow"
                display_type={ATTRIBUTE_TYPE.STRING}
              />
            </Col>
            <Col
              className="attr-type-container"
              md={5}
              sm={6}
              onClick={() => setFieldValue('type', ATTRIBUTE_TYPE.DATE)}
            >
              <Field type="radio" name="type" value={ATTRIBUTE_TYPE.DATE} />
              <FormLabel>Date</FormLabel>
              <NftAttribute
                trait_type="Birthday"
                display_type={ATTRIBUTE_TYPE.DATE}
                value={923546360800}
              />
            </Col>
            <Col
              className="attr-type-container"
              md={4}
              sm={6}
              onClick={() => setFieldValue('type', ATTRIBUTE_TYPE.NUMBER)}
            >
              <Field type="radio" name="type" value={ATTRIBUTE_TYPE.NUMBER} />
              <FormLabel>Number</FormLabel>
              <NftAttribute
                trait_type="Eyes"
                display_type={ATTRIBUTE_TYPE.NUMBER}
                value={1}
              />
            </Col>
            <Col
              className="attr-type-container"
              sm={6}
              onClick={() => setFieldValue('type', ATTRIBUTE_TYPE.BOOST_NUMBER)}
            >
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
            </Col>
            <Col
              className="attr-type-container"
              sm={6}
              onClick={() =>
                setFieldValue('type', ATTRIBUTE_TYPE.BOOST_PERCENTAGE)
              }
            >
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
            </Col>
            <Col
              className="attr-type-container"
              sm={12}
              onClick={() => setFieldValue('type', ATTRIBUTE_TYPE.RANKING)}
            >
              <Field type="radio" name="type" value={ATTRIBUTE_TYPE.RANKING} />
              <FormLabel>Ranking</FormLabel>
              <NftAttribute
                trait_type="Level"
                display_type={ATTRIBUTE_TYPE.RANKING}
                value={2}
                max_value={10}
              />
            </Col>
          </Row>
          <div className="spacer-20"></div>
        </div>
        <input
          type="submit"
          id="submit"
          className="btn-main"
          value="Add Attribute"
        />
      </Form>
    );
  };

  return (
    <div className="maincheckout add-attr-popup">
      <Formik
        initialValues={getInitialValue()}
        onSubmit={(values, actions) => {
          submitAttrType(values, actions.resetForm);
        }}
        render={displayCreateCollectionForm}
      />
    </div>
  );
};

export default memo(AddAttributePopup);
