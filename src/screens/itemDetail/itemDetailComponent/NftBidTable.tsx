import { Box } from '@mui/system';
import moment from 'moment';
import React from 'react';
import { useEffect, useState } from 'react';
import { ReactComponent as BidIcon } from 'src/assets/images/bid-icon.svg';
import Alert from 'src/components/Alert';
import Loader from 'src/components/Loader';
import InputSelect from 'src/components/select/index';
import UserAvatar from 'src/components/UserAvatar';
import { ALERT_TYPE } from 'src/enums';

import AgGrid from '../../../components/ag-grid-table';
import { NftOfferTableWrapper } from '../itemdetail.style';

interface IProps {
  bidsList: any[];
  navigateToUserPage: any;
  bidsState: any;
  placeBidState: any;
}

const NftBidTable = (props: IProps) => {
  const { bidsList, navigateToUserPage, bidsState, placeBidState } = props;
  const [user_referrals, setUserReferrals] = useState<any[]>([]);

  console.log(bidsList);

  useEffect(() => {
    const rowDataArr: any[] = [];
    bidsList.map((bid, index) => {
      const rowItem = {
        id: index,
        from: {
          bid
        },
        price: { bid },
        difference: { bid },
        expiration: { bid }
      };
      rowDataArr.push(rowItem);
    });
    setUserReferrals(rowDataArr);
  }, [bidsList]);

  const options = [
    {
      title: 'Sort by',
      value: ''
    },
    { title: 'Ascending', value: 'Ascending' },
    { title: 'Descending', value: 'Descending' }
  ];

  const columnDefinitions = [
    {
      headerName: 'From',
      // icon: <BidIcon />,
      minWidth: 170,
      flex: 1,
      field: 'from',
      cellRendererFramework: ({ value }) => {
        return (
          <>
            <div
              className="d-flex title-image align-items-center"
              onClick={() => navigateToUserPage(value.bid?.buyerAddress)}
            >
              <UserAvatar
                className="lazy"
                image={value.bid?.buyer[0]?.profileImage}
                userAddress={value.bid?.buyerAddress}
                blockSize={5}
                size={34}
              />
              <div className="title-image-details">
                <h3>
                  <BidIcon /> {value.bid?.price}{' '}
                </h3>
                <p className="text-gradient">
                  {value.bid?.buyer[0]?.username
                    ? `@${value.bid?.buyer[0]?.username}`
                    : value.bid?.buyerAddress}{' '}
                </p>
              </div>
            </div>
          </>
        );
      }
    },
    {
      headerName: 'USD Price',
      minWidth: 100,
      flex: 1,
      field: 'price',
      cellRenderer: ({ value }) => (value ? '$' : '$25,000')
    },
    {
      headerName: 'Floore difference',
      minWidth: 125,
      flex: 1,
      field: 'difference',
      cellRenderer: ({ value }) => (value ? ' %' : '14% below')
    }
  ];

  const defaultColDef = {
    resizable: true,
    sortable: true,
    wrapText: true
  };

  if (bidsState.loading || placeBidState.loader) {
    return <Loader size={50} />;
  }

  if (bidsState.error) {
    return <Alert text={bidsState.error} type={ALERT_TYPE.DANGER} />;
  }

  return (
    <>
      <NftOfferTableWrapper>
        <Box
          className="table-header"
          display="flex"
          justifyContent="space-between"
        >
          <h2>All Bids</h2>
          <InputSelect className="sorting-select" menuItem={options} />
        </Box>
        <Box>
          <AgGrid
            height="400"
            className=""
            columnDefinitions={columnDefinitions}
            defaultColDef={defaultColDef}
            user_referrals={user_referrals}
            headerHeight={40}
            rowHeight={59}
            gridReady={undefined}
            sidebarOpen={undefined}
            onSortChange={undefined}
          />
          <button className="w-100 btn-end btn-main btn-grad-outline">
            Load more
          </button>
        </Box>
      </NftOfferTableWrapper>
    </>
  );
};
export default NftBidTable;
