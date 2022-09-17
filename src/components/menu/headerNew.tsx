import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { Link, navigate } from '@reach/router';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
// contracts
import useOnclickOutside from 'react-cool-onclickoutside';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import Breakpoint, {
  BreakpointProvider,
  setDefaultBreakpoints
} from 'react-socks';
import MockERC20 from 'src/abis/new/MockERC20.json';
import NFT721 from 'src/abis/new/NFT721.json';
import NFT1155 from 'src/abis/new/NFT1155.json';
import NFTMarketAuction from 'src/abis/new/NFTMarketAuction.json';
import NFTMarketOffers from 'src/abis/new/NFTMarketOffers.json';
import NFTMarketSimple from 'src/abis/new/NFTMarketSimple.json';
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

import { dark, light } from '../../styles/theme/themeVariables';
import GlobalSearchBar from '../components/GlobalSearchBar';
import UserAvatar from '../components/UserAvatar';
import HeaderWrapper from './header.styled';

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

const Header = function (props) {
  const { themeToggler } = props;
  const currentThemevalue = JSON.parse(localStorage.getItem('current-theme'));
  console.log('local storage value is', currentThemevalue.name);
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
    const sticky = header?.offsetTop;
    const scrollCallBack = window.addEventListener('scroll', () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        header?.classList.add('sticky');
        totop?.classList.add('show');
      } else {
        header?.classList.remove('sticky');
        totop?.classList.remove('show');
      }
      // eslint-disable-next-line no-empty
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
          balance: null,
          mockERC20Contract: null,
          nft721Contract: null,
          nft1155Contract: null,
          nftMarketSimpleContract: null,
          nftMarketAuctionContract: null,
          nftMarketOffersContract: null
        }
      })
    );
  };

  async function listenMMAccount() {
    (window as any).ethereum?.on(
      'accountsChanged',
      async function (accounts: string[]) {
        console.log(
          '🚀 ~ file: headerNew.tsx ~ line 174 ~ accountsChanged ~ accounts',
          accounts
        );
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
        console.log(
          '🚀 ~ file: headerNew.tsx ~ line 192 ~ networkChanged ~ networkId',
          networkId
        );
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
            networkId: null,
            mockERC20Contract: null,
            nft721Contract: null,
            nft1155Contract: null,
            nftMarketSimpleContract: null,
            nftMarketAuctionContract: null,
            nftMarketOffersContract: null
          }
        })
      );
    } catch (error) {
      console.log(
        '🚀 ~ file: headerNew.tsx ~ line 244 ~ handleLoggedOut ~ error',
        error
      );
    }
  };

  const addPulseNetwork = async () => {
    await window?.ethereum.request({
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

      // get accounts
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
        console.log(
          '🚀 ~ file: headerNew.tsx ~ line 295 ~ loadBlockchainData ~ TokenService.getTokens()',
          TokenService.getTokens()
        );
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

      // const NFT_NETWORK_DATA = await getNetworkData(_web3, NFT);
      // const NFT_MARKET_NETWORK_DATA = await getNetworkData(_web3, NFTMarket);

      const MockERC20_NETWORK_DATA = await getNetworkData(_web3, MockERC20);
      const NFT721_NETWORK_DATA = await getNetworkData(_web3, NFT721);
      const NFT1155_NETWORK_DATA = await getNetworkData(_web3, NFT1155);
      const NFT_MARKET_SIMPLE_NETWORK_DATA = await getNetworkData(
        _web3,
        NFTMarketSimple
      );
      const NFT_MARKET_AUCTION_NETWORK_DATA = await getNetworkData(
        _web3,
        NFTMarketAuction
      );
      const NFT_MARKET_OFFERS_NETWORK_DATA = await getNetworkData(
        _web3,
        NFTMarketOffers
      );

      // set data in redux
      dispatch(
        setupWeb3({
          data: {
            web3,
            nftContract: null,
            nftMarketContract: null,
            accounts: accounts.map((ac: string) => ac.toLowerCase()),
            networkId,
            balance,
            mockERC20Contract: null,
            nft721Contract: null,
            nft1155Contract: null,
            nftMarketSimpleContract: null,
            nftMarketAuctionContract: null,
            nftMarketOffersContract: null
          }
        })
      );

      // if (NFT_NETWORK_DATA) {
      if (NFT721_NETWORK_DATA) {
        // const _nftContract = new _web3.eth.Contract(
        //   NFT.abi,
        //   NFT_NETWORK_DATA.address
        // );
        // const _nftMarketContract = new _web3.eth.Contract(
        //   NFTMarket.abi,
        //   NFT_MARKET_NETWORK_DATA.address
        // );

        const _mockERC20Contract = new _web3.eth.Contract(
          MockERC20.abi,
          MockERC20_NETWORK_DATA.address
        );
        const _nft721Contract = new _web3.eth.Contract(
          NFT721.abi,
          NFT721_NETWORK_DATA.address
        );
        const _nft1155Contract = new _web3.eth.Contract(
          NFT1155.abi,
          NFT1155_NETWORK_DATA.address
        );
        const _nftMarketSimpleContract = new _web3.eth.Contract(
          NFTMarketSimple.abi,
          NFT_MARKET_SIMPLE_NETWORK_DATA.address
        );
        const _nftMarketAuctionContract = new _web3.eth.Contract(
          NFTMarketAuction.abi,
          NFT_MARKET_AUCTION_NETWORK_DATA.address
        );
        const _nftMarketOffersContract = new _web3.eth.Contract(
          NFTMarketOffers.abi,
          NFT_MARKET_OFFERS_NETWORK_DATA.address
        );

        dispatch(
          setupWeb3({
            data: {
              web3: _web3,
              // nftContract: _nftContract,
              // nftMarketContract: _nftMarketContract,
              nftContract: null,
              nftMarketContract: null,
              accounts: accounts.map((ac: string) => ac.toLowerCase()),
              networkId,
              balance,
              mockERC20Contract: _mockERC20Contract,
              nft721Contract: _nft721Contract,
              nft1155Contract: _nft1155Contract,
              nftMarketSimpleContract: _nftMarketSimpleContract,
              nftMarketAuctionContract: _nftMarketAuctionContract,
              nftMarketOffersContract: _nftMarketOffersContract
            }
          })
        );
      } else {
        window.alert(
          `nft contract not deployed to detected network. please change to ${SELECTED_NETWORK}`
        );
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: headerNew.tsx ~ line 423 ~ loadBlockchainData ~ error',
        error
      );
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
      console.log('🚀 ~ file: headerNew.tsx ~ line 446 ~ web3 ~ error', error);
      notification.error('Please connect to metamask');
      TokenService.removeTokens();
    }
  };

  const changeAccount = async () => {
    const permissions = await window?.ethereum.request({
      method: 'wallet_requestPermissions',
      params: [
        {
          eth_accounts: {}
        }
      ]
    });
  };
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff'
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
        }
      }
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
      }
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2
    }
  }));
  const ToggleTheme = () => {
    const [checked, setChecked] = useState(
      currentThemevalue.name === 'dark' ? true : false
    );
    console.log(currentThemevalue.name, 'is the vale of local storage');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
      if (event.target.checked) {
        themeToggler();
      } else {
        themeToggler();
      }
    };
    return (
      <FormGroup className="themeSwitcher">
        <FormControlLabel
          control={
            <MaterialUISwitch
              sx={{ m: 1 }}
              checked={checked}
              onChange={handleChange}
            />
          }
          label=""
        />
      </FormGroup>
    );
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
                    <span
                      className="name ml-2"
                      onClick={() => navigate('/profile')}
                    >
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
      </>
    );
  };

  let logoImageURL = '';
  if (currentThemevalue.name === 'dark') {
    logoImageURL = './img/NFT-BETA-LOGO.png';
  } else {
    logoImageURL = './img/NFT-BETA-LOGO-DARK.png';
  }
  return (
    <HeaderWrapper>
      <header id="myHeader" className="navbar white">
        <div className="container">
          <div className="row w-100-nav">
            <div className="logo px-0">
              <div className="navbar-title navbar-item">
                <NavLink to="/">
                  <img
                    src={logoImageURL}
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
                      <NavLink
                        to="/explore"
                        onClick={() => btn_icon(!showmenu)}
                      >
                        Explore
                        <span className="lines"></span>
                      </NavLink>
                    </div>
                    <div className="navbar-item">
                      <NavLink
                        to="/explore"
                        onClick={() => btn_icon(!showmenu)}
                      >
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
                        onClick={() => navigate('/createItem')}
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
                      onClick={() => navigate('/createItem')}
                    >
                      Create
                    </span>
                  </div>
                </span>
              </Breakpoint>
            </BreakpointProvider>

            {renderConnectionView()}
            {ToggleTheme()}
          </div>

          <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
            <div className="menu-line white"></div>
            <div className="menu-line1 white"></div>
            <div className="menu-line2 white"></div>
          </button>
        </div>
      </header>
    </HeaderWrapper>
  );
};
export default Header;
