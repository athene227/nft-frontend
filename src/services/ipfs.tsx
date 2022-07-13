import axios, { AxiosRequestConfig } from 'axios';
import moment from 'moment';
import { ApiService } from 'src/core/axios';

const pinata = axios.create({ baseURL: 'https://api.pinata.cloud/pinning' });
pinata.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    ...config.headers,
    pinata_api_key: process.env.REACT_APP_PINATA_APIKEY as string,
    pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY as string
  };
  return config;
});

export const gatewayUrl = 'https://ipfs.nftonpulse.io/ipfs/';

export const getImage = (image: string | undefined | null) => {
  if (!image) return;
  return image.replace('ipfs://', gatewayUrl);
};

export const getImageUri = async (file: File) => {
  const data = new FormData();
  data.append('file', file);
  const res = await ApiService.getImageUri(data);
  console.log(res);
  return res.data;
};

export const getUri = async (data: {
  name: string;
  description: string;
  imageUrl: string;
  previewImageUrl: string;
  attributes: any[];
}) => {
  const { name, description, imageUrl, attributes } = data;
  const createdAt = moment.now(),
    metaName = name + createdAt;
  const metaData = { name, description, imageUrl, attributes, createdAt };
  const options = {
    pinataMetadata: { name: metaName },
    pinataContent: metaData
  };

  console.log(options);
  const res = await ApiService.getUri(options);
  return res.data;
};

export default { getImageUri, getUri };
