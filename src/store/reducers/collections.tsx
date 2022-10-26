import { ICollection } from 'src/types/collections.types';
import { getErrorMessage } from 'src/utils';
import { getType } from 'typesafe-actions';

import * as actions from '../actions';
import {
  entityLoadingFailed,
  entityLoadingStarted,
  entityLoadingSucceeded,
  initEntityState
} from '../utils';

export interface ICollectionsState {
  myCollections: {
    loading: boolean;
    data: ICollection[];
    loadFailed: boolean;
    canceler: any;
    error: any;
  };
  collections: {
    loading: boolean;
    data: ICollection[];
    loadFailed: boolean;
    canceler: any;
    error: any;
  };
  userCollections: {
    loading: boolean;
    data: ICollection[];
    loadFailed: boolean;
    canceler: any;
    error: any;
  };
  newCreatedCollectionID: string;
  currentPage: number;
  pageLimit: number;
  totalCount: number;
}

export const defaultState: ICollectionsState = {
  myCollections: initEntityState([]),
  userCollections: initEntityState([]),
  collections: initEntityState([]),
  newCreatedCollectionID: '',
  currentPage: 0,
  pageLimit: 21,
  totalCount: 0
};

const states = (state = defaultState, action: any) => {
  let error: string;

  switch (action.type) {
    case getType(actions.fetchUserCollections.request):
      return {
        ...state,
        userCollections: entityLoadingStarted(
          state.userCollections,
          action.payload
        )
      };
    case getType(actions.fetchUserCollections.success):
      return {
        ...state,
        userCollections: entityLoadingSucceeded(
          state.userCollections,
          action.payload
        )
      };
    case getType(actions.fetchUserCollections.failure):
      error = getErrorMessage(action.payload);
      return {
        ...state,
        userCollections: entityLoadingFailed(state.userCollections, error)
      };

    case getType(actions.fetchMyCollections.request):
      return {
        ...state,
        myCollections: entityLoadingStarted(state.myCollections, action.payload)
      };
    case getType(actions.fetchMyCollections.success):
      return {
        ...state,
        myCollections: entityLoadingSucceeded(
          state.myCollections,
          action.payload
        )
      };
    case getType(actions.fetchMyCollections.failure):
      error = getErrorMessage(action.payload);
      return {
        ...state,
        myCollections: entityLoadingFailed(state.myCollections, error)
      };

    case getType(actions.createCollection.request):
      return {
        ...state,
        myCollections: entityLoadingStarted(state.myCollections, action.payload)
      };
    case getType(actions.createCollection.success):
      console.log(
        '🚀 ~ file: collections.tsx ~ line 97 ~ states ~ action.payload',
        action.payload
      );
      const data = [...state.myCollections.data, action.payload.data];
      return {
        ...state,
        newCreatedCollectionID: action.payload.data.id,
        myCollections: entityLoadingSucceeded(state.myCollections, data)
      };
    case getType(actions.createCollection.failure):
      error = getErrorMessage(action.payload);
      return {
        ...state,
        myCollections: entityLoadingFailed(state.myCollections, error)
      };

    case getType(actions.getCollections.request):
      return {
        ...state,
        collections: entityLoadingStarted(state.collections, action.payload)
      };
    case getType(actions.getCollections.success):
      // return {
      //   ...state,
      //   collections: entityLoadingSucceeded(
      //     state.collections,
      //     action.payload.map((collection: any) => ({
      //       ...collection,
      //       imageUrl: collection.imageUrl.replace('ipfs://', gatewayUrl)
      //     }))
      //   )
      // };

      // append existing data with new data
      const collectionData = state.collections.data
        ? state.collections.data
        : [];
      collectionData.splice(
        state.currentPage * state.pageLimit,
        state.pageLimit,
        ...action.payload.data
      );
      return {
        ...state,
        collections: entityLoadingSucceeded(state.collections, collectionData),
        totalCount: action.payload.pagination.totalCount
      };
    case getType(actions.getCollections.failure):
      error = getErrorMessage(action.payload);
      return {
        ...state,
        collections: entityLoadingFailed(state.collections, error)
      };
    case getType(actions.clearCollections):
      return { ...state, collections: initEntityState([]), currentPage: 0 };
    case getType(actions.setCollectionCurrentPage):
      return { ...state, currentPage: action.payload };

    default:
      return state;
  }
};

export default states;
