import { getType } from 'typesafe-actions';
import * as actions from '../actions';

export interface IEventState {
  eventList: any[];
}

export const defaultState: IEventState = {
  eventList: []
};

const states = (state = defaultState, action: any) => {
  const { payload } = action;

  switch (action.type) {
    case getType(actions.addMintEvent):
    case getType(actions.addSimpleMarketItemEvent):
    case getType(actions.addAuctionMarketItemEvent):
    case getType(actions.addBuySimpleEvent):
    case getType(actions.addCancelSimpleEvent):
    case getType(actions.addCancelAuctionEvent):
    case getType(actions.addTerminateAuctionEvent):
      return { ...state, eventList: [...state.eventList, payload] };
    case getType(actions.clearEvents):
      return { ...state, eventList: [] };
    default:
      return state;
  }
};

export default states;
