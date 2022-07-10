import { IBid } from 'src/types/bids.types';

import { ApiService, Canceler } from '../../../core/axios';
import * as actions from '../../actions';

//* fetchBids
export const fetchBids =
  ({ listingId, nftAddress }: { listingId: string; nftAddress: string }) =>
    async (dispatch: any) => {
      dispatch(actions.fetchBids.request(Canceler.cancel));
      try {
        const { data } = await ApiService.fetchBids({ listingId, nftAddress });
        dispatch(actions.fetchBids.success({ listingId, data }));
      } catch (err) {
        dispatch(actions.fetchBids.failure(err));
      }
    };

//* add bid
export const addBid = (bid: IBid) => async (dispatch: any) => {
  dispatch(actions.addBid.request(Canceler.cancel));
  try {
    dispatch(actions.addBid.success(bid));
  } catch (err) {
    dispatch(actions.addBid.failure(err));
  }
};
