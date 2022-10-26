import { Box } from '@mui/system';
import React from 'react';
import { ReactComponent as BidIcon } from 'src/assets/images/bid-icon.svg';
import IconMinted from 'src/assets/images/icon/icon-minted.svg';
import IconShare from 'src/assets/images/icon/share-icon.svg';
import AgGrid from 'src/components/ag-grid-table';
import InputSelect from 'src/components/select/index';
import { NftDetailTableWrapper } from 'src/screens/itemDetailMultiple/itemdetailMultiple.style';

const NftDetailTable = (props: any) => {
  const options = [
    {
      title: 'Sort by',
      value: ''
    },
    { title: 'Ascending', value: 'Ascending' },
    { title: 'Descending', value: 'Descending' }
  ];
  const user_referrals = [
    {
      id: 1,
      Event: 'Minted',
      Price: '2.30',
      From: 'Farm4Ace',
      To: 'Farm4Ace',
      Date: 'a day ago'
    },
    {
      id: 2,
      Event: 'Sales',
      Price: '2.30',
      From: 'Farm4Ace',
      To: 'Farm4Ace',
      Date: 'a day ago'
    },
    {
      id: 3,
      Event: 'Transfer',
      Price: '2.30',
      From: 'Farm4Ace',
      To: 'Farm4Ace',
      Date: 'a day ago'
    },
    {
      id: 4,
      Event: 'Minted',
      Price: '2.30',
      From: 'Farm4Ace',
      To: 'Farm4Ace',
      Date: 'a day ago'
    },
    {
      id: 5,
      Event: 'Sales',
      Price: '2.30',
      From: 'Farm4Ace',
      To: 'Farm4Ace',
      Date: 'a day ago'
    },
    {
      id: 6,
      Event: 'Sales',
      Price: '2.30',
      From: 'Farm4Ace',
      To: 'Farm4Ace',
      Date: 'a day ago'
    },
    {
      id: 7,
      Event: 'Sales',
      Price: '2.30',
      From: 'Farm4Ace',
      To: 'Farm4Ace',
      Date: 'a day ago'
    }
  ];
  const columnDefinitions = [
    {
      headerName: 'Event',
      minWidth: 244,
      flex: 1,
      field: 'Event',
      cellRendererFramework: () => {
        return (
          <div className="d-flex title-image align-items-center">
            <img width={'21px'} src={IconMinted} alt="icon" />
            Minted
          </div>
        );
      }
    },
    {
      headerName: 'Price',
      minWidth: 247,
      flex: 1,
      field: 'wareHouse',
      cellRendererFramework: () => {
        return (
          <div className="price-with-icon">
            <p>
              2.30 <BidIcon /> PLS
            </p>
            <span>$ 3,967.65</span>
          </div>
        );
      }
    },
    {
      headerName: 'From',
      minWidth: 234,
      flex: 1,
      field: 'shipped',
      cellRendererFramework: () => {
        return <p className="text-gradient">Farm4Ace</p>;
      }
    },
    {
      headerName: 'To',
      minWidth: 226,
      flex: 1,
      field: 'wareHouse',
      cellRenderer: ({ value }) => (value ? value : '$275,000')
    },
    {
      headerName: 'Date',
      minWidth: 120,
      flex: 1,
      field: 'wareHouse',
      type: 'rightAligned',
      cellRendererFramework: () => {
        return (
          <p>
            a day ago <img src={IconShare} alt="share icon" />
          </p>
        );
      }
    }
  ];

  const defaultColDef = {
    resizable: true,
    sortable: true
  };
  return (
    <>
      <NftDetailTableWrapper>
        <Box display="flex" justifyContent="space-between">
          <h2>Item Activity</h2>
          <InputSelect className="sorting-select" menuItem={options} />
        </Box>
        <Box>
          <AgGrid
            height="450"
            className=""
            columnDefinitions={columnDefinitions}
            defaultColDef={defaultColDef}
            user_referrals={user_referrals}
            headerHeight={54}
            rowHeight={80}
            gridReady={undefined}
            sidebarOpen={undefined}
            onSortChange={undefined}
          />
        </Box>
      </NftDetailTableWrapper>
    </>
  );
};
export default NftDetailTable;
