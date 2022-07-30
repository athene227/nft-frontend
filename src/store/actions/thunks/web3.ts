import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';

export const setupWeb3 =
  (data: {
    data: {
      web3: any;
      nftContract: any;
      nftMarketContract: any;
      accounts: any;
      networkId: any;
      balance: any;
      nft721Contract: any;
      nft1155Contract: any;
      nftMarketSimpleContract: any;
    };
  }) =>
  async (dispatch: any) => {
    dispatch(actions.setupWeb3.request(Canceler.cancel));
    try {
      dispatch(actions.setupWeb3.success(data));
    } catch (err) {
      console.log('error in setupWeb3', err);
      dispatch(actions.setupWeb3.failure(err));
    }
  };

export const fetchAuthorRanking = () => async (dispatch) => {
  dispatch(actions.getAuthorRanking.request(Canceler.cancel));

  try {
    const { data } = await Axios.get('/mock_data/author_ranks.json', {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getAuthorRanking.success(data));
  } catch (err) {
    dispatch(actions.getAuthorRanking.failure(err));
  }
};
