import BackupTableIcon from '@mui/icons-material/BackupTable';
import CheckIcon from '@mui/icons-material/Check';
import {
  Avatar,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText
} from '@mui/material';
import React, { useState } from 'react';
import { Col, Form, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { ICollection } from 'src/collections.types';

interface CollectionPopoverProps {
  collectionList: ICollection[];
  data: any[];
  onUpdate: (v: any) => void;
}

const CollectionPopover = ({
  collectionList,
  data,
  onUpdate
}: CollectionPopoverProps) => {
  const [collectionPopShow, setCollectionPopShow] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [collectionSearch, setCollectionSearch] = useState('');
  const getCollectionFilterText = () => {
    if (data.length === 0) return 'Select collections';
    let string = '';
    data.forEach((collectionId) => {
      const collection = collectionList.find(({ id }) => id === collectionId);
      if (collection) {
        string += collection.name + '\n';
      }
    });
    return string;
  };

  const handleSelectCollection = (id: string) => {
    const currentIndex = selectedCollections.indexOf(id);
    const newChecked = [...selectedCollections];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedCollections(newChecked);
  };

  const clearCollectionFilter = () => {
    setCollectionPopShow(false);
    onUpdate([]);
  };

  const setCollectionFilter = () => {
    if (selectedCollections.length === 0) return;
    setCollectionPopShow(false);
    onUpdate(selectedCollections);
  };

  const CollectionFilterPopover = (
    <Popover
      id="popover-collection-filter"
      className={`popover-collection-filter popover__collection popover__nft_style`}
      style={{
        border: '1px solid',
        borderImageSlice: '1',
        borderRadius: 1,
        borderImageSource: 'linear-gradient(to left, #FE00C7, #0084FE)'
      }}
    >
      <Popover.Content>
        <Row>
          <Col sm={12} className="mb-1">
            <Form.Control
              type="text"
              placeholder="Search collection..."
              value={collectionSearch}
              className={`text__custom_field`}
              onChange={(e) => {
                setCollectionSearch(e.target.value);
              }}
            />
          </Col>
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
              {collectionList
                .filter((collection) => {
                  return collection.name
                    .toLowerCase()
                    .includes(collectionSearch.toLowerCase());
                })
                .map(({ id, imageUrl, name }, index) => {
                  const labelId = `checkbox-list-secondary-label-${id}`;
                  return (
                    <ListItem
                      className={`list__item__custom`}
                      key={index}
                      classes={{ selected: 'active' }}
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
                          onChange={() => handleSelectCollection(id)}
                          checked={selectedCollections.indexOf(id) !== -1}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      }
                      disablePadding
                    >
                      <ListItemButton
                        style={{ paddingLeft: 0, paddingRight: 0 }}
                        onClick={() => handleSelectCollection(id)}
                      >
                        <ListItemAvatar className={`custom__avatar__holder`}>
                          <Avatar
                            className={`custom__avatar`}
                            alt={`Avatar n°${index + 1}`}
                            src={imageUrl}
                          />
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={name} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
            </List>
          </Col>
          <Col xs={12} className="mt-4">
            <button
              type="button"
              className={`p-3 btn-filled btn__gradient`}
              onClick={setCollectionFilter}
            >
              Apply
            </button>
          </Col>
          <Col xs={12} className="mt-0">
            <button
              type="button"
              className={`btn-normal btn__simple`}
              onClick={clearCollectionFilter}
            >
              Clear
            </button>
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
        <BackupTableIcon size={30} className={`m-2 button__icon`} />
        <span>
          {getCollectionFilterText()}{' '}
          <i
            className={`mt-3 pull-right fa fa-angle-down font-weight-bold`}
          ></i>
        </span>
      </button>
    </OverlayTrigger>
  );
};

export default CollectionPopover;
