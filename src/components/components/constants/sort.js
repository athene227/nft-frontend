import { SortOrder } from 'src/enums';

export const sortOrders = [
  { value: SortOrder.RECENTLY_ADDED, label: 'Recently Added' },
  { value: SortOrder.PRICE_HIGH_TO_LOW, label: 'Price high to low' },
  { value: SortOrder.PRICE_LOW_TO_HIGH, label: 'Price low to high' },
  { value: SortOrder.AUCTION_ENDING_SOON, label: 'Auction ending soon' }
];
