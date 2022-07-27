/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ERRORS } from 'src/enums';

// import ColumnNewReduxProfile from '../components/ColumnNewReduxProfile';
// import ColumnNewRedux from '../components/ColumnNewRedux';
import * as selectors from '../../../store/selectors';
import Loader from 'src/components/components/Loader';
import notification from 'src/services/notification';

import { Form, Formik, FormikProps } from 'formik';
import { Switch } from 'formik-material-ui';
import Input from '../../components/FormControls/Input';
import * as Yup from 'yup';
import { ALERT_TYPE, INPUT_ERROS } from 'src/enums';
import { getErrorMessage, getProfileImage } from 'src/utils';
import Alert from '../../components/Alert';
import { ApiService } from 'src/core/axios';
import { setUserProfile } from 'src/store/actions/thunks/users';
import ipfs, { getImage } from 'src/services/ipfs';
import { TextField, InputAdornment } from '@mui/material';

import LanguageIcon from '@mui/icons-material/Language';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { styled } from '@mui/material/styles';
import EditIcon from './EditIcon';
import { socialLinks } from './socialLinks';
import { IUser, IUserProfile } from 'src/types/users.types';
const SocialLinkField = styled(TextField)({
  '& label': {
    display: 'none'
  },
  '& label.Mui-focused': {
    color: 'blue'
  },
  '& legend': { display: 'none' },
  '& fieldset': { top: 0 },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green'
  },
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.1)'
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.1)'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#86b7fe'
    }
  }
});

