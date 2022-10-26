import { Box } from '@mui/system';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ReactComponent as BidIcon } from 'src/assets/images/bid-icon.svg';
import IconMinted from 'src/assets/images/icon/icon-minted.svg';
import IconShare from 'src/assets/images/icon/share-icon.svg';
import InputSelect from 'src/components/select/index';
import { PROCESS_TRAKING_ACTION } from 'src/enums';
import { shortAddress } from 'src/utils';

import AgGrid from '../../../components/ag-grid-table';
import { NftDetailTableWrapper } from '../itemdetail.style';

interface IProps {
  nftHistory: any[];
}

const NftDetailTable = (props: IProps) => {
  const { nftHistory } = props;

  const [user_referrals, setUserReferrals] = useState<any[]>([]);

  const _convertActionToText = (action: string) => {
    let res: string;
    switch (action) {
      case PROCESS_TRAKING_ACTION.CREATE_SINGLE:
        res = 'minted a single NFT';
        break;
      case PROCESS_TRAKING_ACTION.TERMINATE_AUCTION_SOLD:
        res = 'terminated an auction';
        break;
      case PROCESS_TRAKING_ACTION.ACCEPT_OFFER:
        res = 'offer accepted';
        break;
      case PROCESS_TRAKING_ACTION.BUY_SIMPLE_SINGLE:
        res = 'bought a simple item';
        break;
      case PROCESS_TRAKING_ACTION.LIST_SIMPLE_SINGLE:
        res = 'listed a simple item';
        break;
      case PROCESS_TRAKING_ACTION.LIST_AUCTION:
        res = 'listed an auction item';
        break;
      case PROCESS_TRAKING_ACTION.OFFER:
        res = 'created an offer';
        break;
      case PROCESS_TRAKING_ACTION.BID:
        res = 'placed a bid';
        break;
      case PROCESS_TRAKING_ACTION.CANCEL_OFFER:
        res = 'cancelled an offer';
        break;
      default:
        res = '';
        break;
    }
    return res;
  };

  useEffect(() => {
    const rowDataArr: any[] = [];
    nftHistory.map((item, index) => {
      const rowItem = {
        id: index,
        event: item.action,
        price: item.price,
        from: { item },
        date: item.createdAt
      };
      rowDataArr.push(rowItem);
    });
    setUserReferrals(rowDataArr);
  }, [nftHistory]);

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
      headerName: 'Event',
      minWidth: 244,
      flex: 1,
      field: 'event',
      cellRendererFramework: ({ value }) =>
        value ? _convertActionToText(value) : 'Minted'
    },
    {
      headerName: 'Price',
      minWidth: 247,
      flex: 1,
      field: 'price',
      cellRendererFramework: ({ value }) => {
        return (
          <div className="price-with-icon">
            {value ? (
              <>
                <p>
                  {value}
                  <BidIcon /> PLS
                </p>
                <span>$ 3,967.65</span>
              </>
            ) : (
              <></>
            )}
          </div>
        );
      }
    },
    {
      headerName: 'From',
      minWidth: 234,
      flex: 1,
      field: 'from',
      cellRendererFramework: ({ value }) => {
        return (
          <p className="text-gradient">
            {value.item?.user[0]?.username
              ? `@${value.item?.user[0].username}`
              : shortAddress(
                  value.item?.user[0]?.publicAddress || value.item?.userAddress,
                  4
                )}
          </p>
        );
      }
    },
    {
      headerName: 'Date',
      minWidth: 120,
      flex: 1,
      field: 'date',
      type: 'rightAligned',
      cellRenderer: ({ value }) => {
        if (value) {
          const deadline = moment(value, 'YYYY-MM-DD');
          if (
            moment.duration(deadline.diff(moment().startOf('day'))).asDays() ===
            0
          ) {
            return 'Today';
          } else {
            return (
              moment.duration(deadline.diff(moment().startOf('day'))).asDays() *
                -1 +
              ' day ago'
            );
          }
        } else {
          return 'in 2days';
        }
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
