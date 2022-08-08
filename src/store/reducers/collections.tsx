import { ICollection } from 'src/collections.types';
import { gatewayUrl } from 'src/services/ipfs';
import { getErrorMessage } from 'src/utils';
import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import {
  initEntityState,
  entityLoadingStarted,
  entityLoadingSucceeded,
  entityLoadingFailed
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
}

export const defaultState: ICollectionsState = {
  myCollections: initEntityState([]),
  userCollections: initEntityState([]),
  collections: initEntityState([])
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
        myCollections: entityLoadingSucceeded(state.myCollections, data)
      };
    case getType(actions.createCollection.failure):
      error = getErrorMessage(action.payload);
      return {
        ...state,
        myCollections: entityLoadingFailed(state.myCollections, error)
      };

    case getType(actions.getColletions.request):
      return {
        ...state,
        collections: entityLoadingStarted(state.collections, action.payload)
      };
    case getType(actions.getColletions.success):
      return {
        ...state,
        collections: entityLoadingSucceeded(
          state.collections,
          action.payload.map((collection: any) => ({
            ...collection,
            imageUrl: collection.imageUrl.replace('ipfs://', gatewayUrl)
          }))
        )
      };
    case getType(actions.getColletions.failure):
      error = getErrorMessage(action.payload);
      return {
        ...state,
        collections: entityLoadingFailed(state.collections, error)
      };

    default:
      return state;
  }
};

export default states;
