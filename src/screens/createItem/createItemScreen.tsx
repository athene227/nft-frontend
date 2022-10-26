import { ethers } from 'ethers';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NFT721 from 'src/abis/new/NFT721.json';
import NFT1155 from 'src/abis/new/NFT1155.json';
import { initialItemCreateStatus } from 'src/components/constants';
import CreateItemProgressPopup from 'src/components/Popups/CreateItemProgressPopup';
import { serviceFee } from 'src/config';
import { ApiService } from 'src/core/axios';
import {
  COLLECTION_TYPE,
  ERRORS,
  ITEM_CREATE_STATUS,
  MARKET_TYPE,
  PROCESS_TRAKING_ACTION,
  PROCESS_TRAKING_STATUS,
  ROYALTIES_TYPE,
  SELECTED_NETWORK,
  STATUS
} from 'src/enums';
import LazyMinter from 'src/LazyMinter';
import CreateForm from 'src/screens/createItem/CreateForm';
import CreateSingleWrapper from 'src/screens/createItem/createSingle.styled';
import { uploadImageToIPFS, uploadMetadataToIPFS } from 'src/services/ipfs';
import notification from 'src/services/notification';
import { clearEvents } from 'src/store/actions';
import * as selectors from 'src/store/selectors';
import { MarketItemCreateProgress } from 'src/types/nfts.types';
import {
  createAuctionMarketItem,
  createSimpleMarketItem,
  createToken,
  generatePreviewImage,
  getErrorMessage,
  getNetworkData,
  getNetworkId
} from 'src/utils';

