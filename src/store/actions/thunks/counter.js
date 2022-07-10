import {
  // Axios,
  Canceler
} from '../../../core/axios';
import * as actions from '..';

export const increaseNumber = () => async (dispatch) => {
  // dispatch(actions.increaseNumber.request(Canceler.cancel));

  try {
    const data = 1;
    dispatch(actions.increaseNumber.success(data));
  } catch (err) {
    dispatch(actions.increaseNumber.failure(err));
  }
};

export const decreaseNumber = () => async (dispatch) => {
  dispatch(actions.decreaseNumber.request(Canceler.cancel));

  try {
    const data = 1;
    dispatch(actions.decreaseNumber.success(data));
  } catch (err) {
    dispatch(actions.decreaseNumber.failure(err));
  }
};
