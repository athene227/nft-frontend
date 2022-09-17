import { ApiService, Canceler } from '../../../core/axios';
import * as actions from '../../actions';

export const setUserProfile = (data: any) => async (dispatch: any) => {
  dispatch(actions.setUserProfile.request(Canceler.cancel));
  try {
    dispatch(actions.setUserProfile.success({ data }));
  } catch (err) {
    console.log('🚀 ~ file: users.tsx ~ line 10 ~ setUserProfile ~ err', err);
    dispatch(actions.setUserProfile.failure(err));
  }
};

export const fetchOwnerDetails =
  (data: { publicAddress: string }) => async (dispatch: any) => {
    const { publicAddress } = data;
    dispatch(actions.fetchOwnerDetails.request(Canceler.cancel));
    try {
      const { data } = await ApiService.getOwnerDetails({ publicAddress });

      dispatch(actions.fetchOwnerDetails.success({ data }));
    } catch (err) {
      console.log(
        '🚀 ~ file: users.tsx ~ line 24 ~ fetchOwnerDetails ~ err',
        err
      );
      dispatch(actions.fetchOwnerDetails.failure(err));
    }
  };
