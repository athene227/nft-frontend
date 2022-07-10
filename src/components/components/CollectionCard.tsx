import { navigate } from '@reach/router';
import React, { memo } from 'react';
import { ICollection } from 'src/collections.types';
import { getImage } from 'src/services/ipfs';

interface IProps {
  collection: ICollection;
  className?: string;
}
const CollectionCard = ({
  collection,
  className = 'd-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4'
}: IProps) => {
  const navigateTo = (link: string) => {
    navigate(link);
  };

  console.log('collection', collection);
  return (
    <div
      className={className}
      onClick={() => navigateTo(`/collection/${collection.id}`)}
    >
      <div className="col">
        <div className="nft_coll">
          <div className="nft_wrap">
            <span>
              {' '}
              <img
                src={getImage(collection?.imageUrl)}
                className="lazy img-fluid"
                alt=""
              />
            </span>
          </div>
          <div className="nft_coll_pp">
            {collection.user?.length && (
              <span>
                <img
                  className="lazy"
                  src={getImage(collection.user[0]?.profileImage)}
                  alt=""
                />
              </span>
            )}
            {/* <i className="fa fa-check"></i> */}
          </div>
          <div className="nft_coll_info">
            <span>
              <h4>
                {collection?.user?.length && collection.user[0]?.username}
              </h4>
            </span>
            <span>{collection.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CollectionCard);
