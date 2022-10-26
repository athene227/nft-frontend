import SEO from '@americanexpress/react-seo';
import { HomePageSeo } from 'src/config/seo';
import HotCollections from 'src/screens/home/hotCollections/HotCollections';
import Landing from 'src/screens/home/landing/Landing';
import LiveAuctions from 'src/screens/home/liveAuctions/LiveAuctions';
import NewItems from 'src/screens/home/newItems/NewItems';
import Sellnfts from 'src/screens/home/sellNfts/Sellnfts';
import TopSellersBuyers from 'src/screens/home/topSellersBuyers/TopSellersBuyers';

const HomeScreen = () => {
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
export default HomeScreen;
