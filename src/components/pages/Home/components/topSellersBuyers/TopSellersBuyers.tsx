import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from 'react';
import { ApiService } from 'src/core/axios';
import { TOP_SELLERS_BUYERS } from 'src/enums';

import CollectionItem from './CollectionItem';
import UserItem from './UserItem';

function TopSellersBuyers() {
  const [collectionData, setCollectionData] = React.useState([]);
  const [sellerData, setSellerData] = React.useState([]);
  const [topSelect, setTopSelect] = React.useState(TOP_SELLERS_BUYERS.SELLERS);
  const [sellerTime, setSellerTime] = React.useState(30);
  const [collectionTime, setCollectionTime] = React.useState(30);

  const handleCollectionChange = (e: any) => {
    setCollectionTime(e.target.value);
  };

  const handleTopChange = (e: any) => {
    setTopSelect(e.target.value);
  };

  const handleSellerChange = (e: any) => {
    setSellerTime(e.target.value);
  };

  const getTopCollections = async () => {
    try {
      const res = await ApiService.getHotCollections({
        limit: 10,
        day: collectionTime
      });
      setCollectionData(res.data);
    } catch (error) {
      console.log('error in getTopCollection', error);
    }
  };

  const getTopSellers = async () => {
    try {
      const res = await ApiService.getTopSellers({
        limit: 10,
        day: sellerTime
      });
      setSellerData(res.data);
      console.log(TOP_SELLERS_BUYERS.SELLERS, res.data);
    } catch (error) {
      console.log('error in getTopSeller', error);
    }
  };

  const getTopBuyers = async () => {
    try {
      const res = await ApiService.getTopBuyers({ limit: 10, day: sellerTime });
      setSellerData(res.data);
      console.log(TOP_SELLERS_BUYERS.BUYERS, res.data);
    } catch (error) {
      console.log('error in getTopBuyers', error);
    }
  };

  React.useEffect(() => {
    if (topSelect === TOP_SELLERS_BUYERS.SELLERS) {
      getTopSellers();
    } else {
      getTopBuyers();
    }
  }, [topSelect, sellerTime]);

  React.useEffect(() => {
    getTopCollections();
  }, [collectionTime]);

  const renderDaysItems = () => {
    const days = [1, 7, 30];
    return days.map((dayNumber) => {
      const singleOrPlural = dayNumber === 1 ? 'day' : 'days';
      return (
        <MenuItem key={dayNumber} value={dayNumber}>
          {dayNumber} {singleOrPlural}
        </MenuItem>
      );
    });
  };

  return (
    <section
      className={`section-top-collection container_bg container no-top`}
      style={{ backgroundImage: `url(${'./img/topsb-bg.png'})` }}
    >
      <div className="row">
        <div className="col-12 col-lg-6">
          <div className="col-lg-12">
            <h2 className="style-2">
              Top Collection in
              <Select
                className={`list__header__container__select`}
                value={collectionTime}
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={handleCollectionChange}
                IconComponent={KeyboardArrowDownIcon}
              >
                {renderDaysItems()}
              </Select>
            </h2>
          </div>

          <div className="col-12">
            <ul
              className={`d-flex flex-column list-unstyled cseller_list seller_list`}
            >
              {collectionData.length > 0
                ? collectionData?.map((author, index) => {
                    return (
                      <li
                        key={index}
                        className={`cseller_list_item seller_list_item`}
                      >
                        <CollectionItem user={author} index={index} />
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="col-lg-12">
            <h2 className="style-2">
              Top{' '}
              <Select
                className={`list__header__container__select`}
                value={topSelect}
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={handleTopChange}
                IconComponent={KeyboardArrowDownIcon}
              >
                <MenuItem value={TOP_SELLERS_BUYERS.SELLERS}>Sellers</MenuItem>
                <MenuItem value={TOP_SELLERS_BUYERS.BUYERS}>Buyers</MenuItem>
              </Select>
              in
              <Select
                className={`list__header__container__select`}
                value={sellerTime}
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={handleSellerChange}
                IconComponent={KeyboardArrowDownIcon}
              >
                {renderDaysItems()}
              </Select>
            </h2>
          </div>

          <div className="col-12">
            <ul
              className={`d-flex flex-column list-unstyled cseller_list seller_list`}
            >
              {sellerData.length > 0
                ? sellerData?.map((author, index) => {
                    return (
                      <li
                        key={index}
                        className={`cseller_list_item seller_list_item`}
                      >
                        <UserItem user={author} index={index} />
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopSellersBuyers;
