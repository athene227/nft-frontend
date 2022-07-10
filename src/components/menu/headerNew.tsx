import { Link, navigate } from '@reach/router';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import Breakpoint, {
  BreakpointProvider,
  setDefaultBreakpoints
} from 'react-socks';
// contracts
import NFT from 'src/abis/NFT.json';
import NFTMarket from 'src/abis/NFTMarket.json';
import ToggleTheme from 'src/components/menu/toggleTheme';
import { ApiService } from 'src/core/axios';
import { COIN, ERRORS, SELECTED_NETWORK } from 'src/enums';
import { getImage } from 'src/services/ipfs';
import notification from 'src/services/notification';
import TokenService from 'src/services/token';
import { setUserProfile } from 'src/store/actions/thunks/users';
import { setupWeb3 } from 'src/store/actions/thunks/web3';
import * as selectors from 'src/store/selectors';
import { IToken, JwtDecoded } from 'src/types/auth.types';
import { IUser } from 'src/types/users.types';
import {
  getMyBalance,
  getNetworkData,
  getNetworkId,
  shortAddress
} from 'src/utils';
import Web3 from 'web3';

import GlobalSearchBar from '../components/GlobalSearchBar';
import UserAvatar from '../components/UserAvatar';

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const NavLink = (props: any) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? 'active' : 'non-active'
      };
    }}
  />
);

