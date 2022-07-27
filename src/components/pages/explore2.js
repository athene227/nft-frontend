import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ColumnNewThreeColRedux from '../components/ColumnNewThreeColRedux';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import CheckboxFilter from '../components/CheckboxFilter';
import { filterStatus } from 'src/store/actions';
import { NftStatus } from 'src/enums';

const GlobalStyles = createGlobalStyle`
  .navbar {
    border-bottom: solid 1px rgba(255, 255, 255, .1) !important;
  }
`;

const Explore = () => {
  return (
    <div>
      <GlobalStyles />
      <section className="container">
        <div className="row">
          <div className="spacer-double"></div>
          <div className="col-md-3">
            <CheckboxFilter />
          </div>
          <div className="col-md-9">
            <ColumnNewThreeColRedux />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Explore;
