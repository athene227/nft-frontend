/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import {
  Autocomplete,
  TextField,
  CircularProgress,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button
} from '@mui/material';
import { ApiService } from 'src/core/axios';
import { getImage } from 'src/services/ipfs';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
interface IOption {
  label: string;
  image: string;
  url: string;
  type: string;
  key: string;
}
// let loading = 0;
const GlobalSearchbar = (props: any) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<IOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeHandle = async (value: string) => {
    // use the changed value to make request and then use the result. Which
    setLoading(true);
    try {
      const { data } = await ApiService.doGlobalSearch(value, 3);
      setLoading(false);
      const options = [
        ...data.collections.map((collection, index) => ({
          label: collection.name,
          image: collection.imageUrl,
          url: `/collection/${collection.id}`,
          type: 'Collections',
          key: `collection-${index}`
        })),
        ...data.nfts.map((nft, index) => ({
          label: nft.name,
          image: nft.imageUrl,
          url: `/ItemDetail/${nft.tokenId}/${nft.nftAddress}`,
          type: 'NFTs',
          key: `nft-${index}`
        })),
        ...data.users.map((user, index) => ({
          label: user.username,
          image: user.profileImage,
          url: `/author/${user.publicAddress}`,
          type: 'Users',
          key: `user-${index}`
        })),
        {
          type: '',
          label: 'See all results',
          image: '',
          url: `/search/${value}`,
          key: '1'
        }
      ];
      console.log(options);
      setOptions(options);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      // id="quick_search"
      style={{ width: 300 }}
      freeSolo
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      filterOptions={(x) => x}
      renderOption={(props, option, { selected }) => (
        <ListItem disablePadding key={option.key}>
          <ListItemButton onClick={() => navigate(option.url)}>
            {option.type !== '' ? (
              <>
                <ListItemAvatar>
                  <Avatar src={getImage(option.image)} />
                </ListItemAvatar>
                <ListItemText
                  id={`label-${option.label}`}
                  primary={option.label}
                />
              </>
            ) : (
              <ListItemText className="text-center">
                See all results
              </ListItemText>
            )}
          </ListItemButton>
        </ListItem>
      )}
      options={options}
      groupBy={(option: IOption) => option.type}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search here"
          variant="outlined"
          size="small"
          onKeyPress={(event: React.KeyboardEvent) => {
            if (event.key == 'Enter') {
              navigate(`/search/${event.target.value}`);
            }
          }}
          onChange={(ev) => {
            if (
              ev.target.value !== '' &&
              ev.target.value !== null &&
              ev.target.value.length > 2
            ) {
              onChangeHandle(ev.target.value);
            }
          }}
          InputProps={{
            ...params.InputProps,
            // startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
};

export default GlobalSearchbar;
