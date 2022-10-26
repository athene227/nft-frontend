/* eslint-disable prettier/prettier */
import categoryimg0 from 'src/assets/images/icon/art.svg';
import categoryimg1 from 'src/assets/images/icon/category-img.svg';
import categoryimg2 from 'src/assets/images/icon/domain.svg';
import categoryimg9 from 'src/assets/images/icon/game.svg';
import categoryimg3 from 'src/assets/images/icon/music.svg';
import categoryimg4 from 'src/assets/images/icon/photography.svg';
import categoryimg5 from 'src/assets/images/icon/sports.svg';
import categoryimg6 from 'src/assets/images/icon/trading.svg';
import categoryimg7 from 'src/assets/images/icon/utility.svg';
import categoryimg8 from 'src/assets/images/icon/web.svg';
import { NftType } from 'src/enums';

export enum COLLECTION_TYPE {
  NULL = 'NULL',
  Art = 'Art',
  Collectibles = 'Collectibles',
  DomainNames = 'Domain Names',
  Music = 'Music',
  Photography = 'Photography',
  Sports = 'Sports',
  TradingCards = 'Trading Cards',
  Utility = 'Utility',
  VirtualWorlds = 'Virtual Worlds',
  Gaming = 'Gaming',
  Other = 'Other'
}
export interface ICategoryType {
  name: COLLECTION_TYPE;
  image: string;
  value: string;
}
export const categories: ICategoryType[] = [
  { name: COLLECTION_TYPE.Art, image: categoryimg0, value: COLLECTION_TYPE.Art },
  { name: COLLECTION_TYPE.Collectibles, image: categoryimg1, value: COLLECTION_TYPE.Collectibles },
  { name: COLLECTION_TYPE.DomainNames, image: categoryimg2, value: COLLECTION_TYPE.DomainNames },
  { name: COLLECTION_TYPE.Music, image: categoryimg3, value: COLLECTION_TYPE.Music },
  { name: COLLECTION_TYPE.Photography, image: categoryimg4, value: COLLECTION_TYPE.Photography },
  { name: COLLECTION_TYPE.Sports, image: categoryimg5, value: COLLECTION_TYPE.Sports },
  { name: COLLECTION_TYPE.TradingCards, image: categoryimg6, value: COLLECTION_TYPE.TradingCards },
  { name: COLLECTION_TYPE.Utility, image: categoryimg7, value: COLLECTION_TYPE.Utility },
  { name: COLLECTION_TYPE.VirtualWorlds, image: categoryimg8, value: COLLECTION_TYPE.VirtualWorlds },
  { name: COLLECTION_TYPE.Gaming, image: categoryimg9, value: COLLECTION_TYPE.Gaming }
];

export const categoriesFilter = [
  { value: 'Art', label: 'Art' },
  { value: 'Photography', label: 'Photography' },
  { value: 'Games', label: 'Games' },
  { value: 'Metaverses', label: 'Metaverses' },
  { value: 'Music', label: 'Music' },
  { value: 'DeFi', label: 'DeFi' },
  { value: 'Memes', label: 'Memes' },
  { value: 'Punks', label: 'Punks' },
  { value: 'Collectible', label: 'Collectible' },
  { value: 'NSFW (+18)', label: 'NSFW (+18)' }
];

export const status = [
  {
    value: NftType.BUY_NOW,
    label: 'Buy Now'
  },
  {
    value: NftType.ON_AUCTION,
    label: 'On Auction'
  }
];
