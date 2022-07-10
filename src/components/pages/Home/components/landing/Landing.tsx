import React from 'react';

import SliderMain from './SliderMain';

const Landing = () => {
  return (
    <section
      className="jumbotron breadcumb no-bg main-jumbo home-banner"
      style={{
        height: 'fit-content'
      }}
      // backgroundImage: `url(${'./img/snake.svg'})`,
    >
      <SliderMain />
    </section>
  );
};

export default Landing;
