import { combineReducers } from 'redux';
import nftReducer from './nfts';
import hotCollectionsReducer from './hotCollections';
import hotAuctionReducer from './hotAuction';
import authorListReducer from './authorList';
import filterReducer from './filters';
// timor additions
import counterReducer from './counter';
import web3Reducer from './web3Reducer';
import users from './users';
import collections from './collections';
import sortReducer from './sort';
import searchReducer from './search';
import bidsReducer from './bids';
import eventsReducer from './events';
// import nftsSales from './nftsSales';

export const rootReducer = combineReducers({
  NFT: nftReducer,
  hotCollection: hotCollectionsReducer,
  hotAuction: hotAuctionReducer,
  authors: authorListReducer,
  filters: filterReducer,
  // timor additions
  counter: counterReducer,
  web3: web3Reducer,
  users: users,
  collections: collections,
  //kyohei additions
  sort: sortReducer,
  search: searchReducer,
  bids: bidsReducer,
  events: eventsReducer
  // nftsSales: nftsSales,
});

const reducers = (state, action) => rootReducer(state, action);

export default reducers;
