import SEO from '@americanexpress/react-seo';
import { ExplorePageSeo } from 'src/config/seo';

import ExploreItems from './components/exploreItems/ExploreItems';

const explore = () => {
  return (
    <div>
      <SEO {...ExplorePageSeo} />
      <ExploreItems />
    </div>
  );
};
export default explore;
