import SellIcon from '@mui/icons-material/Sell';
import { MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Col, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { BiPulse } from 'react-icons/bi';
import { SiEthereum } from 'react-icons/si';

interface PricePopoverProps {
  data: { max: number; min: number; unit: string };
  onUpdate: (value: any) => void;
}

const PricePopover = ({ data, onUpdate }: PricePopoverProps) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const networks = [
    { name: 'Pulse', icon: <BiPulse className="m-1" />, unit: 'PLS' },
    { name: 'Ethereum', icon: <SiEthereum className="m-1" />, unit: 'ETH' }
  ];
  const [pricePopShow, setPricePopShow] = useState(false);
  const [networkIndex, setNetworkIndex] = useState(0);
  const [wrongPriceRange, setWrongPriceRange] = useState(false);

  const getPriceFilterText = () => {
    if (!data) return 'Price Range';

    const { max, min, unit } = data;
    if (!max && !min) {
      return 'Price Range';
    }
    const minLabel = Number.isFinite(min) ? min : '-∞';
    const maxLabel = Number.isFinite(max) ? max : '+∞';
    return `${minLabel} - ${maxLabel} ${unit}`;
  };

  const clearPriceFilter = () => {
    setMaxPrice('');
    setMinPrice('');
    onUpdate({});
    setPricePopShow(false);
  };

  const setPriceFilter = () => {
    if (minPrice === '' && maxPrice === '') {
      setWrongPriceRange(true);
      return;
    } else if (minPrice > maxPrice && maxPrice !== '') {
      setWrongPriceRange(true);
      return;
    }
    setWrongPriceRange(false);
    setPricePopShow(false);
    onUpdate({
      max: maxPrice === '' ? undefined : Number.parseFloat(maxPrice),
      min: minPrice === '' ? undefined : Number.parseFloat(minPrice),
      unit: networks[networkIndex].unit
    });
  };

  const PriceFilterPopover = (
    <Popover
      id="popover-price-filter"
      className="popover-price-filter"
      style={{
        border: '1px solid',
        borderImageSlice: '1',
        borderRadius: 1,
        borderImageSource: 'linear-gradient(to left, #FE00C7, #0084FE)'
      }}
    >
      {/* <Popover.Title>Select Price Range</Popover.Title> */}
      <Popover.Content>
        <Row>
          <Col sm={12} className="mb-3">
            <Select
              className={`price-network-select price__select`}
              value={networkIndex.toString()}
            >
              {networks.map(({ name, icon }, index) => (
                <MenuItem key={index} value={index}>
                  {icon}
                  <span className="m-1">{name}</span>
                </MenuItem>
              ))}
            </Select>
          </Col>
          <Col xs={6}>
            <TextField
              className={`input-price price__select__input ${
                wrongPriceRange && 'danger'
              }`}
              id="min-price"
              label="Min"
              variant="outlined"
              type="number"
              size="small"
              InputProps={{ inputProps: { min: 0 } }}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </Col>
          <Col xs={6}>
            <TextField
              className={`input-price price__select__input ${
                wrongPriceRange && 'danger'
              }`}
              id="max-price"
              label="Max"
              variant="outlined"
              type="number"
              size="small"
              InputProps={{ inputProps: { min: 0 } }}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </Col>
          <Col xs={12} className="mt-4">
            <button
              type="button"
              className={`btn-normal btn-filled btn__gradient`}
              onClick={setPriceFilter}
            >
              Apply
            </button>
          </Col>
          <Col xs={12} className="mt-0">
            <button
              type="button"
              className={`btn-normal classes.btn__simple`}
              onClick={clearPriceFilter}
            >
              <span> Clear </span>
            </button>
          </Col>
        </Row>
      </Popover.Content>
    </Popover>
  );
  return (
    <OverlayTrigger
      show={pricePopShow}
      onToggle={(v) => {
        setPricePopShow(v);
      }}
      trigger="click"
      placement="bottom"
      overlay={PriceFilterPopover}
      rootClose
    >
      <button
        className={`filter-button filter__button`}
        type="button"
        onClick={() => setPricePopShow(!pricePopShow)}
      >
        <SellIcon size={30} className={`m-2 button__icon`} />
        <span>
          {getPriceFilterText()}
          <i
            className={`mt-3 pull-right fa fa-angle-down font-weight-bold`}
          ></i>
        </span>
      </button>
    </OverlayTrigger>
  );
};

export default PricePopover;
