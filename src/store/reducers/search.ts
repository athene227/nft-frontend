import { ICollection } from 'src/types/collections.types';
import { INft } from 'src/types/nfts.types';
import { IUser } from 'src/types/users.types';
import { getErrorMessage } from 'src/utils';
import { getType } from 'typesafe-actions';

import * as actions from '../actions';
import {
  entityLoadingFailed,
  entityLoadingStarted,
  entityLoadingSucceeded,
  initEntityState
} from '../utils';

interface Pagination {
  currentPage: number;
  pageLimit: number;
  totalCount: number;
}

interface ICollections {
  loading: boolean;
  data: ICollection[];
  error: any;
  loadFailed: boolean;
  canceler: any;
}
interface INfts {
  loading: boolean;
  data: INft[];
  error: any;
  loadFailed: boolean;
  canceler: any;
}
interface IUsers {
  loading: boolean;
  data: IUser[];
  error: any;
  loadFailed: boolean;
  canceler: any;
}

export interface ISearchState {
  query: string;
  collections: ICollections;
  nfts: INfts;
  users: IUsers;
  collectionPagination: Pagination;
  nftPagination: Pagination;
  userPagination: Pagination;
}

const initialPagination = { currentPage: 0, pageLimit: 20, totalCount: 0 };

export const defaultState: ISearchState = {
  query: '',
  collections: initEntityState([]),
  nfts: initEntityState([]),
  users: initEntityState([]),
  collectionPagination: { currentPage: 0, pageLimit: 20, totalCount: 0 },
  nftPagination: { currentPage: 0, pageLimit: 20, totalCount: 0 },
  userPagination: { currentPage: 0, pageLimit: 20, totalCount: 0 }
};

const states = (state = defaultState, action: any) => {
  const payload = action.payload;
  let error: string;
  let data: any;
  let collectionPagination: any;
  let nftPagination: any;
  let userPagination: any;

  switch (action.type) {
    case getType(actions.searchCollections.request):
      return {
        ...state,
        collections: entityLoadingStarted(state.collections, payload)
      };
    case getType(actions.searchCollections.success):
      data = state.collections.data ? state.collections.data : [];
      collectionPagination = {
        ...state.collectionPagination,
        totalCount: payload.pagination.totalCount
      };
      data.splice(
        collectionPagination.currentPage * collectionPagination.pageLimit,
        collectionPagination.pageLimit,
        ...payload.data
      );

      return {
        ...state,
        loading: false,
        collections: entityLoadingSucceeded(state.collections, data),
        collectionPagination
      };
    case getType(actions.searchCollections.failure):
      error = getErrorMessage(payload);
      return {
        ...state,
        collections: entityLoadingFailed(state.collections, error),
        collectionPagination: initialPagination
      };
    case getType(actions.searchNfts.request):
      return {
        ...state,
        nfts: entityLoadingStarted(state.nfts, payload)
      };
    case getType(actions.searchNfts.success):
      data = state.nfts.data ? state.nfts.data : [];
      nftPagination = {
        ...state.nftPagination,
        totalCount: payload.pagination.totalCount
      };
      data.splice(
        nftPagination.currentPage * nftPagination.pageLimit,
        nftPagination.pageLimit,
        ...payload.data
      );

      return {
        ...state,
        loading: false,
        nfts: entityLoadingSucceeded(state.nfts, data),
        nftPagination
      };
    case getType(actions.searchNfts.failure):
      error = getErrorMessage(payload);
      return {
        ...state,
        nfts: entityLoadingFailed(state.nfts, error),
        nftPagination: initialPagination
      };
    case getType(actions.searchUsers.request):
      return {
        ...state,
        users: entityLoadingStarted(state.users, payload)
      };
    case getType(actions.searchUsers.success):
      data = state.users.data ? state.users.data : [];
      userPagination = {
        ...state.userPagination,
        totalCount: payload.pagination.totalCount
      };
      data.splice(
        userPagination.currentPage * userPagination.pageLimit,
        userPagination.pageLimit,
        ...payload.data
      );

      return {
        ...state,
        loading: false,
        users: entityLoadingSucceeded(state.users, data),
        userPagination
      };
    case getType(actions.searchUsers.failure):
      error = getErrorMessage(payload);
      return {
        ...state,
        users: entityLoadingFailed(state.users, error),
        userPagination: initialPagination
      };

    case getType(actions.setSearchNftCurrentPage):
      return {
        ...state,
        nftPagination: { ...state.nftPagination, currentPage: payload }
      };
    case getType(actions.setSearchCollectionCurrentPage):
      return {
        ...state,
        collectionPagination: {
          ...state.collectionPagination,
          currentPage: payload
        }
      };
    case getType(actions.setSearchUserCurrentPage):
      return {
        ...state,
        userPagination: { ...state.userPagination, currentPage: payload }
      };

    case getType(actions.setSearchQuery):
      return {
        query: payload,
        nfts: initEntityState([]),
        collections: initEntityState([]),
        users: initEntityState([]),
        collectionPagination: initialPagination,
        nftPagination: initialPagination,
        userPagination: initialPagination
      };
    case getType(actions.filterCategories):
    case getType(actions.filterCollections):
    case getType(actions.filterStatus):
    case getType(actions.filterPrice):
    case getType(actions.filterNftTitle):
    case getType(actions.setSortOrder):
      return {
        ...state,
        nfts: initEntityState([]),
        nftPagination: initialPagination
      };
    default:
      return state;
  }
};

export default states;
