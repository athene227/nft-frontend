/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NFT721 from 'src/abis/new/NFT721.json';
// import NFT from 'src/abis/NFT.json';
import NFT1155 from 'src/abis/new/NFT1155.json';
// import NFT from 'src/abis/NFT.json';
import NFT from 'src/abis/NFT.json';
import { initialItemCreateStatus } from 'src/components/components/constants';
import CreateItemProgressPopup from 'src/components/components/Popups/CreateItemProgressPopup';
import { ApiService } from 'src/core/axios';
import {
  ERRORS,
  ITEM_CREATE_STATUS,
  MARKET_TYPE,
  PROCESS_TRAKING_ACTION,
  PROCESS_TRAKING_STATUS,
  SELECTED_NETWORK,
  STATUS
} from 'src/enums';
import { getImageUri, getUri } from 'src/services/ipfs';
import notification from 'src/services/notification';
import { clearEvents } from 'src/store/actions';
import * as selectors from 'src/store/selectors';
import { MarketItemCreateProgress } from 'src/types/nfts.types';
import { ethers } from 'ethers';
import {
  createAuctionMarketItem,
  createSimpleMarketItem,
  createToken,
  generatePreviewImage,
  getErrorMessage,
  getNetworkData,
  getNetworkId,
  getPriceAfterPercent
} from 'src/utils';
import LazyMinter from '../../../LazyMinter';

import CreateForm from './components/CreateForm';
import CreateSingleWrapper from './createSingle.styled';

