import { INft } from 'src/types/nfts.types';
import { getErrorMessage } from 'src/utils';
import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import {
  initEntityState,
  entityLoadingStarted,
  entityLoadingSucceeded,
  entityLoadingFailed
} from '../utils';

export interface IListedNfts {
  loading: boolean;
  data: INft[];
  error: any;
  loadFailed: boolean;
  canceler: any;
}
export interface IUserNfts {
  loading: boolean;
  data: INft[];
  error: any;
  loadFailed: boolean;
  canceler: any;
}
export interface InftDetail {
  loading: boolean;
  data: INft | null;
  error: any;
  loadFailed: boolean;
  canceler: any;
}
export interface InftCollectibleDetail {
  loading: boolean;
  data: INft[];
  error: any;
  loadFailed: boolean;
  canceler: any;
}
export interface InftShowcase {
  loading: boolean;
  data: null | INft;
  loadFailed: boolean;
  canceler: any;
}
export interface IsellNft {
  loading: boolean;
  loadFailed: boolean;
  error: any;
  canceler: any;
}

export interface ICountForCategory {
  loading: boolean;
  loadFailed: boolean;
  error: any;
  canceler: any;
  data: any;
}

export interface INftState {
  listedNfts: IListedNfts;
  userNfts: IUserNfts;
  nftDetail: InftDetail;
  nftCollectibleDetails: InftCollectibleDetail;
  nftShowcase: InftShowcase;
  newNfts: IListedNfts;
  hotAuctions: IListedNfts;
  sellNft: IsellNft;
  nftCount: ICountForCategory;
  currentPage: number;
  pageLimit: number;
  totalCount: number;
}

export const defaultState: INftState = {
  listedNfts: initEntityState([]),
  userNfts: initEntityState([]),
  nftDetail: initEntityState(null),
  nftCollectibleDetails: initEntityState([]),
  nftShowcase: initEntityState(null),
  newNfts: initEntityState([]),
  hotAuctions: initEntityState([]),
  sellNft: initEntityState(null),
  nftCount: initEntityState({}),
  currentPage: 0,
  pageLimit: 21,
  totalCount: 0
};

