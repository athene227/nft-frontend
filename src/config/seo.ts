import { SEOProps } from '@americanexpress/react-seo';

export const AppSeo: SEOProps = {
  title: 'NFTonPulse',
  description: 'The Biggest NFT marketplace on Pulsechain',
  siteUrl: 'https://nftonpulse.io',
  image: {
    src: 'https://leadedge-c.com/images/common/leadedge_top.jpeg',
    alt: 'Biggest NFT marketplace on Pulsechain',
    secureUrl: 'https://leadedge-c.com/images/common/leadedge_top.jpeg',
    width: 1200,
    height: 630
  },
  keywords: ['NFT', 'pulse', 'nftonpulse', 'pulsechain', 'popular', 'biggest'],
  video: {
    src: 'https://nftonpulse.io/nftonpulse.mp4',
    alt: 'NFTonPulse is the most successful NFT marketplace in history',
    width: 960,
    height: 700,
    secureUrl: 'https://nftonpulse.io/nftonpulse.mp4'
  },
  locale: 'en-US'
};

export const HomePageSeo: SEOProps = {
  title: 'NFTonPulse',
  description: 'The Biggest NFT marketplace on Pulsechain',
  siteUrl: 'https://nftonpulse.io',
  keywords: ['NFT', 'pulse', 'nftonpulse', 'pulsechain', 'popular', 'biggest']
};

export const ExplorePageSeo: SEOProps = {
  title: 'Explore-NFTonPulse',
  description: 'Explore Items on NFTonPulse',
  siteUrl: 'https://nftonpulse.io/explore'
};
