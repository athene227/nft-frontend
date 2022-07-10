import axios, { AxiosRequestConfig } from 'axios';
import moment from 'moment';

// 'https://ipfs.nftonpulse.io/ipfs/'
const pinata = axios.create({ baseURL: 'https://api.pinata.cloud/pinning' });
pinata.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    ...config.headers,
    pinata_api_key: process.env.REACT_APP_PINATA_APIKEY as string,
    pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY as string
  };
  return config;
});

interface PinataResponse {
  data: {
    IpfsHash: string;
  };
}

export const gatewayUrl = 'https://ipfs.nftonpulse.io/ipfs/';

export const getImage = (image: string | undefined | null) => {
  if (!image) return;
  return image.replace('ipfs://', gatewayUrl);
};

export const getImageUri = async (file: File) => {
  const data = new FormData(),
    createdAt = moment.now();
  data.append('title', file.name + createdAt);
  data.append('file', file);

  const metadata = JSON.stringify({
    name: file.name + createdAt,
    keyvalues: {
      size: file.size
    }
  });
  data.append('pinataMetadata', metadata);

  const result: PinataResponse = await pinata.post('/pinFileToIPFS', data, {
    maxContentLength: -1,
    headers: {
      'Content-Type': `multipart/form-data boundary=${data._boundary}`
    }
  });
  return `ipfs://${result.data.IpfsHash}`;
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

  const result: PinataResponse = await pinata.post('/pinJSONToIPFS', options);
  return `ipfs://${result.data.IpfsHash}`;
};

export default { getImageUri, getUri };
