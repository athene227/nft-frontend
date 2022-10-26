import { Box } from '@mui/system';

interface IProps {
  description: string;
}

const NftDetailDescription = (props: IProps) => {
  const { description } = props;
  return (
    <>
      <Box className="nft-detail-description">
        <h3>Description</h3>
        <p>{description}</p>
      </Box>
    </>
  );
};
export default NftDetailDescription;
