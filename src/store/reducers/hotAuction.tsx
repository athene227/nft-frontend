import { IProcessTracking } from 'src/types/processTracking.types';
import { getErrorMessage } from 'src/utils';
import { getType } from 'typesafe-actions';

import * as actions from '../actions';
import {
  entityLoadingFailed,
  entityLoadingStarted,
  entityLoadingSucceeded,
  initEntityState
} from '../utils';

export interface IHotAuctions {
  loading: boolean;
  data: IProcessTracking[];
  loadFailed: boolean;
  canceler: any;
  error: any;
}

export interface IHotAuctionsState {
  hotAuctions: IHotAuctions;
}

export const defaultState: IHotAuctionsState = {
  hotAuctions: initEntityState(null)
};

const states = (state = defaultState, action: any) => {
  let error: string;

  switch (action.type) {
    case getType(actions.fetchHotAuctions.request):
      return {
        ...state,
        hotAuctions: entityLoadingStarted(state.hotAuctions, action.payload)
      };
    case getType(actions.fetchHotAuctions.success):
      return {
        ...state,
        hotAuctions: entityLoadingSucceeded(state.hotAuctions, action.payload)
      };
    case getType(actions.fetchHotAuctions.failure):
      error = getErrorMessage(action.payload);
      return {
        ...state,
        hotAuctions: entityLoadingFailed(state.hotAuctions, error)
      };
    default:
      return state;
  }
};

export default states;
