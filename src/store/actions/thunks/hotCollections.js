import { ApiService, Canceler } from '../../../core/axios';
import * as actions from '..';

export const fetchHotCollections = () => async (dispatch) => {
  dispatch(actions.getHotCollections.request(Canceler.cancel));

  try {
    const { data } = await ApiService.getHotCollections();
    dispatch(actions.getHotCollections.success(data));
  } catch (err) {
    dispatch(actions.getHotCollections.failure(err));
  }
};
