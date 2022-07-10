import { navigate } from '@reach/router';
import React from 'react';

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
        className="jumbotron breadcumb no-bg main-jumbo"
        style={{
          height: 'fit-content'
        }}
      >
        <div className="center-y relative text-center">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Create</h1>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row wow justify-center fadeIn">
            <div className="col-md-8 offset-md-2">
              <p>
                Choose Single if you want your collectible to be one of a kind
                or Multiple if you want to sell one collectible times
              </p>
              <button
                style={{
                  height: 'fit-content'
                }}
                className={`opt-create opt_create_custom`}
                onClick={navigateToSingle}
              >
                <img src="./img/background/single.png" alt="" />
                <h3>Single</h3>
              </button>
              <button
                style={{
                  height: 'fit-content'
                }}
                className={`opt-create opt_create_custom`}
                onClick={navigateToMultiple}
              >
                <img src="./img/background/multi.png" alt="" />
                <h3>Multiple</h3>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CreateOption;
