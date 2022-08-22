import React from 'react';

import HomeSlider from './landing.style.js';
import SliderMain from './SliderMain';

const Landing = () => {
  return (
    <HomeSlider>
      <section className="jumbotron breadcumb no-bg main-jumbo home-banner">
        <SliderMain />
      </section>
    </HomeSlider>
  );
};

export default Landing;
