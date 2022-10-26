import BoltIcon from '@mui/icons-material/Bolt';
import CheckIcon from '@mui/icons-material/Check';
import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import React, { useState } from 'react';
import { Col, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { ICollection } from 'src/types/collections.types';

interface StatusPopoverProps {
  collectionList: ICollection[];
  onUpdate: (v: any) => void;
}

const StatusPopover = ({ collectionList, onUpdate }: StatusPopoverProps) => {
  const [collectionPopShow, setCollectionPopShow] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

  const handleSelectCollection = (id: string) => {
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

  const CollectionFilterPopover = (
    <Popover
      id="popover-collection-filter"
      className={`popover-collection-filter popover__collection`}
      style={{
        border: '1px solid',
        borderImageSlice: '1',
        borderRadius: 1,
        borderImageSource: 'linear-gradient(to left, #FE00C7, #0084FE)'
      }}
    >
      <Popover.Content>
        <Row>
          <Col xs={12}>
            <List
              dense
              sx={{
                width: '100%',
                maxWidth: 460,
                bgcolor: 'transparent',
                overflow: 'auto',
                maxHeight: 250
              }}
            >
              {collectionList.map((item, index) => {
                const labelId = `checkbox-list-secondary-label-${item.value}`;
                return (
                  <ListItem
                    className={`list__item__custom`}
                    key={index}
                    classes={{ selected: 'active' }}
                    // style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                    style={{}}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        icon={<span className={`circle`}></span>}
                        checkedIcon={
                          <span className={`check__circle__icon`}>
                            <CheckIcon
                              style={{
                                display: 'block',
                                margin: '2px auto',
                                textAlign: 'center',
                                fontSize: 18,
                                color: 'white'
                              }}
                              className={`check__icon`}
                            />
                          </span>
                        }
                        className={`checkbox-collection checkbox__custom`}
                        onChange={() => handleSelectCollection(item.value)}
                        checked={selectedCollections.indexOf(item.value) !== -1}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    }
                    disablePadding
                  >
                    <ListItemButton
                      style={{ paddingLeft: 0, paddingRight: 0 }}
                      onClick={() => handleSelectCollection(item.value)}
                    >
                      <ListItemText id={labelId} primary={item.label} />
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
      show={collectionPopShow}
      overlay={CollectionFilterPopover}
      onToggle={(v) => setCollectionPopShow(v)}
      rootClose
    >
      <button
        className={`filter-button filter__button`}
        type="button"
        onClick={() => setCollectionPopShow(!collectionPopShow)}
      >
        <BoltIcon size={30} className={`m-2 button__icon`} />
        <span>
          Status{' '}
          <i
            className={`mt-3 pull-right fa fa-angle-down font-weight-bold`}
          ></i>
        </span>
      </button>
    </OverlayTrigger>
  );
};

export default StatusPopover;
