// import { SIDE } from '../../src/enums';
import { IUser } from './users.types';
import { IPriceToken } from './priceTokens.types';

export interface IOffer {
  offerId: string;
  tokenId: string;
  listingId?: string;
  offererAddress: string;
  // ownerAddress: string;
  nftAddress: string;
  erc20Address: string;
  amount: number;
  quantity: number;
  deadline: Date;
  isClosed: boolean;
  transactionHash: string;
  offerer?: IUser[];
  pricetoken?: IPriceToken[];
  // owner?: IUser[];
  createdAt?: Date;
  updatedAt?: Date;
}
