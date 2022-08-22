/* eslint-disable no-case-declarations */
import { IBid } from 'src/types/bids.types';
import { getErrorMessage } from 'src/utils';
import { getType } from 'typesafe-actions';

import * as actions from '../actions';
import {
  entityLoadingFailed,
  entityLoadingStarted,
  entityLoadingSucceeded,
  initEntityState
} from '../utils';

export interface IBids {
  loading: boolean;
  data: { [key: string]: IBid[] };
  loadFailed: boolean;
  canceler: any;
  error: any;
}

export interface IBidsState {
  bids: IBids;
}

export const defaultState: IBidsState = {
  bids: initEntityState({})
};

const states = (state = defaultState, action: any) => {
  let error: string;
  switch (action.type) {
    case getType(actions.fetchBids.request):
      return {
        ...state,
        bids: entityLoadingStarted(state.bids, action.payload)
      };
    case getType(actions.fetchBids.success):
      const { listingId, data } = action.payload;
      state.bids.data[listingId] = data;
      return {
        ...state,
        bids: entityLoadingSucceeded(state.bids, state.bids.data)
      };
    case getType(actions.fetchBids.failure):
      error = getErrorMessage(action.payload);
      return { ...state, bids: entityLoadingFailed(state.bids, error) };

    case getType(actions.addBid.request):
      return {
        ...state,
        bids: entityLoadingStarted(state.bids, action.payload)
      };
    case getType(actions.addBid.success):
      const bid = action.payload;
      const _data = state.bids.data[bid.listingId];
      if (
        _data.findIndex(
          ({ transactionHash }) => transactionHash === bid.transactionHash
        ) === -1
      ) {
        _data.unshift(bid);
      }
      const dataWithNewbid = {
        ...state.bids.data,
        [bid.listingId]: _data
      };
      return {
        ...state,
        bids: entityLoadingSucceeded(state.bids, dataWithNewbid)
      };
    case getType(actions.addBid.failure):
      error = getErrorMessage(action.payload);
      return { ...state, bids: entityLoadingFailed(state.bids, error) };

    default:
      return state;
  }
};

export default states;