const Header = function () {
  const dispatch = useDispatch();
  const [loadingState, setLoadingState] = useState<{
    loading: boolean;
    error: null | string;
  }>({ loading: false, error: null });

  const web3State = useSelector(selectors.web3State);
  const { data, loading } = web3State.web3;
  const { web3, accounts, balance } = data;
  const userAddress = accounts[0];
  let _web3: any;
  // ** user
  const userState = useSelector(selectors.userState);
  const user = userState.user.data as IUser;

  const [showpop, setProfilePopUp] = React.useState(false);

  const toggleProfilePopUP = () => {
    setProfilePopUp(!showpop);
  };

  const refpop = useOnclickOutside(() => {
    setProfilePopUp(false);
  });

  const [showmenu, btn_icon] = useState(false);

  useEffect(() => {
    const header = document.getElementById('myHeader');
    const totop = document.getElementById('scroll-to-top');
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener('scroll', () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
        totop.classList.add('show');
      } else {
        header.classList.remove('sticky');
        totop.classList.remove('show');
      }
      if (window.pageYOffset > sticky) {
      }
    });
    return () => {
      window.removeEventListener('scroll', scrollCallBack);
    };
  }, []);

  const onCopy = () => {
    notification.success(`Copied - ${user?.publicAddress}`);
  };

  const _getUserData = async (account: string) => {
    const res = await ApiService.getUserN({ publicAddress: account });
    return res.data;
  };

  const _signUp = async (account: string) => {
    const res = await ApiService.createUser({ publicAddress: account });
    return res.data;
  };

  const _handleSignMessage = async ({
    publicAddress,
    nonce
  }: {
    publicAddress: string;
    nonce: number;
  }) => {
    const res = await _web3.eth.personal.sign(
      `I am signing my one-time nonce: ${nonce}`,
      publicAddress
    );
    return res;
  };

  const _handleAuthenticate = async ({
    publicAddress,
    signature
  }: {
    publicAddress: string;
    signature: string;
  }) => {
    const res = await ApiService.auth({ publicAddress, signature });
    return res;
  };

  const clearUserState = () => {
    // clear user
    dispatch(setUserProfile(null));
    // clear data in web3
    dispatch(
      setupWeb3({
        data: {
          web3,
          nftContract: null,
          nftMarketContract: null,
          accounts: [],
          networkId: null,
          balance: null
        }
      })
    );
  };

  async function listenMMAccount() {
    (window as any).ethereum?.on(
      'accountsChanged',
      async function (accounts: string[]) {
        console.log('account changed');
        console.log('accountsChanged - accounts -', accounts);
        if (accounts.length) {
          loadWeb3({ fromConnectButton: false });
        } else {
          clearUserState();
          TokenService.removeTokens();
        }
      }
    );
  }

  async function addNetworkListener() {
    (window as any).ethereum?.on(
      'networkChanged',
      function (networkId: string) {
        console.log('networkChanged', networkId);
        loadWeb3({});
      }
    );
  }

  useEffect(() => {
    loadWeb3({ fromConnectButton: false });
    listenMMAccount();
    addNetworkListener();
  }, []);

  const handleLoggedIn = async (token: IToken) => {
    TokenService.addToken(token);
    TokenService.setCurrentToken(token);

    const { accessToken } = token;
    const {
      payload: { _id }
    } = jwtDecode<JwtDecoded>(accessToken);
    const userResponse = await ApiService.getUserById({ _id });
    const user = userResponse.data;
    dispatch(setUserProfile(user));
  };

  const handleLoggedOut = async () => {
    try {
      if (!_web3) {
        console.log('cant connect');
      }
      TokenService.removeCurrentToken();
      dispatch(
        setupWeb3({
          data: {
            web3: null,
            nftContract: null,
            nftMarketContract: null,
            accounts: [],
            balance: null,
            networkId: null
          }
        })
      );
    } catch (error) {
      console.log('error in handleLoggedOut', error);
    }
  };

  const addPulseNetwork = async () => {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x3ad',
          chainName: 'PulseChain Testnet 2b',
          rpcUrls: ['https://rpc.v2b.testnet.pulsechain.com'],
          nativeCurrency: {
            name: 'PulseChain',
            symbol: 'tPLS',
            decimals: 18
          }
        }
      ]
    });
  };

  const loadBlockchainData = async (fromConnectButton?: boolean) => {
    try {
      if (!_web3) {
        console.log('cant connect');
      }
      const networkId = await getNetworkId(_web3);
      if (networkId !== SELECTED_NETWORK) {
        notification.error(ERRORS.WRONG_NETWORK);
        throw new Error(ERRORS.WRONG_NETWORK);
      }
      setLoadingState({ loading: true, error: null });
      // await addPulseNetwork()

      // get accouns
      const accounts = await _web3.eth.getAccounts();

      TokenService.removeInvalidTokens();
      if (!fromConnectButton) {
        if (!TokenService.getTokens().length) {
          throw new Error("Token doesn't exists");
        }
        const accounts1 = accounts[0].toLowerCase();
        const token = TokenService.getTokenByAddress(accounts1);
        if (!token) {
          clearUserState();
          TokenService.removeCurrentToken(false);
          throw new Error('please login from this other account you using now');
        }

        TokenService.setCurrentToken(token);
        const {
          payload: { _id }
        } = jwtDecode<JwtDecoded>(token.accessToken);
        const userResponse = await ApiService.getUserById({ _id });
        const user = userResponse.data;
        dispatch(setUserProfile(user));
      } else {
        // press connect
        let _user = await _getUserData(accounts[0]);

        if (!_user) {
          _user = await _signUp(accounts[0]);
        }

        // sign data
        const signature = await _handleSignMessage({
          publicAddress: accounts[0],
          nonce: _user.nonce
        });

        // authenticate
        const authRespond = await _handleAuthenticate({
          publicAddress: accounts[0],
          signature
        });

        const token: IToken = authRespond.data as IToken;
        // log in with the access token
        await handleLoggedIn(token);
      }

      // get Balance
      const inEth = true;
      const balance = await getMyBalance(accounts[0], _web3, inEth);
      // Network ID

      const NFT_NETWORK_DATA = await getNetworkData(_web3, NFT);
      const NFT_MARKET_NETWORK_DATA = await getNetworkData(_web3, NFTMarket);

      // set data in redux
      dispatch(
        setupWeb3({
          data: {
            web3,
            nftContract: null,
            nftMarketContract: null,
            accounts: accounts.map((ac: string) => ac.toLowerCase()),
            networkId,
            balance
          }
        })
      );

      if (NFT_NETWORK_DATA) {
        const _nftContract = new _web3.eth.Contract(
          NFT.abi,
          NFT_NETWORK_DATA.address
        );
        const _nftMarketContract = new _web3.eth.Contract(
          NFTMarket.abi,
          NFT_MARKET_NETWORK_DATA.address
        );

        dispatch(
          setupWeb3({
            data: {
              web3: _web3,
              nftContract: _nftContract,
              nftMarketContract: _nftMarketContract,
              accounts: accounts.map((ac: string) => ac.toLowerCase()),
              networkId,
              balance
            }
          })
        );
      } else {
        window.alert(
          `nft contract not deployed to detected network. please change to ${SELECTED_NETWORK}`
        );
      }
    } catch (error) {
      console.log('error in loadBlockchainData', error);
      clearUserState();
      TokenService.removeCurrentToken();
    }
    setLoadingState({ loading: false, error: null });
  };

  const loadWeb3 = async ({
    fromConnectButton
  }: {
    fromConnectButton?: boolean;
  }) => {
    try {
      if ((window as any).ethereum) {
        _web3 = new Web3((window as any).ethereum);
        await (window as any).ethereum.enable();
        loadBlockchainData(fromConnectButton);
      } else {
        notification.error(
          "You don't have metamask installed, Please install to continue"
        );
      }
    } catch (error) {
      console.log('error in web 3', error);
      notification.error('Please connect to metamask');
      TokenService.removeTokens();
    }
  };

  const changeAccount = async () => {
    const permissions = await window.ethereum.request({
      method: 'wallet_requestPermissions',
      params: [
        {
          eth_accounts: {}
        }
      ]
    });
  };

  const renderConnectionView = () => {
    if (loadingState.loading) {
      return (
        <div className="mainside" style={{ color: '#f5fdff' }}>
          loading...
        </div>
      );
    }
    if (!accounts?.length) {
      return (
        <>
          <div className="mainside">
            <span
              className="btn-main btn-grad"
              onClick={() => loadWeb3({ fromConnectButton: true })}
            >
              Connect Wallet
            </span>
            {/* <NavLink to="/wallet" className="btn-main">Connect Wallet</NavLink> */}
          </div>
          <ToggleTheme />
        </>
      );
    }
    return (
      <>
        <div className="mainside" style={{ color: '#f5fdff' }}>
          <div
            id="de-click-menu-profile"
            className="de-menu-profile"
            onClick={toggleProfilePopUP}
            ref={refpop}
          >
            <div className="profile_image_container">
              <UserAvatar
                className="profile_image"
                image={user?.profileImage}
                size={50}
                userAddress={userAddress}
              />
            </div>
            {/*{shortAddress(userAddress, 8)}*/}
            {showpop && (
              <div className="popshow">
                <div className="d-name">
                  <img
                    className="profile_image"
                    src={
                      user?.profileImage
                        ? getImage(user?.profileImage)
                        : './img/author/author-3.jpg'
                    }
                    alt=""
                  />
                  {user?.username ? (
                    <span className="ml-2">{user?.username}</span>
                  ) : (
                    <span className="name" onClick={() => navigate('/profile')}>
                      Set display name
                    </span>
                  )}

                  <CopyToClipboard
                    text={user?.publicAddress || ''}
                    onCopy={onCopy}
                  >
                    <span id="wallet" className="d-wallet-address">
                      {shortAddress(accounts[0], 4)}{' '}
                      <i
                        id="btn_copy"
                        title="Copy Text"
                        className="fa fa-copy"
                      ></i>
                    </span>
                  </CopyToClipboard>
                </div>
                <div className="d-balance">
                  <h4>Balance</h4>
                  <span>
                    <img className="mr-2" src="./img/eth.png" alt=""></img>
                  </span>
                  {`${Number(balance).toFixed(8)} ${COIN}`}
                </div>
                {/* <div className="d-wallet">
              <h4>My Wallet</h4>
              <span id="wallet" className="d-wallet-address">{accounts[0]}</span>
              <CopyToClipboard
                text={user?.publicAddress || ''}
                onCopy={onCopy}
              >
                <i id="btn_copy" title="Copy Text" className="fa fa-copy"></i>
              </CopyToClipboard>
            </div>*/}
                <ul className="de-submenu-profile">
                  {/* <li>
                <span onClick={changeAccount}>
                  <i className="fa fa-user"></i> Change account
                </span>
              </li> */}
                  <li>
                    <span
                      onClick={() => {
                        navigate('/myProfile');
                      }}
                    >
                      <i className="fa fa-user-circle"></i> My profile
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => {
                        navigate('/profile');
                      }}
                    >
                      <i className="fa fa-pencil-square-o"></i> Edit Details
                    </span>
                  </li>
                  <li>
                    <span onClick={handleLoggedOut}>
                      <i className="fa fa-sign-out"></i> Sign out
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <ToggleTheme />
      </>
    );
  };

  return (
    <header id="myHeader" className="navbar white">
      <div className="container">
        <div className="row w-100-nav">
          <div className="logo px-0">
            <div className="navbar-title navbar-item">
              <NavLink to="/">
                <img
                  src="./img/NFT-BETA-LOGO.png"
                  className="img-fluid d-3"
                  alt="#"
                  width={80}
                />
              </NavLink>
            </div>
          </div>

          {
            <div className="search global-search">
              <GlobalSearchBar />
            </div>
          }

          <BreakpointProvider>
            <Breakpoint l down>
              {showmenu && (
                <div className="menu">
                  <div className="navbar-item">
                    <NavLink to="/explore" onClick={() => btn_icon(!showmenu)}>
                      Explore
                      <span className="lines"></span>
                    </NavLink>
                  </div>
                  <div className="navbar-item">
                    <NavLink to="/explore" onClick={() => btn_icon(!showmenu)}>
                      Ranking
                      <span className="lines"></span>
                    </NavLink>
                  </div>
                  <div className="d-flex justify-content-evenly align-items-center">
                    <span className="col-6 btn-main btn-grad-outline mx-3">
                      Design
                    </span>
                    <span
                      className="col-6 btn-main btn-grad-outline mx-3"
                      onClick={() => navigate('/CreateOption')}
                    >
                      Create
                    </span>
                  </div>
                </div>
              )}
            </Breakpoint>

            <Breakpoint xl>
              <span className="menu">
                <div className="navbar-item">
                  <NavLink to="/explore">
                    Explore
                    <span className="lines"></span>
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink to="/explore">
                    Ranking
                    <span className="lines"></span>
                  </NavLink>
                </div>
                <div className="d-flex justify-content-evenly align-items-center">
                  <span className="col-6 btn-main btn-grad-outline mx-3">
                    Design
                  </span>
                  <span
                    className="col-6 btn-main btn-grad-outline mx-3"
                    onClick={() => navigate('/CreateOption')}
                  >
                    Create
                  </span>
                </div>
              </span>
            </Breakpoint>
          </BreakpointProvider>

          {renderConnectionView()}
        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>
      </div>
    </header>
  );
};
export default Header;
