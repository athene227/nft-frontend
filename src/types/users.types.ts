// import { SIDE } from '../../src/enums';

export interface IUser {
  nonce: number;
  publicAddress: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImage: string;
  bannerImage?: string;
  bio?: string;
  twitter?: string;
  youtube?: string;
  discord?: string;
  facebook?: string;
  ticktok?: string;
  snapchat?: string;
  website?: string;
}

export interface IUserProfile {
  publicAddress: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  bannerImage?: string;
  bio?: string;
  twitter?: string;
  youtube?: string;
  discord?: string;
  facebook?: string;
  ticktok?: string;
  snapchat?: string;
  website?: string;
}
