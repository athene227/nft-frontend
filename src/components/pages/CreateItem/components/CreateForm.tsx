/* eslint-disable @typescript-eslint/no-explicit-any */
import 'react-datepicker/dist/react-datepicker.css';

import {
  ErrorMessage,
  Field,
  FieldArray,
  FieldArrayRenderProps,
  Form,
  Formik,
  FormikProps,
  useField,
  useFormikContext
} from 'formik';
import { Switch } from 'formik-material-ui';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import AddAttributePopup from 'src/components/components/AddAttributePopup';
import Alert from 'src/components/components/Alert';
import { categories } from 'src/components/components/constants/filters';
import CreateCollectionPopUp from 'src/components/components/CreateCollectionPopUp';
import Loader from 'src/components/components/Loader';
import NftAttribute from 'src/components/components/NftAttributes';
import PreviewNft from 'src/components/components/PreviewNft';
import {
  ALERT_TYPE,
  ATTRIBUTE_TYPE,
  COIN,
  ERRORS,
  INPUT_ERROS,
  MARKET_TYPE
} from 'src/enums';
import ipfs from 'src/services/ipfs';
import notification from 'src/services/notification';
import {
  createCollection,
  fetchMyCollections
} from 'src/store/actions/thunks/collections';
import * as selectors from 'src/store/selectors';
import { INftAttribute } from 'src/types/nfts.types';
import { IPriceToken } from 'src/types/priceTokens.types';
import { getErrorMessage, getProfileImage } from 'src/utils';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

import { ApiService } from '../../../../core/axios';

