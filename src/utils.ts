/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import ERC20Abi from 'src/abis/new/MockERC20.json';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import {
  IAuctionMarketItem,
  INftAttribute,
  ISimpleMarketItem
} from './types/nfts.types';

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

function elmYPosition(elm: any) {
  let y = elm.offsetTop;
  let node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

export function scrollTo(scrollableElement: any, elmID: any) {
  const elm = document.getElementById(elmID);
  if (!elmID || !elm) {
    return;
  }
  const startY: any = currentYPosition();
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
  for (let i: any = startY; i > stopY; i -= step) {
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

export function getTimeDifference(date: any) {
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

export const getMyTokenBalance = async (
  address: string,
  tokenAddress: string,
  web3: Web3
) => {
  const tokenContract = new web3.eth.Contract(
    ERC20Abi.abi as AbiItem[],
    tokenAddress
  );
  const balance = await tokenContract.methods.balanceOf(address).call();
  return balance;
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
  const { nftContract, userAddress, jsonUri, quantity, royalty, nftType } =
    data;
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
  nftMarketSimpleContract: any;
  userAddress: string;
  nftAddress: string;
  tokenId: string;
  priceInWei: number;
  quantity: number;
  deadline: number;
}) => {
  const {
    nftMarketSimpleContract,
    userAddress,
    nftAddress,
    tokenId,
    priceInWei,
    quantity,
    deadline
  } = data;
  console.log('🚀 ~ file: utils.ts ~ line 233 ~ data', data);
  // create on the market contract
  const res = await nftMarketSimpleContract.methods
    .createSimpleMarketItem(
      nftAddress,
      Number(tokenId),
      priceInWei,
      quantity,
      deadline
    )
    .send({ from: userAddress });

  console.log(
    '🚀 ~ file: utils.ts ~ line 246 ~ res.events.SimpleItemCreated',
    res.events.SimpleItemCreated
  );
  return res.events.SimpleItemCreated;
};

export const createAuctionMarketItem = async (data: {
  nftMarketAuctionContract: any;
  userAddress: string;
  nftAddress: string;
  priceTokenAddress: string;
  tokenId: string;
  startPriceInWei: number;
  deadline: number;
  // frontData: any;
}) => {
  const {
    nftMarketAuctionContract,
    userAddress,
    nftAddress,
    priceTokenAddress,
    tokenId,
    startPriceInWei,
    deadline
  } = data;
  // create on the market contract
  const res = await nftMarketAuctionContract.methods
    .createAuctionMarketItem(
      nftAddress,
      Number(tokenId),
      priceTokenAddress,
      startPriceInWei,
      deadline
    )
    .send({ from: userAddress });

  console.log(
    '🚀 ~ file: utils.ts ~ line 312 ~ res.events.AuctionItemCreated',
    res.events.AuctionItemCreated
  );
  return res.events.AuctionItemCreated;
};

export const setInLocalStorage = (key: string, val: string) => {
  localStorage.setItem(key, val);
};
export const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const cancelSimpleListing = async (data: {
  nftMarketSimpleContract: any;
  userAddress: string;
  listingId: number;
}) => {
  const { nftMarketSimpleContract, userAddress, listingId } = data;
  const res = await nftMarketSimpleContract.methods
    .cancelSimpleListing(listingId)
    .send({ from: userAddress });
  return res;
};

export const cancelAuctionListing = async (data: {
  nftMarketAuctionContract: any;
  userAddress: string;
  listingId: number;
}) => {
  const { nftMarketAuctionContract, userAddress, listingId } = data;
  const res = await nftMarketAuctionContract.methods
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

export const approveContract = async (data: {
  mockERC20Contract: any;
  spender: string;
  owner: string;
  amount: number;
}) => {
  const { mockERC20Contract, spender, owner, amount } = data;
  const res = await mockERC20Contract.methods
    .approve(spender, BigInt(amount))
    .send({ from: owner });
  return res;
};

export const placeBid = async (data: {
  nftMarketAuctionContract: any;
  userAddress: string;
  listingId: number;
  bid: number;
}) => {
  const { nftMarketAuctionContract, userAddress, listingId, bid } = data;
  console.log('🚀 ~ file: utils.ts ~ line 383 ~ data', data);
  const res = await nftMarketAuctionContract.methods
    .bid(listingId, BigInt(bid))
    .send({ from: userAddress });
  return res;
};

export const buySimple = async (data: {
  nftMarketSimpleContract: any;
  userAddress: string;
  listingId: number;
  quantity: number;
  value: number;
}) => {
  const { nftMarketSimpleContract, userAddress, listingId, quantity, value } =
    data;
  const res = await nftMarketSimpleContract.methods
    .buySimple(listingId, quantity)
    .send({ from: userAddress, value });
  return res;
};

export const terminateAuction = async (data: {
  nftMarketAuctionContract: any;
  userAddress: string;
  listingId: number;
}) => {
  const { nftMarketAuctionContract, userAddress, listingId } = data;
  const res = await nftMarketAuctionContract.methods
    .terminateAuction(listingId)
    .send({ from: userAddress });
  return res;
};

export const getSimpleMarketItem = async (data: {
  nftMarketSimpleContract: any;
  listingId: number;
}): Promise<ISimpleMarketItem> => {
  const { nftMarketSimpleContract, listingId } = data;
  const marketItem = await nftMarketSimpleContract.methods
    .simpleListingIdToMarketItem(Number(listingId))
    .call();
  return marketItem;
};
export const getAuctionMarketItem = async (data: {
  nftMarketAuctionContract: any;
  listingId: number;
}): Promise<IAuctionMarketItem> => {
  const { nftMarketAuctionContract, listingId } = data;
  const marketItem = await nftMarketAuctionContract.methods
    .auctionListingIdToMarketItem(Number(listingId))
    .call();
  console.log('🚀 ~ file: utils.ts ~ line 435 ~ marketItem', marketItem);
  return marketItem;
};

export const getAuctionBids = async (data: {
  nftMarketAuctionContract: any;
  listingId: number;
}): Promise<any> => {
  const { nftMarketAuctionContract, listingId } = data;
  const auctionBids = await nftMarketAuctionContract.methods
    .getAuctionBids(listingId)
    .call();
  console.log('🚀 ~ file: utils.ts ~ line 454 ~ auctionBids', auctionBids);
  return auctionBids;
};

export const getUserNftQuantityFromNftContract = async (data: {
  nftContract: any;
  userAddress: string;
}): Promise<string> => {
  const { nftContract, userAddress } = data;
  console.log('🚀 ~ file: utils.ts ~ line 423 ~ data', data);
  const balance = await nftContract.methods.balanceOf(userAddress).call();
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

// export const sendEth = async (data: {
//   from: string;
//   to: string;
//   value: number;
//   web3: Web3;
// }) => {
//   const { from, to, value, web3 } = data;
//   const nonce = await web3.eth.getTransactionCount(from, 'latest');

//   const transaction = {
//     to,
//     value,
//     gas: 30000,
//     maxFeePerGas: 1000000108,
//     nonce
//   };

//   const signedTx = await web3.eth.accounts.signTransaction(transaction, )
// };

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
export function numFormatter(num: any) {
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
export function numFormatterFull(num: any) {
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

export function numberWithCommas(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const generatePreviewImage: (
  imgUrl: string,
  width: number,
  height: number
) => Promise<File> = (imgUrl: string, width: number, height: number) => {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.height = width;
  canvas.width = height;

  const image = new Image();

  image.src = imgUrl;
  context &&
    context.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      width,
      height
    );

  return new Promise<File>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'preview.jpg', { type: blob.type });
        resolve(file);
      } else {
        reject();
      }
    }, 'image/jpeg');
  });
};
