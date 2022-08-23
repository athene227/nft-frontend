import {
  createAction as action,
  createAsyncAction as asyncAction
} from 'typesafe-actions';

export const fetchListedNfts: any = asyncAction(
  'nft/FETCH_LISTED_NFTS',
  'nft/FETCH_LISTED_NFTS_SUCCESS',
  'nft/FETCH_LISTED_NFTS_FAIL'
)();

export const getNftShowcase: any = asyncAction(
  'nft/GET_NFT_SHOWCASE',
  'nft/GET_NFT_SHOWCASE_SUCCESS',
  'nft/GET_NFT_SHOWCASE_FAIL'
)();

export const fetchNftDetail: any = asyncAction(
  'nft/fetchNftDetail',
  'nft/fetchNftDetail_SUCCESS',
  'nft/fetchNftDetail_FAIL'
)();

export const fetchNftMultipleDetails: any = asyncAction(
  'nft/FETCH_NFT_MULTIPLE_DETAILS',
  'nft/FETCH_NFT_MULTIPLE_DETAILS_SUCCESS',
  'nft/FETCH_NFT_MULTIPLE_DETAILS_FAIL'
)();

export const getHotCollections: any = asyncAction(
  'nft/GET_HOT_COLLECTIONS',
  'nft/GET_HOT_COLLECTIONS_SUCCESS',
  'nft/GET_HOT_COLLECTIONS_FAIL'
)();

export const getAuthorList: any = asyncAction(
  'nft/GET_AUTHOR_LIST',
  'nft/GET_AUTHOR_LIST_SUCCESS',
  'nft/GET_AUTHOR_LIST_FAIL'
)();

export const getAuthorRanking: any = asyncAction(
  'nft/GET_AUTHOR_Ranking',
  'nft/GET_AUTHOR_Ranking_SUCCESS',
  'nft/GET_AUTHOR_Ranking_FAIL'
)();

export const clearNfts = action('nft/CLEAR_ALL_NFTS')();
export const clearFilter = action('nft/CLEAR_FILTER')();
export const filterCategories = action('nft/FILTER_CATEGORIES')();
export const filterStatus = action('nft/FILTER_STATUS')();
export const filterCollections = action('nft/FILTER_COLLECTIONS')();
export const filterNftTitle = action('nft/FILTER_NFT_TITLE')();
export const filterPrice = action('nft/FILTER_PRICE')();
export const setCurrentPage = action('nft/SET_CURRENT_PAGE')();

export const setSortOrder = action('nft/SET_SORT_ORDER')();

export const setSearchCollectionCurrentPage = action(
  'search/SET_CURRENT_PAGE'
)();
export const setSearchNftCurrentPage = action('search/SET_CURRENT_PAGE')();
export const setSearchUserCurrentPage = action('search/SET_CURRENT_PAGE')();
export const setSearchQuery = action('search/SET_SEARCH_QUERY')();

export const searchCollections: any = asyncAction(
  'search/searchCollection',
  'search/searchCollection_SUCCESS',
  'search/searchCollection_FAIL'
)();
export const searchNfts: any = asyncAction(
  'search/searchNfts',
  'search/searchNfts_SUCCESS',
  'search/searchNfts_FAIL'
)();
export const searchUsers: any = asyncAction(
  'search/searchUsers',
  'search/searchUsers_SUCCESS',
  'search/searchUsers_FAIL'
)();
//timor addition

// *** example ***
export const increaseNumber: any = asyncAction(
  'nft/increaseNumber',
  'nft/increaseNumber_SUCCESS',
  'nft/increaseNumber_FAIL'
)();
export const decreaseNumber: any = asyncAction(
  'nft/decreaseNumber',
  'nft/decreaseNumber_SUCCESS',
  'nft/decreaseNumber_FAIL'
)();
// **************

export const setupWeb3: any = asyncAction(
  'web3/setupWeb3',
  'web3/setupWeb3_SUCCESS',
  'web3/setupWeb3_FAIL'
)();

export const setupWeb3Loader: any = asyncAction(
  'web3/setupWeb3Loader',
  'web3/setupWeb3Loader_SUCCESS',
  'web3/setupWeb3Loader_FAIL'
)();

