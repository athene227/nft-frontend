import { ListItemButton, ListItemText } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { categories, status } from 'src/components/constants/filters';

interface CategoryFilterProps {
  categories: any[];
  onUpdate: (v: any) => void;
}

const CategoryFilter = ({ categories, onUpdate }: CategoryFilterProps) => {
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
