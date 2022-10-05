import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { Col, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { BiSortAlt2 } from 'react-icons/bi';
import { MdCheck } from 'react-icons/md';
import { sortOrders } from 'src/components/components/constants/sort';
import { SortOrder } from 'src/enums';

interface SortPopoverProps {
  currentOrder: SortOrder;
  onUpdate: (value: string) => void;
}

const SortPopover = ({ currentOrder, onUpdate }: SortPopoverProps) => {
  const [sortPopShow, setSortPopShow] = useState(false);
  const updateSortOrder = (value: string) => {
    onUpdate(value);
    setSortPopShow(false);
  };
  const SortingPopover = (
    <Popover
      id="popover-sort"
      className={`popover-price-filter sort__popover popover__nft_style`}
      style={{
        border: '1px solid',
        borderImageSlice: '1',
        borderRadius: 1,
        borderImageSource: 'linear-gradient(to left, #FE00C7, #0084FE)'
      }}
    >
      {/* <Popover.Title style={{borderBottom:'none'}}>Sort By</Popover.Title> */}
      <Popover.Content>
        <Row>
          <Col xs={12}>
            <List
              dense
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'transparent',
                overflow: 'auto',
                maxHeight: 250
              }}
            >
              {sortOrders.map(({ label, value }, index) => {
                const labelId = `sort-list-secondary-label-${index}`;
                return (
                  <ListItem
                    className="form-control-item"
                    style={{}}
                    key={index}
                    secondaryAction={
                      currentOrder === value && (
                        <MdCheck style={{ color: 'green' }} />
                      )
                    }
                    disablePadding
                  >
                    <ListItemButton onClick={() => updateSortOrder(value)}>
                      <ListItemText id={labelId} primary={label} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Col>
        </Row>
      </Popover.Content>
    </Popover>
  );
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      show={sortPopShow}
      overlay={SortingPopover}
      onToggle={(value) => setSortPopShow(value)}
      rootClose
    >
      <button
        className={`filter-button filter__button`}
        type="button"
        onClick={() => setSortPopShow(!sortPopShow)}
      >
        <BiSortAlt2 size={25} className={`m-2 button__icon`} />
        <span>
          {sortOrders.find((order) => order.value === currentOrder)?.label}
          <i
            className={`mt-3 pull-right fa fa-angle-down font-weight-bold`}
          ></i>
        </span>
      </button>
    </OverlayTrigger>
  );
};

export default SortPopover;
