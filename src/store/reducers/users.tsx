import { IUser } from 'src/types/users.types';
import { getErrorMessage } from 'src/utils';
import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import {
  initEntityState,
  entityLoadingStarted,
  entityLoadingSucceeded,
  entityLoadingFailed
} from '../utils';

export interface IUserState {
  user: {
    loading: boolean;
    data: null | IUser;
    loadFailed: boolean;
    canceler: any;
    error: any;
  };
  ownerDetailes: {
    loading: boolean;
    data: null | IUser;
    loadFailed: boolean;
    canceler: any;
    error: any;
  };
}

export const defaultState: IUserState = {
  user: initEntityState(null),
  ownerDetailes: initEntityState(null)
};

const states = (state = defaultState, action: any) => {
  let error: string;
  switch (action.type) {
    case getType(actions.getUserProfile.request):
      return {
        ...state,
        user: entityLoadingStarted(state.user, action.payload)
      };
    case getType(actions.getUserProfile.success):
      return {
        ...state,
        user: entityLoadingSucceeded(state.user, action.payload.data)
      };
    case getType(actions.getUserProfile.failure):
      return { ...state, user: entityLoadingFailed(state.user) };

    case getType(actions.setUserProfile.request):
      return {
        ...state,
        user: entityLoadingStarted(state.user, action.payload)
      };
    case getType(actions.setUserProfile.success):
      return {
        ...state,
        user: entityLoadingSucceeded(state.user, action.payload.data)
      };
    case getType(actions.setUserProfile.failure):
      error = getErrorMessage(action.payload);
      return { ...state, user: entityLoadingFailed(error) };

    case getType(actions.fetchOwnerDetails.request):
      return {
        ...state,
        ownerDetailes: entityLoadingStarted(state.ownerDetailes, action.payload)
      };
    case getType(actions.fetchOwnerDetails.success):
      return {
        ...state,
        ownerDetailes: entityLoadingSucceeded(
          state.ownerDetailes,
          action.payload.data
        )
      };
    case getType(actions.fetchOwnerDetails.failure):
      error = getErrorMessage(action.payload);
      return {
        ...state,
        ownerDetailes: entityLoadingFailed(state.ownerDetailes, error)
      };

    default:
      return state;
  }
};

export default states;
