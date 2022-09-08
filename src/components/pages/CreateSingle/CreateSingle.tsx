/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NFT from 'src/abis/NFT.json';
import PreviewNft from 'src/components/components/PreviewNft';
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
import {
  createAuctionMarketItem,
  createSimpleMarketItem,
  createToken,
  generatePreviewImage,
  getErrorMessage,
  getNetworkData,
  getNetworkId,
  getProfileImage
} from 'src/utils';

import CreateForm from './components/CreateForm';
// import NFT from 'src/abis/NFT.json';
import NFT721 from 'src/abis/new/NFT721.json';
import MarketTypeTabs from './components/MarketTypeTabs';
import CreateItemProgressPopup from 'src/components/components/Popups/CreateItemProgressPopup';
import { initialItemCreateStatus } from 'src/components/components/constants';

const CreateSingle = () => {
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
  const [, setNumberOfCopiesInput] = useState(0);
  const [, setRoyaltiesInput] = useState(0);
  const [expirationDateInput, setExpirationDateInput] = useState('');
  const [marketType, setMarketType] = useState<MARKET_TYPE>(MARKET_TYPE.SIMPLE);

  const web3State = useSelector(selectors.web3State);
  const {
    web3,
    accounts,
    networkId,
    mockERC20Contract,
    nft721Contract,
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
    setNumberOfCopiesInput(0);
    setRoyaltiesInput(0);
    setExpirationDateInput('');
    setMarketType(MARKET_TYPE.SIMPLE);
    setImage('');
    setOpenProgressPopup(false);
    resetFormRef.current && resetFormRef.current();
  };

  const onChangeImage = (e: any) => {
    e.preventDefault();
    if (e.target.files.length === 0) {
      console.log(
        '🚀 ~ file: CreateSingle.tsx ~ line 115 ~ onChangeImage ~ ERRORS.MISSING_IMAGE',
        ERRORS.MISSING_IMAGE
      );
      return;
    }
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setImgFile(file);
  };

  const getImageUrl = () => {
    return image || './img/collections/coll-item-3.jpg';
  };

  const createSimple = async (NFT_NETWORK_DATA: any, data: any) => {
    const tokenId = () => itemCreateProgressRef.current.tokenId;
    const listingId = () => itemCreateProgressRef.current.listingId;
    const imageUrl = () => itemCreateProgressRef.current.imageUrl;
    const previewImageUrl = () => itemCreateProgressRef.current.previewImageUrl;
    const metaDataUrl = () => itemCreateProgressRef.current.metaDataUrl;

    const _attributes = data.attributes.map((item: any) => {
      return { ...item, value: item.value.toString() };
    });

    // nft mongo item
    const nftToCreate = {
      name: data.name,
      description: data.description,
      imageUrl: imageUrl(),
      previewImageUrl: previewImageUrl(),
      // attributes: data.attributes,
      attributes: _attributes,
      creatorAddress: userAddress,
      ownerAddress: userAddress,
      nftAddress: NFT_NETWORK_DATA.address,
      price: data.price,
      collectionId: data.collectionId,
      royalty: Number(data.royalties),
      marketType: MARKET_TYPE.SIMPLE,
      listedAt: new Date(), // !!! change to utc !!!
      isListedOnce: true,
      multiple: false,
      networkId,
      category: data.category
    };

    //* create tracking before creating
    await ApiService.createProcessTracking({
      ...nftToCreate,
      userAddress,
      action: PROCESS_TRAKING_ACTION.CREATE_SIMPLE_SINGLE,
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

      await ApiService.createdNft({
        transactionHash,
        data: {
          ...nftToCreate,
          tokenURI: metaDataUrl() as string,
          status: STATUS.NOT_LISTED,
          totalAmount: SINGLE,
          leftAmount: SINGLE,
          listedAmount: 0
        }
      });

      await ApiService.createProcessTracking({
        ...nftToCreate,
        userAddress,
        action: PROCESS_TRAKING_ACTION.CREATE_SIMPLE_SINGLE,
        processStatus: PROCESS_TRAKING_STATUS.AFTER
      });

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

    const priceInWei = web3.utils.toWei(data.price.toString(), 'ether');

    // const frontDataListing = {
    //   name: data.name,
    //   description: data.description,
    //   imageUrl: imageUrl,
    //   attributes: _attributes,
    //   multiple: false,
    //   collectionId: data.collectionId,
    //   category: data.category
    // };

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
        deadline: 1680000000
      });

      const listingId = res.returnValues.listingId;
      const transactionHash = res.transactionHash;
      const SellerNFTBalance = await nft721Contract.methods
        .balanceOf(userAddress)
        .call();

      console.log(
        '🚀 ~ file: CreateSingle.tsx ~ line 276 ~ CreateSingle ~ listingId, transactionHash, SellerNFTBalance',
        listingId,
        transactionHash,
        SellerNFTBalance
      );

      await ApiService.createdNft({
        transactionHash,
        data: {
          ...nftToCreate,
          tokenId: itemCreateProgressRef.current.tokenId,
          price: data.price,
          tokenURI: metaDataUrl() as string,
          status: STATUS.ON_SELL,
          totalAmount: SINGLE,
          leftAmount: 0,
          listedAmount: SINGLE
        }
      });

      await ApiService.createProcessTracking({
        ...nftToCreate,
        userAddress,
        tokenId: itemCreateProgressRef.current.tokenId,
        action: PROCESS_TRAKING_ACTION.LIST_SIMPLE_SINGLE,
        processStatus: PROCESS_TRAKING_STATUS.AFTER
      });

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

  const createAuction = async (NFT_NETWORK_DATA: any, data: any) => {
    console.log(
      '🚀 ~ file: CreateSingle.tsx ~ line 298 ~ CreateSingle ~ data',
      data
    );

    const tokenId = () => itemCreateProgressRef.current.tokenId;
    const listingId = () => itemCreateProgressRef.current.listingId;
    const imageUrl = () => itemCreateProgressRef.current.imageUrl;
    const previewImageUrl = () => itemCreateProgressRef.current.previewImageUrl;
    const metaDataUrl = () => itemCreateProgressRef.current.metaDataUrl;
    const _attributes = data.attributes.map((item: any) => {
      return { ...item, value: item.value.toString() };
    });

    //* dates
    const ts1 = moment(data.expirationDate).unix();

    const _date = new Date(data.expirationDate); //Sat May 14 2022 21:30:00 GMT+0300 (Israel Daylight Time)
    const startPriceInWei = web3.utils.toWei(
      data.minimumBid.toString(),
      'ether'
    );

    //* item to mongo
    const nftToCreate = {
      name: data.name,
      description: data.description,
      imageUrl: imageUrl(),
      previewImageUrl: previewImageUrl(),
      attributes: _attributes,
      creatorAddress: userAddress,
      ownerAddress: userAddress,
      nftAddress: NFT_NETWORK_DATA.address,
      // price: data.price, There is no price to auction. There is minimum bid
      collectionId: data.collectionId,
      royalty: data.royalties,
      // listingId: null,
      marketType: MARKET_TYPE.AUCTION,
      listedAt: new Date(),
      isListedOnce: true,
      multiple: false,
      networkId,
      category: data.category,
      // auction fields
      minimumBid: data.minimumBid,
      priceTokenType: data.pricetokentype,
      expirationDate: _date
    };

    //* create tracking before creating
    await ApiService.createProcessTracking({
      ...nftToCreate,
      userAddress,
      action: PROCESS_TRAKING_ACTION.CREATE_AUCTION,
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

      await ApiService.createdNft({
        transactionHash,
        data: {
          ...nftToCreate,
          tokenId,
          tokenURI: metaDataUrl() as string,
          status: STATUS.NOT_LISTED
        }
      });

      await ApiService.createProcessTracking({
        ...nftToCreate,
        userAddress,
        action: PROCESS_TRAKING_ACTION.CREATE_AUCTION,
        processStatus: PROCESS_TRAKING_STATUS.AFTER
      });

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

      await ApiService.createdNft({
        transactionHash,
        data: {
          ...nftToCreate,
          listingId,
          tokenId: tokenId() as string,
          tokenURI: metaDataUrl(),
          status: STATUS.ON_SELL
        }
      });

      await ApiService.createProcessTracking({
        ...nftToCreate,
        userAddress,
        tokenId,
        action: PROCESS_TRAKING_ACTION.LIST_AUCTION,
        processStatus: PROCESS_TRAKING_STATUS.AFTER
      });

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

  const submitForm = async (
    data: any,
    // eslint-disable-next-line @typescript-eslint/ban-types
    resetForm: () => void,
    isRetry = false
  ) => {
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
      const NFT_NETWORK_DATA = await getNetworkData(web3, NFT721);

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

      if (!metaDataUrl() && imageUrl()) {
        //* uploading METADATA to ipfs
        const jsonUri = await getUri({
          name: data.name,
          description: data.description,
          imageUrl: imageUrl() as string,
          previewImageUrl: previewImageUrl() as string,
          attributes: data.attributes
        });

        // update item create progress to metadata
        updateItemCreateProgress({
          status: ITEM_CREATE_STATUS.CREATE_NFT,
          metaDataUrl: jsonUri
        });
      }

      //* create and list on contract
      if (marketType === MARKET_TYPE.SIMPLE) {
        await createSimple(NFT_NETWORK_DATA, data);
      } else {
        // marketType === MARKET_TYPE.AUCTION
        await createAuction(NFT_NETWORK_DATA, data);
      }

      //* turn off loader
      setCreateNftState({ loading: false, error: null });
    } catch (error) {
      console.error('error in createSingle', getErrorMessage(error));
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
    <div>
      {/* <GlobalStyles /> */}
      <div
        className="jumbotron breadcumb no-bg main-jumbo"
        style={{
          backgroundImage: `url(${'./img/snake.svg'})`,
          height: 'fit-content'
        }}
      >
        <section>
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center create-single-head">
                  Create single item
                  <br /> on PulseChain
                </h1>
              </div>
            </div>
          </div>
        </section>
        <section className="container create-single-section">
          <div className="row">
            <div className="col-lg-7 offset-lg-1 mb-5">
              <MarketTypeTabs marketType={marketType} onTab={onTab} />
              <CreateForm
                multiple={false}
                submit={submitForm}
                submitCreateState={nftState}
                onChangeImage={onChangeImage}
                setNameInput={setNameInput}
                setDescriptionInput={setDescriptionInput}
                setPriceInput={setPriceInput}
                setTokenType={setTokenType}
                setNumberOfCopiesInput={setNumberOfCopiesInput}
                setRoyaltiesInput={setRoyaltiesInput}
                setExpirationDateInput={setExpirationDateInput}
                marketType={marketType}
              />
            </div>

            <div className="col-lg-3 col-sm-6 col-xs-12">
              <h5>Preview item</h5>
              <PreviewNft
                imageUrl={getImageUrl()}
                userImage={getProfileImage(userDetails?.profileImage)}
                nft={{
                  name,
                  description,
                  price
                }}
                tokentype={
                  marketType === MARKET_TYPE.AUCTION ? tokentype : 'ETH'
                }
                isPreview={true}
                multiple={false}
                timer={marketType === MARKET_TYPE.AUCTION}
                marketType={marketType}
                expirationDateInput={expirationDateInput}
              />
            </div>
          </div>
          {openProgressPopup && (
            <div className="checkout">
              <CreateItemProgressPopup
                progress={itemCreateProgress}
                events={eventList}
                onRetry={() => submitForm(submitData.current, () => null, true)}
                onClose={() => setOpenProgressPopup(false)}
                onReset={resetPage}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CreateSingle;
