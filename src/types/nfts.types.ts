// import { SIDE } from '../../src/enums';

import { ICollection } from 'src/collections.types';
import {
  ATTRIBUTE_TYPE,
  ITEM_CREATE_STATUS,
  MARKET_TYPE,
  STATUS
} from 'src/enums';

import { IUser } from './users.types';

export interface INftAttribute {
  trait_type: string;
  value: string | number;
  display_type: ATTRIBUTE_TYPE;
  max_value?: number;
}

export interface INft {
  _id: string;
  nftAddress: string;
  tokenId: string;
  listingId: string;
  name: string;
  royalty: number;
  description: string;
  imageUrl: string;
  previewImageUrl: string;
  attributes?: INftAttribute[];
  marketType: MARKET_TYPE;
  creatorAddress: string;
  collectionId: string;
  royalties: string;
  ownerAddress: string;
  category: string;
  status: STATUS;
  item_type: string;
  collections: string;
  deadline: string;
  authorLink: string;
  nftLink: string;
  bidLink: string;
  authorImg: string;
  price: number;
  bid: string;
  likes: number;
  isListedOnce: boolean;
  multiple: boolean;
  totalAmount: number;
  leftAmount: number;
  listedAmount: number;
  amount: number;
  minimumBid: string;
  startingDate: Date;
  expirationDate: Date;
  users: IUser[];
  creator: IUser[];
  owner: IUser[];
  networkId: number;
  nftCollection: ICollection[];
  bids?: [];
  totalBid?: number;
}

export interface ISimpleMarketItem {
  nftContract: string;
  tokenId: string;
  price: string;
  originalQuantity: string;
  remainingQuantity: string;
  ownerAddress: string;
}

export interface IAuctionMarketItem {
  nftContract: string;
  tokenId: string;
  startPrice: string;
  currentBid: string;
  currentBidderAddress: string;
  ownerAddress: string;
  deadline: string;
  isClosed: boolean;
}

export interface INftFilterQuery {
  currentPage: number;
  pageLimit: number;
}

export interface MarketItemCreateProgress {
  status: ITEM_CREATE_STATUS;
  imageUrl: string | null;
  previewImageUrl: string | null;
  metaDataUrl: string | null;
  tokenId: string | null;
  tokenTransactionHash: string | null;
  listingId: string | null;
  listingTransactionHash: string | null;
  error: any;
}
