import ItemDetailSingleScreen from 'src/screens/itemDetail/ItemDetailSingleScreen';

const ItemDetailSingle = (props: { tokenId: string; nftAddress: string }) => {
  return (
    <div>
      <ItemDetailSingleScreen
        tokenId={props.tokenId}
        nftAddress={props.nftAddress}
      />
    </div>
  );
};
export default ItemDetailSingle;
