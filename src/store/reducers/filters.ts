import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { handleSelection } from '../utils';

export interface IFilterState {
  selectedCategories: [];
  selectedStatus: [];
  selectedPrice: { max?: number; min?: number; unit?: string };
  selectedCollections: [];
  filterNftTitle: string;
}

export const defaultState: IFilterState = {
  selectedCategories: [],
  selectedStatus: [],
  selectedPrice: {},
  selectedCollections: [],
  filterNftTitle: ''
};

const states = (state = defaultState, action: any) => {
  const payload = action.payload;

  switch (action.type) {
    case getType(actions.filterCategories):
      const selectedCategories = payload.value
        ? handleSelection(
            state.selectedCategories,
            payload.value,
            payload.singleSelect
          )
        : [];
      return { ...state, selectedCategories };

    case getType(actions.filterStatus):
      const selectedStatus = payload.value
        ? handleSelection(
            state.selectedStatus,
            payload.value,
            payload.singleSelect
          )
        : [];
      return { ...state, selectedStatus };

    case getType(actions.filterCollections):
      const selectedCollections = payload.value ? payload.value : [];
      return { ...state, selectedCollections };

    case getType(actions.filterPrice):
      return { ...state, selectedPrice: payload };

    case getType(actions.filterNftTitle):
      return { ...state, filterNftTitle: action.payload };

    case getType(actions.clearFilter):
      return {
        selectedCategories: [],
        selectedStatus: [],
        selectedItemsType: [],
        selectedCollections: [],
        filterNftTitle: ''
      };

    default:
      return state;
  }
};

export default states;
