import { SortOrder } from 'src/enums';
import { getType } from 'typesafe-actions';

import * as actions from '../actions';

export interface ISortState {
  sortOrder: string;
}

export const defaultState: ISortState = {
  sortOrder: SortOrder.RECENTLY_ADDED
};

const states = (state = defaultState, action: any) => {
  const payload = action.payload;

  switch (action.type) {
    case getType(actions.setSortOrder):
      return { ...state, sortOrder: payload };
    default:
      return state;
  }
};

export default states;
