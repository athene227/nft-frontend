import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions/thunks';
import {
  setSearchCollectionCurrentPage,
  setSearchNftCurrentPage,
  setSearchQuery,
  setSearchUserCurrentPage
} from '../../store/actions';
import Loader from '../../components/components/Loader';
import CollectionCard from '../../components/components/CollectionCard';
import NftCard from '../../components/components/NftCard';
import UserCard from '../../components/components/UserCard';
import CheckboxFilter from '../components/CheckboxFilter';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

const SearchPage = (props: { query: string }) => {
  const { query } = props;
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [itemHeight, setItemHeight] = useState(0);
  const {
    collections,
    nfts,
    users,
    nftPagination,
    collectionPagination,
    userPagination
  } = useSelector(selectors.searchState);
  const filter = useSelector(selectors.nftFilter);
  const filterCategories = filter.categories;
  const filterStatus = filter.status;
  const filterPrice = filter.price;
  const filterCollections = filter.collections;
  const sortOrder = useSelector(selectors.nftSorter);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onItemImgLoad = ({ target: img }) => {
    const currentHeight = itemHeight;
    if (currentHeight < img.offsetHeight) {
      setItemHeight(img.offsetHeight);
    }
  };

  useEffect(() => {
    console.log(
      '🚀 ~ file: SearchPage.tsx ~ line 81 ~ useEffect ~ query',
      query
    );
    dispatch(setSearchQuery(query));
    dispatch(actions.fetchSearchCollectionResults());
    dispatch(actions.fetchSearchNftResults());
    dispatch(actions.fetchSearchUsersResults());
  }, [query]);

  const loadMoreCollections = () => {
    dispatch(
      setSearchCollectionCurrentPage(collectionPagination.currentPage + 1)
    );
    dispatch(actions.fetchSearchCollectionResults());
  };
  const loadMoreNfts = () => {
    dispatch(setSearchNftCurrentPage(nftPagination.currentPage + 1));
    dispatch(actions.fetchSearchNftResults());
  };
  const loadMoreUsers = () => {
    dispatch(setSearchUserCurrentPage(userPagination.currentPage + 1));
    dispatch(actions.fetchSearchUsersResults());
  };
  useEffect(() => {
    dispatch(actions.fetchSearchNftResults());
  }, [
    dispatch,
    filterCategories.length,
    filterStatus.length,
    filterPrice,
    filterCollections.length,
    sortOrder
  ]);
  return (
    <section className="container search-page">
      <div className="spacer-20" />
      <h3>
        Search Results for <strong className="search-query">{query}</strong>
      </h3>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Collections" {...a11yProps(0)} />
            <Tab label="Items" {...a11yProps(1)} />
            <Tab label="Users" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {collections?.loading ? (
            <Loader />
          ) : (
            <Row>
              {collections?.data?.map((collection, index) => (
                <CollectionCard key={index} collection={collection} />
              ))}
            </Row>
          )}
          {(collectionPagination.currentPage + 1) *
            collectionPagination.pageLimit <
            collectionPagination.totalCount &&
            collectionPagination.totalCount && (
              <div className="col-lg-12">
                <div className="spacer-single"></div>
                <span
                  onClick={loadMoreCollections}
                  className="btn-main lead m-auto"
                >
                  Load More
                </span>
              </div>
            )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Row>
            <Col md={3}>
              <CheckboxFilter />
            </Col>
            <Col md={9} className="text-center">
              <Row>
                {nfts?.data?.map((nft, index) => (
                  <NftCard
                    nft={nft}
                    key={index}
                    onImgLoad={onItemImgLoad}
                    height={itemHeight}
                  />
                ))}
                {nfts?.loading && <Loader />}
                {(nftPagination.currentPage + 1) * nftPagination.pageLimit <
                  nftPagination.totalCount &&
                  nftPagination.totalCount && (
                    <div className="col-lg-12">
                      <div className="spacer-single"></div>
                      <span
                        onClick={loadMoreNfts}
                        className="btn-main lead m-auto"
                      >
                        Load More
                      </span>
                    </div>
                  )}
              </Row>
            </Col>
          </Row>
        </TabPanel>
        <TabPanel value={value} index={2}>
          {users?.loading ? (
            <Loader />
          ) : (
            <Row>
              {users?.data?.map((user, index) => (
                <UserCard data={user} key={index} />
              ))}
            </Row>
          )}
          {(userPagination.currentPage + 1) * userPagination.pageLimit <
            userPagination.totalCount &&
            userPagination.totalCount && (
              <div className="col-lg-12">
                <div className="spacer-single"></div>
                <span onClick={loadMoreUsers} className="btn-main lead m-auto">
                  Load More
                </span>
              </div>
            )}
        </TabPanel>
      </Box>
    </section>
  );
};

export default SearchPage;
