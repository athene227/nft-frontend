import { IProcessTracking } from 'src/types/processTracking.types';
import { getErrorMessage } from 'src/utils';
import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import {
  initEntityState,
  entityLoadingStarted,
  entityLoadingSucceeded,
  entityLoadingFailed
} from '../utils';

export interface IHotCollections {
  loading: boolean;
  data: IProcessTracking[];
  loadFailed: boolean;
  canceler: any;
  error: any;
}

export interface IHotCollectionsState {
  hotCollections: IHotCollections;
}

export const defaultState: IHotCollectionsState = {
  hotCollections: initEntityState(null)
};

const states = (state = defaultState, action: any) => {
  let error: string;

  switch (action.type) {
    case getType(actions.getHotCollections.request):
      return {
        ...state,
        hotCollections: entityLoadingStarted(
          state.hotCollections,
          action.payload
        )
      };
    case getType(actions.getHotCollections.success):
      return {
        ...state,
        hotCollections: entityLoadingSucceeded(
          state.hotCollections,
          action.payload
        )
      };
    case getType(actions.getHotCollections.failure):
      error = getErrorMessage(action.payload);
      return {
        ...state,
        hotCollections: entityLoadingFailed(state.hotCollections, error)
      };
    default:
      return state;
  }
};

export default states;
