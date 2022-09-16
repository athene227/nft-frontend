import React, { useState, useRef } from 'react';
import { navigate } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from 'src/store/selectors';
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
import {
  createSimpleMarketItem,
  createToken,
  getErrorMessage,
  getNetworkData,
  getNetworkId,
  getProfileImage
} from 'src/utils';
import { getImageUri, getUri } from 'src/services/ipfs';
import NFT from 'src/abis/NFT.json';
import PreviewNft from '../components/PreviewNft';
import CreateForm from '../components/CreateForm';
import Footer from '../components/footer';
import notification from 'src/services/notification';
import { MarketItemCreateProgress } from 'src/types/nfts.types';
import { initialItemCreateStatus } from '../components/constants';
import { clearEvents } from 'src/store/actions';
import CreateItemProgressPopup from '../components/Popups/CreateItemProgressPopup';

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
  const { web3, accounts, nftMarketContract, nftContract, networkId } =
    web3State.web3.data;
  const userState = useSelector(selectors.userState);
  const userDetailes = userState.user.data;

  const userAddress = accounts[0];

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
    setImage('');
    setOpenProgressPopup(false);
    resetFormRef.current && resetFormRef.current();
  };

  const onChangeImage = (e: any) => {
    e.preventDefault();
    if (e.target.files.length === 0) {
      console.log(ERRORS.MISSING_IMAGE);
      return;
    }
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setImgFile(file);
  };

  const getItem = (NFT_NETWORK_DATA: any, data: any, imageUrl: string) => {
    const nftToCreate: any = {
      name: data.name,
      description: data.description,
      imageUrl,
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
    resetForm: Function,
    isRetry = false
  ) => {
    if (!web3) {
      notification.error(ERRORS.NOT_CONNECTED_TO_WALLET);
      return;
    }

    // initialse popup status and event list
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

      const NFT_NETWORK_DATA = await getNetworkData(web3, NFT);

      const priceInWei = web3.utils.toWei(data.price.toString(), 'ether');

      const nftToCreate: any = getItem(
        NFT_NETWORK_DATA,
        data,
        imageUrl() as string
      );

      //* create tracking before creating
      await ApiService.createProcessTracking({
        ...nftToCreate,
        userAddress,
        action: PROCESS_TRAKING_ACTION.CREATE_SIMPLE_MULTIPLE,
        processStatus: PROCESS_TRAKING_STATUS.BEFORE
      });
      const _attributes = data.attributes.map((item: any) => {
        return { ...item, value: item.value.toString() };
      });
      const frontData = {
        name: data.name,
        description: data.description,
        imageUrl: imageUrl() as string,
        attributes: _attributes,
        multiple: true,
        collectionId: data.collectionId,
        category: data.category
      };

      if (!tokenId()) {
        //* create on contract
        const tokenId = await createToken({
          nftContract,
          userAddress,
          jsonUri: metaDataUrl() as string,
          quantity: Number(data.numberOfCopies),
          royalty: Number(data.royalties),
          startPrice: 0,
          deadline: 0,
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
        tokenId: tokenId() as string,
        userAddress,
        action: PROCESS_TRAKING_ACTION.LIST_SIMPLE_MULTIPLE,
        processStatus: PROCESS_TRAKING_STATUS.BEFORE
      });

      if (!listingId()) {
        //* list on contract
        const listingId = await createSimpleMarketItem({
          nftMarketContract,
          userAddress,
          nftAddress: NFT_NETWORK_DATA.address,
          tokenId: tokenId() as string,
          priceInWei,
          quantity: Number(data.numberOfCopies),
          frontData
        });
        // update item create progress to finished
        updateItemCreateProgress({
          status: ITEM_CREATE_STATUS.FINISHED,
          listingId
        });
      }

      //* turn off loader
      setCreateNftState({ loading: false, error: null });
    } catch (error) {
      console.log('error in create mutiple', getErrorMessage(error));
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
                onRetry={() => submitForm(submitData.current, () => {}, true)}
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
