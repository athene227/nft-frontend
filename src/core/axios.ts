import axios from 'axios';
import { ICollection } from 'src/collections.types';
import { API_ERRORS } from 'src/enums';
import TokenService from 'src/services/token';
import { IBid } from 'src/types/bids.types';
import { INft } from 'src/types/nfts.types';
import { IUser } from 'src/types/users.types';

export const Axios = axios.create();
export const Canceler = axios.CancelToken.source();

Axios.interceptors.request.use(
  async (config) => {
    const { accessToken } = TokenService.getCurrentToken();
    const headers: { [key: string]: string } = { Accept: 'application/json' };

    if (accessToken) {
      headers.Authorization = accessToken;
    }
    config.headers = { ...config.headers, ...headers };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    const { status, data } = error.response;
    console.log(error.response);
    if (
      status === 401 &&
      !originalRequest._retry &&
      data === API_ERRORS.TOKEN_EXPIRED
    ) {
      originalRequest._retry = true;
      try {
        const response = await ApiService.refreshToken();
        const accessToken: string = response.data as string;
        const { refreshToken } = TokenService.getCurrentToken();
        const newToken = { accessToken, refreshToken };
        TokenService.updateAccessToken(newToken);
        TokenService.setCurrentToken(newToken);

        return Axios.request(originalRequest);
      } catch (err) {
        // if refreshToken is expired
        console.error(err);
      }
    }
    TokenService.removeCurrentToken();
    return Promise.reject(error);
  }
);

const API_VERSION = 'v1';
// REACT_APP_BACKEND_API
const SERVER_URL = process.env.REACT_APP_BACKEND_API;

const END_POINTS = {
  CHECK: `${SERVER_URL}/${API_VERSION}/tracking/check`,
  AUTH: `${SERVER_URL}/${API_VERSION}/auth`,
  REFRESH_TOKEN: `${SERVER_URL}/${API_VERSION}/auth/refresh`,
  PROCESS_TRACKING: `${SERVER_URL}/${API_VERSION}/processTracking`,
  USERS: `${SERVER_URL}/${API_VERSION}/users`,
  NFTS: `${SERVER_URL}/${API_VERSION}/nfts`,
  GET_COLLECTIBLE_NFTS: `${SERVER_URL}/${API_VERSION}/nfts/getCollectibleNfts`,
  GET_MY_NFTS: `${SERVER_URL}/${API_VERSION}/nfts/getMyNfts`,
  GET_NFTS_BY_COLLECTION_ID: `${SERVER_URL}/${API_VERSION}/nfts/getNftsByCollectionId`,
  NFT_DETAILES: `${SERVER_URL}/${API_VERSION}/nfts/getNftDetailes`,
  NFT_COLLECTIBLE_DETAILES: `${SERVER_URL}/${API_VERSION}/nfts/nftMultipleDetailes`,
  GET_HOT_AUCTIONS: `${SERVER_URL}/${API_VERSION}/nfts/getHotAuctions`,
  GET_NFT_COUNTS_BY_CATEGORY: `${SERVER_URL}/${API_VERSION}/nfts/getCountByCategory`,
  // BIDS
  BIDS: `${SERVER_URL}/${API_VERSION}/bids`,
  // COLLECTIONS
  COLLECTIONS: `${SERVER_URL}/${API_VERSION}/collections`,
  SEARCH: `${SERVER_URL}/${API_VERSION}/search`
};

export class ApiService {
  private Authorization: null | string = null;

  static auth = async (data: { publicAddress: string; signature: string }) => {
    return Axios.request({
      url: `${END_POINTS.AUTH}`,
      method: 'post',
      data
    });
  };
  static refreshToken = async () => {
    const { refreshToken } = TokenService.getCurrentToken();

    return Axios.request({
      url: END_POINTS.REFRESH_TOKEN,
      method: 'post',
      data: { refreshToken }
    });
  };
  static createProcessTracking = async (data: any) => {
    return Axios.request({
      url: `${END_POINTS.PROCESS_TRACKING}`,
      method: 'post',
      data
    });
  };
  //* user
  static createUser = async (data: { publicAddress: string }) => {
    return Axios.request<IUser>({
      url: `${END_POINTS.USERS}`,
      method: 'post',
      data
    });
  };

  static getUserN = async (params: { publicAddress: string }) => {
    return Axios.request<IUser | undefined | null>({
      url: `${END_POINTS.USERS}/getUserN`,
      method: 'get',
      params
    });
  };

  static getUserById = async (params: { _id: string }) => {
    return Axios.request({
      url: `${END_POINTS.USERS}/getUserById`,
      method: 'get',
      params
    });
  };

  static getOwnerDetails = async (params: { publicAddress: string }) => {
    return Axios.request({
      url: `${END_POINTS.USERS}/getOwnerDetails`,
      method: 'get',
      params
    });
  };

  static updateUserProfile = async (data: any) => {
    return Axios.request({
      url: `${END_POINTS.USERS}`,
      method: 'put',
      data
    });
  };

