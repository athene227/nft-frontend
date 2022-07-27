import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HotCollections from './components/hotCollections/HotCollections';
import Sellnfts from './components/sellNfts/Sellnfts';
import LiveAuctions from './components/liveAuctions/LiveAuctions';
import TopSellersBuyers from './components/topSellersBuyers/TopSellersBuyers';
import NewItems from './components/newItems/NewItems';
import Landing from './components/landing/Landing';
import {
  fetchNewNfts,
  fetchHotAuctions
} from '../../../store/actions/thunks/nfts';
import { fetchHotCollections } from '../../../store/actions/thunks/hotCollections';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewNfts());
    //dispatch(fetchHotAuctions());
    dispatch(fetchHotCollections());
  }, []);

  return (
    <div className="">
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
