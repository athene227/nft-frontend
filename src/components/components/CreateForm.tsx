import React, { useState, useEffect } from 'react';
import {
  Field,
  Form,
  Formik,
  FormikProps,
  ErrorMessage,
  FieldArray,
  FieldArrayRenderProps,
  useFormikContext,
  useField
} from 'formik';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import {
  ALERT_TYPE,
  ATTRIBUTE_TYPE,
  COIN,
  ERRORS,
  INPUT_ERROS,
  MARKET_TYPE
} from 'src/enums';
import Loader from 'src/components/components/Loader';
import Alert from './Alert';
import CreateCollectionPopUp from './CreateCollectionPopUp';
import { getErrorMessage } from 'src/utils';
import {
  fetchMyCollections,
  createCollection
} from 'src/store/actions/thunks/collections';
import ipfs from 'src/services/ipfs';
import * as selectors from '../../store/selectors';
import notification from 'src/services/notification';
import NftAttribute from './NftAttributes';
import AddAttributePopup from './AddAttributePopup';
import { INftAttribute } from 'src/types/nfts.types';
import 'react-datepicker/dist/react-datepicker.css';
import { categories } from 'src/components/components/constants/filters';

interface IProps {
  onChangeImage: (e: any) => void;
  setNameInput: (e: any) => void;
  setDescriptionInput: (e: any) => void;
  setPriceInput: (e: any) => void;
  setNumberOfCopiesInput: (e: any) => void;
  setRoyaltiesInput: (e: any) => void;
  setExpirationDateInput: (e: any) => void;
  submit: (values: any, resetForm: Function) => void;
  submitCreateState: { error: null | string; loading: boolean };
  marketType: MARKET_TYPE;
  multiple: boolean;
}

