import { IUser } from './users.types';

export interface ICollection {
  _id: string;
  id: string; // uuid for lookup table - aggregation
  name: string;
  description: string;
  imageUrl: string;
  bannerUrl: string;
  userAddress: string;
  user: IUser[];
  category: string;
  link_yoursite: string;
  link_discord: string;
  link_medium: string;
  link_telegram: string;
  pulseUrl: string;
}
