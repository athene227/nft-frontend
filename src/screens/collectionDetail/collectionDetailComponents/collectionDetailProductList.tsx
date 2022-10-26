import 'react-modern-drawer/dist/index.css';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { navigate, useLocation } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as CollectionFilterIcon } from 'src/assets/images/icon/collection-filter-icon.svg';
import { ReactComponent as ViewFourIcon } from 'src/assets/images/icon/viewFourIcon.svg';
import { ReactComponent as ViewThreeIcon } from 'src/assets/images/icon/ViewThreeIcon.svg';
import { sortOrders } from 'src/components/constants/sort';
import Loader from 'src/components/Loader';
import SortPopover from 'src/components/Popovers/SortPopover';
import { NftDetailCollectionWrapper } from 'src/screens/itemDetail/itemdetail.style';
import { clearFilter, clearNfts } from 'src/store/actions';
import { setCurrentPage } from 'src/store/actions';
import { filterCategories, setSortOrder } from 'src/store/actions';
import * as actions from 'src/store/actions/thunks';
import * as selectors from 'src/store/selectors';

import CollectionDetail_SideBar from './collectionDetailSideBar';
import CollectionItemCard from './CollectionItemCard';
import CollectionSearchbar from './collectionSearchBar';

// interface IProps {}

function CollectionDetailProductList() {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const { nfts, currentPage, pageLimit, totalCount } = useSelector(
    selectors.nftItems
  );
  const { categories, status, price, collections } = useSelector(
    selectors.nftFilter
  );
  const sortOrder = useSelector(selectors.nftSorter);

  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    const currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const nftCount = useSelector(selectors.nftCount);

  const query = useQuery();
  const category = query.get('category');
  const sortby = query.get('sortby');

  const baseUrl = '/collectionDetail';

  useEffect(() => {
    if (category != null) {
      dispatch(filterCategories({ value: category, singleSelect: true }));
    }
    if (sortby != null) {
      dispatch(setSortOrder(sortby));
    }
  }, []);

  const handleCategory = useCallback(
    (event) => {
      const { value } = event;
      let path = baseUrl + '?category=' + value;
      if (sortby != null) {
        path += '&sortby=' + sortby;
      }
      navigate(path);
    },
    [dispatch]
  );

  const handleSortby = (value: string) => {
    let path = baseUrl + '?';
    if (category != null) {
      path += 'category=' + category + '&';
    }
    path += 'sortby=' + value;
    navigate(path);
  };

  useEffect(() => {
    dispatch(actions.fetchListedNfts(false));
  }, [
    dispatch,
    categories.length,
    status.length,
    price,
    collections.length,
    sortOrder
  ]);

  //will run when component unmounted
  useEffect(() => {
    return () => {
      dispatch(clearFilter());
      dispatch(clearNfts());
    };
  }, [dispatch]);

  const loadMore = () => {
    dispatch(setCurrentPage(currentPage + 1));
    dispatch(actions.fetchListedNfts());
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const [issActive, setIssActive] = React.useState(false);
  const togglesActive = () => {
    setIssActive(true);
    setIsActive(false);
  };
  const [isActive, setIsActive] = React.useState(false);
  const toggleActive = () => {
    setIsActive(true);
    setIssActive(false);
  };
  //side bar drawer
  // const [isOpen, setIsOpen] = React.useState(false);
  // const toggleDrawer = () => {
  //   setIsOpen((prevState) => !prevState);

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              className="nft-collection-tabs"
              aria-label="lab API tabs example"
            >
              <Tab label="Items" value="1" />
              <Tab label="Activity" value="2" />
            </TabList>
          </Box>
          <Box className="nft-collection-tabscontent">
            <TabPanel value="1">
              <Box
                className="collection-filter-bar"
                display={'flex'}
                alignItems="center"
                justifyContent={'space-between'}
              >
                <div className="filter-icon">
                  <button onClick={toggleDrawer} className="collection-filter">
                    {isOpen ? (
                      <CollectionFilterIcon />
                    ) : (
                      <CollectionFilterIcon />
                    )}
                  </button>
                </div>

                <div className="search global-search">
                  <CollectionSearchbar />
                </div>
                <div className="sorting-dropdown">
                  <SortPopover
                    sortOrders={sortOrders}
                    currentOrder={sortOrder}
                    onUpdate={(value) => handleSortby(value)}
                  />
                </div>

                <div className="icon-view">
                  <div className="icon-view-inner">
                    <ViewThreeIcon onClick={toggleActive} />
                  </div>
                  <div className="icon-view-inner">
                    <ViewFourIcon onClick={togglesActive} />
                  </div>
                </div>
              </Box>
              <Box
                className="collection-filter-secondary"
                display={'flex'}
                alignItems="center"
                justifyContent={'space-between'}
              >
                <Box display={'flex'} alignItems="center">
                  <div className="filter-update-info">
                    <span></span>
                    <i className="fa fa-rotate-right"></i>
                    Updated 24s ago
                  </div>
                  <div className="filter-tags">
                    <ul>
                      <li>
                        Buy Now <i className="fa fa-times"></i>
                      </li>
                      <li>Clear all</li>
                    </ul>
                  </div>
                </Box>
                <Box className="total-items">245 Items</Box>
              </Box>
              <NftDetailCollectionWrapper className="collection-detail-wrapper">
                <Container>
                  <Box className="nft">
                    <Grid
                      container
                      spacing={3}
                      className={
                        isOpen ? 'container-padding-top' : 'container-padding'
                      }
                    >
                      <Grid
                        item
                        md={isOpen ? 2 : ''}
                        className="collection-filter-sidebar"
                      >
                        <CollectionDetail_SideBar
                          onClose={toggleDrawer}
                          open={isOpen}
                          className={
                            isOpen
                              ? 'EZ-Drawer .EZDrawer__container filter-width'
                              : 'EZ-Drawer .EZDrawer__container'
                          }
                        />
                      </Grid>

                      <Grid item md={isOpen ? 10 : 12}>
                        <Grid container spacing={3}>
                          {nfts?.data?.map((nft, index) => (
                            // eslint-disable-next-line react/jsx-no-bind
                            <Grid
                              item
                              md={isOpen || isActive ? 12 / 4 : 12 / 5}
                            >
                              <CollectionItemCard
                                nft={nft}
                                key={index}
                                onImgLoad={onImgLoad}
                                height={height}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Container>
              </NftDetailCollectionWrapper>

              {nfts?.loading && (
                <div className="col-sm-12 text-center">
                  <Loader />
                </div>
              )}
              {(currentPage + 1) * pageLimit < totalCount && totalCount && (
                <div className="col-lg-12">
                  <div className="spacer-single"></div>
                  <span
                    onClick={loadMore}
                    className="btn-main btn-grad-outline lead m-auto"
                  >
                    Load More
                  </span>
                </div>
              )}
            </TabPanel>
            <TabPanel value="2">
              <div className="collection-sidebar-container ">
                <div className="collection-main-content ">
                  <h1>hello activity center</h1>
                </div>
                <div className="collection-sidebar ">
                  <CollectionDetail_SideBar />
                </div>
              </div>
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </>
  );
}

export default CollectionDetailProductList;
