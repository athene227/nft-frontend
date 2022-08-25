/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NFT from 'src/abis/NFT.json';
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
  createSimpleMarketItem,
  createToken,
  generatePreviewImage,
  getErrorMessage,
  getNetworkData,
  getNetworkId,
  getProfileImage
} from 'src/utils';
// import NFT from 'src/abis/NFT.json';
import NFT1155 from 'src/abis/new/NFT1155.json';
import PreviewNft from '../components/PreviewNft';
import CreateForm from '../components/CreateForm';
import Footer from '../components/footer';
import CreateItemProgressPopup from '../components/Popups/CreateItemProgressPopup';
import { initialItemCreateStatus } from '../components/constants';

const CreateSingle = () => {
  const [nftState, setCreateNftState] = useState<{
    loading: boolean;
    error: null | string;
  }>({ loading: false, error: null });
  const [image, setImage] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const dispatch = useDispatch();

  const [name, setNameInput] = useState('');
  const [description, setDescriptionInput] = useState('');
  const [price, setPriceInput] = useState(0);
  const [numberOfCopies, setNumberOfCopiesInput] = useState(0);
  const [royalties, setRoyaltiesInput] = useState(0);
  const [expirationDateInput, setExpirationDateInput] = useState('');
  const [marketType, _] = useState<MARKET_TYPE>(MARKET_TYPE.SIMPLE);

  const web3State = useSelector(selectors.web3State);
  const {
    web3,
    accounts,
    nft1155Contract,
    networkId,
    nftMarketSimpleContract
  } = web3State.web3.data;

  const userState = useSelector(selectors.userState);
  const userDetailes = userState.user.data;

  const userAddress = accounts[0];
  const [tokentype, setTokenType] = useState('ETH');
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
    setImage('');
    setOpenProgressPopup(false);
    resetFormRef.current && resetFormRef.current();
  };

  const onChangeImage = (e: any) => {
    e.preventDefault();
    if (e.target.files.length === 0) {
      console.log(
        '🚀 ~ file: CreateMultiple.tsx ~ line 100 ~ onChangeImage ~ ERRORS.MISSING_IMAGE',
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
    const nftToCreate: any = {
      name: data.name,
      description: data.description,
      imageUrl,
      previewImageUrl,
      attributes: data.attributes,
      creatorAddress: userAddress,
      ownerAddress: userAddress,
      nftAddress: NFT_NETWORK_DATA.address,
      price: data.price,
      collectionId: data.collectionId,
      royalty: data.royalties,
      status: STATUS.ON_SELL,
      marketType: marketType,
      listedAt: new Date(),
      isListedOnce: true,
      totalAmount: data.numberOfCopies,
      leftAmount: 0,
      listedAmount: data.numberOfCopies,
      multiple: true,
      networkId,
      category: data.category,
      deadline: ''
    };
    return nftToCreate;
  };

  const getImageUrl = () => {
    return image || './img/collections/coll-item-3.jpg';
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
      const imageUrl = () => itemCreateProgressRef.current.imageUrl;
      const previewImageUrl = () =>
        itemCreateProgressRef.current.previewImageUrl;
      const metaDataUrl = () => itemCreateProgressRef.current.metaDataUrl;
      const tokenId = () => itemCreateProgressRef.current.tokenId;
      const listingId = () => itemCreateProgressRef.current.listingId;

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

      const NFT_NETWORK_DATA = await getNetworkData(web3, NFT1155);
      const priceInWei = web3.utils.toWei(data.price.toString(), 'ether');
      const nftToCreate: any = getItem(
        NFT_NETWORK_DATA,
        data,
        imageUrl() as string,
        previewImageUrl() as string
      );
      const _attributes = data.attributes.map((item: any) => {
        return { ...item, value: item.value.toString() };
      });

      nftToCreate.attributes = _attributes;

      //* create tracking before creating
      await ApiService.createProcessTracking({
        ...nftToCreate,
        userAddress,
        action: PROCESS_TRAKING_ACTION.CREATE_SIMPLE_MULTIPLE,
        processStatus: PROCESS_TRAKING_STATUS.BEFORE
      });

      // const frontData = {
      //   name: data.name,
      //   description: data.description,
      //   imageUrl: imageUrl() as string,
      //   attributes: _attributes,
      //   multiple: true,
      //   collectionId: data.collectionId,
      //   category: data.category
      // };

      if (!tokenId()) {
        //* create on contract
        const res = await createToken({
          nftContract: nft1155Contract,
          userAddress,
          jsonUri: metaDataUrl() as string,
          quantity: Number(data.numberOfCopies),
          royalty: Number(data.royalties),
          nftType: 'NFT1155'
        });

        const tokenId = res.returnValues.newItemId;
        const transactionHash = res.transactionHash;

        await ApiService.createdNft({
          transactionHash,
          data: {
            ...nftToCreate,
            tokenURI: metaDataUrl() as string,
            status: STATUS.NOT_LISTED,
            totalAmount: Number(data.numberOfCopies),
            leftAmount: Number(data.numberOfCopies),
            listedAmount: 0
          }
        });

        await ApiService.createProcessTracking({
          ...nftToCreate,
          userAddress,
          action: PROCESS_TRAKING_ACTION.CREATE_SIMPLE_MULTIPLE,
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
          quantity: Number(data.numberOfCopies),
          deadline: 1680000000
        });
        console.log(
          '🚀 ~ file: CreateMultiple.tsx ~ line 308 ~ CreateSingle ~ res',
          res
        );

        const listingId = res.returnValues.listingId;
        const transactionHash = res.transactionHash;

        await ApiService.createdNft({
          transactionHash,
          data: {
            ...nftToCreate,
            tokenId: itemCreateProgressRef.current.tokenId,
            // price: priceInWei,
            tokenURI: metaDataUrl() as string,
            status: STATUS.ON_SELL,
            totalAmount: Number(data.numberOfCopies),
            leftAmount: 0,
            listedAmount: Number(data.numberOfCopies)
          }
        });

        await ApiService.createProcessTracking({
          ...nftToCreate,
          tokenId: tokenId() as string,
          userAddress,
          action: PROCESS_TRAKING_ACTION.LIST_SIMPLE_MULTIPLE,
          processStatus: PROCESS_TRAKING_STATUS.AFTER
        });

        // update item create progress to finished
        updateItemCreateProgress({
          status: ITEM_CREATE_STATUS.FINISHED,
          listingId,
          listingTransactionHash: transactionHash,
          multiple: true,
          nftAddress: NFT_NETWORK_DATA.address
        });
      }

      //* turn off loader
      setCreateNftState({ loading: false, error: null });
    } catch (error) {
      console.log(
        '🚀 ~ file: CreateMultiple.tsx ~ line 347 ~ CreateMultiple ~ getErrorMessage(error)',
        getErrorMessage(error)
      );
      setCreateNftState({ loading: false, error: getErrorMessage(error) });
      updateItemCreateProgress({ error });
    }
  };

  return (
    <div>
      {/* <GlobalStyles /> */}
      <section
        className="jumbotron breadcumb no-bg main-jumbo"
        style={{
          backgroundImage: `url(${'./img/snake.svg'})`,
          height: 'fit-content'
        }}
      >
        <section className="">
          <div className="mainbreadcumb">
            <div className="container">
              <div className="row m-10-hor">
                <div className="col-12">
                  <h1 className="text-center">Create Multiple</h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container">
          <div className="row">
            <div className="col-lg-7 offset-lg-1 mb-5">
              <CreateForm
                multiple={true}
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
                  price,
                  totalAmount: numberOfCopies,
                  leftAmount: numberOfCopies
                }}
                isPreview={true}
                tokentype={tokentype}
                multiple={true}
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
      </section>
      <Footer />
    </div>
  );
};

export default CreateSingle;
