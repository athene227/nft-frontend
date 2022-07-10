import { FilterOperator, NftStatus } from 'src/enums';
import { INftFilterQuery } from 'src/types/nfts.types';

import { IFilterState } from './reducers/filters';
import { ISortState } from './reducers/sort';

export const initEntityState = (initialValue: any, loading = false) => ({
  loading,
  data: initialValue,
  loadFailed: false,
  error: null,
  canceler: null
});

export const entityLoadingStarted = (state: any, canceler: any) => ({
  ...state,
  canceler,
  loading: true,
  error: null,
  loadFailed: false
});

export const entityLoadingSucceeded = (state: any, data: any) => ({
  ...state,
  data,
  loading: false,
  error: null,
  loadFailed: false,
  canceler: null
});

export const entityLoadingFailed = (state: any, error: any) => ({
  ...state,
  loading: false,
  error,
  loadFailed: true,
  canceler: null
});

export const handleSelection = (
  selectedIds: any,
  selectId: any,
  singleSelect = false
) => {
  const selected = selectedIds || [];

  if (singleSelect) return [selectId];

  if (selected.includes(selectId)) {
    selected.splice(selected.indexOf(selectId), 1);
  } else {
    selected.push(selectId);
  }

  return selected;
};

export const shuffleArray = (array: []) => {
  const shuffeled = array;

  for (let i = shuffeled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffeled[i], shuffeled[j]] = [shuffeled[j], shuffeled[i]];
  }

  return shuffeled;
};

const generateFilter = (filters: any, isListed: boolean) => {
  const filterArray = [];

  if (filters?.selectedCategories?.length) {
    filterArray.push({
      left: 'category',
      op: FilterOperator.InArray,
      right: filters.selectedCategories
    });
  }
  if (filters?.selectedCollections?.length) {
    filterArray.push({
      left: 'collectionId',
      op: FilterOperator.InArray,
      right: filters.selectedCollections
    });
  }
  if (isListed) {
    filterArray.push({
      left: 'status',
      op: FilterOperator.Equals,
      right: NftStatus.ON_SELL
    });
  }
  if (filters?.selectedStatus?.length) {
    filterArray.push({
      left: 'marketType',
      op: FilterOperator.InArray,
      right: filters.selectedStatus
    });
  }
  if (filters?.selectedPrice?.min) {
    filterArray.push({
      left: 'price',
      op: FilterOperator.GreaterThanEqual,
      right: filters.selectedPrice.min
    });
  }
  if (filters?.selectedPrice?.max) {
    filterArray.push({
      left: 'price',
      op: FilterOperator.LessThanEqual,
      right: filters.selectedPrice.max
    });
  }
  if (filters?.selectedCollections?.length) {
    filterArray.push({
      left: 'collectionId',
      op: FilterOperator.InArray,
      right: filters.selectedCollections
    });
  }
  return filterArray;
};

type NftFilterQueryFunc = (
  NFT: { currentPage: number; pageLimit: number },
  filters: IFilterState,
  sort: ISortState,
  isListed?: boolean
) => INftFilterQuery;

export const getNftFilterQuery: NftFilterQueryFunc = (
  NFT,
  filters,
  sort,
  isListed = true
) => {
  const { currentPage, pageLimit } = NFT;
  const filterArray = generateFilter(filters, isListed);

  return {
    currentPage,
    pageLimit,
    filters: filterArray,
    sortOrder: sort.sortOrder
  };
};
