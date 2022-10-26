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
import { NftOfferTableWrapper } from '../itemdetailMultiple.style';

interface IProps {
  offersList: any[];
  fetchOffersState: any;
  userAddress: string;
  ownerAddress: string;
  navigateToUserPage: any;
  openCancelOfferPopUp: () => void;
  openAcceptOfferPopUp: () => void;
  setCancelOfferState: any;
  setAcceptOfferState: any;
  cancelOfferState: any;
  acceptOfferState: any;
}

const NftOfferTable = (props: IProps) => {
  const {
    offersList,
    fetchOffersState,
    userAddress,
    ownerAddress,
    navigateToUserPage,
    openCancelOfferPopUp,
    openAcceptOfferPopUp,
    setCancelOfferState,
    setAcceptOfferState,
    cancelOfferState,
    acceptOfferState
  } = props;
  const [user_referrals, setUserReferrals] = useState<any[]>([]);

  useEffect(() => {
    const rowDataArr: any[] = [];
    offersList.map((offer, index) => {
      const rowItem = {
        id: index,
        from: {
          offer
        },
        quantity: { offer },
        price: { offer },
        difference: { offer },
        expiration: { offer },
        cancel: {
          show: userAddress === offer?.offererAddress,
          offer
        }
      };
      rowDataArr.push(rowItem);
    });
    setUserReferrals(rowDataArr);
  }, [offersList]);

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
              onClick={() => navigateToUserPage(value.offerer?.offererAddress)}
            >
              <UserAvatar
                className="lazy"
                image={value.offer?.offerer[0]?.profileImage}
                userAddress={value.offer?.offererAddress}
                blockSize={5}
                size={34}
              />
              <div className="title-image-details">
                <h3>
                  <BidIcon /> {value.offer?.amount}{' '}
                </h3>
                <p className="text-gradient">
                  {value.offer?.offerer[0]?.username
                    ? `@${value.offer?.offerer[0]?.username}`
                    : value.offer?.offererAddress}{' '}
                </p>
              </div>
            </div>
          </>
        );
      }
    },
    {
      headerName: 'Quantity',
      // icon: <BidIcon />,
      minWidth: 170,
      flex: 1,
      field: 'quantity',
      cellRenderer: ({ value }) => (value ? '$' + value.offer?.quanity : '0')
    },
    {
      headerName: 'USD Price',
      minWidth: 100,
      flex: 1,
      field: 'price',
      cellRenderer: ({ value }) =>
        value ? '$' + value.offer?.amount : '$25,000'
    },
    {
      headerName: 'Floore difference',
      minWidth: 125,
      flex: 1,
      field: 'difference',
      cellRenderer: ({ value }) =>
        value ? value.offer?.amount + ' %' : '14% below'
    },
    {
      headerName: 'Expiration',
      minWidth: 110,
      flex: 1,
      field: 'expiration',
      cellRenderer: ({ value }) => {
        if (value) {
          const deadline = moment(value.offer?.deadline, 'YYYY-MM-DD');
          return (
            'In ' +
            moment.duration(deadline.diff(moment().startOf('day'))).asDays() +
            ' days'
          );
        } else {
          return 'in 2days';
        }
      }
    },
    {
      headerName: '',
      minWidth: 120,
      flex: 1,
      field: 'cancel',
      cellRendererFramework: ({ value }) => {
        if (userAddress === ownerAddress) {
          if (
            acceptOfferState.loader &&
            acceptOfferState.selectedOffer &&
            acceptOfferState.selectedOffer.offerId === value.offer.offerId
          ) {
            return <Loader size={50} />;
          } else {
            return (
              <button
                className="btn-main btn-grad-outline"
                onClick={() => {
                  // _acceptOffer(offer);
                  setAcceptOfferState({
                    error: null,
                    loader: false,
                    selectedOffer: value.offer
                  });
                  openAcceptOfferPopUp();
                }}
              >
                Accept
              </button>
            );
          }
        } else {
          if (value.show) {
            if (
              cancelOfferState.loader &&
              cancelOfferState.selectedOffer &&
              cancelOfferState.selectedOffer.offerId === value.offer.offerId
            ) {
              return <Loader size={50} />;
            }
            return (
              <button
                className="btn-main btn-grad-outline"
                onClick={() => {
                  setCancelOfferState({
                    error: null,
                    loader: false,
                    selectedOffer: value.offer
                  });
                  openCancelOfferPopUp();
                }}
              >
                Cancel
              </button>
            );
          } else {
            return <></>;
          }
        }
      }
    }
  ];

  const defaultColDef = {
    resizable: true,
    sortable: true,
    wrapText: true
  };

  if (fetchOffersState.loader) {
    return <Loader size={50} />;
  }

  if (fetchOffersState.error) {
    return <Alert text={fetchOffersState.error} type={ALERT_TYPE.DANGER} />;
  }

  return (
    <>
      <NftOfferTableWrapper>
        <Box
          className="table-header"
          display="flex"
          justifyContent="space-between"
        >
          <h2>All Offers</h2>
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
export default NftOfferTable;
