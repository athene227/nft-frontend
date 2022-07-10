import { getType } from 'typesafe-actions';
import * as actions from '../actions';
// import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
  counter: 5
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    case getType(actions.increaseNumber.request):
      // return { ...state, nftBreakdown: entityLoadingStarted(state.nftBreakdown, action.payload) };
      break;
    case getType(actions.increaseNumber.success):
      //append existing data with new data
      return { ...state, counter: state.counter + action.payload };
    case getType(actions.increaseNumber.failure):
      // return { ...state, nftBreakdown: entityLoadingFailed(state.nftBreakdown) };
      break;

    case getType(actions.decreaseNumber.request):
      // return { ...state, nftBreakdown: entityLoadingStarted(state.nftBreakdown, action.payload) };
      break;
    case getType(actions.decreaseNumber.success):
      return { ...state, counter: state.counter - action.payload };

    case getType(actions.decreaseNumber.failure):
      break;
    // return { ...state, nftBreakdown: entityLoadingFailed(state.nftBreakdown) };
    default:
      return state;
  }
};

export default states;
