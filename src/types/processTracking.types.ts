import { ICollection } from 'src/collections.types';

import { IUser } from './users.types';

export interface IProcessTracking {
  action: string;
  status: string;
  userAddress: string;
  name: string;
  id: string;
  description: string;
  imageUrl: string;
  creatorAddress: string;
  ownerAddress: string;
  price: number;
  nftAddress: string;
  minimumBid: string;
  startingDate: Date;
  collectionId: string;
  user: IUser[];
  owner: IUser[];
  creator: IUser[];
  nftCollection: ICollection[];
  userInfo?: IUser[];
}
