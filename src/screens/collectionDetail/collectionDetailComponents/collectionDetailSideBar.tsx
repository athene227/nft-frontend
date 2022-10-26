//import styles 👇
import 'react-modern-drawer/dist/index.css';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import component 👇
import { RadioGroup, TextField } from '@mui/material';
import { Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import Drawer from 'react-modern-drawer';
import { ReactComponent as SearchIcon } from 'src/assets/images/magnifier.svg';
import InputSelect from 'src/components/select';

import CollectionSearchbar from './collectionSearchBar';

const CollectionDetailSideBar = (props: IProps) => {
  const { open, onClose, className } = props;
  const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: 0,
    width: 23,
    height: 23,
    boxShadow: 'none',
    backgroundColor: theme.palette.mode === 'dark' ? '#091838;' : '#091838;',
    outline: '1px auto rgba(255,255,255,.1)',
    opacity: 0.15,

    '.Mui-focusVisible &': {
      outline: '1px auto rgba(255,255,255,.1)',
      outlineOffset: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#091838' : '#091838',
      opacity: 1
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.mode === 'dark' ? '#091838' : '#091838',
      opacity: 1
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background:
        theme.palette.mode === 'dark'
          ? 'rgba(57,75,89,.5)'
          : 'rgba(206,217,224,.5)'
    }
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#ffffff',
    opacity: 1,
    '&:before': {
      display: 'block',
      width: 23,
      height: 23,
      opacity: 1,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%230084fe'/%3E%3C/svg%3E\")",
      content: '""'
    },
    'input:hover ~ &': {
      backgroundColor: '#ffffff'
    }
  });
  const options = [
    {
      title: 'ETH',
      value: 'ETH'
    },
    { title: 'WETH', value: 'WETH' }
  ];
  const Backgrounds = [
    { color: 'Blue', value: 'Blue' },
    { color: 'Yellow', value: 'Yellow' },
    { color: 'Purple', value: 'Purple' },
    { color: 'Red', value: 'Red' },
    { color: 'Dark', value: 'Dark' },
    { color: 'Dark Blue', value: 'Dark Blue' },
    { color: 'Orange', value: 'Orange' }
  ];
  const [background, setBackground] = useState('');
  const [foundBackgrounds, setFoundBackGrounds] = useState(Backgrounds);
  const filter = (e: any) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = Backgrounds.filter((user) => {
        return user.color.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundBackGrounds(results);
    } else {
      setFoundBackGrounds(Backgrounds);
      // If the text field is empty, show all users
    }

    setBackground(keyword);
  };

  const [quantityValue, setQuantityValue] = React.useState('All items');
  const quantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantityValue((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        direction="left"
        className={className}
        enableOverlay={false}
      >
        <Box className="collection-filter-header">
          <span>Filters</span>
        </Box>
        <Box className="collection-filter-content">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Status</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="Buy Now"
                    control={
                      <Checkbox
                        sx={{
                          '&:hover': { bgcolor: 'transparent' }
                        }}
                        disableRipple
                        color="default"
                        checkedIcon={<BpCheckedIcon />}
                        icon={<BpIcon />}
                      />
                    }
                    label="Buy Now"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="On Auction"
                    control={
                      <Checkbox
                        sx={{
                          '&:hover': { bgcolor: 'transparent' }
                        }}
                        disableRipple
                        color="default"
                        checkedIcon={<BpCheckedIcon />}
                        icon={<BpIcon />}
                      />
                    }
                    label="On Auction"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="New"
                    control={
                      <Checkbox
                        sx={{
                          '&:hover': { bgcolor: 'transparent' }
                        }}
                        disableRipple
                        color="default"
                        checkedIcon={<BpCheckedIcon />}
                        icon={<BpIcon />}
                      />
                    }
                    label="New"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="Has Offers"
                    control={
                      <Checkbox
                        sx={{
                          '&:hover': { bgcolor: 'transparent' }
                        }}
                        disableRipple
                        color="default"
                        checkedIcon={<BpCheckedIcon />}
                        icon={<BpIcon />}
                      />
                    }
                    label="Has Offers"
                    labelPlacement="start"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Price</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InputSelect menuItem={options} />
              <Box className="minmax-filters">
                <ul className="d-flex align-items-center">
                  <li>
                    <TextField
                      hiddenLabel
                      id="filled-hidden-label-normal"
                      defaultValue="Min"
                      placeholder="Min"
                      variant="outlined"
                    />
                  </li>
                  <li>
                    <span>to</span>
                  </li>
                  <li>
                    <TextField
                      hiddenLabel
                      id="filled-hidden-label-normal"
                      defaultValue="Max"
                      placeholder="Max"
                      variant="outlined"
                    />
                  </li>
                </ul>
                <button type="button" className="btn-main btn-grad w-100">
                  Apply
                </button>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>Quantity</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={quantityValue}
                  onChange={quantityChange}
                  row
                >
                  <FormControlLabel
                    value="All items"
                    control={<Radio />}
                    label="All items"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="Single items"
                    control={<Radio />}
                    label="Single items"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="Bundles"
                    control={<Radio />}
                    label="Bundles"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4a-content"
              id="panel4a-header"
            >
              <Typography>Currency</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="ETH"
                    control={
                      <Checkbox
                        sx={{
                          '&:hover': { bgcolor: 'transparent' }
                        }}
                        disableRipple
                        color="default"
                        checkedIcon={<BpCheckedIcon />}
                        icon={<BpIcon />}
                      />
                    }
                    label="ETH"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="WETH"
                    control={
                      <Checkbox
                        sx={{
                          '&:hover': { bgcolor: 'transparent' }
                        }}
                        disableRipple
                        color="default"
                        checkedIcon={<BpCheckedIcon />}
                        icon={<BpIcon />}
                      />
                    }
                    label="WETH"
                    labelPlacement="start"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5a-content"
              id="panel5a-header"
            >
              <Typography>Background(6)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <TextField
                  className="filter-searchbar"
                  variant="outlined"
                  placeholder="Search"
                  size="medium"
                  onKeyUp={filter}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
                {/* <CollectionSearchbar/>*/}
              </Box>
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  {foundBackgrounds && foundBackgrounds.length > 0 ? (
                    foundBackgrounds.map((background, i) => (
                      <FormControlLabel
                        value="Blue"
                        key={i}
                        control={
                          <Checkbox
                            sx={{
                              '&:hover': { bgcolor: 'transparent' }
                            }}
                            disableRipple
                            color="default"
                            checkedIcon={<BpCheckedIcon />}
                            icon={<BpIcon />}
                          />
                        }
                        label={
                          <div>
                            {background.value}{' '}
                            <span className="label-counter">700</span>
                          </div>
                        }
                        labelPlacement="start"
                      />
                    ))
                  ) : (
                    <span className={'text-danger'}>No results found!</span>
                  )}
                </FormGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={''}
              aria-controls="panel6a-content"
              id="panel6a-header"
            >
              <Typography>Backpack</Typography>
            </AccordionSummary>
            <AccordionDetails></AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={''}
              aria-controls="panel6a-content"
              id="panel6a-header"
            >
              <Typography>Ears</Typography>
            </AccordionSummary>
            <AccordionDetails></AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={''}
              aria-controls="panel6a-content"
              id="panel6a-header"
            >
              <Typography>Eyes</Typography>
            </AccordionSummary>
            <AccordionDetails></AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={''}
              aria-controls="panel6a-content"
              id="panel6a-header"
            >
              <Typography>Eyewear</Typography>
            </AccordionSummary>
            <AccordionDetails></AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={''}
              aria-controls="panel6a-content"
              id="panel6a-header"
            >
              <Typography>Pattern</Typography>
            </AccordionSummary>
            <AccordionDetails></AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={''}
              aria-controls="panel6a-content"
              id="panel6a-header"
            >
              <Typography>Skin</Typography>
            </AccordionSummary>
            <AccordionDetails></AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={''}
              aria-controls="panel6a-content"
              id="panel6a-header"
            >
              <Typography>Headwear</Typography>
            </AccordionSummary>
            <AccordionDetails></AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={''}
              aria-controls="panel6a-content"
              id="panel6a-header"
            >
              <Typography>Emote</Typography>
            </AccordionSummary>
            <AccordionDetails></AccordionDetails>
          </Accordion>
        </Box>
      </Drawer>
    </>
  );
};

export default CollectionDetailSideBar;
