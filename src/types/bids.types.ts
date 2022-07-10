// import { SIDE } from '../../src/enums';

import { IUser } from './users.types';

export interface IBid {
  price: number;
  buyerAddress: string;
  listingId: string;
  toketId: string;
  createdAt: Date;
  updatedAt: Date;
  buyer: IUser[];
  transactionHash: string;
}
