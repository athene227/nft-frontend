import { navigate, useLocation } from '@reach/router';
import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categories } from 'src/components/constants/filters';
import { sortOrders } from 'src/components/constants/sort';
import SortPopover from 'src/components/Popovers/SortPopover';
import CategoryFilter from 'src/screens/explore/exploreComponents/CategoryFilter';
import { filterCategories, setSortOrder } from 'src/store/actions';
// import { fetchCountForCategories } from 'src/store/actions/thunks';
// import { getCollections } from 'src/store/actions/thunks/collections';
import * as selectors from 'src/store/selectors';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ExploreFilter = () => {
  const dispatch = useDispatch();
  const sortOrder = useSelector(selectors.nftSorter);

  const query = useQuery();
  const category = query.get('category');
  const sortby = query.get('sortby');

  const baseUrl = '/explore';

  useEffect(() => {
    if (category != null) {
      dispatch(filterCategories({ value: category, singleSelect: true }));
    } else {
      categories.map((categoryItem: any) => {
        dispatch(
          filterCategories({ value: categoryItem.name, singleSelect: false })
        );
      });
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

  // useEffect(() => {
  //   dispatch(fetchCountForCategories());
  // }, []);

  return (
    <>
      <div
        className={`general-custom-filters items_filter explore_items_filer`}
      >
        <div className="row align-items-center">
          <div className="col-md-10">
            <CategoryFilter
              categories={categories}
              onUpdate={(value) => handleCategory({ value })}
            />
          </div>
          <div className="col-md-2">
            <div className="dropdownSelect mt-3 two">
              <div className={`de_form price_filer_holder`}>
                <SortPopover
                  sortOrders={sortOrders}
                  currentOrder={sortOrder}
                  onUpdate={(value) => handleSortby(value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ExploreFilter);
