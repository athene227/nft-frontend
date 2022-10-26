/* eslint-disable react/jsx-no-bind */
import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountForCategories } from 'src/store/actions/thunks';
import { getCollections } from 'src/store/actions/thunks/collections';

import {
  filterCategories,
  filterCollections,
  filterPrice,
  filterStatus,
  setSortOrder
} from '../store/actions';
import * as selectors from '../store/selectors';
import { categories, status } from './constants/filters';
import CollectionPopover from './Popovers/CollectionPopover';
import PricePopover from './Popovers/PricePopover';
import SortPopover from './Popovers/SortPopover';

const CheckboxFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectors.nftFilter);
  const sortOrder = useSelector(selectors.nftSorter);
  const collectionList = useSelector(selectors.collectionsState).collections
    .data;
  const nftCount = useSelector(selectors.nftCount);

  const handleCategory = useCallback(
    (event) => {
      const { id } = event.target;
      dispatch(filterCategories({ value: id, singleSelect: false }));
    },
    [dispatch]
  );

  const handleStatus = useCallback(
    (event) => {
      const { id } = event.target;
      dispatch(filterStatus({ value: id, singleSelect: false }));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getCollections());
    dispatch(fetchCountForCategories());
  }, []);

  return (
    <>
      <div className="item_filter_group">
        <h4>Select Categories</h4>
        <div className="de_form">
          {categories.map((item, index) => (
            <div className="de_checkbox" key={index}>
              <input
                id={item.value}
                name={item.value}
                type="checkbox"
                value={item.value}
                onChange={handleCategory}
              />
              <label htmlFor={item.value}>
                {item.name}
                <span className="nft-count">({nftCount[item.name] || 0})</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="item_filter_group">
        <h4>Status</h4>
        <div className="de_form">
          {status.map((item, index) => (
            <div className="de_checkbox" key={index}>
              <input
                id={item.value}
                name={item.value}
                type="checkbox"
                value={item.value}
                onChange={handleStatus}
              />
              <label htmlFor={item.value}>{item.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="item_filter_group">
        <h4>Price</h4>
        <div className="de_form">
          <PricePopover
            data={filters?.price}
            onUpdate={(v) => dispatch(filterPrice(v))}
          />
        </div>
      </div>

      <div className="item_filter_group">
        <h4>Collections</h4>
        <div className="de_form">
          <CollectionPopover
            data={filters?.collections}
            collectionList={collectionList}
            onUpdate={(value) => dispatch(filterCollections({ value }))}
          />
        </div>
      </div>

      <div className="item_filter_group">
        <h4>Filter {'&'} Sort</h4>
        <div className="de_form">
          <SortPopover
            currentOrder={sortOrder}
            onUpdate={(value) => dispatch(setSortOrder(value))}
          />
        </div>
      </div>
    </>
  );
};

export default memo(CheckboxFilter);
