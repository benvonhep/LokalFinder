import React, { memo, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

export default React.memo(function CarouselMemo({ location }) {
  return (
    <Carousel
      key={location.id}
      className="location-card-carousel"
      interval={10000000}
      wrap={false}
    >
      {location &&
        location.photos.map((photo) => (
          <Carousel.Item key={photo.id}>
            <img
              className="location-card-image"
              variant="top"
              src={photo.url}
              alt="sorry - there should be a picture here"
            />
          </Carousel.Item>
        ))}
    </Carousel>
  );
});
