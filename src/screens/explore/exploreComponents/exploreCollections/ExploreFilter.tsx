import { navigate, useLocation } from '@reach/router';
import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { categories } from 'src/components/constants/filters';
// import { fetchCountForCategories } from 'src/store/actions/thunks';
// import { getCollections } from 'src/store/actions/thunks/collections';
import CategoryFilter from 'src/screens/explore/exploreComponents/CategoryFilter';
import { filterCategories } from 'src/store/actions';

export interface ExploreCollectionFilter {
  category: string;
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ExploreFilter = () => {
  const dispatch = useDispatch();

  const query = useQuery();
  const category = query.get('category');

  const baseUrl = '/exploreCollection';

  useEffect(() => {
    if (category != null) {
      dispatch(filterCategories({ value: category, singleSelect: true }));
    }
  }, []);

  const handleCategory = useCallback(
    (event) => {
      const { value } = event;
      const path = baseUrl + '?category=' + value;
      navigate(path);
    },
    [dispatch]
  );

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
        </div>
      </div>
    </>
  );
};

export default memo(ExploreFilter);
