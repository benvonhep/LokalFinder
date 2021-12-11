import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

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
              alt="here should be something"
            />
          </Carousel.Item>
        ))}
    </Carousel>
  );
});
