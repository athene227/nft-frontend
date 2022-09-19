/* eslint-disable @typescript-eslint/no-explicit-any */
import 'react-datepicker/dist/react-datepicker.css';

import { createTheme } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { withStyles } from '@mui/styles';
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
import Table from 'react-bootstrap/Table';
import DatePicker from 'react-datepicker';
import { BsQuestion } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import AddAttributePopup from 'src/components/components/AddAttributePopup';
import Alert from 'src/components/components/Alert';
import { categories } from 'src/components/components/constants/filters';
import CreateCollectionPopUp from 'src/components/components/CreateCollectionPopUp';
import Loader from 'src/components/components/Loader';
import NftAttribute from 'src/components/components/NftAttributes';
import PreviewNft from 'src/components/components/PreviewNft';
import PreviewNftImage from 'src/components/components/PreviewNftImage';
import {
  ALERT_TYPE,
  ATTRIBUTE_TYPE,
  COIN,
  ERRORS,
  INPUT_ERROS,
  MARKET_TYPE
} from 'src/enums';
import ipfs from 'src/services/ipfs';
import { getImage } from 'src/services/ipfs';
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

import BidIcon from '../../../../assets/images/bid-icon.svg';
import CollectionImg from '../../../../assets/images/collection-img.png';
import { ReactComponent as CrossIcon } from '../../../../assets/images/icon/cross-icon.svg';
import { ReactComponent as IconExc } from '../../../../assets/images/icon/icon-exc.svg';
import { ReactComponent as IconLock } from '../../../../assets/images/icon/icon-lock.svg';
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
    className,
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
  // switch styling

  // switch styling

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
      <select
        id="pet-select"
        {...props}
        className={`form-control input__holder__single`}
      >
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
    const [selectCollection, setselectCollection] = React.useState('');

    const handleChanges = (event: SelectChangeEvent) => {
      console.log('Collection Value', event.target.value);
      setselectCollection(event.target.value as string);
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
    const [profileImage, setProfileImage] = useState(false);
    const getImageUrl = () => {
      return image || './img/collections/coll-item-3.png';
    };

    //   const MySwitch = withStyles({
    //     root: {

    //     },
    //     switchBase: {
    //         // thumb when unchecked
    //         color: "orange",
    //         opacity: 0.8,
    //         "&$checked": {
    //             // thumb when checked
    //             color: "orange",
    //             opacity: 1,
    //             // track when checked
    //             "& + $track": {
    //                 backgroundColor: "black",
    //                 opacity: 1,
    //             },
    //             // The rules above override the default rules for graying
    //             // out the thumb and track when the switch is disabled,
    //             // so we have to add that back in ourselves
    //             "&$disabled": {
    //                 // gray out the thumb
    //                 color: "#bbb",
    //                 "& + $track": {
    //                     // gray out the track
    //                     backgroundColor: "#ddd"
    //                 }
    //             }
    //         },
    //     },
    //     thumb: {

    //     },
    //     checked: {},
    //     track: {
    //       borderRadius: 26 / 2,
    //       border: `1px solid gray`,
    //       backgroundColor: 'gray',
    //       opacity: 1,
    //     },
    //     disabled: {}
    // })(Switch);

    return (
      <>
        <div className="row">
          <div className="col-lg-7 create-single-left  mb-5">
            <Form
              onSubmit={handleSubmit}
              autoComplete="off"
              className={'form__holder_single'}
            >
              <div>
                <div className="upload-file-field">
                  <h5>
                    Upload File {/* <span className="span-red">*</span> */}
                  </h5>
                  {/* <p>
                    File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                    OGG, GLB, GLTF. <br />
                    Max size: 100MB
                  </p> */}
                  {getImageUrl() != './img/collections/coll-item-3.png' && (
                    <div className="upload-image-main">
                      <PreviewNftImage
                        imageUrl={getImageUrl()}
                        userImage={getProfileImage(userDetails?.profileImage)}
                      />
                    </div>
                  )}

                  {profileImage === false &&
                    getImageUrl() == './img/collections/coll-item-3.png' && (
                      <div className={`d-create-file upload__file`}>
                        <div
                          className="col-lg-6 col-sm-8 col-xs-12"
                          style={{
                            margin: 'auto',
                            marginBottom: '5%'
                          }}
                        ></div>
                        <div className="browse">
                          <input
                            type="button"
                            id="get_file"
                            className={`btn-main btn_gradient`}
                            value={
                              image.length == 0 ? 'Choose File' : 'Change File'
                            }
                          />
                          <input
                            id="upload_file"
                            type="file"
                            multiple
                            onChange={onChangeImage}
                          />
                          <p>PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</p>
                        </div>
                      </div>
                    )}
                </div>
                <div className="form-cfield">
                  <h5 className="form-label">
                    Name <span className="span-red">*</span>
                  </h5>
                  <div className="input-container input-icon-container">
                    <Field
                      type="text"
                      name="name"
                      id="item_name"
                      className={`form-control input__holder__single`}
                      placeholder={'e.g. “ Name your NFT”'}
                      onChange={onChangeName}
                    />
                    <BsQuestion className="cursor-pointer input-icon help-icon" />
                  </div>
                  <ErrorMessage name="name">
                    {(msg) => <div className="error-form">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="form-cfield">
                  <h5 className="form-label label-sub">Description</h5>
                  <p className="sublabel">
                    The description will be included on the item's detail page
                    underneath its image.
                  </p>
                  <div className="input-container">
                    <Field
                      type="text"
                      name="description"
                      id="item_Description"
                      className={`form-control input__holder__single textarea`}
                      placeholder={'e.g. “ Describe your NFT ”'}
                      onChange={onChangeDescription}
                      as="textarea"
                    />
                  </div>
                  <ErrorMessage name="description">
                    {(msg: string) => <div className="error-form">{msg}</div>}
                  </ErrorMessage>
                </div>

                <div className="form-cfield">
                  <div className="create-collection-control">
                    {collectionsState.myCollections.data.length > 0 && (
                      <div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h5 className="form-label label-sub label-icon">
                              Collection
                              <BsQuestion className="cursor-pointer help-icon" />
                            </h5>
                            <p className="p-info">
                              This is a folder for your NFT.
                            </p>
                          </div>
                          <button
                            type="button"
                            className="btn-main btn-grad create-collection"
                            onClick={openCreateCollectionPopup}
                          >
                            + Create simple collection
                          </button>
                        </div>
                        <div className="form-control-select">
                          <FormControl fullWidth className="teset">
                            <Select
                              className="collection-select-list"
                              value={selectCollection}
                              onChange={handleChanges}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem
                                className="form-control-item"
                                key={''}
                                value={''}
                              >
                                Select Collection
                              </MenuItem>
                              {[
                                ...collectionsState.myCollections.data.map(
                                  (item) => (
                                    <MenuItem
                                      key={item.id}
                                      value={item}
                                      className="form-control-item"
                                    >
                                      <img src={CollectionImg} />
                                      {item.name}
                                    </MenuItem>
                                  )
                                )
                              ]}
                              {/* <MenuItem
                                className="form-control-item"
                                value="Lorem Ipsum 1"
                              >
                                <img src={CollectionImg} />
                                Untitled collection #23487892
                              </MenuItem>
                              <MenuItem
                                className="form-control-item"
                                value="Lorem Ipsum 2"
                              >
                                <img src={CollectionImg} />
                                Untitled collection #23487892
                              </MenuItem> */}
                            </Select>
                          </FormControl>
                        </div>

                        <ErrorMessage name="collectionId">
                          {(msg) => <div className="error-form">{msg}</div>}
                        </ErrorMessage>
                      </div>
                    )}
                  </div>
                  {/* <div className="spacer-50"></div> */}
                </div>
                <div className="form-cfield">
                  <h5 className="form-label label-sub">External link</h5>
                  <p className="sublabel">
                    NFTonPulse will include a link to this URL on this item's
                    detail page, so that users can click to learn more about it.
                    You are welcome to link to your own webpage with more
                    details.
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

                <div className="form-field-details">
                  <div className="form-cfield form-ccfield">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <h5 className="form-label">Properties</h5>
                        <p className="sublabel">
                          Textual traits that show up as rectangles
                        </p>
                      </div>
                      <div className="col-md-4 text-right">
                        <button
                          type="button"
                          className="btn-main btn-add text-uppercase cursor-pointer"
                          onClick={() => setAddAttributeVisible(true)}
                        >
                          + Add more
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="attribute-fields">
                    <div className="attribute-fields-property">
                      <div className="attribute-field-property">
                        <div className="nft-attr-normal">
                          <div className="nft-attr-name">Eye Colour</div>
                          <div className="nft-attr-value">Blue</div>
                        </div>
                      </div>
                      <div className="attribute-field-property">
                        <div className="nft-attr-normal">
                          <div className="nft-attr-name">Legs</div>
                          <div className="nft-attr-value">Yellow</div>
                        </div>
                      </div>
                      <div className="attribute-field-property">
                        <div className="nft-attr-normal">
                          <div className="nft-attr-name">Hand</div>
                          <div className="nft-attr-value">Black</div>
                        </div>
                      </div>
                      <div className="attribute-field-property">
                        <div className="nft-attr-normal">
                          <div className="nft-attr-name">Head</div>
                          <div className="nft-attr-value">Big</div>
                        </div>
                      </div>
                      <div className="attribute-field-property">
                        <div className="nft-attr-normal">
                          <div className="nft-attr-name">Tail</div>
                          <div className="nft-attr-value">Long</div>
                        </div>
                      </div>
                      <div className="attribute-field-property">
                        <div className="nft-attr-normal">
                          <div className="nft-attr-name"></div>
                          <div className="nft-attr-value"></div>
                        </div>
                      </div>
                    </div>
                    <div className="attribute-editable-property">
                      <Table>
                        <thead>
                          <tr>
                            <th width={265}>Name</th>
                            <th width={280}>Values</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <Field
                                type="text"
                                name="color"
                                id=""
                                className={`form-control input__holder__single`}
                                placeholder={'Eye Colour'}
                              />
                            </td>
                            <td>
                              <Field
                                type="text"
                                name="colorvalue"
                                className={`form-control input__holder__single`}
                                placeholder={'Blue'}
                              />
                            </td>
                            <td className="actions">
                              <a className="icon-custom" href="#">
                                <CrossIcon />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Field
                                type="text"
                                name="color"
                                id=""
                                className={`form-control input__holder__single`}
                                placeholder={'Legs'}
                              />
                            </td>
                            <td>
                              <Field
                                type="text"
                                name="colorvalue"
                                className={`form-control input__holder__single`}
                                placeholder={'Yellow'}
                              />
                            </td>
                            <td className="actions">
                              <a className="icon-custom" href="#">
                                <CrossIcon />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Field
                                type="text"
                                name="color"
                                id=""
                                className={`form-control input__holder__single`}
                                placeholder={'Hand'}
                              />
                            </td>
                            <td>
                              <Field
                                type="text"
                                name="colorvalue"
                                className={`form-control input__holder__single`}
                                placeholder={'Black'}
                              />
                            </td>
                            <td className="actions">
                              <a className="icon-custom" href="#">
                                <CrossIcon />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Field
                                type="text"
                                name="color"
                                id=""
                                className={`form-control input__holder__single`}
                                placeholder={'Head'}
                              />
                            </td>
                            <td>
                              <Field
                                type="text"
                                name="colorvalue"
                                className={`form-control input__holder__single`}
                                placeholder={'Big'}
                              />
                            </td>
                            <td className="actions">
                              <a className="icon-custom" href="#">
                                <CrossIcon />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Field
                                type="text"
                                name="color"
                                id=""
                                className={`form-control input__holder__single`}
                                placeholder={'Tail'}
                              />
                            </td>
                            <td>
                              <Field
                                type="text"
                                name="colorvalue"
                                className={`form-control input__holder__single`}
                                placeholder={'Long'}
                              />
                            </td>
                            <td className="actions">
                              <a className="icon-custom" href="#">
                                <CrossIcon />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Field
                                type="text"
                                name="color"
                                id=""
                                className={`form-control input__holder__single`}
                                placeholder={'Type'}
                              />
                            </td>
                            <td>
                              <Field
                                type="text"
                                name="colorvalue"
                                className={`form-control input__holder__single`}
                                placeholder={'Name'}
                              />
                            </td>
                            <td className="actions">
                              <a className="icon-custom" href="#">
                                <CrossIcon />
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      <div className="editable-buttons d-flex justify-content-between">
                        <button
                          type="button"
                          className="btn-main btn-add btn-grad cursor-pointer"
                          onClick={() => setAddAttributeVisible(true)}
                        >
                          +
                        </button>
                        <button
                          width="40px"
                          type="button"
                          className="btn-main btn-save btn-grad cursor-pointer"
                          onClick={() => setAddAttributeVisible(true)}
                        >
                          Save
                        </button>
                      </div>
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

                {/* Form field stats */}
                <div className="form-field-details">
                  <div className="form-cfield form-ccfield">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <h5 className="form-label">Stats</h5>
                        <p className="sublabel">
                          Numerical traits that show as numbers
                        </p>
                      </div>
                      <div className="col-md-4 text-right">
                        <button
                          type="button"
                          className="btn-main btn-add text-uppercase cursor-pointer"
                          onClick={() => setAddAttributeVisible(true)}
                        >
                          + Add more
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="attribute-fields">
                    <div className="attribute-fields-property attribute-fields-stat">
                      <div className="attribute-field-stat">
                        <div className="nft-attr-ranking ">
                          <div className="attr-ranking-details d-flex justify-content-between">
                            <span className="nft-attr-name">Speed</span>
                            <span className="nft-attr-value">3 of 5</span>
                          </div>
                          <div className="progress">
                            <div
                              role="progressbar"
                              className="progress-bar"
                              aria-valuenow="10"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ width: '10%' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="attribute-field-stat">
                        <div className="nft-attr-ranking ">
                          <div className="attr-ranking-details d-flex justify-content-between">
                            <span className="nft-attr-name">Power</span>
                            <span className="nft-attr-value">4 of 5</span>
                          </div>
                          <div className="progress">
                            <div
                              role="progressbar"
                              className="progress-bar"
                              aria-valuenow="10"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ width: '10%' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="attribute-field-stat">
                        <div className="nft-attr-ranking ">
                          <div className="attr-ranking-details d-flex justify-content-between">
                            <span className="nft-attr-name disabled">Name</span>
                            <span className="nft-attr-value">0 of 0</span>
                          </div>
                          <div className="progress">
                            <div
                              role="progressbar"
                              className="progress-bar"
                              aria-valuenow="10"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ width: '0%' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="attribute-editable-property attribute-editable-stats">
                      <Table>
                        <thead>
                          <tr>
                            <th width={265}>Name</th>
                            <th width={289}>Values</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <Field
                                type="text"
                                name="speed"
                                id=""
                                className={`form-control input__holder__single`}
                                placeholder={'Speed'}
                              />
                            </td>
                            <td>
                              <ul>
                                <li>
                                  <Field
                                    type="text"
                                    name="speed-value1"
                                    className={`form-control input__holder__single`}
                                    placeholder={'3'}
                                  />
                                </li>
                                <li>
                                  <span>Of</span>
                                </li>
                                <li>
                                  <Field
                                    type="text"
                                    name="speed-value2"
                                    className={`form-control input__holder__single`}
                                    placeholder={'5'}
                                  />
                                </li>
                              </ul>
                            </td>
                            <td className="actions">
                              <a className="icon-custom" href="#">
                                <CrossIcon />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Field
                                type="text"
                                name="power"
                                id=""
                                className={`form-control input__holder__single`}
                                placeholder={'Power'}
                              />
                            </td>
                            <td>
                              <ul>
                                <li>
                                  <Field
                                    type="text"
                                    name="power-value1"
                                    className={`form-control input__holder__single`}
                                    placeholder={'4'}
                                  />
                                </li>
                                <li>
                                  <span>Of</span>
                                </li>
                                <li>
                                  <Field
                                    type="text"
                                    name="power-value2"
                                    className={`form-control input__holder__single`}
                                    placeholder={'5'}
                                  />
                                </li>
                              </ul>
                            </td>
                            <td className="actions">
                              <a className="icon-custom" href="#">
                                <CrossIcon />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Field
                                type="text"
                                name="color"
                                id=""
                                className={`form-control input__holder__single`}
                                placeholder={'Name'}
                              />
                            </td>
                            <td>
                              <ul>
                                <li>
                                  <Field
                                    type="text"
                                    name="name-value1"
                                    className={`form-control input__holder__single`}
                                    placeholder={'0'}
                                  />
                                </li>
                                <li>
                                  <span>Of</span>
                                </li>
                                <li>
                                  <Field
                                    type="text"
                                    name="name-value2"
                                    className={`form-control input__holder__single`}
                                    placeholder={'0'}
                                  />
                                </li>
                              </ul>
                            </td>
                            <td className="actions">
                              <a className="icon-custom" href="#">
                                <CrossIcon />
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      <div className="editable-buttons d-flex justify-content-between">
                        <button
                          type="button"
                          className="btn-main btn-add btn-grad cursor-pointer"
                          onClick={() => setAddAttributeVisible(true)}
                        >
                          +
                        </button>
                        <button
                          width="40px"
                          type="button"
                          className="btn-main btn-save btn-grad cursor-pointer"
                          onClick={() => setAddAttributeVisible(true)}
                        >
                          Save
                        </button>
                      </div>
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
                <div className="form-cfield form-ccfield sensative-content">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h5>
                        <i>
                          <IconLock />
                        </i>
                        Unlockable Content
                      </h5>
                      <p className="sublabel">
                        Include unlockable content that can only be revealed by
                        the owner of the item.
                      </p>
                    </div>
                    <div className="col-md-4 text-right">
                      <Field
                        type="checkbox"
                        name="explicit"
                        component={Switch}
                        size="large"
                        onChange={onChangeExplicit}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-cfield">
                  <div className="input-container">
                    <Field
                      type="text"
                      name="description"
                      id="item_Description"
                      className={`form-control input__holder__single textarea`}
                      placeholder={
                        'Enter content(assess key, code to redeem, link to a file, etc.)'
                      }
                      onChange={onChangeDescription}
                      as="textarea"
                    />
                  </div>
                  <ErrorMessage name="description">
                    {(msg: string) => <div className="error-form">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="form-cfield form-ccfield sensative-content">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h5>
                        <i>
                          <IconExc />
                        </i>
                        Explicit & Sensitive Content
                      </h5>
                      <p className="sublabel">
                        Set this item as explicit and sensitive
                        content&nbsp;&nbsp;
                      </p>
                    </div>
                    <div className="col-md-4 text-right">
                      <Field
                        type="checkbox"
                        name="explicit"
                        component={Switch}
                        size="large"
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
                    Supply <span className="span-red d-none">*</span>
                  </h5>
                  {/* <p>The number of items that can be minted. No gas cost to you!</p> */}
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
                      className={
                        marketType === MARKET_TYPE.SIMPLE ? 'active' : ''
                      }
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

                {/* <div className="spacer-20"></div> */}

                {marketType === MARKET_TYPE.AUCTION && (
                  <div className="form-cfield">
                    <h5 className="form-label label-sub label-icon">
                      Minimum bid
                      <BsQuestion className="cursor-pointer help-icon" />
                    </h5>
                    <p className="sublabel">
                      Bids below this amount bids won’t be allowed.
                    </p>
                    <div className="row">
                      <div className="col-9">
                        <div className="input-container input-icon-container">
                          <Field
                            type="text"
                            name="minimumBid"
                            id="item_price_bid"
                            className={`form-control input__holder__single`}
                            placeholder="Enter minimum bid"
                          />
                          <img
                            src={BidIcon}
                            className="input-icon crypto-icon"
                            alt="bid icon"
                          />
                        </div>
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

                {marketType === MARKET_TYPE.AUCTION && (
                  <div className="form-cfield">
                    <h5 className="form-label label-sub label-icon">
                      Expiration date
                      <BsQuestion className="cursor-pointer help-icon" />
                    </h5>
                    <p className="sublabel">
                      Bids below this amount won’t be allowed.
                    </p>

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
                )}
                <div className="form-cfield">
                  <h5 className="form-label label-icon">
                    Royalties
                    <BsQuestion className="cursor-pointer help-icon" />
                  </h5>
                  <Field
                    name="royalties"
                    as={royaltiesComponent}
                    placeholder="First Name"
                    className={`form-control input__holder__single`}
                  />
                  <ErrorMessage name="royalties">
                    {(msg) => <div className="error-form">{msg}</div>}
                  </ErrorMessage>
                </div>
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
                  <Alert
                    text={submitCreateState.error}
                    type={ALERT_TYPE.DANGER}
                  />
                )}
              </div>
            </Form>
          </div>
          <div className="col-lg-5 col-sm-6 col-xs-12 preview-nft-col">
            <div className="createsingle-imagemain">
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
          </div>
        </div>
      </>
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
          submit(values, actions.resetForm);
        }}
        render={displayCreateSingleForm}
        validationSchema={SignupSchema}
      />
    </div>
  );
}
