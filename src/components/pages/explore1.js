import React from 'react';
import ColumnNewThreeColRedux from '../components/ColumnNewThreeColRedux';
import Footer from '../components/footer';
import TopFilterBar from '../components/TopFilterBar';

const exploreOld = () => (
  <div>
    <section className="jumbotron breadcumb no-bg">
      <div className="mainbreadcumb">
        <div className="container">
          <div className="row m-10-hor">
            <div className="col-12">
              <h1 className="text-center">Explore</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="container">
      <div className="row">
        <div className="col-lg-12">
          <TopFilterBar />
        </div>
      </div>
      <ColumnNewThreeColRedux />
    </section>

    <Footer />
  </div>
);
export default exploreOld;
