import { ListItemButton, ListItemText } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  categories,
  status
} from 'src/components/components/constants/filters';
import CategoryPopover from 'src/components/components/Popovers/CategoryPopover';
import { filterCategories } from 'src/store/actions';
import { fetchCountForCategories } from 'src/store/actions/thunks';
import { getCollections } from 'src/store/actions/thunks/collections';
import * as selectors from 'src/store/selectors';

interface CategoryFilterProps {
  categories: ICollection[];
  nftCount: Object;
  onUpdate: (v: any) => void;
}

const CategoryFilter = ({
  categories,
  nftCount,
  onUpdate
}: CategoryFilterProps) => {
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const handleSelectCategory = (id: string) => {
    const currentIndex = selectedCollections.indexOf(id);
    const newChecked = [...selectedCollections];
    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedCollections(newChecked);
    onUpdate(id);
  };
  return (
    <div className="explore-filtermain">
      {/* <CategoryPopover
                        collectionList={categories}
                        nftCount={nftCount}
                        onUpdate={handleCategory}
                    /> */}
      <ul className="d-flex align-items-center">
        {categories.map((item, index) => {
          return (
            <li
              key={index}
              style={{ cursor: 'pointer' }}
              className={
                item.value ==
                new URLSearchParams(window.location.search).get('category')
                  ? 'active'
                  : ''
              }
              onClick={() => {
                handleSelectCategory(item.value);
              }}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(CategoryFilter);
