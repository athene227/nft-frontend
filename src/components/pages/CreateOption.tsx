import React from 'react';
import { navigate } from '@reach/router';

import Footer from '../components/footer';

function CreateOption() {
  const navigateToSingle = () => {
    navigate('/createSingle');
  };

  const navigateToMultiple = () => {
    navigate('/createMultiple');
  };

  return (
    <div className="no-bottom no-top" id="content">
      <div id="top"></div>

      <section
        className="createOption"
        id="subheader"
        data-bgimage="url(images/background/subheader-dark.jpg) top"
      >
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Create</h1>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="section">
        <div className="container">
          <div className="row wow fadeIn">
            <div className="col-md-6 offset-md-3">
              <p>
                Choose "Single" if you want your collectible to be one of a kind
                or "Multiple" if you want to sell one collectible times
              </p>
              <button className="opt-create" onClick={navigateToSingle}>
                <img src="./img/misc/grey-coll-single.png" alt="" />
                <h3>Single</h3>
              </button>
              <button className="opt-create" onClick={navigateToMultiple}>
                <img src="./img/misc/grey-coll-multiple.png" alt="" />
                <h3>Multiple</h3>
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default CreateOption;
