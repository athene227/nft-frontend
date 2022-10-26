import { navigate } from '@reach/router';
import React, { memo } from 'react';
import { getImage } from 'src/services/ipfs';
import { ICollection } from 'src/types/collections.types';

interface IProps {
  collection: ICollection;
  className?: string;
}
const CollectionCard = ({
  collection,
  className = 'd-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4 custom_col'
}: IProps) => {
  const navigateTo = (link: string) => {
    navigate(link);
  };

  console.log(
    '🚀 ~ file: CollectionCard.tsx ~ line 19 ~ collection',
    collection
  );
  return (
    <div
      className={className}
      onClick={() => navigateTo(`/collection/${collection.id}`)}
    >
      <div className="d-item">
        <div className="nft__item nft-item-custom">
          <div className="nft-item-customcontent">
            <div className={`nft_item__top_image`}>
              {collection.user?.length && (
                <span>
                  <img
                    className="lazy"
                    src={getImage(collection.user[0]?.profileImage)}
                    alt=""
                  />
                </span>
              )}
            </div>
            <div className="nft__item_wrap">
              <span>
                <img
                  src={getImage(collection?.imageUrl)}
                  className="lazy img-fluid"
                  alt=""
                />
              </span>
            </div>

            <div className="nft__item_info d-flex flex-column ">
              <div className="col-12 d-flex justify-content-between mb-2 pl-2">
                <div>
                  <h4 className={`mb-0 nft__item__name_hover`}>
                    {collection?.user?.length && collection.user[0]?.username}
                  </h4>
                  <div className={`nft__item_user nft__item__name_hover`}>
                    {collection.name}
                  </div>
                </div>

                <div className="col-3">
                  <div className={`author_list_pp pulse_bottom`}>
                    <span>
                      <img className={''} src="./img/eth.png" alt=""></img>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12 pb-1 mt-3 pr-1 d-flex justify-content-between action_row_custom pl-2">
                <div className="nft__item_action btn-grad mb-2 btn_grad_custom">
                  <span>Buy Now</span>
                </div>
                <div className="nft__item_price">
                  0.3
                  <img
                    className="icon_margin"
                    src="./img/items/PulseChain-Logo-Shape.png"
                    alt=""
                  />
                  PLS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CollectionCard);
