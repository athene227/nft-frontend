import { createSelector, createStructuredSelector } from 'reselect';

import {
  IListedNfts,
  IUserNfts,
  InftDetail,
  InftCollectibleDetail,
  InftShowcase,
  IsellNft
} from '../reducers/nfts';
import { IUserState } from '../reducers/users';
import { IWeb3State } from '../reducers/web3Reducer';
import { ICollectionsState } from '../reducers/collections';
import {
  IHotCollections,
  IHotCollectionsState
} from '../reducers/hotCollections';
import { ISearchState } from '../reducers/search';
import { IBids } from '../reducers/bids';
import { INft } from 'src/types/nfts.types';
import { IHotAuctions } from '../reducers/hotAuction';

//Store Selectors
export const listedNftsState = (state: any) => ({
  ...(state.NFT.listedNfts as IListedNfts),
  currentPage: state.NFT.currentPage,
  pageLimit: state.NFT.pageLimit,
  totalCount: state.NFT.totalCount
});

export const nftShowcaseState = (state: any) =>
  state.NFT.nftShowcase as InftShowcase;
export const nftDetailState = (state: any) => state.NFT.nftDetail as InftDetail;
export const nftCollectibleDetailState = (state: any) =>
  state.NFT.nftCollectibleDetails as InftCollectibleDetail;
export const hotCollectionsState = (state: any) =>
  state.hotCollection.hotCollections as IHotCollections;

export const hotAuctionState = (state: any) =>
  state.hotAuction.hotAuctions as IHotAuctions;

export const authorsState = (state: any) => state.authors.authorList;
export const authorRankingsState = (state: any) => state.authors.authorRanking;

// timor additons
export const counterState = (state: any) => state.counter;
export const web3State = (state: any) => state.web3 as IWeb3State;
export const userState = (state: any) => state.users as IUserState;
export const ownerState = (state: any) => state.users as IUserState;
export const userNfts = (state: any) => state.NFT.userNfts as IUserNfts;
export const sellNftState = (state: any) => state.NFT.sellNft as IsellNft;
export const collectionsState = (state: any) =>
  state.collections as ICollectionsState;
export const bidsState = (state: any) => state.bids.bids as IBids;
export const searchState = (state: any) => state.search as ISearchState;
export const newNftsState = (state: any) => state.NFT.newNfts.data as INft[];

/*export const hotAuctionsState = (state: any) =>
  state.NFT.hotAuctions.data as INft[];*/

export const nftCount = (state: any) => state.NFT.nftCount.data as any;

export const auctionedNfts = createSelector(listedNftsState, (nfts) => {
  if (!nfts.data) {
    return [];
  }
  const acutioned = nfts.data.filter((nft) => !!nft.deadline);
  return acutioned;
});

export const nftFilter = createStructuredSelector({
  categories: (state: any) => state.filters.selectedCategories,
  status: (state: any) => state.filters.selectedStatus,
  price: (state: any) => state.filters.selectedPrice,
  collections: (state: any) => state.filters.selectedCollections,
  nftTitle: (state: any) => state.filters.filterNftTitle
});

export const nftSorter = (state: any) => state.sort.sortOrder;

export const nftItems = createSelector(listedNftsState, (nfts) => {
  const { currentPage, pageLimit, totalCount } = nfts;

  return { nfts, currentPage, pageLimit, totalCount };
});

export const nftEvents = (state: any) => state.events.eventList;
