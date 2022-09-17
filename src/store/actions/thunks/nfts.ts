/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'src/enums';
import { getNftFilterQuery } from 'src/store/utils';

import { ApiService, Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';

//* fetchListedNfts
export const fetchListedNfts = () => async (dispatch: any, getState: any) => {
  dispatch(actions.fetchListedNfts.request(Canceler.cancel));
  try {
    const { NFT, filters, sort } = getState();
    const query = getNftFilterQuery(NFT, filters, sort);
    const { data } = await ApiService.getListedNfts(query);
    dispatch(actions.fetchListedNfts.success(data));
  } catch (err) {
    dispatch(actions.fetchListedNfts.failure(err));
  }
};

export const fetchNewNfts = () => async (dispatch: any, getState: any) => {
  dispatch(actions.fetchNewNfts.request(Canceler.cancel));
  try {
    const query = {
      currentPage: 0,
      pageLimit: 10,
      filters: [{ left: 'status', op: 'eq', right: 'ON_SELL' }],
      sortOrder: SortOrder.RECENTLY_ADDED
    };
    const { data } = await ApiService.getListedNfts(query);

    dispatch(actions.fetchNewNfts.success(data));
  } catch (err) {
    dispatch(actions.fetchNewNfts.failure(err));
  }
};

//* fetch hot auctions
export const fetchHotAuctions = () => async (dispatch: any, getState: any) => {
  dispatch(actions.fetchHotAuctions.request(Canceler.cancel));
  try {
    const { data } = await ApiService.getHotAuctions();

    dispatch(actions.fetchHotAuctions.success(data));
  } catch (err) {
    dispatch(actions.fetchHotAuctions.failure(err));
  }
};

export const fetchUserNfts =
  (payload: {
    ownerAddress?: string;
    status?: string;
    creatorAddress?: string;
  }) =>
  async (dispatch: any, getState: any) => {
    const { ownerAddress, status, creatorAddress } = payload;
    dispatch(actions.fetchUserNfts.request(Canceler.cancel));
    try {
      const { data } = await ApiService.getMyNfts({
        ownerAddress,
        status,
        creatorAddress
      });
      dispatch(actions.fetchUserNfts.success(data));
    } catch (err) {
      dispatch(actions.fetchUserNfts.failure(err));
    }
  };

//* delete
export const fetchNftShowcase = () => async (dispatch: any) => {
  dispatch(actions.getNftShowcase.request(Canceler.cancel));

  try {
    const { data } = await Axios.get('/mock_data/nft_showcase.json', {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getNftShowcase.success(data));
  } catch (err) {
    dispatch(actions.getNftShowcase.failure(err));
  }
};

//* fetchNftDetail
export const fetchNftDetail =
  (payload: { tokenId: string; nftAddress: string }) =>
  async (dispatch: any) => {
    const { tokenId, nftAddress } = payload;

    dispatch(actions.fetchNftDetail.request(Canceler.cancel));
    try {
      const { data } = await ApiService.getNftDetailes({ tokenId, nftAddress });
      dispatch(actions.fetchNftDetail.success(data));
    } catch (err) {
      dispatch(actions.fetchNftDetail.failure(err));
    }
  };

export const fetchNftMultipleDetails =
  (payload: { tokenId: string; nftAddress: string }) =>
  async (dispatch: any) => {
    const { tokenId, nftAddress } = payload;
    dispatch(actions.fetchNftMultipleDetails.request(Canceler.cancel));
    try {
      const { data } = await ApiService.getNftMultipleDetailes({
        tokenId,
        nftAddress
      });
      dispatch(actions.fetchNftMultipleDetails.success(data));
    } catch (err) {
      dispatch(actions.fetchNftMultipleDetails.failure(err));
    }
  };

//* transfer to backend
export const createNft = (payload: any) => async (dispatch: any) => {
  dispatch(actions.updateNft.request(Canceler.cancel));
  try {
    const { data } = await ApiService.createdNft(payload);
    dispatch(actions.updateNft.success(data));
  } catch (err) {
    dispatch(actions.updateNft.failure(err));
  }
};

export const fetchCountForCategories = () => async (dispatch: any) => {
  dispatch(actions.fetchCountForCategories.request(Canceler.cancel));

  try {
    const { data } = await ApiService.getCountForCategories();
    dispatch(actions.fetchCountForCategories.success(data));
  } catch (err) {
    dispatch(actions.fetchCountForCategories.failure(err));
  }
};