const CreateItem = () => {
  const dispatch = useDispatch();
  const [nftState, setCreateNftState] = useState<{
    loading: boolean;
    error: null | string;
  }>({
    loading: false,
    error: null
  });
  const [image, setImage] = useState('');
  const [imgFile, setImgFile] = useState(null);

  const [name, setNameInput] = useState('');
  const [description, setDescriptionInput] = useState('');
  const [price, setPriceInput] = useState(0);
  const [tokentype, setTokenType] = useState('MTK');
  // const [, setNumberOfCopiesInput] = useState(0);
  const [, setRoyaltiesInput] = useState(0);
  const [expirationDateInput, setExpirationDateInput] = useState('');
  const [marketType, setMarketType] = useState<MARKET_TYPE>(MARKET_TYPE.SIMPLE);
  const [supply, setSupply] = useState(1);
  const [externalLink, setExternalLink] = useState('');
  const [explicit, setExplicit] = useState(false);
  const [lazyMint, setLazyMint] = useState(false);

  const web3State = useSelector(selectors.web3State);
  const {
    web3,
    accounts,
    networkId,
    mockERC20Contract,
    nft721Contract,
    nft1155Contract,
    nftMarketSimpleContract,
    nftMarketAuctionContract
  } = web3State.web3.data;

  const userState = useSelector(selectors.userState);
  const userDetails = userState.user.data;

  const userAddress = accounts[0];
  const SINGLE = 1;

  const [openProgressPopup, setOpenProgressPopup] = useState(false);
  const [itemCreateProgress, setItemCreateProgress] =
    useState<MarketItemCreateProgress>(initialItemCreateStatus);
  const itemCreateProgressRef = useRef(itemCreateProgress);
  // eslint-disable-next-line @typescript-eslint/ban-types
  const resetFormRef = useRef<() => void>();
  const submitData = useRef();
  const eventList = useSelector(selectors.nftEvents);

  const updateItemCreateProgress = (value: any) => {
    const newValue = {
      ...itemCreateProgressRef.current,
      ...value
    };
    setItemCreateProgress(newValue);
    itemCreateProgressRef.current = newValue;
  };

  const resetPage = () => {
    setNameInput('');
    setDescriptionInput('');
    setPriceInput(0);
    // setNumberOfCopiesInput(0);
    setRoyaltiesInput(0);
    setExpirationDateInput('');
    setMarketType(MARKET_TYPE.SIMPLE);
    setImage('');
    setOpenProgressPopup(false);
    setSupply(1);
    setExternalLink('');
    setExplicit(false);
    resetFormRef.current && resetFormRef.current();
  };

  const onChangeImage = (e: any) => {
    e.preventDefault();
    if (e.target.files.length === 0) {
      console.log(
        '🚀 ~ file: CreateItem.tsx ~ line 115 ~ onChangeImage ~ ERRORS.MISSING_IMAGE',
        ERRORS.MISSING_IMAGE
      );
      return;
    }
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setImgFile(file);
  };

  const getItem = (
    NFT_NETWORK_DATA: any,
    data: any,
    imageUrl: string,
    previewImageUrl: string
  ) => {
    console.log('------------------------------+++++++++++', data);
    const metaDataUrl = () => itemCreateProgressRef.current.metaDataUrl;
    // nft mongo item
    const nftToCreate: any = {
      name: data.name,
      description: data.description,
      imageUrl,
      previewImageUrl,
      attributes: data.attributes,
      creatorAddress: userAddress,
      ownerAddress: userAddress,
      nftAddress: NFT_NETWORK_DATA.address,
      price: marketType == MARKET_TYPE.AUCTION ? 0 : data.price, // price: data.price, There is no price to auction. There is minimum bid
      collectionId: data.collectionId,
      royalty: data.royalties,
      status: STATUS.ON_SELL,
      marketType: marketType,
      listedAt: new Date(),
      isListedOnce: true,
      totalAmount: Number(data.supply),
      leftAmount: 0,
      listedAmount: Number(data.supply),
      multiple: data.supply == 1 ? false : true,
      networkId,
      category: data.category,
      externalLink: data.externalLink,
      explicit: data.explicit,
      supply: data.supply,
      lazyMint: data.lazyMint,
      tokenUri: metaDataUrl() as string,
      expirationDate: new Date(data.expirationDate), //Sat May 14 2022 21:30:00 GMT+0300 (Israel Daylight Time)
      // auction fields
      minimumBid: marketType == MARKET_TYPE.AUCTION ? data.minimumBid : '',
      priceTokenId:
        marketType == MARKET_TYPE.AUCTION ? data.priceTokenId : undefined
    };

    const _attributes = data.attributes.map((item: any) => {
      return { ...item, value: item.value.toString() };
    });
    nftToCreate.attributes = _attributes;

    return nftToCreate;
  };

  const createSimple = async (NFT_NETWORK_DATA: any, data: any) => {
    const tokenId = () => itemCreateProgressRef.current.tokenId;
    const listingId = () => itemCreateProgressRef.current.listingId;
    const imageUrl = () => itemCreateProgressRef.current.imageUrl;
    const previewImageUrl = () => itemCreateProgressRef.current.previewImageUrl;
    const metaDataUrl = () => itemCreateProgressRef.current.metaDataUrl;

    // nft mongo item
    const nftToCreate: any = getItem(
      NFT_NETWORK_DATA,
      data,
      imageUrl() as string,
      previewImageUrl() as string
    );

    const priceInWei = web3.utils.toWei(data.price.toString(), 'ether');
    const ts1 = moment(data.expirationDate).unix();

    //* create tracking before creating
    await ApiService.createProcessTracking({
      ...nftToCreate,
      userAddress,
      action: PROCESS_TRAKING_ACTION.CREATE_SINGLE,
      processStatus: PROCESS_TRAKING_STATUS.BEFORE
    });

    if (!tokenId()) {
      //* creating nft in the nft contract
      const res = await createToken({
        nftContract: nft721Contract,
        userAddress,
        jsonUri: metaDataUrl() as string,
        quantity: SINGLE,
        royalty: Number(data.royalties),
        nftType: 'NFT721'
      });

      const tokenId = res.returnValues.newItemId;
      const transactionHash = res.transactionHash;

      // await ApiService.createdNft({
      //   transactionHash,
      //   data: {
      //     ...nftToCreate,
      //     tokenURI: metaDataUrl() as string,
      //     priceTokenId: undefined,
      //     status: STATUS.NOT_LISTED,
      //     totalAmount: SINGLE,
      //     leftAmount: SINGLE,
      //     listedAmount: 0
      //   }
      // });

      // await ApiService.createProcessTracking({
      //   ...nftToCreate,
      //   tokenId,
      //   userAddress,
      //   action: PROCESS_TRAKING_ACTION.CREATE_SINGLE,
      //   processStatus: PROCESS_TRAKING_STATUS.AFTER
      // });

      // update item create progress to listing item
      updateItemCreateProgress({
        status: ITEM_CREATE_STATUS.LIST_ITEM,
        tokenId,
        tokenTransactionHash: transactionHash
      });
    }

    // ADD CHECK - IF THERE IS ENOUGH GAS

    // * create tracking before listing
    await ApiService.createProcessTracking({
      ...nftToCreate,
      userAddress,
      tokenId: itemCreateProgressRef.current.tokenId,
      action: PROCESS_TRAKING_ACTION.LIST_SIMPLE_SINGLE,
      processStatus: PROCESS_TRAKING_STATUS.BEFORE
    });

    if (!listingId()) {
      //* listing nft on contract
      await nft721Contract.methods
        .setApprovalForAll(nftMarketSimpleContract._address, true)
        .send({ from: userAddress });

      const res = await createSimpleMarketItem({
        nftMarketSimpleContract,
        userAddress,
        nftAddress: NFT_NETWORK_DATA.address,
        tokenId: tokenId() as string,
        priceInWei,
        quantity: SINGLE,
        deadline: ts1
      });

      const listingId = res.returnValues.listingId;
      const transactionHash = res.transactionHash;
      // const SellerNFTBalance = await nft721Contract.methods
      //   .balanceOf(userAddress)
      //   .call();

      // await ApiService.createdNft({
      //   transactionHash,
      //   data: {
      //     ...nftToCreate,
      //     tokenId: itemCreateProgressRef.current.tokenId,
      //     listingId,
      //     price: data.price,
      //     priceTokenId: undefined,
      //     tokenURI: metaDataUrl() as string,
      //     status: STATUS.ON_SELL,
      //     totalAmount: SINGLE,
      //     leftAmount: 0,
      //     listedAmount: SINGLE
      //   }
      // });

      // await ApiService.createProcessTracking({
      //   ...nftToCreate,
      //   userAddress,
      //   tokenId: itemCreateProgressRef.current.tokenId,
      //   action: PROCESS_TRAKING_ACTION.LIST_SIMPLE_SINGLE,
      //   processStatus: PROCESS_TRAKING_STATUS.AFTER
      // });

      //* update item create progress to finished
      updateItemCreateProgress({
        status: ITEM_CREATE_STATUS.FINISHED,
        listingId,
        listingTransactionHash: transactionHash,
        multiple: false,
        nftAddress: NFT_NETWORK_DATA.address
      });
    }
  };

  const createAuction = async (NFT_NETWORK_DATA: any, data: any) => {
    console.log(
      '🚀 ~ file: CreateItem.tsx ~ line 298 ~ createAuction ~ data',
      data
    );

    const tokenId = () => itemCreateProgressRef.current.tokenId;
    const listingId = () => itemCreateProgressRef.current.listingId;
    const imageUrl = () => itemCreateProgressRef.current.imageUrl;
    const previewImageUrl = () => itemCreateProgressRef.current.previewImageUrl;
    const metaDataUrl = () => itemCreateProgressRef.current.metaDataUrl;

    //* item to mongo
    const nftToCreate: any = getItem(
      NFT_NETWORK_DATA,
      data,
      imageUrl() as string,
      previewImageUrl() as string
    );

    const ts1 = moment(data.expirationDate).unix(); //* dates
    const startPriceInWei = web3.utils.toWei(
      data.minimumBid.toString(),
      'ether'
    );

    //* create tracking before creating
    await ApiService.createProcessTracking({
      ...nftToCreate,
      userAddress,
      action: PROCESS_TRAKING_ACTION.CREATE_SINGLE,
      processStatus: PROCESS_TRAKING_STATUS.BEFORE
    });

    if (!tokenId()) {
      //* creating nft in the nft contract
      const res = await createToken({
        nftContract: nft721Contract,
        userAddress,
        jsonUri: metaDataUrl() as string,
        quantity: SINGLE,
        royalty: Number(data.royalties),
        nftType: 'NFT721'
      });

      const tokenId = res.returnValues.newItemId;
      const transactionHash = res.transactionHash;

      // await ApiService.createdNft({
      //   transactionHash,
      //   data: {
      //     ...nftToCreate,
      //     tokenId,
      //     tokenURI: metaDataUrl() as string,
      //     status: STATUS.NOT_LISTED
      //   }
      // });

      // await ApiService.createProcessTracking({
      //   ...nftToCreate,
      //   tokenId,
      //   userAddress,
      //   action: PROCESS_TRAKING_ACTION.CREATE_SINGLE,
      //   processStatus: PROCESS_TRAKING_STATUS.AFTER
      // });

      // update item create progress to listing item
      updateItemCreateProgress({
        status: ITEM_CREATE_STATUS.LIST_ITEM,
        tokenId,
        tokenTransactionHash: transactionHash
      });
    }

    // ADD CHECK - IF THERE IS ENOUGH GAS

    //* create tracking before listing
    await ApiService.createProcessTracking({
      ...nftToCreate,
      userAddress,
      tokenId: tokenId(),
      action: PROCESS_TRAKING_ACTION.LIST_AUCTION,
      processStatus: PROCESS_TRAKING_STATUS.BEFORE
    });

    if (!listingId()) {
      await nft721Contract.methods
        .setApprovalForAll(nftMarketAuctionContract._address, true)
        .send({ from: userAddress });

      //* listing nft on contract
      const res = await createAuctionMarketItem({
        nftMarketAuctionContract,
        userAddress,
        priceTokenAddress: mockERC20Contract._address,
        nftAddress: NFT_NETWORK_DATA.address,
        tokenId: tokenId() as string,
        startPriceInWei,
        deadline: ts1
      });

      const listingId = res.returnValues.listingId;
      const transactionHash = res.transactionHash;

      // await ApiService.createdNft({
      //   transactionHash,
      //   data: {
      //     ...nftToCreate,
      //     listingId,
      //     tokenId: tokenId() as string,
      //     tokenURI: metaDataUrl(),
      //     status: STATUS.ON_SELL
      //   }
      // });

      // await ApiService.createProcessTracking({
      //   ...nftToCreate,
      //   userAddress,
      //   tokenId: tokenId(),
      //   action: PROCESS_TRAKING_ACTION.LIST_AUCTION,
      //   processStatus: PROCESS_TRAKING_STATUS.AFTER
      // });

      // update item create progress to finished
      updateItemCreateProgress({
        status: ITEM_CREATE_STATUS.FINISHED,
        listingId,
        listingTransactionHash: transactionHash,
        multiple: false,
        nftAddress: NFT_NETWORK_DATA.address
      });
    }
  };

  const createMultiple = async (NFT_NETWORK_DATA: any, data: any) => {
    const tokenId = () => itemCreateProgressRef.current.tokenId;
    const listingId = () => itemCreateProgressRef.current.listingId;
    const imageUrl = () => itemCreateProgressRef.current.imageUrl;
    const previewImageUrl = () => itemCreateProgressRef.current.previewImageUrl;
    const metaDataUrl = () => itemCreateProgressRef.current.metaDataUrl;

    const nftToCreate: any = getItem(
      NFT_NETWORK_DATA,
      data,
      imageUrl() as string,
      previewImageUrl() as string
    );

    const ts1 = moment(data.expirationDate).unix();
    const priceInWei = web3.utils.toWei(data.price.toString(), 'ether');

    //* create tracking before creating
    await ApiService.createProcessTracking({
      ...nftToCreate,
      userAddress,
      action: PROCESS_TRAKING_ACTION.CREATE_MULTIPLE,
      processStatus: PROCESS_TRAKING_STATUS.BEFORE
    });

    if (!tokenId()) {
      //* create on contract
      const res = await createToken({
        nftContract: nft1155Contract,
        userAddress,
        jsonUri: metaDataUrl() as string,
        quantity: Number(data.supply),
        royalty: Number(data.royalties),
        nftType: 'NFT1155'
      });

      const tokenId = res.returnValues.newItemId;
      const transactionHash = res.transactionHash;

      // await ApiService.createdNft({
      //   transactionHash,
      //   data: {
      //     ...nftToCreate,
      //     priceTokenId: undefined,
      //     tokenURI: metaDataUrl() as string,
      //     status: STATUS.NOT_LISTED,
      //     totalAmount: Number(data.supply),
      //     leftAmount: Number(data.supply),
      //     listedAmount: 0
      //   }
      // });

      // await ApiService.createProcessTracking({
      //   ...nftToCreate,
      //   userAddress,
      //   action: PROCESS_TRAKING_ACTION.CREATE_MULTIPLE,
      //   processStatus: PROCESS_TRAKING_STATUS.AFTER
      // });

      // update item create progress to listing item
      updateItemCreateProgress({
        status: ITEM_CREATE_STATUS.LIST_ITEM,
        tokenId,
        tokenTransactionHash: transactionHash
      });
    }

    // ADD CHECK - IF THERE IS ENOUGH GAS

    //* create tracking before listing
    await ApiService.createProcessTracking({
      ...nftToCreate,
      tokenId: tokenId() as string,
      userAddress,
      action: PROCESS_TRAKING_ACTION.LIST_SIMPLE_MULTIPLE,
      processStatus: PROCESS_TRAKING_STATUS.BEFORE
    });

    if (!listingId()) {
      //* list on contract

      await nft1155Contract.methods
        .setApprovalForAll(nftMarketSimpleContract._address, true)
        .send({ from: userAddress });

      const res = await createSimpleMarketItem({
        nftMarketSimpleContract,
        userAddress,
        nftAddress: NFT_NETWORK_DATA.address,
        tokenId: tokenId() as string,
        priceInWei,
        quantity: Number(data.supply),
        deadline: ts1
      });

      const listingId = res.returnValues.listingId;
      const transactionHash = res.transactionHash;

      // update item create progress to finished
      updateItemCreateProgress({
        status: ITEM_CREATE_STATUS.FINISHED,
        listingId,
        listingTransactionHash: transactionHash,
        multiple: true,
        nftAddress: NFT_NETWORK_DATA.address
      });
    }
  };

  const lazyMintNFT = async (NFT_NETWORK_DATA: any, data: any) => {
    const tokenId = () => itemCreateProgressRef.current.tokenId;
    const imageUrl = () => itemCreateProgressRef.current.imageUrl;
    const previewImageUrl = () => itemCreateProgressRef.current.previewImageUrl;
    // const metaDataUrl = () => itemCreateProgressRef.current.metaDataUrl;

    const nftToCreate: any = getItem(
      NFT_NETWORK_DATA,
      data,
      imageUrl() as string,
      previewImageUrl() as string
    );
    if (!tokenId()) {
      //* fetch Token Id
      const lazyMintTokenId: any = await ApiService.fetchLazyMintTokenId();
      console.log(
        '🚀🚀🚀🚀🚀 ~ file: CreateItem.tsx ~ line 574 ~ lazyMintNFT ~ lazyMintTokenId',
        lazyMintTokenId.data
      );
      const ltokenId = String(lazyMintTokenId.data.tokenId);
      console.log(
        '🚀 ~ file: CreateItem.tsx ~ line 580 ~ lazyMintNFT ~ ltokenId',
        ltokenId
      );

      //* create tracking before listing
      await ApiService.createProcessTracking({
        ...nftToCreate,
        tokenId: ltokenId,
        userAddress,
        action: PROCESS_TRAKING_ACTION.LIST_SIMPLE_SINGLE,
        processStatus: PROCESS_TRAKING_STATUS.BEFORE
      });

      const price = Number(nftToCreate.price);
      const weiPrice = web3.utils.toWei(price.toString(), 'ether');
      const value =
        Number(weiPrice) + getPriceAfterPercent(Number(weiPrice), 1);

      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const accounts = await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(
        '🚀 ~ file: CreateItem.tsx ~ line 608 ~ lazyMintNFT ~ provider',
        provider
      );
      // await provider.send('eth_requestAccounts', []);
      console.log(
        '🚀 ~ file: CreateItem.tsx ~ line 614 ~ lazyMintNFT ~ accounts',
        accounts
      );

      const signer = provider.getSigner();
      const lazyMinterClass = new LazyMinter({
        contractAddress: nft721Contract._address,
        chainId: networkId,
        signer
      });
      console.log('2----------------------------------------------------');

      const voucher = await lazyMinterClass.createVoucher(
        Number(ltokenId),
        String(nftToCreate?.tokenUri),
        value,
        Number(nftToCreate.royalty)
      );

      const signature = voucher?.signature;
      console.log(
        '🚀 ~ file: CreateItem.tsx ~ line 628 ~ lazyMintNFT ~ signature',
        signature
      );

      await ApiService.createdNft({
        transactionHash: undefined,
        data: {
          ...nftToCreate,
          signature,
          tokenId: ltokenId,
          imageUrl: imageUrl() as string,
          previewImageUrl: previewImageUrl() as string,
          priceTokenId: undefined
        }
      });

      //* Increase Token Id
      await ApiService.increaseLazyMintTokenId();

      await ApiService.createProcessTracking({
        ...nftToCreate,
        userAddress,
        tokenId: ltokenId,
        action: PROCESS_TRAKING_ACTION.LIST_SIMPLE_SINGLE,
        processStatus: PROCESS_TRAKING_STATUS.AFTER
      });

      // update item create progress to finished
      updateItemCreateProgress({
        status: ITEM_CREATE_STATUS.FINISHED,
        tokenId: ltokenId,
        multiple: false,
        nftAddress: NFT_NETWORK_DATA.address
      });

      // const fromAddress = (await web3.eth.getAccounts())[0];
      // const voucher = {
      //   tokenId: Number(ltokenId),
      //   minPrice: value,
      //   royalty: Number(nftToCreate.royalty),
      //   creator: String(nftToCreate?.creatorAddress),
      //   uri: String(nftToCreate?.tokenUri)
      // };
      // const originalMessage = JSON.stringify({
      //   domain: {
      //     // Defining the chain aka goerli testnet or Ethereum Main Net
      //     chainId: networkId,
      //     // Give a user friendly name to the specific contract you are signing for.
      //     name: 'HowToPulse-Voucher',
      //     // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
      //     verifyingContract: nft721Contract._address,
      //     // Just let's you know the latest version. Definitely make sure the field name is correct.
      //     version: '1'
      //   },

      //   // Defining the message signing data content.
      //   message: voucher,
      //   // Refers to the keys of the *types* object below.
      //   primaryType: 'NFTVoucher',
      //   voucher,
      //   types: {
      //     // // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
      //     NFTVoucher: [
      //       { name: 'tokenId', type: 'uint256' },
      //       { name: 'minPrice', type: 'uint256' },
      //       { name: 'royalty', type: 'uint96' },
      //       { name: 'creator', type: 'address' },
      //       { name: 'uri', type: 'string' }
      //     ]
      //   }
      // });
      // const params = [fromAddress, originalMessage];
      // const method = 'eth_signTypedData_v4';

      // await web3.currentProvider.sendAsync(
      //   {
      //     method,
      //     params,
      //     fromAddress
      //   },
      //   (err: any, result: any) => {
      //     if (err) {
      //       console.log(err);
      //     } else if (result.error) {
      //       console.log(result.error);
      //     } else {
      //       const signature = result.result;
      //       console.log(
      //         '🚀 ~ file: CreateItem.tsx ~ line 671 ~ lazyMintNFT ~ signature',
      //         signature
      //       );

      //       const createLazyMintNFT = async () => {
      //         await ApiService.createdNft({
      //           transactionHash: undefined,
      //           data: {
      //             ...nftToCreate,
      //             signature,
      //             tokenId: ltokenId,
      //             imageUrl: imageUrl() as string,
      //             previewImageUrl: previewImageUrl() as string,
      //             priceTokenId: undefined
      //           }
      //         });

      //         //* Increase Token Id
      //         await ApiService.increaseLazyMintTokenId();

      //         await ApiService.createProcessTracking({
      //           ...nftToCreate,
      //           userAddress,
      //           tokenId: ltokenId,
      //           action: PROCESS_TRAKING_ACTION.LIST_SIMPLE_SINGLE,
      //           processStatus: PROCESS_TRAKING_STATUS.AFTER
      //         });

      //         // update item create progress to finished
      //         updateItemCreateProgress({
      //           status: ITEM_CREATE_STATUS.FINISHED,
      //           tokenId: ltokenId,
      //           multiple: false,
      //           nftAddress: NFT_NETWORK_DATA.address
      //         });
      //       };
      //       createLazyMintNFT();
      //     }
      //   }
      // );
    }
  };

  const submitForm = async (
    data: any,
    // eslint-disable-next-line @typescript-eslint/ban-types
    resetForm: () => void,
    isRetry = false
  ) => {
    console.log(
      '🚀 ~ file: CreateItem.tsx ~ line 591 ~ CreateItem ~ data',
      data
    );
    if (!web3) {
      notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
      return;
    }
    // initialize popup status and event list
    setOpenProgressPopup(true);
    if (!isRetry) {
      submitData.current = data;
      resetFormRef.current = resetForm;
      dispatch(clearEvents());
      updateItemCreateProgress(initialItemCreateStatus);
    }
    updateItemCreateProgress({ error: null });
    try {
      //* set loader
      setCreateNftState({ loading: true, error: null });
      //* getting network id *//
      const networkId = await getNetworkId(web3);
      if (networkId !== SELECTED_NETWORK) {
        notification.error(ERRORS.WRONG_NETWORK);
        throw new Error(ERRORS.WRONG_NETWORK);
      }
      //* check if there is image
      if (!imgFile) {
        notification.error(ERRORS.MISSING_IMAGE);
        throw new Error(ERRORS.MISSING_IMAGE);
      }
      const imageUrl = () => itemCreateProgressRef.current.imageUrl;
      const previewImageUrl = () =>
        itemCreateProgressRef.current.previewImageUrl;
      const metaDataUrl = () => itemCreateProgressRef.current.metaDataUrl;
      // const NFT_NETWORK_DATA = await getNetworkData(web3, NFT);

      if (!imageUrl()) {
        //* uploading image to ipfs
        const previewFile = await generatePreviewImage(image, 600, 600);
        const imgUrl = await getImageUri(imgFile);
        const previewImgUrl = await getImageUri(previewFile);
        // update item create progress to metadata
        updateItemCreateProgress({
          status: ITEM_CREATE_STATUS.IPFS_METADATA,
          imageUrl: imgUrl,
          previewImageUrl: previewImgUrl
        });
      }

      const isMultiple = data.supply > 1 ? true : false;
      if (!metaDataUrl() && imageUrl()) {
        //* uploading METADATA to ipfs
        const jsonUri = await getUri({
          name: data.name,
          description: data.description,
          creatorAddress: userAddress,
          imageUrl: imageUrl() as string,
          previewImageUrl: previewImageUrl() as string,
          attributes: data.attributes,
          category: data.category,
          collectionId: data.collectionId,
          explicit: data.explicit,
          externalLink: data.externalLink,
          supply: data.supply,
          royalty: data.royalties
        });

        // update item create progress to metadata
        updateItemCreateProgress({
          status:
            !isMultiple && marketType === MARKET_TYPE.SIMPLE && data.lazyMint
              ? ITEM_CREATE_STATUS.LAZY_MINT_NFT
              : ITEM_CREATE_STATUS.CREATE_NFT,
          metaDataUrl: jsonUri
        });
      }

      if (!isMultiple && marketType === MARKET_TYPE.SIMPLE && data.lazyMint) {
        //* LazyMint
        const NFT_NETWORK_DATA = await getNetworkData(web3, NFT721);
        await lazyMintNFT(NFT_NETWORK_DATA, data);
      } else if (isMultiple) {
        const NFT_NETWORK_DATA = await getNetworkData(web3, NFT1155);
        await createMultiple(NFT_NETWORK_DATA, data);
      } else {
        const NFT_NETWORK_DATA = await getNetworkData(web3, NFT721);

        //* create and list on contract
        if (marketType === MARKET_TYPE.SIMPLE) {
          await createSimple(NFT_NETWORK_DATA, data);
        } else {
          // marketType === MARKET_TYPE.AUCTION
          await createAuction(NFT_NETWORK_DATA, data);
        }
      }

      //* turn off loader
      setCreateNftState({ loading: false, error: null });
    } catch (error) {
      console.error('error in CreateItem', getErrorMessage(error));
      setCreateNftState({ loading: false, error: getErrorMessage(error) });
      updateItemCreateProgress({ error });
    }
  };

  const onTab = (tab: MARKET_TYPE) => {
    setMarketType(tab);

    // reset fields
    //   setExpirationDateInput('');
    //   setPriceInput('');
  };

  return (
    <CreateSingleWrapper>
      <div>
        {/* <GlobalStyles /> */}
        <div
          className="jumbotron breadcumb no-bg main-jumbo"
          style={{
            backgroundImage: `url(${'./img/snake.svg'})`,
            height: 'fit-content'
          }}
        >
          <section className="section-single-head">
            <div className="container">
              <div className="row m-10-hor">
                <div className="col-12">
                  <h1 className="text-center create-single-head">
                    Create New Item
                    <br /> on PulseChain
                  </h1>
                </div>
              </div>
            </div>
          </section>
          <section className="container create-single-section">
            {/* <div className="row"> */}
            {/* <div className="col-lg-7 mb-5" style={{ margin: 'auto' }}> */}
            {/* <div className="marketplace-tabs-main">
                <p>
                  <span className="span-red" style={{ fontSize: '20px' }}>
                    *
                  </span>{' '}
                  Required fields
                </p>
              </div> */}

            <CreateForm
              multiple={false}
              submit={submitForm}
              submitCreateState={nftState}
              onChangeImage={onChangeImage}
              setNameInput={setNameInput}
              setDescriptionInput={setDescriptionInput}
              setPriceInput={setPriceInput}
              setTokenType={setTokenType}
              setRoyaltiesInput={setRoyaltiesInput}
              setExpirationDateInput={setExpirationDateInput}
              setExternalLink={setExternalLink}
              marketType={marketType}
              name={name}
              description={description}
              price={price}
              image={image}
              expirationDateInput={expirationDateInput}
              tokentype={tokentype}
              onTab={onTab}
              setSupply={setSupply}
              supply={supply}
              setExplicit={setExplicit}
              setLazyMint={setLazyMint}
            />
            {/* </div> */}

            {/* <div className="col-lg-3 col-sm-6 col-xs-12">
              <h5>Preview item</h5>

            </div> */}
            {/* </div> */}
            {openProgressPopup && (
              <div className="checkout">
                <CreateItemProgressPopup
                  progress={itemCreateProgress}
                  events={eventList}
                  lazyMint={lazyMint}
                  onRetry={() =>
                    submitForm(submitData.current, () => null, true)
                  }
                  onClose={() => setOpenProgressPopup(false)}
                  onReset={resetPage}
                />
              </div>
            )}
          </section>
        </div>
      </div>
    </CreateSingleWrapper>
  );
};

export default CreateItem;
