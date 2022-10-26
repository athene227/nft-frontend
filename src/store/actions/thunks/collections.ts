import { getCollectionFilterQuery } from 'src/store/utils';

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
    bannerUrl: string;
    userAddress: string;
    id: string;
    category: string;
    link_yoursite: string;
    link_discord: string;
    link_medium: string;
    link_telegram: string;
    pulseUrl: string;
  }) =>
  async (dispatch: any, getState: any) => {
    const {
      name,
      description,
      userAddress,
      imageUrl,
      bannerUrl,
      id,
      category,
      link_yoursite,
      link_discord,
      link_medium,
      link_telegram,
      pulseUrl
    } = payload;

    dispatch(actions.createCollection.request(Canceler.cancel));
    try {
      const newCollection = await ApiService.createCollection({
        id,
        name,
        description,
        imageUrl,
        bannerUrl,
        userAddress,
        category,
        link_yoursite,
        link_discord,
        link_medium,
        link_telegram,
        pulseUrl
      });

      // console.log('getMyCreatedNft data', data);
      dispatch(actions.createCollection.success(newCollection));
    } catch (err) {
      dispatch(actions.createCollection.failure(err));
    }
  };

export const getCollections = () => async (dispatch: any, getState: any) => {
  dispatch(actions.getCollections.request(Canceler.cancel));
  try {
    const { data } = await ApiService.getCollections();
    dispatch(actions.getCollections.success(data));
  } catch (err) {
    dispatch(actions.getCollections.failure(err));
  }
};

export const getListedCollections =
  () => async (dispatch: any, getState: any) => {
    dispatch(actions.getCollections.request(Canceler.cancel));
    try {
      const { collections, filters } = getState();
      const query = getCollectionFilterQuery(collections, filters);
      const { data } = await ApiService.getListedCollections(query);
      dispatch(actions.getCollections.success(data));
    } catch (err) {
      dispatch(actions.getCollections.failure(err));
    }
  };
