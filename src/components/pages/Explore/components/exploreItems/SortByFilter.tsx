import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { Col, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { BiSortAlt2 } from 'react-icons/bi';
import { MdCheck } from 'react-icons/md';
import { sortOrders } from 'src/components/components/constants/sort';
import { SortOrder } from 'src/enums';

interface SortByPopoverProps {
  currentOrder: SortOrder;
  onUpdate: (value: string) => void;
}

const SortByPopover = ({ currentOrder, onUpdate }: SortByPopoverProps) => {
  const [sortPopShow, setSortPopShow] = useState(false);
  const updateSortOrder = (value: string) => {
    onUpdate(value);
    setSortPopShow(false);
  };
  const SortingPopover = (
    <Popover id="popover-sort" className="popover-price-filter">
      <Popover.Title>Sort By</Popover.Title>
      <Popover.Content>
        <Row>
          <Col xs={12}>
            <List
              dense
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                overflow: 'auto',
                maxHeight: 250
              }}
            >
              {sortOrders.map(({ label, value }, index) => {
                const labelId = `sort-list-secondary-label-${index}`;
                return (
                  <ListItem
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
        className="filter-button"
        type="button"
        onClick={() => setSortPopShow(!sortPopShow)}
      >
        <BiSortAlt2 className="m-1" />
        <span>
          {sortOrders.find((order) => order.value === currentOrder)?.label}
        </span>
      </button>
    </OverlayTrigger>
  );
};

export default SortByPopover;