const states = (
  state = defaultState,
  action: { type: string; payload: any }
) => {
  let error: string;
  switch (action.type) {
    case getType(actions.fetchListedNfts.request):
      return {
        ...state,
        listedNfts: entityLoadingStarted(state.listedNfts, action.payload)
      };
    case getType(actions.fetchListedNfts.success):
      // append existing data with new data
      const data = state.listedNfts.data ? state.listedNfts.data : [];
      data.splice(
        state.currentPage * state.pageLimit,
        state.pageLimit,
        ...action.payload.data
      );
      return {
        ...state,
        listedNfts: entityLoadingSucceeded(state.listedNfts, data),
        totalCount: action.payload.pagination.totalCount
      };
    case getType(actions.fetchListedNfts.failure):
      error = getErrorMessage(action.payload);
      return {
        ...state,
        listedNfts: entityLoadingFailed(state.listedNfts, error),
        currentPage: 0,
        totalCount: 0
      };

    case getType(actions.fetchNftDetail.request):
      return {
        ...state,
        nftDetail: entityLoadingStarted(state.nftDetail, action.payload)
      };
    case getType(actions.fetchNftDetail.success):
      return {
        ...state,
        nftDetail: entityLoadingSucceeded(state.nftDetail, action.payload)
      };
    case getType(actions.fetchNftDetail.failure):
      error = getErrorMessage(action.payload);
      return {
        ...state,
        nftDetail: entityLoadingFailed(state.nftDetail, error)
      };

    case getType(actions.fetchNftMultipleDetails.request):
      return {
        ...state,
        nftCollectibleDetails: entityLoadingStarted(
          state.nftCollectibleDetails,
          action.payload
        )
      };
    case getType(actions.fetchNftMultipleDetails.success):
      console.log(
        '🚀 ~ file: nfts.tsx ~ line 151 ~ action.payload',
        action.payload
      );
      return {
        ...state,
        nftCollectibleDetails: entityLoadingSucceeded(
          state.nftCollectibleDetails,
          action.payload
        )
      };
    case getType(actions.fetchNftMultipleDetails.failure):
      error = getErrorMessage(action.payload);
      return {
        ...state,
        nftCollectibleDetails: entityLoadingFailed(
          state.nftCollectibleDetails,
          error
        )
      };

    case getType(actions.getNftShowcase.request):
      return {
        ...state,
        nftShowcase: entityLoadingStarted(state.nftShowcase, action.payload)
      };
    case getType(actions.getNftShowcase.success):
      return {
        ...state,
        nftShowcase: entityLoadingSucceeded(state.nftShowcase, action.payload)
      };
    case getType(actions.getNftShowcase.failure):
      return { ...state, nftShowcase: entityLoadingFailed(state.nftShowcase) };

    case getType(actions.fetchUserNfts.request):
      return {
        ...state,
        userNfts: entityLoadingStarted(state.userNfts, action.payload)
      };
    case getType(actions.fetchUserNfts.success):
      return {
        ...state,
        userNfts: entityLoadingSucceeded(state.userNfts, action.payload)
      };
    case getType(actions.fetchUserNfts.failure):
      error = getErrorMessage(action.payload);
      return { ...state, userNfts: entityLoadingFailed(state.userNfts, error) };

    case getType(actions.updateNft.request):
      return {
        ...state,
        nftDetail: entityLoadingStarted(state.nftDetail, action.payload)
      };
    case getType(actions.updateNft.success):
      return {
        ...state,
        nftDetail: entityLoadingSucceeded(state.nftDetail, action.payload)
      };
    case getType(actions.updateNft.failure):
      return {
        ...state,
        nftDetail: entityLoadingFailed(state.nftDetail, action.payload)
      };

    case getType(actions.sellNft.request):
      return {
        ...state,
        sellNft: entityLoadingStarted(state.sellNft, action.payload)
      };
    case getType(actions.sellNft.success):
      // let payload = state.listedNfts.data ? [...state.listedNfts.data, ...action.payload] : action.payload;

      return {
        ...state,
        listedNfts: entityLoadingSucceeded(state.listedNfts, action.payload)
      };
    case getType(actions.sellNft.failure):
      return {
        ...state,
        sellNft: entityLoadingFailed(state.sellNft, action.payload)
      };

    case getType(actions.fetchNewNfts.request):
      return {
        ...state,
        newNfts: entityLoadingStarted(state.newNfts, action.payload)
      };
    case getType(actions.fetchNewNfts.success):
      return {
        ...state,
        newNfts: entityLoadingSucceeded(state.newNfts, action.payload.data)
      };
    case getType(actions.fetchNewNfts.failure):
      error = getErrorMessage(action.payload);
      return { ...state, newNfts: entityLoadingFailed(state.newNfts, error) };

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

    case getType(actions.fetchCountForCategories.request):
      return {
        ...state,
        nftCount: entityLoadingStarted(state.nftCount, action.payload)
      };
    case getType(actions.fetchCountForCategories.success):
      return {
        ...state,
        nftCount: entityLoadingSucceeded(state.nftCount, action.payload)
      };
    case getType(actions.fetchCountForCategories.failure):
      error = getErrorMessage(action.payload);
      return { ...state, nftCount: entityLoadingFailed(state.nftCount, error) };
    // case getType(actions.getlistedNfts.request):
    //   return { ...state, listedNfts: entityLoadingStarted(state.listedNfts, action.payload) };
    // case getType(actions.getlistedNfts.success):
    //   // append existing data with new data
    //   let payload = state.listedNfts.data ? [...state.listedNfts.data, ...action.payload] : action.payload;
    //   return { ...state, listedNfts: entityLoadingSucceeded(state.listedNfts, payload) };
    // case getType(actions.getlistedNfts.failure):
    //   return { ...state, listedNfts: entityLoadingFailed(state.listedNfts) };
    case getType(actions.setCurrentPage):
      return { ...state, currentPage: action.payload };
    case getType(actions.filterCategories):
    case getType(actions.filterCollections):
    case getType(actions.filterStatus):
    case getType(actions.filterPrice):
    case getType(actions.filterNftTitle):
    case getType(actions.setSortOrder):
    case getType(actions.clearNfts):
      return { ...state, listedNfts: initEntityState([]), currentPage: 0 };

    default:
      return state;
  }
};

export default states;
