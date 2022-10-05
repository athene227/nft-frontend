import { NftType } from 'src/enums';
import categoryimg0 from 'src/assets/images/icon/art.svg';
import categoryimg1 from 'src/assets/images/icon/category-img.svg';
import categoryimg2 from 'src/assets/images/icon/domain.svg';
import categoryimg3 from 'src/assets/images/icon/music.svg';
import categoryimg4 from 'src/assets/images/icon/photography.svg';
import categoryimg5 from 'src/assets/images/icon/sports.svg';
import categoryimg6 from 'src/assets/images/icon/trading.svg';
import categoryimg7 from 'src/assets/images/icon/utility.svg';
import categoryimg8 from 'src/assets/images/icon/web.svg';
import categoryimg9 from 'src/assets/images/icon/game.svg';
 export const categories = [
  { name: 'Art', image: categoryimg0, value: 'Art',  },
  { name: 'Collectibles', image: categoryimg1, value: 'Collectibles' },
  { name: 'Domain Names', image: categoryimg2, value: 'Domain Names' },
  { name: 'Music', image: categoryimg3, value: 'Music' },
  { name: 'Photography', image: categoryimg4, value: 'Photography' },
  { name: 'Sports', image: categoryimg5, value: 'Sports' },
  { name: 'Trading Cards', image: categoryimg6, value: 'Trading Cards' },
  { name: 'Utility', image: categoryimg7, value: 'Utility' },
  { name: 'Virtual Worlds', image: categoryimg8, value: 'Virtual Worlds' },
  { name: 'Gaming', image: categoryimg9, value: 'Gaming' }
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
