// import { SIDE } from '../../src/enums';
import { IPriceToken } from './priceTokens.types';
import { IUser } from './users.types';

export interface IOffer {
  offerId: string;
  tokenId: string;
  listingId?: string;
  offererAddress: string;
  // ownerAddress: string;
  nftAddress: string;
  priceTokenId: string | undefined;
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
