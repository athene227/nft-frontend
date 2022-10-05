import SEO from '@americanexpress/react-seo';
import { ExplorePageSeo } from 'src/config/seo';

import ExploreItems from './components/exploreItems/ExploreItems';
import ExploreWrapper from './explore.style';

const explore = () => {
  return (
    <ExploreWrapper>
      <div>
        <SEO {...ExplorePageSeo} />
        <ExploreItems />
      </div>
    </ExploreWrapper>
  );
};
export default explore;
