import React, { useEffect } from 'react';
import { Router, Location, Redirect } from '@reach/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import ScrollToTopBtn from './menu/ScrollToTop';
import HeaderNew from './menu/headerNew';
import Header from './menu/Header';
import Home from './pages/Home/home';
// import Explore from './pages/explore1';
import Explore from './pages/Explore/explore';
import Explore2 from './pages/explore2';
import Helpcenter from './pages/helpcenter';
// import Ranking from './pages/Ranking';
import RankingRedux from './pages/RankingRedux';
import Collection from './pages/Collection';
// import ItemDetail from './pages/ItemDetail';
import ItemDetailSingle from './pages/ItemDetailSingle';
import ItemDetailMultiple from './pages/ItemDetailMultiple';
import Author from './pages/Author';
import Wallet from './pages/wallet';
import Login from './pages/login';
import LoginTwo from './pages/loginTwo';
import Register from './pages/register';
import Price from './pages/price';
import Works from './pages/works';
import News from './pages/news';
import CreateSingle from './pages/CreateSingle/CreateSingle';
import CreateMultiple from './pages/CreateMultiple';
import Listing from './pages/Listing';

import Auction from './pages/Auction';
import Activity from './pages/activity';
import Contact from './pages/contact';
import Profile from './pages/Profile/Profile';
import MyProfile from './pages/MyProfile';
import CreateOption from './pages/CreateOption/CreateOption';
import ElegantIcons from './pages/elegantIcons';
import EtlineIcons from './pages/etlineIcons';
import FontAwesomeIcons from './pages/fontAwesomeIcons';
import Accordion from './pages/accordion';
import Alerts from './pages/alerts';
import Progressbar from './pages/progressbar';
import Tabs from './pages/tabs';
import Search from './pages/SearchPage';
import { addBid } from 'src/store/actions/thunks/bids';
import {
  addAuctionMarketItemEvent,
  addBuySimpleEvent,
  addCancelAuctionEvent,
  addCancelSimpleEvent,
  addMintEvent,
  addSimpleMarketItemEvent,
  addTerminateAuctionEvent
} from 'src/store/actions';
import { MARKET_CONTRACT_EVENTS } from 'src/enums';
import * as selectors from 'src/store/selectors';
import Footer from '../components/components/footer';

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
      {/* <Header /> */}
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
          <Explore2 path="/explore2" />
          <Helpcenter path="/helpcenter" />
          <RankingRedux path="/Ranking" />
          <Wallet path="/wallet" />
          <Login path="/login" />
          <LoginTwo path="/loginTwo" />
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
