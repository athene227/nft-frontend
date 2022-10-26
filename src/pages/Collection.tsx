import React, { useEffect } from 'react';
import Loader from 'src/components/Loader';
import { ApiService } from 'src/core/axios';
import { ALERT_TYPE } from 'src/enums';
import { getImage } from 'src/services/ipfs';
import { ICollection } from 'src/types/collections.types';
import { INft } from 'src/types/nfts.types';
import { getErrorMessage } from 'src/utils';
import { createGlobalStyle } from 'styled-components';

import Alert from '../components/Alert';
import ColumnNewRedux from '../components/ColumnNewRedux';
import Footer from '../components/footer';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #171C27;
  }
`;

const Colection = function (props: { collectionId: string }) {
  const { collectionId } = props;
  const [nfts, setNfts] = React.useState<INft[]>([]);
  const [nftsState, setNftsState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });
  const [collectionState, setCollectionState] = React.useState<{
    loader: boolean;
    error: null | string;
  }>({ loader: false, error: null });
  const [collection, setCollection] = React.useState<ICollection | null>(null);

  const fetchCollection = async () => {
    try {
      setCollectionState({ loader: true, error: null });
      const res = await ApiService.getCollection({ collectionId });
      setCollection(res.data);
      // setNfts(res.data);
      setCollectionState({ loader: false, error: null });
    } catch (error) {
      console.log(
        '🚀 ~ file: Collection.tsx ~ line 42 ~ fetchCollection ~ error',
        error
      );
      setCollectionState({ loader: false, error: getErrorMessage(error) });
    }
  };

  const fetchNftsByCollectionId = async () => {
    try {
      setNftsState({ loader: true, error: null });
      const res = await ApiService.getNftsByCollectionId({ collectionId });
      // const res = await ApiService.getListedNfts({ collectionId })
      setNfts(res.data);
      setNftsState({ loader: false, error: null });
    } catch (error) {
      console.log(
        '🚀 ~ file: Collection.tsx ~ line 55 ~ fetchNftsByCollectionId ~ error',
        error
      );
      setNftsState({ loader: false, error: getErrorMessage(error) });
    }
  };

  useEffect(() => {
    fetchCollection();
    fetchNftsByCollectionId();
  }, []);

  const renderView = () => {
    if (collectionState.loader) {
      return <Loader />;
    }
    if (collectionState.error) {
      return <Alert text={collectionState.error} type={ALERT_TYPE.DANGER} />;
    }

    return (
      <div>
        <section className="container d_coll no-top no-bottom">
          <div className="row">
            <div className="col-md-12">
              <div className="d_profile">
                <div className="profile_avatar">
                  <div className="d_profile_img">
                    {collection && collection.user?.length > 0 && (
                      <img
                        src={getImage(collection?.user[0].profileImage)}
                        alt=""
                      />
                    )}
                    <i className="fa fa-check"></i>
                  </div>

                  <div className="profile_name">
                    <h4>
                      {collection?.name}
                      <div className="clearfix"></div>
                      {/* <span id="wallet" className="profile_wallet">DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME</span>
                <button id="btn_copy" title="Copy Text">Copy</button> */}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container no-top">
          {/* <div className='row'>
      <div className='col-lg-12'>
        <div className="items_filter">
          <ul className="de_nav">
            <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>On Sale</span></li>
            <li id='Mainbtn1' className=""><span onClick={handleBtnClick1}>Owned</span></li>
          </ul>
        </div>
      </div>
    </div> */}

          <div id="zero1" className="onStep fadeIn">
            <ColumnNewRedux
              loading={nftsState.loader}
              data={nfts}
              shuffle
              showLoadMore={false}
            />
          </div>
        </section>
      </div>
    );
  };

  return (
    <div>
      <GlobalStyles />

      <section
        id="profile_banner"
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${getImage(collection?.imageUrl)})` }}
      >
        <div className="mainbreadcumb"></div>
      </section>
      {renderView()}

      <Footer />
    </div>
  );
};
export default Colection;
