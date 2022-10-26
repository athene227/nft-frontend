import SEO from '@americanexpress/react-seo';
import { ExplorePageSeo } from 'src/config/seo';
import ExploreCollections from 'src/screens/explore/exploreComponents/exploreCollections/ExploreCollections';

import ExploreWrapper from './explore.style';

const ExploreCollectionScreen = () => {
  return (
    <ExploreWrapper>
      <div>
        <SEO {...ExplorePageSeo} />
        <ExploreCollections />
      </div>
    </ExploreWrapper>
  );
};
export default ExploreCollectionScreen;
