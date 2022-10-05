import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faClose,
  faMusic
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import React, { memo, useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import { categories } from 'src/components/components/constants/filters';
import Loader from 'src/components/components/Loader';
import { ALERT_TYPE, COLLECTION_TYPE, ERRORS, INPUT_ERROS } from 'src/enums';
import * as Yup from 'yup';

import DiscordIcon from '../../assets/images/discord-icon.svg';
import MediumIcon from '../../assets/images/medium-icon.svg';
import TelegramIcon from '../../assets/images/telegram-icon.svg';
import WebIcon from '../../assets/images/web-icon.svg';
import Alert from './Alert';

interface IProps {
  onClose: () => void;
  submitCollection: (
    values: {
      name: string;
      description: string;
      imgFile: File | null;
      bannerfile: File | null;
    },
    resetForm: () => void
  ) => void;
  createCollectionState: { error: null | string; loading: boolean };
  collectionsType: COLLECTION_TYPE;
  onTabCategories: (collectionsType: COLLECTION_TYPE) => void;
}

const CreateCollectionPopUp = (props: IProps) => {
  const [imgFile, setImgFile] = useState<null | File>(null);
  const [imgUrl, setImgUrl] = useState<string>('');
  const [bannerfile, setBannerFile] = useState<null | File>(null);
  const [bannerUrl, setBannerUrl] = useState<string>('');
  const { onClose, submitCollection, createCollectionState } = props;
  const [openCollectionDetail, setCollectionDetail] = useState(false);
  const expandCollection = () => {
    setCollectionDetail(true);
  };
  const unexpandCollection = () => {
    setCollectionDetail(false);
  };

  const SignupSchema = openCollectionDetail
    ? Yup.object().shape({
        name: Yup.string()
          .min(2, INPUT_ERROS.tooShort)
          .max(50, INPUT_ERROS.tooLong)
          .required(INPUT_ERROS.requiredField),
        description: Yup.string()
          .min(2, INPUT_ERROS.tooShort)
          .max(1000, INPUT_ERROS.tooLong)
          .required(INPUT_ERROS.requiredField)
      })
    : Yup.object().shape({
        name: Yup.string()
          .min(2, INPUT_ERROS.tooShort)
          .max(50, INPUT_ERROS.tooLong)
          .required(INPUT_ERROS.requiredField)
      });

  const getInitialValue = () => {
    const result = {
      name: '',
      description: '',
      link_yoursite: '',
      link_discord: '',
      link_medium: '',
      link_telegram: '',
      pulseUrl: ''
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
    const handleChangeLogo = (e: any) => {
      e.preventDefault();
      if (e.target.files.length === 0) {
        console.log(
          '🚀 ~ file: CreateCollectionPopUp.tsx ~ handleChangeLogo ~ ERRORS.MISSING_IMAGE',
          ERRORS.MISSING_IMAGE
        );
        return;
      }
      const file = e.target.files[0];
      setImgFile(file);
      setImgUrl(URL.createObjectURL(file));
    };

    const handleChangeBanner = (e: any) => {
      // console.log(e.target.files);
      // setBannerFile(URL.createObjectURL(e.target.files[0]));

      e.preventDefault();
      if (e.target.files.length === 0) {
        console.log(
          '🚀 ~ file: CreateCollectionPopUp.tsx ~ line 55 ~ handleChangeBanner ~ ERRORS.MISSING_IMAGE',
          ERRORS.MISSING_IMAGE
        );
        return;
      }
      const file = e.target.files[0];
      setBannerFile(file);
      setBannerUrl(URL.createObjectURL(file));
    };

    const removeImageUrl = () => {
      setImgFile(null);
      setImgUrl('');
    };

    const removeBannerUrl = () => {
      // setBannerFile(!bannerfile);
      setBannerFile(null);
      setBannerUrl('');
    };
    // const imageuploaded = () => {
    //   setProfileImage(!profileImage);
    // };
    // const removeImageUrl = () => {
    //   setProfileImage(!profileImage);
    //   console.log('Editor Triggered');
    // };
    const editImageUrl = () => {
      return;
    };

    const { collectionsType, onTabCategories } = props;

    return (
      <Form
        onSubmit={handleSubmit}
        className={openCollectionDetail ? 'full-height-popup' : ''}
      >
        <div className="modal-header">
          <h5 className="modal-title">
            <img className={'p-2'} src="./img/collectionIcon.png" alt=""></img>
            {openCollectionDetail
              ? 'Create Full Collection'
              : 'Create Simple Collection'}
          </h5>
          <button className="btn-close" onClick={onClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-content">
          <div className="collection-popup-content">
            <div
              className={
                !openCollectionDetail ? 'row simple-collection-content' : ''
              }
            >
              {!openCollectionDetail && (
                <div className="col-md-4">
                  <div className="upload-file-field">
                    <h5>Choose collection logo</h5>
                    <div className="d-create-file col upload__file">
                      <div className={imgFile ? 'd-none' : 'browse'}>
                        <input
                          type="button"
                          id="get_file"
                          className="btn-main btn_gradient"
                          value={imgFile ? 'Change Logo' : 'Choose Logo'}
                        />
                        <input
                          id="upload_file"
                          type="file"
                          onChange={handleChangeLogo}
                        />
                        <p>PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</p>
                      </div>
                      <div
                        className={imgFile ? 'logo-image-preview' : 'd-none'}
                      >
                        <img className="img-fluid" src={imgUrl} alt="img url" />
                        <div onClick={removeImageUrl} className="logo-cancle">
                          {' '}
                          <BsTrash />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {openCollectionDetail && (
                <div className="full-collection-popup">
                  <div className="nft__form_field">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="collection-banner-imagemain">
                          <div className="collection-banner-image">
                            <div className="d-create-file">
                              <div className="browse">
                                <input
                                  type="button"
                                  id="get_file"
                                  className=" btn_gradient"
                                  value={
                                    bannerfile
                                      ? 'Change Banner'
                                      : 'Choose Banner'
                                  }
                                />
                                <input
                                  id="upload_file"
                                  type="file"
                                  onChange={handleChangeBanner}
                                />
                              </div>
                            </div>
                            <div
                              className={
                                bannerfile ? 'logo-image-preview' : 'd-none'
                              }
                            >
                              <img
                                className="img-fluid"
                                src={bannerUrl}
                                alt="img url"
                              />
                              {/* <div onClick={removeBannerUrl} className="">
                                {' '}
                                <BsTrash />
                              </div> */}
                            </div>
                          </div>
                          {bannerfile && (
                            <div
                              onClick={removeBannerUrl}
                              className="logo-cancle"
                              style={{ float: 'right', cursor: 'pointer' }}
                            >
                              {' '}
                              <BsTrash />
                            </div>
                          )}
                          <div className="upload-file-field">
                            <div className="d-create-file col upload__file">
                              <div className="browse">
                                <input
                                  type="button"
                                  id="get_file"
                                  className="btn-main btn_gradient"
                                  value={
                                    imgFile ? 'Change Logo' : 'Choose Logo'
                                  }
                                />
                                <input
                                  id="upload_file"
                                  type="file"
                                  onChange={handleChangeLogo}
                                />
                                <p>PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</p>
                              </div>
                              <div
                                className={
                                  imgFile ? 'logo-image-preview' : 'd-none'
                                }
                              >
                                <img
                                  className="img-fluid"
                                  src={imgUrl}
                                  alt="img url"
                                />
                                <div
                                  onClick={removeImageUrl}
                                  className="logo-cancle"
                                >
                                  {' '}
                                  <BsTrash />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="nft__form_field">
                    <div className="listcheckout">
                      <h5 className="form-label">
                        <img
                          className={'p-2'}
                          src="./img/collectionIcon.png"
                          alt=""
                        ></img>{' '}
                        Collection Name <span className="span-red">*</span>
                      </h5>
                      <Field
                        type="text"
                        name="name"
                        id="item_name"
                        className="form-control input__holder__single"
                        placeholder={'My first collection name'}
                      />
                      <ErrorMessage name="name">
                        {(msg) => <div className="error-form">{msg}</div>}
                      </ErrorMessage>
                    </div>
                  </div>
                  {!openCollectionDetail ? (
                    <></>
                  ) : (
                    <div className="nft__form_field">
                      <div className="listcheckout">
                        <h5 className="form-label label-sub">Description</h5>
                        <p className="sublabel">
                          <span className="text-primary">Markdown</span> syntax
                          is supported. 0 of 1000 characters used.
                        </p>
                        <Field
                          type="text"
                          name="description"
                          id="item_Description"
                          className="form-control input__holder__single"
                          placeholder={'Write here...'}
                          as="textarea"
                        />
                        <ErrorMessage name="description">
                          {(msg) => <div className="error-form">{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>
                  )}

                  <div className="category-dropdown nft__form_field">
                    <h5 className="form-label label-sub form-label-bold">
                      Category
                    </h5>
                    <p className="sublabel">
                      Choose a category will help make your item discoverable on
                      NFTonPulse..
                    </p>
                    <div className="d-flex">
                      <div className="category-list-tags">
                        <ul>
                          {/* {onTabCategories && (
                            <> */}
                          {categories.map((category, index) => (
                            <li
                              value={category.value}
                              key={index}
                              className={
                                collectionsType === category.name
                                  ? 'active'
                                  : ''
                              }
                              onClick={() => onTabCategories(category.name)}
                            >
                              {/* {index=='a' ? <p>Hi</p> : <p>Bye</p>} */}
                              <img src={category.image} alt="category-img" />
                              <span>{category.name}</span>
                            </li>
                          ))}
                          {/* </>
                          )} */}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="nft__form_field">
                    <h5 className="form-label">Links</h5>
                    <div className="input-container input-icon-container icon-left mb-2">
                      <Field
                        type="text"
                        name="link_yoursite"
                        className={`form-control input__holder__single`}
                        placeholder="yoursite.io"
                      />
                      <img
                        src={WebIcon}
                        className="input-icon crypto-icon"
                        alt="bid icon"
                      />
                    </div>
                    <div className="input-container input-icon-container icon-left mb-2">
                      <Field
                        type="text"
                        name="link_discord"
                        className={`form-control input__holder__single`}
                        placeholder="https://discord.gg/abcdef"
                      />
                      <img
                        src={DiscordIcon}
                        className="input-icon crypto-icon"
                        alt="bid icon"
                      />
                    </div>
                    <div className="input-container input-icon-container icon-left mb-2">
                      <Field
                        type="text"
                        name="link_medium"
                        className={`form-control input__holder__single`}
                        placeholder="https://www.medium.com/@yourmediumhandle"
                      />
                      <img
                        src={MediumIcon}
                        className="input-icon crypto-icon"
                        alt="bid icon"
                      />
                    </div>
                    <div className="input-container input-icon-container icon-left mb-2">
                      <Field
                        type="text"
                        name="link_telegram"
                        className={`form-control input__holder__single`}
                        placeholder="https://t.me/abcdef"
                      />
                      <img
                        src={TelegramIcon}
                        className="input-icon crypto-icon"
                        alt="bid icon"
                      />
                    </div>
                  </div>

                  <div className="nft__form_field ">
                    <h5 className="form-label label-sub">URL</h5>
                    <p className="sublabel">
                      Customize your URL on NFTonPulse. Must only contain
                      lowercase letters, numbers, and hyphens.
                    </p>
                    <Field
                      type="text"
                      name="pulseUrl"
                      className={`form-control input__holder__single`}
                      placeholder={
                        'https://NFTonPulse.io/collection/my-first-collection-name'
                      }
                    />
                  </div>
                </div>
              )}
              <div className={openCollectionDetail ? '' : 'col-md-8'}>
                {!openCollectionDetail && (
                  <div className="nft__form_field">
                    <div className="listcheckout">
                      <h5 className="form-label">
                        Collection Name <span className="span-red">*</span>
                      </h5>
                      <Field
                        type="text"
                        name="name"
                        id="item_name"
                        className="form-control input__holder__single"
                        placeholder={'My first collection name'}
                      />
                      <p className="sublabel sublabel-simple">
                        Please note that you able to add details to this
                        collection at a later date{' '}
                      </p>
                      <ErrorMessage name="name">
                        {(msg) => <div className="error-form">{msg}</div>}
                      </ErrorMessage>
                    </div>
                  </div>
                )}
                <div className="d-flex justify-content-between align-items-center create-popup-btns">
                  <div>
                    {createCollectionState.loading ? (
                      <Loader />
                    ) : (
                      <input
                        type="submit"
                        id="submit"
                        className="btn-main btn-create btn_gradient"
                        value="Save"
                      />
                    )}
                    {createCollectionState.error && (
                      <Alert
                        text={createCollectionState.error}
                        type={ALERT_TYPE.DANGER}
                      />
                    )}
                  </div>
                  {openCollectionDetail == false && (
                    <div className="collection-popup-switch">
                      <a onClick={expandCollection}>
                        <FontAwesomeIcon icon={faAngleDoubleDown} /> Create full
                        collection
                      </a>
                    </div>
                  )}

                  {openCollectionDetail == true && (
                    <div className="collection-popup-switch">
                      <a onClick={unexpandCollection}>
                        <FontAwesomeIcon icon={faAngleDoubleUp} /> Back to
                        simple Collection
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    );
  };

  return (
    <div className="maincheckout modal-style-1">
      <Formik
        initialValues={getInitialValue()}
        onSubmit={(values, actions) => {
          submitCollection(
            { ...values, imgFile, bannerfile },
            actions.resetForm
          );
        }}
        render={displayCreateCollectionForm}
        validationSchema={SignupSchema}
      />
    </div>
  );
};

export default memo(CreateCollectionPopUp);