  //* users
  static getTopSellers = async (params: { limit: number; day: number }) => {
    return Axios.request({
      url: `${END_POINTS.USERS}/getTopSellers`,
      method: 'get',
      params
    });
  };
  //* users
  static getTopBuyers = async (params: { limit: number; day: number }) => {
    return Axios.request({
      url: `${END_POINTS.USERS}/getTopBuyers`,
      method: 'get',
      params
    });
  };

  //* getListedNfts
  static getListedNfts = async (params: any) => {
    return Axios.request<INft[]>({
      url: END_POINTS.NFTS,
      method: 'get',
      params
    });
  };

  static getListedCollectibleNfts = async () => {
    return Axios.request({
      url: END_POINTS.GET_COLLECTIBLE_NFTS,
      method: 'get'
    });
  };

  static getMyNfts = async (params: {
    ownerAddress?: string;
    status?: string;
    creatorAddress?: string;
  }) => {
    return Axios.request({
      url: END_POINTS.GET_MY_NFTS,
      method: 'get',
      params
    });
  };

  static getNftsByCollectionId = async (params: { collectionId: string }) => {
    return Axios.request({
      url: END_POINTS.GET_NFTS_BY_COLLECTION_ID,
      method: 'get',
      params
    });
  };

  //* getNftDetailes
  static getNftDetailes = async (params: {
    tokenId: string;
    nftAddress: string;
  }) => {
    return Axios.request({
      url: END_POINTS.NFT_DETAILES,
      method: 'get',
      params
    });
  };

  //* getNftMultipleDetailes
  static getNftMultipleDetailes = async (params: {
    tokenId: string;
    nftAddress: string;
  }) => {
    return Axios.request({
      url: END_POINTS.NFT_COLLECTIBLE_DETAILES,
      method: 'get',
      params
    });
  };

  static getHotAuctions = async () => {
    return Axios.request({
      url: END_POINTS.GET_HOT_AUCTIONS,
      method: 'get'
    });
  };

  static getCountForCategories = async () => {
    return Axios.request({
      url: END_POINTS.GET_NFT_COUNTS_BY_CATEGORY,
      method: 'get'
    });
  };

  static createdNft = async (data: any) => {
    return Axios.request<INft>({
      url: END_POINTS.NFTS,
      method: 'post',
      data
    });
  };

  //* create bid
  static createBid = async (data: {
    price: string;
    buyerAddress: string;
    listingId: string;
    toketId: string;
    networkId: number;
  }) => {
    return Axios.request<IBid>({
      url: END_POINTS.BIDS,
      method: 'post',
      data
    });
  };

  static fetchBids = async (params: {
    listingId: string;
    nftAddress: string;
  }) => {
    return Axios.request<IBid[]>({
      url: END_POINTS.BIDS,
      method: 'get',
      params
    });
  };

  static fetchNftHistory = async (params: {
    tokenId: string;
    nftAddress: string;
  }) => {
    return Axios.request<INft[]>({
      url: `${END_POINTS.NFTS}/getNftHistory`,
      method: 'get',
      params
    });
  };

  //* create collection
  static createCollection = async (data: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    userAddress: string;
  }) => {
    return Axios.request<ICollection>({
      url: END_POINTS.COLLECTIONS,
      method: 'post',
      data
    });
  };

  //* getMyCollections
  static getMyCollections = async (params: { userAddress: string }) => {
    return Axios.request<ICollection[]>({
      url: `${END_POINTS.COLLECTIONS}/getMyCollections`,
      method: 'get',
      params
    });
  };

  //* get Hot Collections
  static getHotCollections = async (params: { limit: number; day: number }) => {
    return Axios.request<ICollection[]>({
      url: `${END_POINTS.COLLECTIONS}/getTopCollections`,
      method: 'get',
      params
    });
  };

  //*getCollection
  static getCollection = async (params: { collectionId: string }) => {
    return Axios.request<ICollection>({
      url: `${END_POINTS.COLLECTIONS}/getCollection`,
      method: 'get',
      params
    });
  };

  static getCollections = async () => {
    return Axios.request<ICollection[]>({
      url: `${END_POINTS.COLLECTIONS}/`,
      method: 'get'
    });
  };

  static doGlobalSearch = (query: string, limit?: number) => {
    return Axios.request<{
      collections: ICollection[];
      nfts: INft[];
      users: IUser[];
    }>({
      url: `${END_POINTS.SEARCH}?q=${query}` + (limit ? `&limit=${limit}` : ''),
      method: 'get'
    });
  };

  static searchCollections = (params: any) => {
    return Axios.request<{ data: ICollection[]; totalCount: number }>({
      url: `${END_POINTS.SEARCH}/collection`,
      method: 'get',
      params
    });
  };
  static searchNfts = (params: any) => {
    return Axios.request<{ data: INft[]; totalCount: number }>({
      url: `${END_POINTS.SEARCH}/nft`,
      method: 'get',
      params
    });
  };
  static searchUsers = (params: any) => {
    return Axios.request<{ data: IUser[]; totalCount: number }>({
      url: `${END_POINTS.SEARCH}/user`,
      method: 'get',
      params
    });
  };
}
