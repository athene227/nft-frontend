import { Box } from '@mui/system';
import NftAttribute from 'src/components/NftAttributes';
import { INftAttribute } from 'src/types/nfts.types';

interface IProps {
  attributes: any;
}

const NftDetailProperties = (props: IProps) => {
  const { attributes } = props;
  const attributes_property = attributes.filter((attribute: any) => {
    return attribute.display_type === 'string';
  });
  const attributes_stat = attributes.filter((attribute: any) => {
    return attribute.display_type !== 'string';
  });
  return (
    <>
      <Box className="nft-detail-properties">
        <h3>Properties & Stats</h3>
        {attributes.length === 0 ? (
          <h4>No properties & stats</h4>
        ) : (
          <Box className="attribute-fields">
            <Box className="attribute-fields-property">
              {attributes_property.map(
                (attribute: INftAttribute, index: number) => (
                  <div className="attribute-field-property" key={index}>
                    <NftAttribute {...attribute} />
                  </div>
                )
              )}
            </Box>
            <Box className="attribute-fields-stat">
              {attributes_stat.map(
                (attribute: INftAttribute, index: number) => (
                  <div className="attribute-field-stat" key={index}>
                    <NftAttribute {...attribute} />
                  </div>
                )
              )}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};
export default NftDetailProperties;
