import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import React, { memo, useState } from 'react';
import { BsQuestion } from 'react-icons/bs';
import Loader from 'src/components/components/Loader';
import { ALERT_TYPE, ERRORS, INPUT_ERROS } from 'src/enums';
import * as Yup from 'yup';

import DiscordIcon from '../../assets/images/discord-icon.svg';
import MediumIcon from '../../assets/images/medium-icon.svg';
import TelegramIcon from '../../assets/images/telegram-icon.svg';
import WebIcon from '../../assets/images/web-icon.svg';
import Alert from './Alert';

interface IProps {
  onClose: () => void;
  submitCollection: (
    values: { name: string; description: string; imgFile: File | null },
    resetForm: () => void
  ) => void;
  createCollectionState: { error: null | string; loading: boolean };
}

const CreateCollectionPopUp = (props: IProps) => {
  const [imgFile, setImgFile] = useState<null | File>(null);
  const { onClose, submitCollection, createCollectionState } = props;

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, INPUT_ERROS.tooShort)
      .max(50, INPUT_ERROS.tooLong)
      .required(INPUT_ERROS.requiredField),
    description: Yup.string()
      .min(2, INPUT_ERROS.tooShort)
      .max(250, INPUT_ERROS.tooLong)
      .required(INPUT_ERROS.requiredField)
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
    const onChangeImage = (e: any) => {
      e.preventDefault();
      if (e.target.files.length === 0) {
        console.log(
          '🚀 ~ file: CreateCollectionPopUp.tsx ~ line 55 ~ onChangeImage ~ ERRORS.MISSING_IMAGE',
          ERRORS.MISSING_IMAGE
        );
        return;
      }
      const file = e.target.files[0];
      setImgFile(file);
    };

    const getImage = () => {
      if (imgFile) {
        return URL.createObjectURL(imgFile);
      }
    };

    return (
      <Form onSubmit={handleSubmit}>
        <div className="modal-header">
          <h5 className="modal-title">Create Simple Collection</h5>
          <button className="btn-close" onClick={onClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-content">
          <div className="detailcheckout">
            <div className="listcheckout form-cfield upload-file-field">
              <h5>Choose Collection Logo</h5>
              <div className="d-create-file col upload__file">
                <div className="browse">
                  <input
                    type="button"
                    id="get_file"
                    className="btn-main btn_gradient"
                    value={imgFile ? 'Change File' : 'Choose File'}
                  />
                  <input
                    id="upload_file"
                    type="file"
                    onChange={onChangeImage}
                  />
                  <p>PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</p>
                </div>
              </div>
              {getImage() && (
                <div className="profile_avatar col">
                  <img src={getImage()} alt="collection" />
                </div>
              )}
            </div>
          </div>

          {/*  */}
          <div className="detailcheckout form-cfield">
            <div className="listcheckout">
              <h5>
                Collection Name <span className="span-red">*</span>
              </h5>
              <Field
                type="text"
                name="name"
                id="item_name"
                className="form-control"
                placeholder={'Enter a collection name'}
              />
              <ErrorMessage name="name" />
            </div>
          </div>

          <div className="detailcheckout form-cfield">
            <div className="listcheckout">
              <h5>Description</h5>
              <p className="sublabel">
                <span className="text-primary">Markdown</span> syntax is
                supported. 0 of 1000 characters used.
              </p>
              <Field
                type="text"
                name="description"
                id="item_Description"
                className="form-control"
                placeholder={'Enter a collection description'}
                as="textarea"
              />
              <ErrorMessage name="description" />
            </div>
          </div>
          {/*  */}
          {/* <h5>Category</h5>
          <p className="sublabel">
            Choose a category will help make your item discoverable on
            NFTonPulse..
          </p>*/}
          {/*  */}
          <div className="mb-3">
            <h5>Links</h5>
            <div className="input-container input-icon-container mb-2">
              <Field
                type="text"
                name="minimumBid"
                className={`form-control input__holder__single`}
                placeholder="yoursite.io"
              />
              <img
                src={WebIcon}
                className="input-icon crypto-icon"
                alt="bid icon"
              />
            </div>
            <div className="input-container input-icon-container mb-2">
              <Field
                type="text"
                name="minimumBid"
                className={`form-control input__holder__single`}
                placeholder="https://discord.gg/abcdef"
              />
              <img
                src={DiscordIcon}
                className="input-icon crypto-icon"
                alt="bid icon"
              />
            </div>
            <div className="input-container input-icon-container mb-2">
              <Field
                type="text"
                name="minimumBid"
                className={`form-control input__holder__single`}
                placeholder="https://www.medium.com/@yourmediumhandle"
              />
              <img
                src={MediumIcon}
                className="input-icon crypto-icon"
                alt="bid icon"
              />
            </div>
            <div className="input-container input-icon-container mb-2">
              <Field
                type="text"
                name="minimumBid"
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

          <div className="form-cfield ">
            <h5 className="form-label label-sub label-icon">
              URL
              <BsQuestion className="cursor-pointer help-icon" />
            </h5>
            <p className="sublabel">
              Customize your URL on NFTonPulse. Must only contain lowercase
              letters, numbers, and hyphens.
            </p>
            <Field
              type="text"
              name="URL"
              className={`form-control input__holder__single`}
              placeholder={
                'https://NFTonPulse.io/collection/my-first-collection-name'
              }
            />
          </div>
          {createCollectionState.loading ? (
            <Loader />
          ) : (
            <input
              type="submit"
              id="submit"
              className="btn-main btn-create btn_gradient"
              value="Save Collection"
            />
          )}
          {createCollectionState.error && (
            <Alert
              text={createCollectionState.error}
              type={ALERT_TYPE.DANGER}
            />
          )}
        </div>
      </Form>
    );
  };

  return (
    <div className="maincheckout modal-style-1">
      <Formik
        initialValues={getInitialValue()}
        onSubmit={(values, actions) => {
          submitCollection({ ...values, imgFile }, actions.resetForm);
        }}
        render={displayCreateCollectionForm}
        validationSchema={SignupSchema}
      />
    </div>
  );
};

export default memo(CreateCollectionPopUp);
