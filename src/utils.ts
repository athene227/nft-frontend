import moment from 'moment';
import {
  IAuctionMarketItem,
  INft,
  INftAttribute,
  ISimpleMarketItem
} from './types/nfts.types';

export function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

export function isMobile() {
  if (window) {
    return window.matchMedia('(max-width: 767px)').matches;
  }
  return false;
}

export function isMdScreen() {
  if (window) {
    return window.matchMedia('(max-width: 1199px)').matches;
  }
  return false;
}

function currentYPosition() {
  if (!window) {
    return;
  }
  // Firefox, Chrome, Opera, Safari
  if (window.pageYOffset) return window.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(elm) {
  let y = elm.offsetTop;
  let node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

export function scrollTo(scrollableElement, elmID) {
  const elm = document.getElementById(elmID);
  if (!elmID || !elm) {
    return;
  }
  const startY = currentYPosition();
  const stopY = elmYPosition(elm);
  const distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  let speed = Math.round(distance / 50);
  if (speed >= 20) speed = 20;
  const step = Math.round(distance / 25);
  let leapY = stopY > startY ? startY + step : startY - step;
  let timer = 0;
  if (stopY > startY) {
    for (let i = startY; i < stopY; i += step) {
      setTimeout(
        (function (leapY) {
          return () => {
            scrollableElement.scrollTo(0, leapY);
          };
        })(leapY),
        timer * speed
      );
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout(
      (function (leapY) {
        return () => {
          scrollableElement.scrollTo(0, leapY);
        };
      })(leapY),
      timer * speed
    );
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  return false;
}

export function getTimeDifference(date) {
  const difference =
    moment(new Date(), 'DD/MM/YYYY HH:mm:ss').diff(
      moment(date, 'DD/MM/YYYY HH:mm:ss')
    ) / 1000;

  if (difference < 60) return `${Math.floor(difference)} seconds`;
  else if (difference < 3600) return `${Math.floor(difference / 60)} minutes`;
  else if (difference < 86400) return `${Math.floor(difference / 3660)} hours`;
  else if (difference < 86400 * 30)
    return `${Math.floor(difference / 86400)} days`;
  else if (difference < 86400 * 30 * 12)
    return `${Math.floor(difference / 86400 / 30)} months`;
  else return `${(difference / 86400 / 30 / 12).toFixed(1)} years`;
}

export function generateRandomId() {
  const tempId = Math.random().toString();
  const uid = tempId.substr(2, tempId.length - 1);
  return uid;
}

export function getQueryParam(prop) {
  const params = {};
  const search = decodeURIComponent(
    window.location.href.slice(window.location.href.indexOf('?') + 1)
  );
  const definitions = search.split('&');
  definitions.forEach(function (val, key) {
    const parts = val.split('=', 2);
    params[parts[0]] = parts[1];
  });
  return prop && prop in params ? params[prop] : params;
}

export function classList(classes) {
  return Object.entries(classes)
    .filter((entry) => entry[1])
    .map((entry) => entry[0])
    .join(' ');
}

export const getNetworkId = async (web3Instance: any) => {
  const networkId = await web3Instance.eth.net.getId();
  return networkId;
};

export const getNetworkData = async (web3Instance: any, contractCode: any) => {
  const networkId = await web3Instance.eth.net.getId();
  return contractCode.networks[networkId];
};

export const getErrorMessage = (error: any, defaultErrorMessage?: string) => {
  if (error && typeof error === 'string') return error;
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.message
  ) {
    if (
      error.response.data.message &&
      error.response.data.message.storageErrors
    ) {
      return 'problem with the image';
    }
    if (error.response.data.message && error.response.data.message.message) {
      return error.response.data.message.message;
    }
    return error.response.data.message;
  }
  if (error && error.data && error.data.message) return error.data.message;
  if (error && error.message) {
    return error.message;
  }
  if (defaultErrorMessage) return defaultErrorMessage;
  return 'oops something went wrong';
};

export const formatDate = (date: Date) => {
  return moment(date).format('DD/MM/YYYY, HH:mm A');
};

export const dateHasPassed = (date: Date) => {
  return new Date() > new Date(date);
};

export const getProfileImage = (imageUrl: string | undefined) => {
  return imageUrl;
};

export const shortAddress = (address: string, slice?: number) => {
  const _slice = slice || 5;
  if (!address) return '';
  const firstPart = address.slice(0, _slice);
  const lastPart = address.slice(-_slice);
  return `${firstPart}...${lastPart}`;
};

export const getMyBalance = async (
  _address: string,
  _web3: any,
  inEth?: boolean
) => {
  const wei_balance = await _web3.eth.getBalance(_address);
  const eth_balance = _web3.utils.fromWei(wei_balance, 'ether');
  return inEth ? eth_balance : wei_balance;
};

export const getPriceAfterPercent = (weiPrice: number, percent: number) => {
  return (weiPrice * percent) / 100;
};

export const createToken = async (data: {
  nftContract: any;
  userAddress: string;
  jsonUri: string;
  quantity: number;
  royalty: number;
  nftType: string;
}) => {
  const { nftContract, userAddress, jsonUri, quantity, royalty, nftType } = data;
  // created token with the nft contract
  let createdToken;
  if (nftType === 'NFT721') {
    createdToken = await nftContract.methods
      .createToken(jsonUri, royalty)
      .send({ from: userAddress });
  } else {
    // NFT1155
    createdToken = await nftContract.methods
      .createToken(jsonUri, quantity, royalty)
      .send({ from: userAddress });
  }
  return createdToken.events.Mint;
};

export const createSimpleMarketItem = async (data: {
  nftMarketContract: any;
  userAddress: string;
  nftAddress: string;
  tokenId: string;
  priceInWei: number;
  quantity: number;
  deadline: number;
}) => {
  const {
    nftMarketContract,
    userAddress,
    nftAddress,
    tokenId,
    priceInWei,
    quantity,
    deadline
  } = data;
  // create on the market contract
  const res = await nftMarketContract.methods
    .createSimpleMarketItem(
      nftAddress,
      Number(tokenId),
      priceInWei,
      quantity,
      deadline
    )
    .send({ from: userAddress });

  console.log(res.events.SimpleItemCreated);
  return res.events.SimpleItemCreated;
};

export const createAuctionMarketItem = async (data: {
  nftMarketContract: any;
  userAddress: string;
  nftAddress: string;
  tokenId: string;
  startPriceInWei: number;
  deadline: number;
  frontData: any;
}) => {
  const {
    nftMarketContract,
    userAddress,
    nftAddress,
    tokenId,
    startPriceInWei,
    deadline,
    frontData
  } = data;
  // create on the market contract
  const res = await nftMarketContract.methods
    .createAuctionMarketItem(
      nftAddress,
      Number(tokenId),
      startPriceInWei,
      deadline,
      frontData
    )
    .send({ from: userAddress });

  console.log('create a market on the contract');
  console.log('res.events', res.events);

  const itemIdOnMarketContract =
    res.events.AuctionMarketItemCreated.returnValues['0'];
  return itemIdOnMarketContract;
};

export const setInLocalStorage = (key: string, val: string) => {
  localStorage.setItem(key, val);
};
export const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const cancelSimpleListing = async (data: {
  nftMarketContract: any;
  userAddress: string;
  listingId: number;
}) => {
  const { nftMarketContract, userAddress, listingId } = data;
  const res = await nftMarketContract.methods
    .cancelSimpleListing(listingId)
    .send({ from: userAddress });
  return res;
};

export const cancelAuctionListing = async (data: {
  nftMarketContract: any;
  userAddress: string;
  listingId: number;
}) => {
  const { nftMarketContract, userAddress, listingId } = data;
  const res = await nftMarketContract.methods
    .cancelAuctionListing(listingId)
    .send({ from: userAddress });
  return res;
};

// export const getCurrentBid = async (data: { nftMarketContract: any, userAddress: string, listingId: number }) => {
//   const { nftMarketContract, userAddress, listingId } = data;
//   const res = await nftMarketContract.methods.getCurrentBid(
//     listingId,
//   )
//     .call();
//   return res;
// }

export const placeBid = async (data: {
  nftMarketContract: any;
  userAddress: string;
  listingId: number;
  bid: number;
}) => {
  const { nftMarketContract, userAddress, listingId, bid } = data;
  const res = await nftMarketContract.methods
    .bid(listingId)
    .send({ from: userAddress, value: bid });
  return res;
};

export const buySimple = async (data: {
  nftMarketContract: any;
  userAddress: string;
  listingId: number;
  quantity: number;
  value: number;
}) => {
  const { nftMarketContract, userAddress, listingId, quantity, value } = data;
  const res = await nftMarketContract.methods
    .buySimple(listingId, quantity)
    .send({ from: userAddress, value });
  return res;
};

export const terminateAuction = async (data: {
  nftMarketContract: any;
  userAddress: string;
  listingId: number;
}) => {
  const { nftMarketContract, userAddress, listingId } = data;
  const res = await nftMarketContract.methods
    .terminateAuction(listingId)
    .send({ from: userAddress });
  return res;
};

export const getSimpleMarketItem = async (data: {
  nftMarketContract: any;
  listingId: number;
}): Promise<ISimpleMarketItem> => {
  const { nftMarketContract, listingId } = data;
  const marketItem = await nftMarketContract.methods
    .simpleListingIdToMarketItem(Number(listingId))
    .call();
  return marketItem;
};
export const getAuctionMarketItem = async (data: {
  nftMarketContract: any;
  listingId: number;
}): Promise<IAuctionMarketItem> => {
  const { nftMarketContract, listingId } = data;
  const marketItem = await nftMarketContract.methods
    .auctionListingIdToMarketItem(Number(listingId))
    .call();
  return marketItem;
};

export const getUserNftQuantityFromNftContract = async (data: {
  nftContract: any;
  userAddress: string;
  tokenId: number;
}): Promise<string> => {
  const { nftContract, userAddress, tokenId } = data;
  const balance = await nftContract.methods
    .balanceOf(userAddress, tokenId)
    .call();
  return balance;
};

export const getUserListedTokens = async (data: {
  nftMarketContract: any;
  userAddress: string;
  nftAddress: string;
  tokenId: number;
}): Promise<IAuctionMarketItem> => {
  const { nftMarketContract, userAddress, nftAddress, tokenId } = data;
  const userListedTokens = await nftMarketContract.methods
    .userListedTokens(userAddress, nftAddress, tokenId)
    .call();
  return userListedTokens;
};

/* 
  According to Opensea metadata standard, if value is number and display_type is not defined,
  then the property goes to the ranking section.
*/
export const getNftAttributeType = (attr: INftAttribute) => {
  if (attr.display_type) {
    return attr.display_type;
  } else if (Number(attr.value) === attr.value || attr.max_value != undefined) {
    return 'ranking';
  }
  return 'string';
};

///////////////// Number Formatting Functions //////////////////////
export function numFormatter(num) {
  if (num >= 1000000000000) {
    return (num / 1000000000000).toFixed(1).replace(/\.0$/, '') + 'T';
  }
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toFixed(2);
}
export function numFormatterFull(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + ' Billion ';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' Million ';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' K';
  }
  return num.toFixed(2);
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