export default function CreateForm(props: IProps) {
  const {
    marketType,
    submit,
    submitCreateState,
    onChangeImage,
    setNameInput,
    setDescriptionInput,
    setPriceInput,
    setNumberOfCopiesInput,
    setExpirationDateInput,
    multiple
  } = props;
  const [openCreateCollection, setCreateCollection] = useState(false);
  const [createCollectionState, setCreateCollectionState] = useState({
    error: null,
    loading: false
  });
  const [openAddAttribute, setAddAttributeVisible] = useState(false);
  const web3State = useSelector(selectors.web3State);
  const { accounts, web3 } = web3State.web3.data;
  const userAddress = accounts[0];
  const collectionsState = useSelector(selectors.collectionsState);
  const dispatch = useDispatch();
  let attrHelper: FieldArrayRenderProps;

  const getShape = () => {
    const shape: any = {
      name: Yup.string()
        .min(2, INPUT_ERROS.tooShort)
        .max(50, INPUT_ERROS.tooLong)
        .required(INPUT_ERROS.requiredField),
      description: Yup.string()
        .min(2, INPUT_ERROS.tooShort)
        .max(250, INPUT_ERROS.tooLong)
        .required(INPUT_ERROS.requiredField),
      collectionId: Yup.string()
        .min(2, INPUT_ERROS.tooShort)
        .max(250, INPUT_ERROS.tooLong),
      numberOfCopies: Yup.number().typeError('you must specify a number'),
      royalties: Yup.number().typeError('you must specify a number'),
      category: Yup.string(),
      attributes: Yup.array().of(
        Yup.object().shape({
          trait_type: Yup.string().required('Property Name is required.'),
          value: Yup.mixed()
            .required('Property Value is required.')
            .test({
              name: 'max',
              exclusive: false,
              test: function (value) {
                const { display_type, max_value } = this.parent;

                if (
                  display_type === ATTRIBUTE_TYPE.RANKING &&
                  value > max_value
                ) {
                  if (max_value) {
                    return this.createError({
                      message: 'Value should be less than max.'
                    });
                  } else {
                    return this.createError({
                      message: 'Max Value is required'
                    });
                  }
                } else if (
                  display_type === ATTRIBUTE_TYPE.BOOST_PERCENTAGE &&
                  value > 100
                ) {
                  return this.createError({
                    message: 'Value should be less than 100.'
                  });
                }
                return true;
              }
            })
        })
      )
    };
    if (marketType === MARKET_TYPE.SIMPLE) {
      shape.price = Yup.number()
        .typeError('you must specify a number')
        .moreThan(0, INPUT_ERROS.tooShort)
        .required(INPUT_ERROS.requiredField)
        .required(INPUT_ERROS.requiredField);
    }
    if (marketType === MARKET_TYPE.AUCTION) {
      shape.minimumBid = Yup.number()
        .moreThan(0, INPUT_ERROS.tooShort)
        .required(INPUT_ERROS.requiredField);
      shape.expirationDate = Yup.date()
        .min(moment(new Date()).add(1, 'minutes'), INPUT_ERROS.oneHourMinimun)
        .required(INPUT_ERROS.requiredField);
    }
    return shape;
  };

  const SignupSchema = Yup.object().shape(getShape());

  const getMyCollections = () => {
    dispatch(fetchMyCollections({ userAddress }));
  };

  useEffect(() => {
    if (userAddress) {
      getMyCollections();
    }
  }, [userAddress]);

  // const getFormData = (data: any) => {
  //   console.log('data===>', data);

  //   const formData = new FormData();

  //   formData.append("firstName", data.firstName);
  //   formData.append("lastName", data.lastName);
  //   formData.append("username", data.username);
  //   formData.append("address", accounts[0]);

  //   if (data.selectedImage) {
  //     // formData.append(IMAGES_NAMES.PROFILE_IMAGE, data.selectedImage);
  //   }
  //   return formData
  // }

  const submitCollection = async (
    data: {
      name: string;
      description: string;
      imgFile: File | null;
    },
    resetForm: Function
  ) => {
    const { name, description, imgFile } = data;
    setCreateCollectionState({ loading: true, error: null });
    try {
      if (!imgFile) {
        throw new Error(ERRORS.MISSING_IMAGE);
      }
      const imageUrl = await ipfs.getImageUri(imgFile);

      // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      const id = uuidv4();
      dispatch(
        createCollection({
          id,
          name,
          description,
          imageUrl,
          userAddress
        })
      );
      closeCreateCollectionPopup();
      setCreateCollectionState({ loading: false, error: null });
    } catch (error) {
      console.log('error in submitCollection ', error);
      setCreateCollectionState({
        loading: false,
        error: getErrorMessage(error)
      });
    }
  };

  const addAttribute = async (
    values: { type: ATTRIBUTE_TYPE },
    resetForm: Function
  ) => {
    const { type } = values;
    const newValue: any = { trait_type: '' };

    setAddAttributeVisible(false);
    if (!attrHelper) return;
    newValue.display_type = type;
    if (type === ATTRIBUTE_TYPE.RANKING) {
      newValue.value = 0;
      newValue.max_value = 1;
    } else if (type !== ATTRIBUTE_TYPE.STRING) {
      newValue.value = 0;
    }

    attrHelper.push(newValue);
  };

  const getInitialValue = () => {
    const result = {
      name: '',
      description: '',
      collectionId: '',
      category: '',
      price: 0,
      numberOfCopies: 0,
      royalties: 0,
      minimumBid: 0,
      expirationDate: '',
      attributes: []
    };
    return result;
  };

  const openCreateCollectionPopup = () => {
    if (!web3) {
      notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
      return;
    }
    setCreateCollection(true);
  };

  const closeCreateCollectionPopup = () => {
    setCreateCollection(false);
  };
  const displayCreateSingleForm = ({
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
    const onChangeName = (e: any) => {
      setFieldValue('name', e.target.value);
      setNameInput && setNameInput(e.target.value);
    };
    const onChangeDescription = (e: any) => {
      setFieldValue('description', e.target.value);
      setDescriptionInput && setDescriptionInput(e.target.value);
    };
    const onChangePrice = (e: any) => {
      setFieldValue('price', e.target.value);
      setPriceInput && setPriceInput(e.target.value);
    };
    const onChangeNumberOfCopies = (e: any) => {
      setFieldValue('numberOfCopies', e.target.value);
      setNumberOfCopiesInput && setNumberOfCopiesInput(e.target.value);
    };
    const onChangeExpirationDateInput = (e: any) => {
      setFieldValue('expirationDate', e.target.value);
      setExpirationDateInput && setExpirationDateInput(e.target.value);
    };
    // const onChangeRoyalties = (e: any) => {
    //     setFieldValue('royalties', e.target.value);
    //     setRoyaltiesInput && setRoyaltiesInput(e.target.value)
    // }
    const collectionsComponent = (props: any) => (
      // <input className="my-custom-input" type="text" {...props} />
      <select id="pet-select" {...props}>
        {[
          <option onClick={openCreateCollectionPopup} key={''} value={''}>
            Choose Collection
          </option>,
          ...collectionsState.myCollections.data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))
        ]}
      </select>
    );

    const royaltiesComponent = (props: any) => {
      const list = [0, 5, 10, 15, 20, 25];
      return (
        <select id="pet-select" {...props}>
          {list.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      );
    };
    const DatePickerField = (props: any) => {
      const { ...fieldProps } = props;
      const { setFieldValue } = useFormikContext();
      const [field] = useField(fieldProps);
      // opensea uses unix timestamp(seconds)
      return (
        <DatePicker
          {...field}
          {...props}
          selected={(field.value && new Date(field.value * 1000)) || null}
          onChange={(val: Date) => {
            setFieldValue(field.name, val.getTime() / 1000);
          }}
        />
      );
    };

    const getNftAttrValueInput = (attribute: INftAttribute, index: number) => {
      const attrType = attribute.display_type;
      let element;
      if (attrType === ATTRIBUTE_TYPE.STRING) {
        element = (
          <>
            <Field
              placeholder="Value"
              value={attribute.value}
              name={`attributes.${index}.value`}
              className="form-control"
            />
            <ErrorMessage name={`attributes.${index}.value`}>
              {(msg) => <div className="error-form">{msg}</div>}
            </ErrorMessage>
          </>
        );
      } else if (attrType === ATTRIBUTE_TYPE.DATE) {
        element = <DatePickerField name={`attributes.${index}.value`} />;
      } else if (attrType === ATTRIBUTE_TYPE.RANKING) {
        element = (
          <Row>
            <Col sm="6">
              <Field
                placeholder="Value"
                type="number"
                value={attribute.value}
                name={`attributes.${index}.value`}
                className="form-control"
              />
            </Col>
            <Col sm="6">
              <Field
                placeholder="Max Value"
                type="number"
                value={attribute.max_value}
                name={`attributes.${index}.max_value`}
                className="form-control"
              />
            </Col>
            <ErrorMessage name={`attributes.${index}.value`}>
              {(msg) => <div className="error-form">{msg}</div>}
            </ErrorMessage>
          </Row>
        );
      } else if (attrType) {
        element = (
          <>
            <Field
              placeholder="Value"
              type="number"
              value={attribute.value}
              name={`attributes.${index}.value`}
              className="form-control"
            />
            <ErrorMessage name={`attributes.${index}.value`}>
              {(msg) => <div className="error-form">{msg}</div>}
            </ErrorMessage>
          </>
        );
      }
      return element;
    };

    return (
      <Form onSubmit={handleSubmit} autoComplete="off">
        <div className="spacer-30"></div>
        <div>
          <h5>Upload file</h5>
          <div className="d-create-file">
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
            placeholder={'enter name'}
            onChange={onChangeName}
          />
          <ErrorMessage name="name">
            {(msg) => <div className="error-form">{msg}</div>}
          </ErrorMessage>

          <div className="spacer-20"></div>

          <h5>Description</h5>
          <Field
            type="text"
            name="description"
            id="item_Description"
            className="form-control"
            placeholder={'enter description'}
            onChange={onChangeDescription}
          />
          <ErrorMessage name="description">
            {(msg: string) => <div className="error-form">{msg}</div>}
          </ErrorMessage>
          <div>
            <h5>Category</h5>
            <Field as="select" name="category" className="form-control">
              <option key={''} value={''}>
                {' '}
                Choose Category
              </option>
              {categories.map((category, index) => (
                <option value={category.value} key={index}>
                  {category.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="category">
              {(msg: string) => <div className="error-form">{msg}</div>}
            </ErrorMessage>
          </div>
          <div className="spacer-20"></div>
          <div style={{ display: 'flex' }}>
            {collectionsState.myCollections.data.length > 0 && (
              <div style={{ marginRight: 50 }}>
                <h5>Choose collection</h5>
                <p className="p-info">
                  This is the collection where your item will appear.
                </p>

                <Field
                  name="collectionId"
                  as={collectionsComponent}
                  placeholder="Select Collection"
                  className="form-control"
                />
                <ErrorMessage name="collectionId">
                  {(msg) => <div className="error-form">{msg}</div>}
                </ErrorMessage>
              </div>
            )}
            <div>
              <h5>Add a New Collection</h5>
              <button
                type="button"
                className="create-collection"
                onClick={openCreateCollectionPopup}
              >
                <img src="./img/misc/grey-coll-single.png" alt="" />
                <h3>Create</h3>
              </button>
              {/* <div>
                    {collectionsState.myCollections.data.map(item =>
                        <button className={`create-collection`}
                        style={{ backgroundColor: selectedCollectionId === item._id ? 'red' : '' }}
                        onClick={() => selectCollection(item._id)}>
                        <img src="./img/misc/grey-coll-single.png" alt="" />
                        <h3>{item.name}</h3>
                        </button>
                        )}
                    </div> */}
            </div>
          </div>
          <div className="spacer-20"></div>
          {multiple && (
            <div>
              <h5>Number Of Copies</h5>
              <input
                type="number"
                name="numberOfCopies"
                id="numberOfCopies"
                className="form-control"
                placeholder="enter Number Of Copies"
                onChange={onChangeNumberOfCopies}
                min="1"
                step="1"
              />
              <ErrorMessage name="numberOfCopies">
                {(msg) => <div className="error-form">{msg}</div>}
              </ErrorMessage>

              <div className="spacer-20"></div>
            </div>
          )}
          {marketType === MARKET_TYPE.SIMPLE && (
            <div>
              <h5>Price</h5>
              <Field
                type="number"
                name="price"
                id="item_price"
                className="form-control"
                placeholder={`enter price for one item (${COIN})`}
                onChange={onChangePrice}
              />
              <ErrorMessage name="price">
                {(msg) => <div className="error-form">{msg}</div>}
              </ErrorMessage>
              <div className="spacer-20"></div>
            </div>
          )}

          <div>
            <h5>Royalties</h5>
            <Field
              name="royalties"
              as={royaltiesComponent}
              placeholder="First Name"
              className="form-control"
            />
            <ErrorMessage name="royalties">
              {(msg) => <div className="error-form">{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="spacer-20"></div>

          {marketType === MARKET_TYPE.AUCTION && (
            <div>
              <h5>Minimum bid</h5>
              <Field
                type="text"
                name="minimumBid"
                id="item_price_bid"
                className="form-control"
                placeholder="enter minimum bid"
              />
              <ErrorMessage name="minimumBid">
                {(msg) => <div className="error-form">{msg}</div>}
              </ErrorMessage>

              <div className="spacer-10"></div>
            </div>
          )}

          {marketType === MARKET_TYPE.AUCTION && (
            <div>
              <h5>Expiration date</h5>
              <Field
                type="datetime-local"
                name="expirationDate"
                id="bid_expiration_date"
                className="form-control"
                onChange={onChangeExpirationDateInput}
                min={moment().add(1, 'hours')}
              />
              <ErrorMessage name="expirationDate">
                {(msg) => <div className="error-form">{msg}</div>}
              </ErrorMessage>
            </div>
          )}
          <h5>Add Properties</h5>
          <FieldArray
            name="attributes"
            render={(arrayHelpers) => {
              attrHelper = arrayHelpers;
              return (
                <div>
                  {values.attributes.map(
                    (attribute: INftAttribute, index: number) => (
                      <Row key={index} className="mb-2">
                        <span>{attribute.display_type.toUpperCase()}: </span>
                        <div className="spacer-10" />
                        <Col md="5" className="pr-2">
                          <Field
                            placeholder="Name"
                            value={attribute.trait_type}
                            name={`attributes.${index}.trait_type`}
                            className="form-control"
                          />
                          <ErrorMessage name={`attributes.${index}.trait_type`}>
                            {(msg) => <div className="error-form">{msg}</div>}
                          </ErrorMessage>
                        </Col>
                        <Col md="5" className="pr-2">
                          {getNftAttrValueInput(attribute, index)}
                        </Col>
                        <Col md="2" lg="1" className="text-center">
                          <button
                            type="button"
                            className="btn-main btn-remove"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </button>
                        </Col>
                        <Col md="12">
                          <NftAttribute {...attribute} />
                        </Col>
                        <div className="sapcer-20" />
                      </Row>
                    )
                  )}
                  <button
                    type="button"
                    className="btn-main btn-add"
                    onClick={() => setAddAttributeVisible(true)}
                  >
                    +
                  </button>
                </div>
              );
            }}
          />

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
    <div className="nft-create-form">
      {openCreateCollection && (
        <div className="checkout">
          <CreateCollectionPopUp
            onClose={closeCreateCollectionPopup}
            submitCollection={submitCollection}
            createCollectionState={createCollectionState}
          />
        </div>
      )}
      {openAddAttribute && (
        <div className="checkout">
          <AddAttributePopup
            onClose={() => setAddAttributeVisible(false)}
            submitAttrType={addAttribute}
          />
        </div>
      )}
      <Formik
        initialValues={getInitialValue()}
        onSubmit={(values, actions) => {
          submit(values, actions.resetForm);
        }}
        render={displayCreateSingleForm}
        validationSchema={SignupSchema}
      />
    </div>
  );
}