export const setNftContract: any = asyncAction(
  'web3/setNftContract',
  'web3/setNftContract_SUCCESS',
  'web3/setNftContract_FAIL'
)();
export const setNftMarketContract: any = asyncAction(
  'web3/setNftMarketContract',
  'web3/setNftMarketContract_SUCCESS',
  'web3/setNftMarketContract_FAIL'
)();

export const setAccounts: any = asyncAction(
  'web3/setAccounts',
  'web3/setAccounts_SUCCESS',
  'web3/setAccounts_FAIL'
)();

export const fetchUserNfts: any = asyncAction(
  'nfts/fetchUserNfts',
  'nfts/fetchUserNfts_SUCCESS',
  'nfts/fetchUserNfts_FAIL'
)();

export const updateNft: any = asyncAction(
  'nfts/updateNft',
  'nfts/updateNft_SUCCESS',
  'nfts/updateNft_FAIL'
)();

// users
export const getUserProfile: any = asyncAction(
  'users/getUserProfile',
  'users/getUserProfile_SUCCESS',
  'users/getUserProfile_FAIL'
)();

// users
export const setUserProfile: any = asyncAction(
  'users/setUserProfile',
  'users/setUserProfile_SUCCESS',
  'users/setUserProfile_FAIL'
)();
export const fetchOwnerDetails: any = asyncAction(
  'users/fetchOwnerDetails',
  'users/fetchOwnerDetails_SUCCESS',
  'users/fetchOwnerDetails_FAIL'
)();

export const sellNft: any = asyncAction(
  'nft/sellNft',
  'nft/sellNft_SUCCESS',
  'nft/sellNft_FAIL'
)();

// collections
export const fetchMyCollections: any = asyncAction(
  'collections/fetchMyCollections',
  'collections/fetchMyCollections_SUCCESS',
  'collections/fetchMyCollections_FAIL'
)();

export const fetchUserCollections: any = asyncAction(
  'collections/fetchUserCollections',
  'collections/fetchUserCollections_SUCCESS',
  'collections/fetchUserCollections_FAIL'
)();

export const createCollection: any = asyncAction(
  'collections/createCollection',
  'collections/createCollection_SUCCESS',
  'collections/createCollection_FAIL'
)();

export const getCollections: any = asyncAction(
  'collections/getCollections',
  'collections/getCollections_SUCCESS',
  'collections/getCollections_FAIL'
)();

//* bids
export const fetchBids: any = asyncAction(
  'bids/fetchBids',
  'bids/fetchBids_SUCCESS',
  'bids/fetchBids_FAIL'
)();

export const addBid: any = asyncAction(
  'bids/addBid',
  'bids/addBid_SUCCESS',
  'bids/addBid_FAIL'
)();

export const addMintEvent = action('events/addMintEvent')();
export const addSimpleMarketItemEvent = action(
  'events/addSimpleMarketItemEvent'
)();
export const addAuctionMarketItemEvent = action(
  'events/addAuctionMarketItemEvent'
)();
export const addBuySimpleEvent = action('events/addBuySimpleEvent')();
export const addCancelSimpleEvent = action('events/addCancelSimpleEvent')();
export const addCancelAuctionEvent = action('events/addCancelAuctionEvent')();
export const addTerminateAuctionEvent = action(
  'events/addTerminateAuctionEvent'
)();
export const clearEvents = action('events/clearEvents')();

export const fetchNewNfts: any = asyncAction(
  'nft/fetchNewNfts',
  'nft/fetchNewNfts_SUCCESS',
  'nft/fetchNewNfts_FAIL'
)();

export const fetchHotAuctions: any = asyncAction(
  'nft/fetchHotAuctions',
  'nft/fetchHotAuctions_SUCCESS',
  'nft/fetchHotAuctions_FAIL'
)();

export const fetchCountForCategories: any = asyncAction(
  'nft/fetchCountForCategories',
  'nft/fetchCountForCategories_SUCCESS',
  'nft/fetchCountForCategories_FAIL'
)();
