import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'src/components/components/Loader';
import { ALERT_TYPE, STATUS } from 'src/enums';
import { fetchUserCollections } from 'src/store/actions/thunks/collections';

import { fetchUserNfts } from '../../store/actions/thunks/nfts';
import * as selectors from '../../store/selectors';
import Alert from '../components/Alert';
import ColumnNewReduCollections from '../components/ColumnNewReduCollections';
import ColumnNewRedux from '../components/ColumnNewRedux';

export enum tabType {
  on_sale = 'on_sale',
  created = 'created',
  owned = 'owned',
  my_collections = 'my_collections'
}

interface IProps {
  userAddress: string;
}

function NftsAndCollections(props: IProps) {
  const { userAddress } = props;
  const [tab, setTab] = React.useState<tabType>(tabType.on_sale);

  const dispatch = useDispatch();

  //* collections
  const collectionsState = useSelector(selectors.collectionsState);
  const { userCollections } = collectionsState;

  //* nfts
  const userNfts = useSelector(selectors.userNfts);

  useEffect(() => {
    if (userAddress) {
      if (tab === tabType.on_sale) {
        dispatch(
          fetchUserNfts({ ownerAddress: userAddress, status: STATUS.ON_SELL })
        );
      } else if (tab === tabType.created) {
        dispatch(fetchUserNfts({ creatorAddress: userAddress }));
      } else if (tab === tabType.owned) {
        dispatch(fetchUserNfts({ ownerAddress: userAddress }));
      } else if (tab === tabType.my_collections) {
        dispatch(fetchUserCollections({ userAddress: userAddress }));
      }
    }
  }, [tab, userAddress]);

  const changeTab = (tab: tabType) => {
    setTab(tab);
  };

  const renderContent = () => {
    if (tab === tabType.my_collections) {
      if (userCollections.loading) {
        return <Loader />;
      }
      if (userCollections.error) {
        return <Alert text={userCollections.error} type={ALERT_TYPE.DANGER} />;
      }
      return (
        <div id="zero1" className="onStep fadeIn">
          <ColumnNewReduCollections
            collections={userCollections.data}
            shuffle
            showLoadMore={false}
          />
        </div>
      );
    }
    if (userNfts.loading) {
      return <Loader />;
    }
    if (userNfts.error) {
      return <Alert text={userNfts.error} type={ALERT_TYPE.DANGER} />;
    }
    return (
      <div id="zero1" className="onStep fadeIn">
        <ColumnNewRedux
          data={userNfts.data}
          loading={userNfts.loading}
          error={userNfts.error}
        />
      </div>
    );
  };

  return (
    <section className="container no-top">
      <div className="row">
        <div className="col-lg-12">
          <div className="items_filter">
            <ul className="de_nav text-left">
              <li
                id="Mainbtn"
                className={tab === tabType.on_sale ? 'active' : ''}
              >
                <span onClick={() => changeTab(tabType.on_sale)}>On Sale</span>
              </li>
              <li
                id="Mainbtn1"
                className={tab === tabType.created ? 'active' : ''}
              >
                <span onClick={() => changeTab(tabType.created)}>Created</span>
              </li>
              <li
                id="Mainbtn1"
                className={tab === tabType.owned ? 'active' : ''}
              >
                <span onClick={() => changeTab(tabType.owned)}>Owned</span>
              </li>
              <li
                id="Mainbtn2"
                className={tab === tabType.my_collections ? 'active' : ''}
              >
                <span onClick={() => changeTab(tabType.my_collections)}>
                  Collections
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {renderContent()}
    </section>
  );
}

export default NftsAndCollections;
