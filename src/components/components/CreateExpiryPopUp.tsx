import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { addDays } from 'date-fns';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import moment from 'moment';
import React, { memo, useState } from 'react';
import { DateRange } from 'react-date-range';
import TimePicker from 'react-time-picker';
import { ALERT_TYPE, ERRORS, INPUT_ERROS } from 'src/enums';
import * as Yup from 'yup';

import ClockIcon from '../../assets/images/icon/icon-clock.svg';

// interface IProps {
//   onClose: () => void;
//   submitCollection: (
//     values: { name: string; description: string; imgFile: File | null },
//     resetForm: () => void
//   ) => void;
//   createCollectionState: { error: null | string; loading: boolean };
// }

const CreateExpiryPopUp = (props) => {
  const {
    onClose,
    submitCollection,
    closeCreateExpiryPopup,
    createCollectionState,
    starttime,
    endtime,
    setDateRange,
    dateRange,
    selectStartTime,
    selectEndTime
  } = props;
  const [imgFile, setImgFile] = useState<null | File>(null);

  const getInitialValue = () => {
    const result = {
      name: '',
      description: ''
    };
    return result;
  };

  const dateRangeByMonth = (props: any) => {
    const list = [
      { title: '1 Day', value: 1 },
      { title: '7 Day', value: 7 },
      {
        title: '1 Month',
        value: 30
      },
      { title: '3 Month', value: 90 },
      {
        title: '5 Month',
        value: 150
      }
    ];
    return (
      <select id="pet-select" {...props} value={stateMonth}>
        {list.map((item, index) => (
          <option value={item.value} key={index}>
            {item.title}
          </option>
        ))}
      </select>
    );
  };
  //console.log(dateRangeByMonth);
  // const [state, setState] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), 30),
  //     key: 'selection'
  //   }
  // ]);

  const handleDateRange = (item: any) => {
    const startDate = moment(item.selection.startDate).format('YYYY-MM-DD');
    const endDate = moment(item.selection.endDate).format('YYYY-MM-DD');

    item.selection.startDate = new Date(
      moment(startDate + ' ' + starttime).format()
    );
    item.selection.endDate = new Date(moment(endDate + ' ' + endtime).format());
    setDateRange([item.selection]);
    console.log('Date Range', dateRange);
  };
  const [stateMonth, setStateMonth] = useState(90);
  const monthChanges = (event: any) => {
    console.log('Event', event.target.value);
    setDateRange([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), event.target.value),
        key: 'selection'
      }
    ]);
    setStateMonth(event.target.value);
  };
  const displayCreateCollectionForm = ({ handleSubmit }: FormikProps<any>) => {
    return (
      <Form className="full-height-popup" onSubmit={handleSubmit}>
        <div className="modal-header">
          <h5 className="modal-title">Expiration Date</h5>
          <button className="btn-close" onClick={onClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-content">
          <div className="collection-popup-content date-range-popup">
            <div className="nft__form_field form-cfield">
              <div className="listcheckout">
                <h5>
                  Date Range <span className="span-red"></span>
                </h5>
                <Field
                  onChange={monthChanges}
                  name="dateRangeByMonth"
                  as={dateRangeByMonth}
                  placeholder="First Name"
                  className={`form-control input__holder__single`}
                />
              </div>
            </div>

            <div className="form-cfield">
              <div className="row">
                <DateRange
                  onChange={handleDateRange}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={dateRange}
                  direction="horizontal"
                />
              </div>
            </div>

            <div className="form-cfield">
              <div className="row">
                <div className="col-md-6">
                  <div className="input-container input-icon-container icon-left mb-2">
                    <TimePicker onChange={selectStartTime} value={starttime} />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="input-container input-icon-container no-after icon-left mb-2">
                    <TimePicker onChange={selectEndTime} value={endtime} />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center create-popup-btns">
              <div></div>
              <div>
                <input
                  onClick={onClose}
                  type="submit"
                  id="submit"
                  className="btn-main btn-create btn_gradient"
                  value="Set"
                />
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
          submitCollection({ ...values, imgFile }, actions.resetForm);
        }}
        render={displayCreateCollectionForm}
      />
    </div>
  );
};

export default memo(CreateExpiryPopUp);
