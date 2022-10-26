import React from 'react';

const BorderImage = ({ image, alt, dimension }) => {
  return (
    <img
      className="border_image"
      src={image}
      alt={alt}
      style={{ maxWidth: dimension }}
    ></img>
  );
};

export default BorderImage;
