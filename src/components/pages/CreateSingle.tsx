import React, { useEffect, useMemo, useRef, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import * as selectors from 'src/store/selectors';
import { ApiService } from 'src/core/axios';
import {
  ERRORS,
  ITEM_CREATE_STATUS,
  MARKET_TYPE,
  PROCESS_TRAKING_ACTION,
  PROCESS_TRAKING_STATUS,
  SELECTED_NETWORK
} from 'src/enums';
import {
  getErrorMessage,
  getNetworkData,
  getProfileImage,
  createToken,
  createSimpleMarketItem,
  createAuctionMarketItem,
  getNetworkId
} from 'src/utils';
import { getImageUri, getUri } from 'src/services/ipfs';
import Footer from '../components/footer';
import PreviewNft from '../components/PreviewNft';
import CreateForm from '../components/CreateForm';
// import NFT from 'src/abis/NFT.json';
import NFT from 'src/abis/new/NFT721.json';
import MarketTypeTabs from '../components/MarketTypeTabs';
import notification from 'src/services/notification';
import CreateItemProgressPopup from '../components/Popups/CreateItemProgressPopup';
import { MarketItemCreateProgress } from 'src/types/nfts.types';
import { initialItemCreateStatus } from '../components/constants';
import { clearEvents } from 'src/store/actions';

const CreateSingle = () => {
  const dispatch = useDispatch();
  const [nftState, setCreateNftState] = useState<{
    loading: boolean;
    error: null | string;
  }>({ loading: false, error: null });
  const [image, setImage] = useState('');
  const [imgFile, setImgFile] = useState(null);

  const [name, setNameInput] = useState('');
  const [description, setDescriptionInput] = useState('');
  const [price, setPriceInput] = useState(0);
  const [numberOfCopies, setNumberOfCopiesInput] = useState(0);
  const [royalties, setRoyaltiesInput] = useState(0);
  const [expirationDateInput, setExpirationDateInput] = useState('');
  const [marketType, setMarketType] = useState<MARKET_TYPE>(MARKET_TYPE.SIMPLE);

  const web3State = useSelector(selectors.web3State);
  const { web3, accounts, nftMarketContract, nftContract, networkId } =
    web3State.web3.data;
  const userState = useSelector(selectors.userState);
  const userDetailes = userState.user.data;

  const userAddress = accounts[0];
  const SINGLE = 1;

  const [openProgressPopup, setOpenProgressPopup] = useState(false);
  const [itemCreateProgress, setItemCreateProgress] =
    useState<MarketItemCreateProgress>(initialItemCreateStatus);
  const itemCreateProgressRef = useRef(itemCreateProgress);
  const resetFormRef = useRef<Function>();
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
        '🚀 ~ file: CreateSingle.tsx ~ line 97 ~ onChangeImage ~ ERRORS.MISSING_IMAGE',
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

  const createSimple = async (
    NFT_NETWORK_DATA: any,
    data: any,
    jsonUri: string,
    imageUrl: string
  ) => {
    const tokenId = () => itemCreateProgressRef.current.tokenId;
    const listingId = () => itemCreateProgressRef.current.listingId;

    // nft mongo item
    const nftToCreate: any = {
      name: data.name,
      description: data.description,
      imageUrl: imageUrl,
      attributes: data.attributes,
      creatorAddress: userAddress,
      ownerAddress: userAddress,
      nftAddress: NFT_NETWORK_DATA.address,
      price: data.price,
      collectionId: data.collectionId,
      royalty: data.royalties,
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

    const _attributes = data.attributes.map((item: any) => {
      return { ...item, value: item.value.toString() };
    });
    const frontDataCreate = {
      name: data.name,
      description: data.description,
      imageUrl: imageUrl,
      attributes: _attributes,
      multiple: false,
      collectionId: data.collectionId,
      category: data.category
    };

    if (!tokenId()) {
      //* creating nft in the nft contract
      const tokenId = await createToken({
        nftContract,
        userAddress,
        jsonUri,
        quantity: SINGLE,
        royalty: Number(data.royalties),
        frontData: frontDataCreate,
        startPrice: 0,
        deadline: 0
      });
      // update item create progress to listing item
      updateItemCreateProgress({
        status: ITEM_CREATE_STATUS.LIST_ITEM,
        tokenId
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
    const frontDataListing = {
      name: data.name,
      description: data.description,
      imageUrl: imageUrl,
      attributes: _attributes,
      multiple: false,
      collectionId: data.collectionId,
      category: data.category
    };

    if (!listingId()) {
      //* listing nft on contract

      const listingId = await createSimpleMarketItem({
        nftMarketContract,
        userAddress,
        nftAddress: NFT_NETWORK_DATA.address,
        tokenId: tokenId() as string,
        priceInWei,
        quantity: SINGLE,
        frontData: frontDataListing
      });

      // update item create progress to finished
      updateItemCreateProgress({
        status: ITEM_CREATE_STATUS.FINISHED,
        listingId
      });
    }
  };

  const createAuction = async (
    NFT_NETWORK_DATA: any,
    data: any,
    jsonUri: string,
    imageUrl: string
  ) => {
    const tokenId = () => itemCreateProgressRef.current.tokenId;
    const listingId = () => itemCreateProgressRef.current.listingId;
    const _attributes = data.attributes.map((item: any) => {
      return { ...item, value: item.value.toString() };
    });
    const frontData = {
      name: data.name,
      description: data.description,
      imageUrl: imageUrl,
      attributes: _attributes,
      multiple: false,
      collectionId: data.collectionId,
      category: data.category
    };
    //* dates
    const ts1 = moment(data.expirationDate).unix();
    const expirationDate = data.expirationDate; // "2022-05-14T21:30"
    const _date = new Date(data.expirationDate); //Sat May 14 2022 21:30:00 GMT+0300 (Israel Daylight Time)
    const startPriceInWei = web3.utils.toWei(
      data.minimumBid.toString(),
      'ether'
    );

    //* item to mongo
    const nftToCreate: any = {
      name: data.name,
      description: data.description,
      imageUrl: imageUrl,
      creatorAddress: userAddress,
      ownerAddress: userAddress,
      nftAddress: NFT_NETWORK_DATA.address,
      // price: data.price, There is no price to auction. There is minimum bid
      collectionId: data.collectionId,
      royalty: data.royalties,
      listingId: null,
      marketType: MARKET_TYPE.AUCTION,
      listedAt: new Date(),
      isListedOnce: true,
      multiple: false,
      networkId,
      category: data.category,
      // auction fields
      minimumBid: data.minimumBid,
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
      const tokenId = await createToken({
        nftContract,
        userAddress,
        jsonUri,
        quantity: SINGLE,
        royalty: Number(data.royalties),
        startPrice: startPriceInWei,
        deadline: ts1,
        frontData
      });
      // update item create progress to listing item
      updateItemCreateProgress({
        status: ITEM_CREATE_STATUS.LIST_ITEM,
        tokenId
      });
    }

    // ADD CHECK - IF THERE IS ENOUGH GAS

    //* create tracking before listing
    await ApiService.createProcessTracking({
      ...nftToCreate,
      userAddress,
      tokenId,
      action: PROCESS_TRAKING_ACTION.LIST_AUCTION,
      processStatus: PROCESS_TRAKING_STATUS.BEFORE
    });

    if (!listingId()) {
      //* listing nft on contract
      const listingId = await createAuctionMarketItem({
        nftMarketContract,
        userAddress,
        nftAddress: NFT_NETWORK_DATA.address,
        tokenId: tokenId() as string,
        startPriceInWei,
        deadline: ts1,
        frontData
      });
      // update item create progress to finished
      updateItemCreateProgress({
        status: ITEM_CREATE_STATUS.FINISHED,
        listingId
      });
    }
  };

  const submitForm = async (
    data: any,
    resetForm: Function,
    isRetry = false
  ) => {
    if (!web3) {
      notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
      return;
    }

    try {
      //* check if there is image
      if (!imgFile) {
        notification.error(ERRORS.MISSING_IMAGE);
        throw new Error(ERRORS.MISSING_IMAGE);
      }

      //* set loader
      setCreateNftState({ loading: true, error: null });
      // initialse popup status and event list
      setOpenProgressPopup(true);
      if (!isRetry) {
        submitData.current = data;
        resetFormRef.current = resetForm;
        dispatch(clearEvents());
        updateItemCreateProgress(initialItemCreateStatus);
      }
      updateItemCreateProgress({ error: null });

      //* getting network id *//
      const networkId = await getNetworkId(web3);
      if (networkId !== SELECTED_NETWORK) {
        notification.error(ERRORS.WRONG_NETWORK);
        throw new Error(ERRORS.WRONG_NETWORK);
      }

      const imageUrl = () => itemCreateProgressRef.current.imageUrl;
      const metaDataUrl = () => itemCreateProgressRef.current.metaDataUrl;
      const NFT_NETWORK_DATA = await getNetworkData(web3, NFT);

      if (!imageUrl()) {
        //* uploading image to ipfs
        const imgUrl = await getImageUri(imgFile);
        // update item create progress to metadata
        updateItemCreateProgress({
          status: ITEM_CREATE_STATUS.IPFS_METADATA,
          imageUrl: imgUrl
        });
      }

      if (!metaDataUrl() && imageUrl()) {
        //* uploading METADATA to ipfs
        const jsonUri = await getUri({
          name: data.name,
          description: data.description,
          imageUrl: imageUrl() as string,
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
        await createSimple(
          NFT_NETWORK_DATA,
          data,
          metaDataUrl() as string,
          imageUrl() as string
        );
      } else {
        // marketType === MARKET_TYPE.AUCTION
        await createAuction(
          NFT_NETWORK_DATA,
          data,
          metaDataUrl() as string,
          imageUrl() as string
        );
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
          <div className="mainbreadcumb">
            <div className="container">
              <div className="row m-10-hor">
                <div className="col-12">
                  <h1 className="text-center">
                    Create single item on PulseChain
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container">
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
                userImage={getProfileImage(userDetailes?.profileImage)}
                nft={{
                  name,
                  description,
                  price
                }}
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
                onRetry={() => submitForm(submitData.current, () => {}, true)}
                onClose={() => setOpenProgressPopup(false)}
                onReset={resetPage}
              />
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CreateSingle;
