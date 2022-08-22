import { ApiService, Canceler } from '../../../core/axios';
import { getNftFilterQuery } from '../../utils';
import * as actions from '..';

export const fetchSearchCollectionResults =
  () => async (dispatch: any, getState: any) => {
    dispatch(actions.searchCollections.request(Canceler.cancel));
    const { query } = getState().search;
    const { currentPage, pageLimit } = getState().search.collectionPagination;
    try {
      const { data } = await ApiService.searchCollections({
        q: query,
        currentPage,
        pageLimit
      });
      dispatch(actions.searchCollections.success(data));
    } catch (err) {
      dispatch(actions.searchCollections.failure(err));
    }
  };

export const fetchSearchNftResults =
  () => async (dispatch: any, getState: any) => {
    dispatch(actions.searchNfts.request(Canceler.cancel));
    const { search, filters, sort } = getState();
    const {
      query,
      nftPagination: { currentPage, pageLimit }
    } = search;

    const params = {
      ...getNftFilterQuery({ currentPage, pageLimit }, filters, sort),
      q: query
    };

    try {
      const { data } = await ApiService.searchNfts(params);
      dispatch(actions.searchNfts.success(data));
    } catch (err) {
      dispatch(actions.searchNfts.failure(err));
    }
  };

export const fetchSearchUsersResults =
  () => async (dispatch: any, getState: any) => {
    dispatch(actions.searchUsers.request(Canceler.cancel));
    const { search } = getState();
    const {
      query,
      userPagination: { currentPage, pageLimit }
    } = search;

    try {
      const { data } = await ApiService.searchUsers({
        q: query,
        currentPage,
        pageLimit
      });
      dispatch(actions.searchUsers.success(data));
    } catch (err) {
      dispatch(actions.searchUsers.failure(err));
    }
  };