const Profile = function () {
  const [submitUserState, setSubmitUserState] = useState<{
    error: null | string;
    loading: boolean;
  }>({ error: '', loading: false });
  const [imgFile, setImgFile] = useState(null);
  const [bannerFile, setBanner] = useState(null);
  const web3State = useSelector(selectors.web3State);
  const { web3, accounts } = web3State.web3.data;
  const userState = useSelector(selectors.userState);

  const user = userState.user.data;
  const [displayUserImg, setUserDisplayImg] = useState(null);
  const [displayBannerImg, setBannerDisplay] = useState(null);

  const dispatch = useDispatch();

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, INPUT_ERROS.tooShort)
      .max(50, INPUT_ERROS.tooLong)
      .required(INPUT_ERROS.requiredField),
    lastName: Yup.string()
      .min(2, INPUT_ERROS.tooShort)
      .max(50, INPUT_ERROS.tooLong)
      .required(INPUT_ERROS.requiredField),
    username: Yup.string()
      .min(2, INPUT_ERROS.tooShort)
      .max(50, INPUT_ERROS.tooLong)
      .required(INPUT_ERROS.requiredField),
    twitter: Yup.string().url(INPUT_ERROS.notValidUrl),
    youtube: Yup.string().url(INPUT_ERROS.notValidUrl),
    discord: Yup.string().url(INPUT_ERROS.notValidUrl),
    facebook: Yup.string().url(INPUT_ERROS.notValidUrl),
    ticktok: Yup.string().url(INPUT_ERROS.notValidUrl),
    snapchat: Yup.string().url(INPUT_ERROS.notValidUrl),
    website: Yup.string().url(INPUT_ERROS.notValidUrl)
  });

  const getInitialValue = () => {
    const result = {
      firstName: user ? user.firstName : '',
      lastName: user ? user.lastName : '',
      username: user ? user.username : '',
      bio: user ? user.bio : '',
      email: user ? user.email : '',
      twitter: user ? user.twitter : '',
      youtube: user ? user.youtube : '',
      discord: user ? user.discord : '',
      facebook: user ? user.facebook : '',
      snapchat: user ? user.snapchat : '',
      ticktok: user ? user.ticktok : '',
      website: user ? user.website : ''
    };
    return result;
  };

  const submitUser = async (data: IUserProfile, resetForm: () => void) => {
    try {
      if (!web3) {
        notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
        return;
      }
      setSubmitUserState({ error: null, loading: true });

      let profileImageUrl, bannerImageUrl;

      if (imgFile) {
        profileImageUrl = await ipfs.getImageUri(imgFile);
      }
      if (bannerFile) {
        bannerImageUrl = await ipfs.getImageUri(bannerFile);
      }

      const res = await ApiService.updateUserProfile({
        ...data,
        publicAddress: accounts[0],
        profileImage: profileImageUrl,
        bannerImage: bannerImageUrl
      });
      dispatch(setUserProfile(res.data));
      setSubmitUserState({ error: null, loading: false });
      notification.success('Successfully changed the detailes');
    } catch (error) {
      console.log('errorin listONSellContract', getErrorMessage(error));
      setSubmitUserState({ error: getErrorMessage(error), loading: false });
      notification.error(getErrorMessage(error));
    }
  };

  const displayUserForm = ({
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
    const _getUserImg = () => {
      return displayUserImg || getImage(user?.profileImage);
    };
    const _getBannerImg = () => {
      return displayBannerImg || getImage(user?.bannerImage);
    };

    const [toggle, setToggle] = useState(false);
    const handleToggle = () => {
      toggle ? setToggle(false) : setToggle(true);
      console.log('toggle State: ', toggle);
    };

    return (
      <Form onSubmit={handleSubmit} className=" offset-lg-1 mb-5">
        <div className="spacer-30"></div>
        <div className={`form_wrapper d-flex flex-wrap`}>
          <div className="col-12 col-sm-6">
            {user ? (
              <div style={{ marginTop: 30 }}>
                <Input
                  label="Username"
                  type="text"
                  name="username"
                  placeholder="e.g. 'Crypto Funk"
                  required
                />

                <Input
                  label="First Name"
                  type="text"
                  name="firstName"
                  placeholder="e.g. 'Crypto Funk"
                />

                <Input
                  label="Last Name"
                  type="text"
                  name="lastName"
                  placeholder="e.g. 'Crypto Funk"
                />

                <Input
                  label="Bio"
                  type="text"
                  name="bio"
                  placeholder="Describe your story"
                  as="textarea"
                  rows={4}
                />

                <div className={`notification_wrapper d-flex p-3 flex-wrap`}>
                  <div className="col-12 d-flex justify-content-between align-items-center">
                    <div className="col-10 p-0">
                      <h5 className="m-0">Recieve Email Notifications</h5>
                      <p>Update email preferences</p>
                    </div>
                    <div className="col-2 p-0">
                      <Input
                        name="rememberMe"
                        component={Switch}
                        onChange={handleToggle}
                        className="form-control bg-transparent border-0"
                        checked={toggle} // can't set/get state here
                        // value={toggle} // or here
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      className="form-control bg-transparent"
                    />
                  </div>
                </div>

                <div className="spacer-20"></div>

                <div className={`social_wrapper d-flex p-3 flex-wrap`}>
                  <div className="col-12 d-flex justify-content-between align-items-center">
                    <div className="col-10 p-0">
                      <h5 className="m-0">Social Connections</h5>
                      <p>Add your social media links</p>
                    </div>
                  </div>
                  <div className="col-12">
                    {socialLinks.map(({ name, icon, placeholder }, index) => (
                      <React.Fragment key={index}>
                        <Input
                          type="text"
                          name={name}
                          className="form-control bg-transparent"
                          render={({
                            field,
                            form: { touched, errors },
                            ...props
                          }: any) => (
                            <SocialLinkField
                              {...props}
                              {...field}
                              label={null}
                              fullWidth
                              placeholder={placeholder}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    {icon}
                                  </InputAdornment>
                                ),
                                name: name
                              }}
                            />
                          )}
                        />
                        <div className="spacer-20"></div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="spacer-20"></div>

                <Input
                  type="text"
                  name="website"
                  label="Your Website"
                  className="form-control bg-transparent"
                  render={({ field, ...props }: any) => (
                    <SocialLinkField
                      {...props}
                      {...field}
                      label={null}
                      fullWidth
                      placeholder="https://www.website.com/..."
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <LanguageIcon
                              sx={{
                                color: '#6C717C'
                              }}
                            />
                          </InputAdornment>
                        ),
                        name: 'website'
                      }}
                    />
                  )}
                />
                <div className="spacer-20"></div>

                <Input
                  type="text"
                  name="wallet"
                  label="Wallet Address"
                  placeholder="e.g 0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39"
                  className="form-control bg-transparent"
                  component={(props: any) => (
                    <SocialLinkField
                      {...props}
                      label={null}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <ContentCopyIcon
                              sx={{
                                color: '#6C717C'
                              }}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />

                <div className="spacer-30"></div>

                {submitUserState.loading ? (
                  <Loader />
                ) : (
                  <div className="d-flex flex-wrap">
                    <div className="col-12 col-sm-6 mb-3">
                      <input
                        type="submit"
                        id="submit"
                        className="btn-main btn-grad w-100"
                        value="Save"
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <span className="btn-main btn-sec w-100">
                        See Preview
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Loader size={250} />
            )}
          </div>

          <div className="col-12 col-sm-6 ">
            <div className="spacer-30"></div>
            <div className="d-flex align-items-center justif-content-center flex-column">
              <div
                className={`banner_wrapper col-12 p-0`}
                style={{
                  backgroundImage: `url(${'./img/profile-banner-bg.png'})`
                }}
              >
                <div className={`banner_label`}>Profile Banner</div>
                <div className={`banner_edit_icon`}>
                  <EditIcon
                    onChange={setBanner}
                    displayChange={setBannerDisplay}
                  />
                </div>
                {_getBannerImg() && (
                  <img
                    src={_getBannerImg()}
                    className="w-100 h-100"
                    alt=""
                  ></img>
                )}
              </div>

              <div className={`avatar_wrapper col-12 p-0`}>
                {_getUserImg() && (
                  <img
                    src={_getUserImg()}
                    className="w-100 h-100"
                    alt="profile"
                  />
                )}
                <div className={`avatar_edit_icon`}>
                  <EditIcon
                    onChange={setImgFile}
                    displayChange={setUserDisplayImg}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="spacer-10"></div>

        <div className="spacer-20"></div>
        {submitUserState.error && (
          <Alert text={submitUserState.error} type={ALERT_TYPE.DANGER} />
        )}
      </Form>
    );
  };

  return (
    <>
      {/* <GlobalStyles /> */}
      <div className="profile-section-main">
        <section
          className={`profile_section jumbotron breadcumb no-bg`}
          // style={{ backgroundImage: `url(${'./img/snake.svg'})` }}
          style={{}}
        >
          <div className="spacer-30"></div>
          <div className="spacer-30"></div>
          <div className="spacer-30"></div>
          <h1 className="text-center mt-5">Profile Settings</h1>

          <div className="container">
            {user && (
              <Formik
                initialValues={getInitialValue()}
                // enableReinitialize
                onSubmit={(values, actions) => {
                  submitUser(values, actions.resetForm);
                }}
                render={displayUserForm}
                validationSchema={SignupSchema}
              />
            )}
          </div>
        </section>
      </div>
    </>
  );
};
export default Profile;
