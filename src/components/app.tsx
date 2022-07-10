import 'react-toastify/dist/ReactToastify.css';

import SEO from '@americanexpress/react-seo';
import { Location, Redirect, Router } from '@reach/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { AppSeo } from 'src/config/seo';
import { MARKET_CONTRACT_EVENTS } from 'src/enums';
import {
  addAuctionMarketItemEvent,
  addBuySimpleEvent,
  addCancelAuctionEvent,
  addCancelSimpleEvent,
  addMintEvent,
  addSimpleMarketItemEvent,
  addTerminateAuctionEvent
} from 'src/store/actions';
import { addBid } from 'src/store/actions/thunks/bids';
import * as selectors from 'src/store/selectors';

import Footer from '../components/components/footer';
import HeaderNew from './menu/headerNew';
import ScrollToTopBtn from './menu/ScrollToTop';
import Accordion from './pages/accordion';
import Activity from './pages/activity';
import Alerts from './pages/alerts';
import Auction from './pages/Auction';
import Author from './pages/Author';
import Collection from './pages/Collection';
import Contact from './pages/contact';
import CreateMultiple from './pages/CreateMultiple';
import CreateOption from './pages/CreateOption/CreateOption';
import CreateSingle from './pages/CreateSingle/CreateSingle';
import ElegantIcons from './pages/elegantIcons';
import EtlineIcons from './pages/etlineIcons';
import Explore from './pages/Explore/explore';
import FontAwesomeIcons from './pages/fontAwesomeIcons';
import Helpcenter from './pages/helpcenter';
import Home from './pages/Home/home';
import ItemDetailMultiple from './pages/ItemDetailMultiple';
import ItemDetailSingle from './pages/ItemDetailSingle';
import Listing from './pages/Listing';
import MyProfile from './pages/MyProfile';
import News from './pages/news';
import Price from './pages/price';
import Profile from './pages/Profile/Profile';
import Progressbar from './pages/progressbar';
// import Ranking from './pages/Ranking';
import RankingRedux from './pages/RankingRedux';
import Register from './pages/register';
import Search from './pages/SearchPage';
import Tabs from './pages/tabs';
import Wallet from './pages/wallet';
import Works from './pages/works';

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location]);
  return children;
};

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id="routerhang">
        <div key={location.key}>
          <Router location={location}>{children}</Router>
        </div>
      </div>
    )}
  </Location>
);

const App = () => {
  const dispatch = useDispatch();
  const web3State = useSelector(selectors.web3State);
  const { data, loading } = web3State.web3;
  const { web3, accounts, balance } = data;
  const userAddress = accounts[0];
  useEffect(() => {
    if (!userAddress) return;
    const SERVER_URL = process.env.REACT_APP_BACKEND_API;
    const eventSource = new EventSource(`${SERVER_URL}/v1/events`);
    eventSource.onmessage = (e) => {
      console.log(e, '+++++++++++');

      if (e.data.includes('eventName')) {
        const res = JSON.parse(e.data);
        console.log('res', res);

        switch (res.eventName) {
          case MARKET_CONTRACT_EVENTS.BidCreated:
            dispatch(addBid(res));
            break;
          case MARKET_CONTRACT_EVENTS.Mint:
            if (res.ownerAddress === userAddress) {
              console.log('this is the user who created the nft');
              dispatch(addMintEvent(res));
            } else {
              console.log('this is NOT the user who created the nft');
            }
            break;
          case MARKET_CONTRACT_EVENTS.SimpleMarketItemCreated:
            if (res.ownerAddress === userAddress) {
              console.log('this is the user who listed the nft');
              dispatch(addSimpleMarketItemEvent(res));
            } else {
              console.log('this is NOT the user who listed the nft');
            }
            break;
          case MARKET_CONTRACT_EVENTS.AuctionMarketItemCreated:
            if (res.ownerAddress === userAddress) {
              console.log('this is the user who listed the nft');
              dispatch(addAuctionMarketItemEvent(res));
            } else {
              console.log('this is NOT the user who listed the nft');
            }
            break;
          case MARKET_CONTRACT_EVENTS.BuySimpleEvent:
            if (res.ownerAddress === userAddress) {
              console.log('this is the user who listed the nft');
              dispatch(addBuySimpleEvent(res));
            } else {
              console.log('this is NOT the user who listed the nft');
            }
            break;
          case MARKET_CONTRACT_EVENTS.CancelSimpleEvent:
            if (res.ownerAddress === userAddress) {
              console.log('this is the user who listed the nft');
              dispatch(addCancelSimpleEvent(res));
            } else {
              console.log('this is NOT the user who listed the nft');
            }
            break;
          case MARKET_CONTRACT_EVENTS.CancelAuctionEvent:
            if (res.ownerAddress === userAddress) {
              console.log('this is the user who listed the nft');
              dispatch(addCancelAuctionEvent(res));
            } else {
              console.log('this is NOT the user who listed the nft');
            }
            break;
          case MARKET_CONTRACT_EVENTS.TerminateAuctionEvent:
            if (res.terminatorAddress === userAddress) {
              console.log('this is the user who terminate the nft');
              dispatch(addTerminateAuctionEvent(res));
            } else {
              console.log('this is NOT the user who terminate the nft');
            }
            break;
          default:
            break;
        }
      }
    };
  }, [dispatch, userAddress]);

  return (
    <div className="wraper">
      <SEO {...AppSeo} />
      <HeaderNew />
      <PosedRouter>
        <ScrollTop path="/">
          <Home exact path="/">
            <Redirect to="/home" />
          </Home>
          {/* IN USE */}
          <Collection path="/collection/:collectionId" />
          <ItemDetailSingle path="/ItemDetail/:tokenId/:nftAddress" />
          <ItemDetailMultiple path="/ItemDetailMultiple/:tokenId/:nftAddress" />
          <Author path="/author/:publicAddress" />
          <CreateOption path="/CreateOption" />
          <CreateSingle path="/createSingle" />
          <CreateMultiple path="/createMultiple" />
          <Listing path="/listing/:tokenId/:nftAddress" />
          <Profile path="/profile" />
          <MyProfile path="/myProfile" />
          <Search path="/search/:query" />

          {/* NOT IN USE */}
          {/* <Home1 path="/home1" />
          <Home2 path="/home2" /> */}
          <Explore path="/explore" />
          <Helpcenter path="/helpcenter" />
          <RankingRedux path="/Ranking" />
          <Wallet path="/wallet" />
          <Register path="/register" />
          <Price path="/price" />
          <Works path="/works" />
          <News path="/news" />
          <Auction path="/Auction" />
          <Activity path="/activity" />
          <Contact path="/contact" />
          <ElegantIcons path="/elegantIcons" />
          <EtlineIcons path="/etlineIcons" />
          <FontAwesomeIcons path="/fontAwesomeIcons" />
          <Accordion path="/accordion" />
          <Alerts path="/alerts" />
          <Progressbar path="/progressbar" />
          <Tabs path="/tabs" />
        </ScrollTop>
      </PosedRouter>
      <ScrollToTopBtn />
      <ToastContainer
        style={{ width: 600 }}
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Footer />
    </div>
  );
};
export default App;
