/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios, { AxiosRequestConfig } from 'axios';
import moment from 'moment';
import { ApiService } from 'src/core/axios';

// 'https://ipfs.nftonpulse.io/ipfs/'
// const pinata = axios.create({ baseURL: 'https://api.pinata.cloud/pinning' });
// pinata.interceptors.request.use((config: AxiosRequestConfig) => {
//   config.headers = {
//     ...config.headers,
//     pinata_api_key: process.env.REACT_APP_PINATA_APIKEY as string,
//     pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY as string
//   };
//   return config;
// });

// interface PinataResponse {
//   data: {
//     IpfsHash: string;
//   };
// }

export const gatewayUrl = 'https://ipfs.nftonpulse.io/ipfs/';

export const getImage = (image: string | undefined | null) => {
  if (!image) return;
  return image.replace('ipfs://', gatewayUrl);
};

export const getImageUri = async (file: File) => {
  const data = new FormData();
  data.append('file', file);
  const res = await ApiService.getImageUri(data);
  console.log('🚀 ~ file: ipfs.tsx ~ line 76 ~ getImageUri ~ res', res);
  return res.data;
};

export const getUri = async (data: {
  name: string;
  description: string;
  creatorAddress: string;
  imageUrl: string;
  previewImageUrl: string;
  attributes: any[];
  category: string;
  collectionId: string;
  explicit: boolean;
  externalLink: string;
  royalty: string;
  supply: number;
}) => {
  const createdAt = moment.now(),
    metaName = data.name + createdAt;
  const options = {
    pinataMetadata: { name: metaName },
    pinataContent: { ...data, createdAt }
  };

  console.log('🚀 ~ file: ipfs.tsx ~ line 96 ~ options', options);
  const res = await ApiService.getUri(options);
  return res.data;
};

export default { getImageUri, getUri };
