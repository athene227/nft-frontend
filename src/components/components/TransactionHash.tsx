import React from 'react';

interface IProps {
  hash: string;
  title?: string;
}
const TransactionHash = (props: IProps) => {
  const { hash, title } = props;

  return (
    <div className="transaction-hash-container mt-3">
      {title && <h6>{title}:</h6>}
      <a
        className="transaction-hash"
        target="_blank"
        rel="noreferrer"
        href={`https://rinkeby.etherscan.io/tx/${hash}`}
      >
        {hash}
      </a>
    </div>
  );
};

export default TransactionHash;
