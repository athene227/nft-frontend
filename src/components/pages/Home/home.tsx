import SEO from '@americanexpress/react-seo';
import { HomePageSeo } from 'src/config/seo';

import HotCollections from './components/hotCollections/HotCollections';
import Landing from './components/landing/Landing';
import LiveAuctions from './components/liveAuctions/LiveAuctions';
import NewItems from './components/newItems/NewItems';
import Sellnfts from './components/sellNfts/Sellnfts';
import TopSellersBuyers from './components/topSellersBuyers/TopSellersBuyers';

const Home = () => {
  return (
    <div>
      <SEO {...HomePageSeo} />
      <Landing />
      <NewItems />
      <TopSellersBuyers />
      <LiveAuctions />
      <HotCollections />
      <Sellnfts />
    </div>
  );
};
export default Home;
