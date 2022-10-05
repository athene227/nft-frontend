import SEO from '@americanexpress/react-seo';
import { ExplorePageSeo } from 'src/config/seo';

import ExploreWrapper from '../ExploreNew/explore.style';
import ExploreItems from './components/exploreItems/ExploreItems';
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
