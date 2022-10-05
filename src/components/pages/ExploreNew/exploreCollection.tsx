import SEO from '@americanexpress/react-seo';
import { ExplorePageSeo } from 'src/config/seo';

import ExploreCollections from './components/exploreCollections/ExploreCollections';
import ExploreWrapper from './explore.style';

const explore = () => {
  return (
    <ExploreWrapper>
      <div>
        <SEO {...ExplorePageSeo} />
        <ExploreCollections />
      </div>
    </ExploreWrapper>
  );
};
export default explore;