const CreateItemNew = () => {
  const dispatch = useDispatch();
  const [nftState, setCreateNftState] = useState<{
    loading: boolean;
    error: null | string;
  }>({
    loading: false,
    error: null
  });
  const [profileImage, setProfileImage] = useState(false);
  const [lazyMint, setLazyMint] = useState(false);
  const [image, setImage] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [name, setNameInput] = useState('');
  const [description, setDescriptionInput] = useState('');
  const [price, setPriceInput] = useState(0);
  const [minimumBid, setMinimumBidInput] = useState(0);
  const [tokentype, setTokenType] = useState('MTK');
  const [marketType, setMarketType] = useState<MARKET_TYPE>(MARKET_TYPE.SIMPLE);
  const [collectionsType, setcollectionsType] = useState<COLLECTION_TYPE>(
    COLLECTION_TYPE.Other
  );
  const [royaltiesType, setRoyaltiesType] = useState<ROYALTIES_TYPE>(
    ROYALTIES_TYPE.PERCENT5
  );
  const [supply, setSupply] = useState(1);
  const [externalLink, setExternalLink] = useState('');
  const [enableListing, setEnableListing] = useState(true);
  const [explicit, setExplicit] = useState(true);
  const [unlockableContentInput, setUnlockableContentInput] = useState('');
  const [isSingle, setIsSingle] = useState(true);

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
    setMinimumBidInput(0);
    setMarketType(MARKET_TYPE.SIMPLE);
    setRoyaltiesType(ROYALTIES_TYPE.PERCENT5);
    setcollectionsType(COLLECTION_TYPE.Other);
    setImage('./img/collections/coll-item-3.png');
    setProfileImage(false);
    setOpenProgressPopup(false);
    setSupply(1);
    setExternalLink('');
    setEnableListing(true);
    setExplicit(true);
    setUnlockableContentInput('');
    setIsSingle(true);
    resetFormRef.current && resetFormRef.current();
  };

  const onChangeImage = (e: any) => {
    e.preventDefault();
    if (e.target.files.length === 0) {
      console.log(
        '🚀 ~ file: createItem.tsx ~ line 115 ~ onChangeImage ~ ERRORS.MISSING_IMAGE',
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
      status: data.enableListing ? STATUS.ON_SELL : STATUS.NOT_LISTED,
      marketType: marketType,
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
      startingDate: data.startingDate,
      expirationDate: data.endDate, //Sat Dec 14 2022 21:30:00 GMT+0300 (Israel Daylight Time)
      // auction fields
      minimumBid: marketType == MARKET_TYPE.AUCTION ? data.minimumBid : 0,
      priceTokenType:
        marketType == MARKET_TYPE.AUCTION ? data.pricetokentype : '',
      enableListing: data.enableListing,
      unlockableContent: data.unlockableContent
    };

    const _attributes = data.attributes.map((item: any) => {
      return { ...item, value: item.value.toString() };
    });
    const _attributesStats = data.attributesStats.map((item: any) => {
      return { ...item, value: item.value.toString() };
    });
    nftToCreate.attributes = [..._attributes, ..._attributesStats];

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
    const ts1 = moment(data.endDate).unix();

    // * create tracking before creating
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

      // update item create progress to listing item
      updateItemCreateProgress({
        status: ITEM_CREATE_STATUS.LIST_ITEM,
        tokenId,
        tokenTransactionHash: transactionHash
      });
    }

    if (data.enableListing == true) {
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
        const SellerNFTBalance = await nft721Contract.methods
          .balanceOf(userAddress)
          .call();

        console.log(
          '🚀 ~ file: createItem.tsx ~ line 276 ~ CreateItem ~ listingId, transactionHash, SellerNFTBalance',
          listingId,
          transactionHash,
          SellerNFTBalance
        );

        // update item create progress to finished
        updateItemCreateProgress({
          status: ITEM_CREATE_STATUS.FINISHED,
          listingId,
          listingTransactionHash: transactionHash,
          multiple: false,
          nftAddress: NFT_NETWORK_DATA.address
        });
      }
    } else {
      // update item create progress to finished
      updateItemCreateProgress({
        status: ITEM_CREATE_STATUS.FINISHED,
        // listingId,
        // listingTransactionHash: transactionHash,
        multiple: false,
        nftAddress: NFT_NETWORK_DATA.address
      });
    }
  };

  const createAuction = async (NFT_NETWORK_DATA: any, data: any) => {
    console.log(
      '🚀 ~ file: createItem.tsx ~ line 298 ~ CreateItem ~ data',
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

    const ts1 = moment(data.endDate).unix(); //* dates
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

      // update item create progress to listing item
      updateItemCreateProgress({
        status: ITEM_CREATE_STATUS.LIST_ITEM,
        tokenId,
        tokenTransactionHash: transactionHash
      });
    }

    if (data.enableListing == true) {
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

        // update item create progress to finished
        updateItemCreateProgress({
          status: ITEM_CREATE_STATUS.FINISHED,
          listingId,
          listingTransactionHash: transactionHash,
          multiple: false,
          nftAddress: NFT_NETWORK_DATA.address
        });
      }
    } else {
      updateItemCreateProgress({
        status: ITEM_CREATE_STATUS.FINISHED,
        // listingId,
        // listingTransactionHash: transactionHash,
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

    const ts1 = moment(data.endDate).unix();
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

      // update item create progress to listing item
      updateItemCreateProgress({
        status: ITEM_CREATE_STATUS.LIST_ITEM,
        tokenId,
        tokenTransactionHash: transactionHash
      });
    }

    if (data.enableListing == true) {
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
        console.log(
          '🚀 ~ file: CreateMultiple.tsx ~ line 308 ~ CreateSingle ~ res',
          res
        );

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
    } else {
      // update item create progress to finished
      updateItemCreateProgress({
        status: ITEM_CREATE_STATUS.FINISHED,
        // listingId,
        // listingTransactionHash: transactionHash,
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
        '🚀🚀🚀🚀🚀 ~ file: createItem.tsx ~ line 574 ~ lazyMintNFT ~ lazyMintTokenId',
        lazyMintTokenId.data
      );
      const ltokenId = String(lazyMintTokenId.data.tokenId);
      console.log(
        '🚀 ~ file: createItem.tsx ~ line 580 ~ lazyMintNFT ~ ltokenId',
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
      const weiPrice = ethers.utils.parseEther(price.toString());
      const value = weiPrice.add(weiPrice.mul(serviceFee).div(100));

      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const accounts = await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(
        '🚀 ~ file: createItem.tsx ~ line 608 ~ lazyMintNFT ~ provider',
        provider
      );
      // await provider.send('eth_requestAccounts', []);
      console.log(
        '🚀 ~ file: createItem.tsx ~ line 614 ~ lazyMintNFT ~ accounts',
        accounts
      );

      const signer = provider.getSigner();
      const lazyMinterClass = new LazyMinter({
        contractAddress: nft721Contract._address,
        chainId: networkId,
        signer
      });

      const voucher = await lazyMinterClass.createVoucher(
        Number(ltokenId),
        String(nftToCreate?.tokenUri),
        value,
        Number(nftToCreate.royalty)
      );

      const signature = voucher?.signature;
      console.log(
        '🚀 ~ file: createItem.tsx ~ line 628 ~ lazyMintNFT ~ signature',
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
    }
  };

  const submitForm = async (
    data: any,
    resetForm: () => void,
    isRetry = false
  ) => {
    if (!web3) {
      notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
      return;
    }

    setOpenProgressPopup(true);
    if (!isRetry) {
      submitData.current = data;
      resetFormRef.current = resetForm;
      dispatch(clearEvents());
      updateItemCreateProgress(initialItemCreateStatus);
    }
    updateItemCreateProgress({ error: null });
    try {
      setCreateNftState({ loading: true, error: null });

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

      if (!imageUrl()) {
        //* uploading image to ipfs
        const previewFile = await generatePreviewImage(image, 600, 600);
        const imgUrl = await uploadImageToIPFS(imgFile);
        const previewImgUrl = await uploadImageToIPFS(previewFile);
        // update item create progress to metadata
        updateItemCreateProgress({
          status: ITEM_CREATE_STATUS.IPFS_METADATA,
          imageUrl: imgUrl,
          previewImageUrl: previewImgUrl
        });
      }

      const _attributes = data.attributes.map((item: any) => {
        return { ...item, value: item.value.toString() };
      });
      const _attributesStats = data.attributesStats.map((item: any) => {
        return { ...item, value: item.value.toString() };
      });

      const isMultiple = data.supply > 1 ? true : false;
      if (!metaDataUrl() && imageUrl()) {
        //* uploading METADATA to ipfs
        const jsonUri = await uploadMetadataToIPFS({
          name: data.name as string,
          description: data.description,
          creatorAddress: userAddress,
          imageUrl: imageUrl() as string,
          previewImageUrl: previewImageUrl() as string,
          attributes: [..._attributes, ..._attributesStats],
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
          await createAuction(NFT_NETWORK_DATA, data);
        }
      }

      //* turn off loader
      setCreateNftState({ loading: false, error: null });
    } catch (error) {
      console.error('error in CreateItem', error);
      setCreateNftState({ loading: false, error: getErrorMessage(error) });
      updateItemCreateProgress({ error });
    }
  };

  const onTab = (tab: MARKET_TYPE) => {
    setMarketType(tab);
  };

  const onRoyaltyChange = (tab: ROYALTIES_TYPE) => {
    setRoyaltiesType(tab);
  };

  const onTabCategories = (tab: COLLECTION_TYPE) => {
    setcollectionsType(tab);
  };

  return (
    <CreateSingleWrapper>
      <div className="createNft">
        <h1 className="createNft__h1">Create NFT</h1>
        <section className="createNft__container">
          <CreateForm
            submit={submitForm}
            submitCreateState={nftState}
            onChangeImage={onChangeImage}
            setNameInput={setNameInput}
            setDescriptionInput={setDescriptionInput}
            setPriceInput={setPriceInput}
            setTokenType={setTokenType}
            setExternalLink={setExternalLink}
            externalLink={externalLink}
            marketType={marketType}
            royaltiesType={royaltiesType}
            collectionsType={collectionsType}
            name={name}
            description={description}
            price={price}
            minimumBid={minimumBid}
            setMinimumBidInput={setMinimumBidInput}
            image={image}
            tokentype={tokentype}
            onTab={onTab}
            onRoyaltyChange={onRoyaltyChange}
            onTabCategories={onTabCategories}
            setSupply={setSupply}
            supply={supply}
            enableListing={enableListing}
            setEnableListing={setEnableListing}
            setLazyMint={setLazyMint}
            explicit={explicit}
            setExplicit={setExplicit}
            unlockableContentInput={unlockableContentInput}
            setUnlockableContentInput={setUnlockableContentInput}
            isSingle={isSingle}
            setIsSingle={setIsSingle}
            setProfileImage={setProfileImage}
            profileImage={profileImage}
          />

          {openProgressPopup && (
            <div className="modal-style-primary checkout">
              <CreateItemProgressPopup
                progress={itemCreateProgress}
                events={eventList}
                lazyMint={lazyMint}
                onRetry={() => submitForm(submitData.current, () => null, true)}
                onClose={() => setOpenProgressPopup(false)}
                onReset={resetPage}
              />
            </div>
          )}
        </section>
      </div>
    </CreateSingleWrapper>
  );
};

export default CreateItemNew;
