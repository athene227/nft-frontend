import { NftType } from 'src/enums';

export const categories = [
  { name: 'Art', value: 'Art' },
  { name: 'Photography', value: 'Photography' },
  { name: 'Games', value: 'Games' },
  { name: 'Metaverses', value: 'Metaverses' },
  { name: 'Music', value: 'Music' },
  { name: 'DeFi', value: 'DeFi' },
  { name: 'Memes', value: 'Memes' },
  { name: 'Punks', value: 'Punks' },
  { name: 'Collectible', value: 'Collectible' },
  { name: 'NSFW (+18)', value: 'NSFW (+18)' }
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
