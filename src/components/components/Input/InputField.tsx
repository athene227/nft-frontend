import { ErrorMessage, Field } from 'formik';

import Calender from '../../../assets/images/calender.svg';
import BidIcon from '../../../assets/images/minbid-icon.svg';
import InputWrapper from './style';

const InputField = ({
  value,
  label,
  required,
  sublabel,
  error,
  openPopup,
  name,
  // onWheel,
  moreInfo,
  id,
  placeholder,
  type,
  icon,
  onChangeInputName,
  className,
  as,
  hidden
}) => (
  <>
    <InputWrapper>
      <div className="nft__form_field">
        {label && (
          <h5 className="form-label label-sub">
            {label} {required && <span className="span-red">*</span>}
          </h5>
        )}
        {{ sublabel } && <p className="sublabel">{sublabel}</p>}
        <div className="input-container input-icon-container">
          <div className="form-group">
            <a onClick={openPopup}>
              <Field
                type={type}
                value={value}
                name={name}
                className={className}
                placeholder={placeholder}
                id={id}
                onChange={onChangeInputName}
                as={as}
                onWheel={(e) => e.target.blur()}
                hidden={hidden}
              />
              {icon == 'PLS' && (
                <span className="input-icon crypto-icon input-icon-text">
                  <img src={BidIcon} className="" alt="bid icon" /> {icon}
                </span>
              )}
              {icon == 'EXP' && (
                <span className="input-icon crypto-icon input-icon-text">
                  <img src={Calender} className="" alt="bid icon" />{' '}
                </span>
              )}
              {{ moreInfo } && <p className="more-info">{moreInfo}</p>}
            </a>
          </div>
        </div>
        {required && (
          <ErrorMessage name={name}>
            {(msg: string) => <div className="error-form">{msg}</div>}
          </ErrorMessage>
        )}
      </div>
    </InputWrapper>
  </>
);
export default InputField;
