import { ApiService, Canceler } from '../../../core/axios';
import * as actions from '../../actions';

export const fetchMyCollections =
  ({ userAddress }: { userAddress: string }) =>
  async (dispatch: any, getState: any) => {
    dispatch(actions.fetchMyCollections.request(Canceler.cancel));
    try {
      const { data } = await ApiService.getMyCollections({ userAddress });

      // console.log('getMyCreatedNft data', data);
      dispatch(actions.fetchMyCollections.success(data));
    } catch (err) {
      dispatch(actions.fetchMyCollections.failure(err));
    }
  };

export const fetchUserCollections =
  ({ userAddress }: { userAddress: string }) =>
  async (dispatch: any, getState: any) => {
    dispatch(actions.fetchUserCollections.request(Canceler.cancel));
    try {
      const { data } = await ApiService.getMyCollections({ userAddress });

      // console.log('getMyCreatedNft data', data);
      dispatch(actions.fetchUserCollections.success(data));
    } catch (err) {
      dispatch(actions.fetchUserCollections.failure(err));
    }
  };

export const createCollection =
  (payload: {
    name: string;
    description: string;
    imageUrl: string;
    userAddress: string;
    id: string;
  }) =>
  async (dispatch: any, getState: any) => {
    const { name, description, userAddress, imageUrl, id } = payload;

    dispatch(actions.createCollection.request(Canceler.cancel));
    try {
      const newCollection = await ApiService.createCollection({
        id,
        name,
        description,
        imageUrl,
        userAddress
      });

      // console.log('getMyCreatedNft data', data);
      dispatch(actions.createCollection.success(newCollection));
    } catch (err) {
      dispatch(actions.createCollection.failure(err));
    }
  };

export const getCollections = () => async (dispatch: any, getState: any) => {
  dispatch(actions.getColletions.request(Canceler.cancel));
  try {
    const { data } = await ApiService.getCollections();

    // console.log('getMyCreatedNft data', data);
    dispatch(actions.getColletions.success(data));
  } catch (err) {
    dispatch(actions.getColletions.failure(err));
  }
};
