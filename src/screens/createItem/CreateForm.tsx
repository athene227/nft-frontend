import 'react-datepicker/dist/react-datepicker.css';

import { SelectChangeEvent } from '@mui/material/Select';
import { addDays } from 'date-fns';
import {
  ErrorMessage,
  Field,
  FieldArrayRenderProps,
  Form,
  Formik,
  FormikProps
} from 'formik';
import { Switch } from 'formik-material-ui';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconExc } from 'src/assets/images/icon/icon-exc.svg';
import CreateCollectionPopUp from 'src/components/CreateCollectionPopUp';
import CreateExpiryPopUp from 'src/components/CreateExpiryPopUp';
import InputField from 'src/components/Input/InputField';
import PreviewNft from 'src/components/PreviewNft';
import InputSelect from 'src/components/select/InputSelect';
import { ApiService } from 'src/core/axios';
import {
  ATTRIBUTE_TYPE,
  COLLECTION_TYPE,
  ERRORS,
  INPUT_ERROS,
  MARKET_TYPE,
  ROYALTIES_TYPE
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

import CreateNFTProperty from './form_components/createNFTProperties';
import CreateNFTStats from './form_components/createNFTStats';
import InputRadio from './form_components/InputRadio';
import ListOnMarketPlace from './form_components/listOnMarketPlace';
import Royalties from './form_components/royalties';
import UnLockableContent from './form_components/UnLockableContent';
import UploadNfTImage from './form_components/uploadNFTImage';

interface IProps {
  onChangeImage: (e: any) => void;
  setNameInput: (e: any) => void;
  setDescriptionInput: (e: any) => void;
  setPriceInput: (e: any) => void;
  setMinimumBidInput: (e: any) => void;
  setTokenType: (e: any) => void;
  submit: (values: any, resetForm: () => void) => void;
  onTab: (marketType: MARKET_TYPE) => void;
  onRoyaltyChange: (royaltiesType: ROYALTIES_TYPE) => void;
  onTabCategories: (collectionsType: COLLECTION_TYPE) => void;
  setSupply: (e: any) => void;
  setExternalLink: (e: any) => void;
  setEnableListing: (e: any) => void;
  setLazyMint: (e: any) => void;
  setExplicit: (e: any) => void;
  setUnlockableContentInput: (e: any) => void;
  setIsSingle: (e: any) => void;
  externalLink: string;
  submitCreateState: { error: null | string; loading: boolean };
  marketType: MARKET_TYPE;
  royaltiesType: ROYALTIES_TYPE;
  collectionsType: COLLECTION_TYPE;
  name: string;
  description: string;
  price: number;
  minimumBid: number;
  image: string;
  tokentype: string;
  supply: number;
  enableListing: boolean;
  setProfileImage: (e: any) => void;
  profileImage: boolean;
  explicit: boolean;
  unlockableContentInput: string;
  isSingle: boolean;
}

export default function CreateForm(props: IProps) {
  const {
    marketType,
    royaltiesType,
    collectionsType,
    submit,
    onChangeImage,
    setNameInput,
    setDescriptionInput,
    setPriceInput,
    setMinimumBidInput,
    setTokenType,
    setEnableListing,
    setExplicit,
    setUnlockableContentInput,
    setIsSingle,
    onTab,
    onRoyaltyChange,
    onTabCategories,
    setSupply,
    setExternalLink,
    setLazyMint,
    externalLink,
    name,
    description,
    price,
    minimumBid,
    image,
    supply,
    enableListing,
    explicit,
    unlockableContentInput,
    isSingle,
    setProfileImage,
    profileImage
  } = props;

  // tooltip configurations
  const [priceTokens, setPriceTokens] = useState<Array<IPriceToken>>([]);
  const [openCreateCollection, setCreateCollection] = useState(false);
  const [openExpirationDate, setExpirationDate] = useState(false);
  const [createCollectionState, setCreateCollectionState] = useState({
    error: null,
    loading: false
  });
  const [category, setCategory] = useState<string>(COLLECTION_TYPE.NULL);
  const web3State = useSelector(selectors.web3State);
  const { accounts, web3 } = web3State.web3.data;
  const userAddress = accounts[0];
  const collectionsState = useSelector(selectors.collectionsState);
  const dispatch = useDispatch();

  let attrHelper: FieldArrayRenderProps;
  const setAttrHelper = (arrayHelper: FieldArrayRenderProps) => {
    attrHelper = arrayHelper;
  };

  let attrStatsHelper: FieldArrayRenderProps;
  const setAttrStatsHelper = (arrayHelper: FieldArrayRenderProps) => {
    attrStatsHelper = arrayHelper;
  };

  const userState = useSelector(selectors.userState);
  const userDetails = userState.user.data;

  const [starttime, selectStartTime] = useState('10:00');
  const [endtime, selectEndTime] = useState('10:00');

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 3 * 30),
      key: 'selection'
    }
  ]);

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
      royalties: Yup.number()
        .integer()
        .moreThan(-1, INPUT_ERROS.numberIsLower)
        .lessThan(51, INPUT_ERROS.numberIsHigher),
      supply: Yup.number()
        .integer()
        .moreThan(0, INPUT_ERROS.higherThanZero)
        .required(INPUT_ERROS.requiredField),
      // royalties: Yup.number().typeError('you must specify a number'),
      attributes: Yup.array().of(
        Yup.object().shape({
          trait_type: Yup.string().required('Property Name is required.'),
          value: Yup.mixed()
            // .required('Property Value is required.')
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
      ),
      attributesStats: Yup.array().of(
        Yup.object().shape({
          trait_type: Yup.string().required('Property Name is required.'),
          value: Yup.mixed()
            .required('Property Value is required.')
            .test({
              name: 'max',
              exclusive: false,
              test: function (value) {
                const { display_type, max_value } = this.parent;
                if (value <= 0) {
                  return this.createError({
                    message: 'Value should be more than 0'
                  });
                }
                if (max_value > 1000) {
                  return this.createError({
                    message: 'Value should be less than 1000'
                  });
                }
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
                }
                return true;
              }
            })
        })
      )
    };
    if (marketType === MARKET_TYPE.SIMPLE && enableListing == true) {
      shape.price = Yup.number()
        .typeError('you must specify a number')
        .moreThan(0, INPUT_ERROS.numberIsLower)
        .required(INPUT_ERROS.requiredField);
    }
    if (marketType === MARKET_TYPE.AUCTION && enableListing == true) {
      shape.minimumBid = Yup.number()
        .moreThan(0, INPUT_ERROS.numberIsLower)
        .required(INPUT_ERROS.requiredField);
    }

    // shape.expirationDate = Yup.string()
    // //   .min(moment(new Date()).add(1, 'minutes'), INPUT_ERROS.oneHourMinimun)
    //   .required(INPUT_ERROS.requiredField);
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

  const submitCollection = async (
    data: {
      name: string;
      description: string;
      link_yoursite: string;
      link_discord: string;
      link_medium: string;
      link_telegram: string;
      pulseUrl: string;
      imgFile: File | null;
      bannerfile: File | null;
    },
    resetForm: () => void
  ) => {
    const {
      name,
      description,
      link_yoursite,
      link_discord,
      link_medium,
      link_telegram,
      pulseUrl,
      imgFile,
      bannerfile
    } = data;
    setCreateCollectionState({ loading: true, error: null });
    try {
      if (!imgFile) {
        throw new Error(ERRORS.MISSING_IMAGE);
      }
      const imageUrl: string = (await ipfs.uploadImageToIPFS(
        imgFile
      )) as string;

      let bannerUrl = '';
      if (bannerfile) {
        bannerUrl = (await ipfs.uploadImageToIPFS(bannerfile)) as string;
      }

      const id = uuidv4();
      dispatch(
        createCollection({
          id,
          name,
          description,
          userAddress,
          imageUrl,
          bannerUrl,
          category: collectionsType,
          link_yoursite,
          link_discord,
          link_medium,
          link_telegram,
          pulseUrl
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

  const addAttribute = async () => {
    const newValue: any = { trait_type: '' };

    if (!attrHelper) return;
    newValue.display_type = ATTRIBUTE_TYPE.STRING;
    attrHelper.push(newValue);
  };

  const addAttributeStats = async () => {
    const newValue: any = { trait_type: '' };

    if (!attrStatsHelper) return;
    newValue.display_type = ATTRIBUTE_TYPE.RANKING;

    newValue.value = 3;
    newValue.max_value = 5;

    attrStatsHelper.push(newValue);
  };

  const getInitialValue = () => {
    const result = {
      name: '',
      description: '',
      collectionId: '',
      externalLink: '',
      unlockableContent: '',
      explicit: true,
      price: 0,
      supply: 1,
      royalties: 0,
      minimumBid: 0,
      pricetokentype: priceTokens[0]?.name || 'MTK',
      expirationDate: '',
      attributes: [],
      attributesStats: [],
      enableListing: true
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

  const closeCreateExpiryPopup = () => {
    setExpirationDate(false);
  };

  const closeCreateCollectionPopup = () => {
    setCreateCollection(false);
  };

  const displayCreateSingleForm = ({
    handleSubmit,
    values,
    setFieldValue
  }: FormikProps<any>) => {
    const [royaltiesValue, setRoyaltiesValue] = useState<number>(0);

    useEffect(() => {
      if (royaltiesType == ROYALTIES_TYPE.PERCENT5) {
        setFieldValue('royalties', 5);
      } else if (royaltiesType == ROYALTIES_TYPE.PERCENT10) {
        setFieldValue('royalties', 10);
      } else if (royaltiesType == ROYALTIES_TYPE.PERCENT15) {
        setFieldValue('royalties', 15);
      } else if (royaltiesType == ROYALTIES_TYPE.PERCENT20) {
        setFieldValue('royalties', 20);
      } else {
        setFieldValue('royalties', 0);
        setRoyaltiesValue(0);
      }
    }, [royaltiesType]);

    const onChangeName = (e: any) => {
      setFieldValue('name', e.target.value);
      setNameInput && setNameInput(e.target.value);
    };

    const onChangeDescription = (e: any) => {
      setFieldValue('description', e.target.value);
      setDescriptionInput && setDescriptionInput(e.target.value);
    };

    const onChangeCostumRoyalties = (e: any) => {
      setFieldValue('royalties', e.target.value);
      setRoyaltiesValue(e.target.value);
    };

    const onChangeSupply = (e: any) => {
      setFieldValue('supply', e.target.value);
      if (e.target.value != '1') {
        setIsSingle(false);
        onTab(MARKET_TYPE.SIMPLE);
      } else {
        setIsSingle(true);
      }
      setSupply && setSupply(e.target.value);
    };

    const onChangeExternalLink = (e: any) => {
      setFieldValue('externalLink', e.target.value);
      setExternalLink && setExternalLink(e.target.value);
    };

    const [isUnlocableContent, setIsUnlocableContent] = useState(false);

    const onChangeExplicit = (e: any) => {
      setFieldValue('explicit', e.target.checked);
      setExplicit && setExplicit(e.target.checked);
    };

    const onChangeUnlockableContent = (e: any) => {
      setFieldValue('unlockableContent', e.target.value);
      setUnlockableContentInput && setUnlockableContentInput(e.target.value);
    };

    const switchUnlocableState = () => {
      if (!isUnlocableContent == false) {
        setFieldValue('unlockableContent', '');
      }
      setIsUnlocableContent(!isUnlocableContent);
    };

    const switchUnlocableContent = (e: any) => {
      switchUnlocableState();
    };

    const onChangeLazyMint = (e: any) => {
      setFieldValue('lazyMint', e.target.checked);
      setLazyMint && setLazyMint(e.target.checked);
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

    const [selectCollection, setselectCollection] = React.useState('');
    const [collectionName, setCollectionName] = useState<string>('');

    useEffect(() => {
      if (collectionsState.newCreatedCollectionID !== '') {
        collectionsState.myCollections.data.map((item) => {
          if (item.id === collectionsState.newCreatedCollectionID) {
            setCollectionName(item.name);
            setCategory(item.category);
          }
        });
      }

      setselectCollection(collectionsState.newCreatedCollectionID);
      setFieldValue('collectionId', collectionsState.newCreatedCollectionID);
    }, [collectionsState.newCreatedCollectionID]);

    const handleCollectionSelectChanges = (event: SelectChangeEvent) => {
      collectionsState.myCollections.data.map((item) => {
        if (item.id === event.target.value) {
          setCollectionName(item.name);
          setCategory(item.category);
        }
      });
      setselectCollection(event.target.value as string);
      if (event.target.value == 'create_collection') {
        setselectCollection((event.target.value = ''));
      }
      setFieldValue('collectionId', event.target.value);
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
      } else if (attrType === ATTRIBUTE_TYPE.RANKING) {
        element = (
          <ul>
            <li>
              <Field
                placeholder="Value"
                type="number"
                value={attribute.value}
                name={`attributesStats.${index}.value`}
                className={`form-control input__holder__single`}
              />
            </li>
            <li>
              <span>Of</span>
            </li>
            <li>
              <Field
                placeholder="Max Value"
                type="number"
                value={attribute.max_value}
                name={`attributesStats.${index}.max_value`}
                className={`form-control input__holder__single`}
              />

              <ErrorMessage name={`attributesStats.${index}.value`}>
                {(msg) => <div className="error-form">{msg}</div>}
              </ErrorMessage>
            </li>
          </ul>
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

    const imageuploaded = () => {
      setProfileImage(!profileImage);
    };

    const getImageUrl = () => {
      if (profileImage) {
        return image;
      } else {
        return './img/collections/coll-item-3.png';
      }
    };

    return (
      <>
        <div className="row">
          <div className="col-lg-7">
            <Form
              onSubmit={handleSubmit}
              autoComplete="off"
              className={'form__holder_single'}
            >
              <UploadNfTImage
                onChangeProfileImage={function (e: any): void {
                  onChangeImage(e);
                  if (!profileImage) {
                    imageuploaded();
                  }
                }}
                image={image}
                profileImage={profileImage}
                setProfileImage={setProfileImage}
              />

              <InputField
                type="text"
                label="Name"
                required={true}
                name="name"
                onChangeInputName={onChangeName}
                id="item_name"
                className={`form-control input__holder__single`}
                placeholder={'e.g. “ Name your NFT”'}
                value={name}
                moreInfo=""
                icon=""
                as=""
                hidden={false}
                sublabel=""
              />

              <InputField
                label="Description"
                required={false}
                sublabel="The description will be included on the item's detail page
                      underneath its image."
                type="text"
                name="description"
                onChangeInputName={onChangeDescription}
                id="item_Description"
                className={`form-control input__holder__single textarea`}
                placeholder={'e.g. “ Describe your NFT ”'}
                as="textarea"
                value={description}
                icon=""
                moreInfo=""
                hidden={false}
              />

              <InputSelect
                onClick={openCreateCollectionPopup}
                value={selectCollection}
                onChange={handleCollectionSelectChanges}
                collectionData={collectionsState.myCollections.data}
              />

              <InputField
                required={false}
                label="External link"
                sublabel="NFTonPulse will include a link to this URL on this item's
                    detail page, so that users can click to learn more about it.
                    You are welcome to link to your own webpage with more
                    details."
                type="text"
                name="externalLink"
                onChangeInputName={onChangeExternalLink}
                id="item_externalLink"
                className={`form-control input__holder__single`}
                placeholder={'https://yoursite.io/item/123'}
                value={externalLink}
                moreInfo=""
                icon=""
                as=""
                hidden={false}
              />
              <CreateNFTProperty
                addAttribute={addAttribute}
                values={values}
                setAttrHelper={setAttrHelper}
                getNftAttrValueInput={getNftAttrValueInput}
              />

              <CreateNFTStats
                addAttributeStats={addAttributeStats}
                values={values}
                setAttrStatsHelper={setAttrStatsHelper}
                getNftAttrValueInput={getNftAttrValueInput}
              />

              <UnLockableContent
                onChangeInputName={switchUnlocableContent}
                switchComponent={Switch}
                isUnlocableContent={isUnlocableContent}
                onChangeUnlockableContent={onChangeUnlockableContent}
                unlockableContentInput={unlockableContentInput}
              />

              <div className="nft__form_field createNft__form_field_secondary sensative-content ">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h5>
                      <i>
                        <IconExc />
                      </i>
                      Explicit & Sensitive Content
                    </h5>
                    <p className="sublabel">
                      Content will be unlocked after a successful transactionSet
                      this item as explicit and sensitive content&nbsp;&nbsp;
                    </p>
                  </div>
                  <div className="col-md-4 text-right">
                    <div className="custom-switch">
                      <InputRadio
                        type="checkbox"
                        name="explicit"
                        size="large"
                        onChangeInputName={onChangeExplicit}
                        component={Switch}
                        checked={explicit}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <InputField
                type="number"
                required={true}
                label="Supply"
                sublabel="Increase copies to share your NFT with a large number of
                  community members"
                name="supply"
                onChangeInputName={onChangeSupply}
                id="item_supply"
                className={`form-control input__holder__single`}
                placeholder={'Enter supply'}
                value={supply}
                moreInfo=""
                as=""
                icon=""
                hidden={false}
              />
              <Royalties
                royaltiesType={royaltiesType}
                onChangeInputName={onChangeCostumRoyalties}
                onRoyaltyChange={onRoyaltyChange}
                value={royaltiesValue}
              />

              <div className="spacer-20"></div>

              <ListOnMarketPlace
                price={price}
                minimumBid={minimumBid}
                setPriceInput={setPriceInput}
                setMinimumBidInput={setMinimumBidInput}
                setExpirationDate={setExpirationDate}
                dateRange={dateRange}
                onTab={onTab}
                submitCreateState={{
                  error: null,
                  loading: false
                }}
                marketType={marketType}
                isSingle={isSingle}
                setFieldValue={setFieldValue}
                enableListing={enableListing}
                setEnableListing={setEnableListing}
                onChangeLazyMint={onChangeLazyMint}
              />
            </Form>
          </div>

          <PreviewNft
            imageUrl={getImageUrl()}
            userImage={getProfileImage(userDetails?.profileImage)}
            nft={{
              name,
              description,
              price,
              totalAmount: supply,
              leftAmount: supply,
              minimumBid
            }}
            dateRange={dateRange}
            // tokentype={marketType === MARKET_TYPE.AUCTION ? tokentype : 'ETH'}
            tokentype={marketType === MARKET_TYPE.AUCTION ? '' : ''}
            isPreview={true}
            multiple={supply == 1 ? false : true}
            marketType={marketType}
            selectCollection={collectionName}
          />
        </div>
      </>
    );
  };
  return (
    <div className="nft-create-form ">
      {openExpirationDate && (
        <div className="checkout">
          <CreateExpiryPopUp
            onClose={closeCreateExpiryPopup}
            starttime={starttime}
            endtime={endtime}
            dateRange={dateRange}
            setDateRange={setDateRange}
            selectStartTime={selectStartTime}
            selectEndTime={selectEndTime}
          />
        </div>
      )}
      {openCreateCollection && (
        <div className="checkout">
          <CreateCollectionPopUp
            onClose={closeCreateCollectionPopup}
            submitCollection={submitCollection}
            createCollectionState={createCollectionState}
            collectionsType={collectionsType}
            onTabCategories={onTabCategories}
          />
        </div>
      )}

      <Formik
        initialValues={getInitialValue()}
        onSubmit={(values, actions) => {
          const startingDate: Date = dateRange[0].startDate;
          const endDate: Date = dateRange[0].endDate;
          submit(
            {
              ...values,
              category,
              startingDate,
              endDate
            },
            actions.resetForm
          );
        }}
        render={displayCreateSingleForm}
        validationSchema={SignupSchema}
      />
    </div>
  );
}