interface IProps {
  onChangeImage: (e: any) => void;
  setNameInput: (e: any) => void;
  setDescriptionInput: (e: any) => void;
  setPriceInput: (e: any) => void;
  setTokenType: (e: any) => void;
  setRoyaltiesInput: (e: any) => void;
  setExpirationDateInput: (e: any) => void;
  submit: (values: any, resetForm: () => void) => void;
  onTab: (marketType: MARKET_TYPE) => void;
  setSupply: (e: any) => void;
  setExternalLink: (e: any) => void;
  setExplicit: (e: any) => void;
  submitCreateState: { error: null | string; loading: boolean };
  marketType: MARKET_TYPE;
  multiple: boolean;
  name: string;
  description: string;
  price: number;
  image: string;
  expirationDateInput: string;
  tokentype: string;
  supply: number;
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
    setTokenType,
    setExpirationDateInput,
    onTab,
    setSupply,
    setExternalLink,
    setExplicit,
    multiple,
    name,
    description,
    price,
    image,
    expirationDateInput,
    tokentype,
    supply
  } = props;
  const [priceTokens, setPriceTokens] = useState<Array<IPriceToken>>([]);
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

  const [isSingle, setIsSingle] = useState(true);

  const userState = useSelector(selectors.userState);
  const userDetails = userState.user.data;

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
      supply: Yup.number()
        .moreThan(0, INPUT_ERROS.numberIsLower)
        .required(INPUT_ERROS.requiredField),
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
        .moreThan(0, INPUT_ERROS.numberIsLower)
        .required(INPUT_ERROS.requiredField);
    }
    if (marketType === MARKET_TYPE.AUCTION) {
      shape.minimumBid = Yup.number()
        .moreThan(0, INPUT_ERROS.numberIsLower)
        .required(INPUT_ERROS.requiredField);
    }

    shape.expirationDate = Yup.date()
      .min(moment(new Date()).add(1, 'minutes'), INPUT_ERROS.oneHourMinimun)
      .required(INPUT_ERROS.requiredField);
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

  useEffect(() => {
    const getPriceTokens = async () => {
      const res = await ApiService.getPriceTokens();
      const pricetokens = res.data as Array<IPriceToken>;
      setPriceTokens(pricetokens);
      setTokenType(pricetokens[0].name);
    };
    getPriceTokens();
  }, []);

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
    resetForm: () => void
  ) => {
    const { name, description, imgFile } = data;
    setCreateCollectionState({ loading: true, error: null });
    try {
      if (!imgFile) {
        throw new Error(ERRORS.MISSING_IMAGE);
      }
      const imageUrl: string = (await ipfs.getImageUri(imgFile)) as string;

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
      console.log(
        '🚀 ~ file: CreateForm.tsx ~ line 215 ~ submitCollection ~ error',
        error
      );
      setCreateCollectionState({
        loading: false,
        error: getErrorMessage(error)
      });
    }
  };

  const addAttribute = async (
    values: { type: ATTRIBUTE_TYPE },
    resetForm: () => void
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
      externalLink: '',
      explicit: false,
      category: '',
      price: 0,
      supply: 1,
      royalties: 0,
      minimumBid: 0,
      pricetokentype: priceTokens[0]?.name || 'MTK',
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
    const onChangePriceTokenType = (e: any) => {
      setFieldValue('pricetokentype', e.target.value);
      setTokenType && setTokenType(e.target.value);
    };
    const onChangeExpirationDateInput = (e: any) => {
      setFieldValue('expirationDate', e.target.value);
      setExpirationDateInput && setExpirationDateInput(e.target.value);
    };

    const onChangeSupply = (e: any) => {
      setFieldValue('supply', e.target.value);
      if (e.target.value != '1') {
        setIsSingle(false);
      } else {
        setIsSingle(true);
      }
      setSupply && setSupply(e.target.value);
    };

    const onChangeExternalLink = (e: any) => {
      setFieldValue('externalLink', e.target.value);
      setExternalLink && setExternalLink(e.target.value);
    };

    const onChangeExplicit = (e: any) => {
      setFieldValue('explicit', e.target.checked);
      setExplicit && setExplicit(e.target.checked);
    };
    // const onChangeRoyalties = (e: any) => {
    //     setFieldValue('royalties', e.target.value);
    //     setRoyaltiesInput && setRoyaltiesInput(e.target.value)
    // }
    const collectionsComponent = (props: any) => (
      // <input className="my-custom-input" type="text" {...props} />
      <select id="pet-select" {...props} className={` upload__file`}>
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

    const pricetokenSelectComponent = (props: any) => {
      setTokenType(priceTokens[0]?.name);
      return (
        <select id="pet-select" {...props}>
          {priceTokens?.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
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
              className={`form-control input__holder__single`}
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
                className={`form-control input__holder__single`}
              />
            </Col>
            <Col sm="6">
              <Field
                placeholder="Max Value"
                type="number"
                value={attribute.max_value}
                name={`attributes.${index}.max_value`}
                className={`form-control input__holder__single`}
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
              className={`form-control input__holder__single`}
            />
            <ErrorMessage name={`attributes.${index}.value`}>
              {(msg) => <div className="error-form">{msg}</div>}
            </ErrorMessage>
          </>
        );
      }
      return element;
    };

    const getImageUrl = () => {
      return image || './img/collections/coll-item-3.jpg';
    };

    return (
      <Form
        onSubmit={handleSubmit}
        autoComplete="off"
        className={'form__holder_single'}
      >
        <div className="spacer-30"></div>
        <div>
          <div className="upload-file-field">
            <h5>
              Image, Video, Audio, or 3D Model{' '}
              <span className="span-red">*</span>
            </h5>
            <p>
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
              OGG, GLB, GLTF. <br />
              Max size: 100MB
            </p>
            <div className={`d-create-file upload__file`}>
              <div
                className="col-lg-6 col-sm-8 col-xs-12"
                style={{
                  margin: 'auto',
                  marginBottom: '5%'
                }}
              >
                <PreviewNft
                  imageUrl={getImageUrl()}
                  userImage={getProfileImage(userDetails?.profileImage)}
                  nft={{
                    name,
                    description,
                    price,
                    totalAmount: supply,
                    leftAmount: supply
                  }}
                  tokentype={
                    marketType === MARKET_TYPE.AUCTION ? tokentype : 'ETH'
                  }
                  isPreview={true}
                  multiple={supply == 1 ? false : true}
                  timer={marketType === MARKET_TYPE.AUCTION}
                  marketType={marketType}
                  expirationDateInput={expirationDateInput}
                />
              </div>
              <div className="browse">
                <input
                  type="button"
                  id="get_file"
                  className={`btn-main btn_gradient`}
                  value={image.length == 0 ? 'Choose File' : 'Change File'}
                />
                <input
                  id="upload_file"
                  type="file"
                  multiple
                  onChange={onChangeImage}
                />
                {/* <p>PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</p> */}
              </div>
            </div>
          </div>
          <div className="spacer-50"></div>

          <div className="form-cfield">
            <h5>
              Name <span className="span-red">*</span>
            </h5>
            <Field
              type="text"
              name="name"
              id="item_name"
              className={`form-control input__holder__single`}
              placeholder={'Enter Name'}
              onChange={onChangeName}
            />
            <ErrorMessage name="name">
              {(msg) => <div className="error-form">{msg}</div>}
            </ErrorMessage>

            {/* <div className="spacer-50"></div> */}
          </div>
          <div className="form-cfield">
            <h5>
              Description <span className="span-red">*</span>
            </h5>
            <p>
              The description will be included on the item's detail page
              underneath its image.
            </p>
            <Field
              type="text"
              name="description"
              id="item_Description"
              className={`form-control input__holder__single`}
              placeholder={'Enter Description'}
              onChange={onChangeDescription}
            />
            <ErrorMessage name="description">
              {(msg: string) => <div className="error-form">{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="form-cfield">
            <h5>External link</h5>
            <p>
              NFTonPulse will include a link to this URL on this item's detail
              page, so that users can click to learn more about it. You are
              welcome to link to your own webpage with more details.
            </p>
            <Field
              type="text"
              name="externalLink"
              id="item_externalLink"
              className={`form-control input__holder__single`}
              placeholder={'https://yoursite.io/item/123'}
              onChange={onChangeExternalLink}
            />
            <ErrorMessage name="externalLink">
              {(msg: string) => <div className="error-form">{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="form-cfield">
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
                    className={`form-control input__holder__single`}
                  />
                  <ErrorMessage name="collectionId">
                    {(msg) => <div className="error-form">{msg}</div>}
                  </ErrorMessage>
                </div>
              )}
              <div className="add-collection-field">
                <h5>Add a new Collection</h5>
                <button
                  type="button"
                  className="create-collection"
                  onClick={openCreateCollectionPopup}
                >
                  <span>
                    <strong>
                      <i>+</i>
                      Create
                    </strong>
                  </span>
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
            {/* <div className="spacer-50"></div> */}
          </div>

          <div>
            <h5>Add Properties</h5>
            <div className="form-cfield form-ccfield">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <p className="sublabel">
                    Textual traits that show up as rectangles
                  </p>
                </div>
                <div className="col-md-4 text-right">
                  <button
                    type="button"
                    className="btn-main btn-add"
                    onClick={() => setAddAttributeVisible(true)}
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="property-fields">
                <FieldArray
                  name="attributes"
                  render={(arrayHelpers) => {
                    attrHelper = arrayHelpers;
                    return (
                      <div>
                        {values.attributes.map(
                          (attribute: INftAttribute, index: number) => (
                            <Row key={index} className="mb-2">
                              <span className="form-label">
                                {attribute.display_type.toUpperCase()}:{' '}
                              </span>
                              <Col md="5" className="pr-2">
                                <Field
                                  placeholder="Name"
                                  value={attribute.trait_type}
                                  name={`attributes.${index}.trait_type`}
                                  className={`form-control input__holder__single`}
                                />
                                <ErrorMessage
                                  name={`attributes.${index}.trait_type`}
                                >
                                  {(msg) => (
                                    <div className="error-form">{msg}</div>
                                  )}
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
                                  <i className="fa fa-trash"></i>
                                </button>
                              </Col>
                              <Col md="12" className="property-info-box">
                                <NftAttribute {...attribute} />
                              </Col>
                              <div className="spacer-20" />
                            </Row>
                          )
                        )}
                      </div>
                    );
                  }}
                />
              </div>
            </div>
          </div>

          <div className="form-cfield">
            <h5>Category</h5>
            <Field
              as="select"
              name="category"
              className={`form-control input__holder__single`}
            >
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
            {/* <div className="spacer-20"></div> */}
          </div>

          <div className="form-cfield form-ccfield">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h5>
                  <i
                    className="fa fa-exclamation-triangle"
                    aria-hidden="true"
                  ></i>
                  &nbsp;&nbsp;Explicit & Sensitive Content
                </h5>
                <p className="sublabel">
                  Set this item as explicit and sensitive content&nbsp;&nbsp;
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </p>
              </div>
              <div className="col-md-4 text-right">
                <Field
                  type="checkbox"
                  name="explicit"
                  component={Switch}
                  onChange={onChangeExplicit}
                />
              </div>
            </div>
          </div>

          <div className="spacer-20"></div>
          <h2>List on marketplace</h2>
          <p>Put your new NFT on NFTonPulse marketplace</p>
          <div className="spacer-20"></div>

          <div className="form-cfield">
            <h5>
              Supply <span className="span-red">*</span>
            </h5>
            <p>The number of items that can be minted. No gas cost to you!</p>
            <Field
              type="number"
              name="supply"
              id="item_supply"
              className="form-control input__holder__single"
              placeholder="Enter supply"
              onChange={onChangeSupply}
              onWheel={(e) => e.target.blur()}
              min="1"
              step="1"
            />
            <ErrorMessage name="supply">
              {(msg) => <div className="error-form">{msg}</div>}
            </ErrorMessage>

            <div className="spacer-20"></div>
          </div>

          <div className="de_tab tab_methods marketplace-tabs">
            <ul className={'de_nav dynamic-tab-buttons'}>
              <li
                id="btn1"
                className={marketType === MARKET_TYPE.SIMPLE ? 'active' : ''}
                onClick={() => onTab(MARKET_TYPE.SIMPLE)}
              >
                <span className={`bg__market`}>
                  <strong>
                    <i>
                      <img src="./img/tab-img1.png" />
                    </i>
                    Fixed price
                  </strong>
                </span>
              </li>
              <li
                id="btn2"
                className={
                  isSingle
                    ? marketType === MARKET_TYPE.AUCTION
                      ? 'active'
                      : ''
                    : 'li-disable'
                }
                onClick={() => onTab(MARKET_TYPE.AUCTION)}
              >
                <span>
                  <strong className={isSingle ? '' : 'strong-opacity'}>
                    <i>
                      <img src="./img/tab-img2.png" alt="tab-img" />
                    </i>
                    Timed auction
                  </strong>
                </span>
              </li>
            </ul>
          </div>

          <div className="spacer-20" />

          {marketType === MARKET_TYPE.SIMPLE && (
            <div className="form-cfield">
              <h5>Price</h5>
              <Field
                type="number"
                name="price"
                id="item_price"
                className={`form-control input__holder__single`}
                placeholder={`Enter price for one item (${COIN})`}
                onChange={onChangePrice}
                onWheel={(e) => e.target.blur()}
              />
              <ErrorMessage name="price">
                {(msg) => <div className="error-form">{msg}</div>}
              </ErrorMessage>
              {/* <div className="spacer-20"></div> */}
            </div>
          )}

          <div className="form-cfield">
            <h5>Royalties</h5>
            <Field
              name="royalties"
              as={royaltiesComponent}
              placeholder="First Name"
              className={`form-control input__holder__single`}
            />
            <span className="suggession-box">
              Suggested: 0%, 10%, 20%, 30%. Maximum is 50%
            </span>
            <ErrorMessage name="royalties">
              {(msg) => <div className="error-form">{msg}</div>}
            </ErrorMessage>
          </div>

          {/* <div className="spacer-20"></div> */}

          {marketType === MARKET_TYPE.AUCTION && (
            <div className="form-cfield">
              <h5>Minimum bid</h5>

              <div className="row">
                <div className="col-9">
                  <Field
                    type="text"
                    name="minimumBid"
                    id="item_price_bid"
                    className={`form-control input__holder__single`}
                    placeholder="Enter minimum bid"
                  />
                  <span className="suggession-box">
                    Bids below this amount won’t be allowed.
                  </span>
                </div>
                <div className="col-3">
                  <Field
                    name="pricetokentype"
                    as={pricetokenSelectComponent}
                    placeholder="PriceTokenType"
                    className={`form-control input__holder__single`}
                    onChange={onChangePriceTokenType}
                  />
                </div>
              </div>
              <ErrorMessage name="minimumBid">
                {(msg) => <div className="error-form">{msg}</div>}
              </ErrorMessage>

              {/* <div className="spacer-10"></div> */}
            </div>
          )}

          {/* {marketType === MARKET_TYPE.AUCTION && ( */}
          <div className="form-cfield">
            <h5>Expiration date</h5>

            <Field
              type="datetime-local"
              name="expirationDate"
              id="bid_expiration_date"
              className={`form-control input__holder__single`}
              onChange={onChangeExpirationDateInput}
              min={moment().add(1, 'hours')}
            />
            <ErrorMessage name="expirationDate">
              {(msg) => <div className="error-form">{msg}</div>}
            </ErrorMessage>
          </div>
          {/* )} */}
          <div className="spacer-20"></div>
          {submitCreateState.loading ? (
            <Loader />
          ) : (
            <input
              type="submit"
              id="submit"
              className="btn-main btn-main-submit"
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
    <div className="nft-create-form ">
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
          const obj = priceTokens?.find(
            (item) => item.name === values.pricetokentype
          );
          submit({ ...values, priceTokenId: obj?._id }, actions.resetForm);
        }}
        render={displayCreateSingleForm}
        validationSchema={SignupSchema}
      />
    </div>
  );
}
