import React, { memo, useState } from 'react';
import NftCard from './NftCard';
import Loader from './Loader';
import Alert from './Alert';
import { ALERT_TYPE } from 'src/enums';
import { INft } from 'src/types/nfts.types';

// react functional component
const ColumnNewRedux = (props: {
  data: INft[];
  loading: boolean;
  error: string;
  showLoadMore?: boolean;
  shuffle?: boolean;
}) => {
  const { data, loading, error, showLoadMore = true, shuffle = false } = props;
  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }: any) => {
    const currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  const loadMore = () => {
    // dispatch(actions.fetchListedNfts());
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Alert text={error} type={ALERT_TYPE.DANGER} />;
  }
  console.log(data);
  return (
    <div className="row">
      {data &&
        data.map((nft, index) => (
          <NftCard
            nft={nft}
            key={index}
            onImgLoad={onImgLoad}
            height={height}
          />
        ))}
      {/* {showLoadMore && data.length <= 20 &&
                <div className='col-lg-12'>
                    <div className="spacer-single"></div>
                    <span onClick={loadMore} className="btn-main lead m-auto">Load More</span>
                </div>
            } */}
    </div>
  );
};

export default memo(ColumnNewRedux);
