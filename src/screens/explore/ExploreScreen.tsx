import SEO from '@americanexpress/react-seo';
import { ExplorePageSeo } from 'src/config/seo';
import ExploreItemsPage from 'src/screens/explore/exploreComponents/exploreItems/ExploreItemsPage';

import ExploreWrapper from './explore.style';

const ExploreScreen = () => {
  return (
    <ExploreWrapper>
      <div>
        <SEO {...ExplorePageSeo} />
        <ExploreItemsPage />
      </div>
    </ExploreWrapper>
  );
};
export default ExploreScreen;
