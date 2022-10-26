import ItemDetailMultipleScreen from 'src/screens/itemDetailMultiple/ItemDetailMultipleScreen';

const ItemDetailMultiple = (props: { tokenId: string; nftAddress: string }) => {
  return (
    <div>
      <ItemDetailMultipleScreen
        tokenId={props.tokenId}
        nftAddress={props.nftAddress}
      />
    </div>
  );
};
export default ItemDetailMultiple;
