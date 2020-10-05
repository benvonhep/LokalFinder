import React, { useEffect, useState, useCallback } from 'react';
import { latLng } from 'leaflet';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { MdKeyboardArrowUp } from 'react-icons/md';
import './ListLocationCard.scss';

export default function ListLocationCard(props) {
  const [distanceValue, setDistanceValue] = useState()
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const getDistance = useCallback((location) => {
    if (props.location && props.latitude) {
      const latlngCurrentUserPosition = latLng(props.latitude, props.longitude)
      const latlngLocationPosition = latLng(props.location.latitude, props.location.longitude)
      const userLocationDistanceMeter = latlngCurrentUserPosition.distanceTo(latlngLocationPosition);
      const userLocationDistanceKm = (userLocationDistanceMeter / 1000).toFixed(1)
      setDistanceValue(userLocationDistanceKm)
    } else {
      return
    }
  }, [props.longitude, props.latitude, props.location]);

  const distance = useCallback(
    (location) => {
      getDistance(location)
    }, [getDistance])

  useEffect(() => {
    distance(props.location)
  }, [distance, props.location]);

  return (
    <>
      <Card className="location-card shadow-lg rounded">
        <Carousel activeIndex={index} onSelect={handleSelect} interval={10000000} wrap={false}>
          {props.location.photos.map(photo => (
            <Carousel.Item key={photo.id}>
              <Card.Img
                className={`${open ?
                  'location-card-image location-image-hide' :
                  'location-card-image d-block w-100'
                  }`}
                variant="top"
                src={photo.url}
                alt="sorry - there should be a picture here" />
            </Carousel.Item>
          ))}
        </Carousel>
        <p className="location-card-no-gps-position">
          {!props.latitude &&
            <>
              <span>no gps position</span>
            </>
          }
        </p>

        <div className={`${open ? 'location-card-slider-open' : 'location-card-slider-closed'}`} >
          {props.latitude &&
            <span className={`${open ? 'location-card-gps-distance-open' : 'location-card-gps-distance-closed'}`}>{distanceValue}km</span>
          }
          <Card.Title
            className="location-card-title"
            onClick={() => { setOpen(!open) }}
          >

            <div className="location-card-location-name">{props.location.name}</div>
            <div className="location-card-details">
              {props.location.casual && !props.location.fancy &&
                <>casual</>
              }
              {props.location.fancy && !props.location.casual &&
                <>fancy</>
              }
              {props.location.fancy && props.location.casual &&
                <>
                  fancy | casual
                      </>
              } | {props.location.food} | {props.location.occasion}
            </div>
            <MdKeyboardArrowUp className={`${open ? 'location-card-arrow-open' : 'location-card-arrow-closed'}`} />
          </Card.Title>

          <div className={`${open ? 'location-card-info-collapse-open' : 'location-card-info-collapse-closed'}`}>
            <div className="location-card-body">
              <p className="location-card-location-text">{props.location.description}</p>
            </div>

            <Card.Footer className="location-card-footer">
              <div className="location-card-contactGroup">
                <span>{props.location.phone}</span>
                <span>{props.location.street}, {props.location.city}</span>
              </div>

              <div className="location-card-buttonGroup">
                <Button size="sm" onClick={props.onEdit} variant="outline-warning">Edit</Button>
                <Button size="sm" onClick={props.onDelete} variant="outline-danger ml-2">Delete</Button>
              </div>
            </Card.Footer>
          </div>
        </div>

      </Card>
    </>
  )
}
