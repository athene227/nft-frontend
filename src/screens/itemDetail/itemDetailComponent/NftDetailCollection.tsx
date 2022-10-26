import { Box, Container } from '@mui/system';
import React from 'react';

import { NftDetailCollectionWrapper } from '../itemdetail.style';
import NftDetailCollectionNew from './NftDetailCollectionNew';

interface IProps {
  collectionId: string;
  collectionName: string;
}

const NftDetailCollection = (props: IProps) => {
  const { collectionId, collectionName } = props;
  return (
    <>
      <NftDetailCollectionWrapper>
        <Container>
          <Box>
            <h2>More From This Collection</h2>
            <Box>
              <NftDetailCollectionNew
                collectionId={collectionId}
                collectionName={collectionName}
              />
            </Box>
          </Box>
        </Container>
      </NftDetailCollectionWrapper>
    </>
  );
};
export default NftDetailCollection;
