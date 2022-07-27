import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import {
  initEntityState,
  entityLoadingStarted,
  entityLoadingSucceeded,
  entityLoadingFailed
} from '../utils';

export interface IWeb3State {
  web3: any;
  nftContract: any;
  nftMarketContract: any;
  escrowContract: any;
  networkId: null | number;
  accounts: string[];
  balance: null | number;
}

const initialValue: IWeb3State = {
  web3: null,
  nftContract: null,
  nftMarketContract: null,
  escrowContract: null,
  accounts: [],
  networkId: null,
  balance: null
};

export const defaultState = {
  web3: initEntityState(initialValue)
};

const states = (state = defaultState, action: any) => {
  switch (action.type) {
    case getType(actions.setupWeb3.request):
      return {
        ...state,
        web3: entityLoadingStarted(state.web3, action.payload)
      };
    case getType(actions.setupWeb3.success):
      return {
        ...state,
        web3: entityLoadingSucceeded(state.web3, action.payload.data)
      };
    case getType(actions.setupWeb3.failure):
      return { ...state, web3: entityLoadingFailed(state.web3) };

    default:
      return state;
  }
};

export default states;
