import { navigate } from '@reach/router';
import React, { memo, useState } from 'react';
import NFT721 from 'src/abis/new/NFT721.json';
import NFT1155 from 'src/abis/new/NFT1155.json';
import {
  ITEM_CREATE_STATUS,
  ITEM_CREATE_STATUS_LABEL,
  MARKET_CONTRACT_EVENTS
} from 'src/enums';
import { getImage } from 'src/services/ipfs';
import { MarketItemCreateProgress } from 'src/types/nfts.types';

import TransactionHash from '../TransactionHash';
import ProcessStep from './ProcessStep';
interface IProps {
  progress: MarketItemCreateProgress;
  lazyMint: boolean;
  events: any[];
  onClose: () => void;
  onRetry: () => void;
  onReset: () => void;
}

const CreateItemProgressPopUp = (props: IProps) => {
  const { progress, events, onClose, onRetry, onReset, lazyMint } = props;
  const {
    status,
    imageUrl,
    error,
    tokenTransactionHash,
    listingTransactionHash,
    tokenId,
    multiple,
    nftAddress
  } = progress;

  // const tokenTransactionHash = transactionHash;
  // const listingEvent = events.find(
  //   ({ eventName, listingId }) =>
  //     (eventName === MARKET_CONTRACT_EVENTS.SimpleMarketItemCreated ||
  //       eventName === MARKET_CONTRACT_EVENTS.AuctionMarketItemCreated) &&
  //     listingId === progress.listingId
  // );
  // const listingTransactionHash = listingEvent?.transactionHash;

  const OperationFailed = () => (
    <div className="operation-failed-wrapper mb-2">
      <div className="mr-2">Operation couldn{`'`}t be completed</div>
      <input
        type="button"
        className="btn-main btn_gradient"
        value="Retry"
        onClick={onRetry}
      />
    </div>
  );
  return (
    <div className="maincheckout modal-style-1 modal-width-small responsive-popup">
      <button className="btn-close" onClick={onClose}>
        <span aria-hidden="true">&times;</span>
      </button>
      <div className="modal-content">
        <div className="collection-progress">
          <div className="row">
            <div className="col-md-12">
              <ProcessStep
                progress={progress}
                value={ITEM_CREATE_STATUS.IPFS_FILE}
                text={ITEM_CREATE_STATUS_LABEL.IPFS_FILE}
              />
              {status === ITEM_CREATE_STATUS.IPFS_FILE && error && (
                <OperationFailed />
              )}
              <ProcessStep
                progress={progress}
                value={ITEM_CREATE_STATUS.IPFS_METADATA}
                text={ITEM_CREATE_STATUS_LABEL.IPFS_METADATA}
              />
              {status === ITEM_CREATE_STATUS.IPFS_METADATA && error && (
                <OperationFailed />
              )}
              {lazyMint && (
                <>
                  <ProcessStep
                    progress={progress}
                    value={ITEM_CREATE_STATUS.LAZY_MINT_NFT}
                    text={ITEM_CREATE_STATUS_LABEL.LAZY_MINT_NFT}
                  />
                  {status === ITEM_CREATE_STATUS.LAZY_MINT_NFT && error && (
                    <OperationFailed />
                  )}
                </>
              )}
              {!lazyMint && (
                <>
                  <ProcessStep
                    progress={progress}
                    value={ITEM_CREATE_STATUS.CREATE_NFT}
                    text={ITEM_CREATE_STATUS_LABEL.CREATE_NFT}
                  />
                  {status === ITEM_CREATE_STATUS.CREATE_NFT && error && (
                    <OperationFailed />
                  )}
                  {tokenTransactionHash && (
                    <TransactionHash
                      title="Transaction Hash"
                      hash={tokenTransactionHash}
                    />
                  )}
                  <ProcessStep
                    progress={progress}
                    value={ITEM_CREATE_STATUS.LIST_ITEM}
                    text={ITEM_CREATE_STATUS_LABEL.LIST_ITEM}
                  />
                  {status === ITEM_CREATE_STATUS.LIST_ITEM && error && (
                    <OperationFailed />
                  )}
                  {listingTransactionHash && (
                    <TransactionHash
                      title="Transaction Hash"
                      hash={listingTransactionHash}
                    />
                  )}
                </>
              )}
            </div>
            <div className="col-md-12">
              {status === ITEM_CREATE_STATUS.FINISHED && (
                <div className="text-center mt-2 nft-status-created">
                  <div className="nft-image-final">
                    <img
                      className="nft-created-img"
                      src={getImage(imageUrl)}
                      alt="Item Created"
                    />
                    <div className="highlight-title mb-2">
                      <span>Congratulations!</span> Your NFT is listed on the
                      Market!
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col-sm-6">
                      <input
                        className="btn-main mb-1 btn_gradient view-nft-btn"
                        type="button"
                        value="View NFT"
                        onClick={() => {
                          // if (!listingEvent) return;
                          // const { multiple, tokenId, nftAddress } = listingEvent;
                          if (!multiple) {
                            navigate(
                              `/ItemDetail/${tokenId}/${nftAddress.toLowerCase()}`
                            );
                          } else {
                            navigate(
                              `/ItemDetailMultiple/${tokenId}/${nftAddress.toLowerCase()}`
                            );
                          }
                        }}
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        className="btn-main btn_gradient"
                        type="button"
                        value="Create New"
                        onClick={onReset}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CreateItemProgressPopUp);
