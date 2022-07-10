import { IUser } from './types/users.types';

export interface ICollection {
  _id: string;
  id: string; // uuid for lookup table - aggregation
  name: string;
  description: string;
  imageUrl: string;
  userAddress: string;
  user: IUser[];
}
