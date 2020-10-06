import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetLocation } from '../../store/actions/locationsAction';
import { latLng } from 'leaflet'

import { Modal } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel';
import './MapLocationModal.scss'

function MapLocationModal(props) {
  const loading = useSelector(state => state.loading)
  const [distanceValue, setDistanceValue] = useState()
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const onCancel = () => {
    props.onHide()
    dispatch(resetLocation())
  }

  const getDistance = useCallback((props) => {
    if (props.location && props.latitude) {
      const latlngCurrentUserPosition = latLng(props.latitude, props.longitude)
      const latlngLocationPosition = latLng(props.location.latitude, props.location.longitude)
      const userLocationDistanceMeter = latlngCurrentUserPosition.distanceTo(latlngLocationPosition);
      const userLocationDistanceKm = (userLocationDistanceMeter / 1000).toFixed(1)
      setDistanceValue(userLocationDistanceKm)
    } else {
      return
    }
  }, []);

  const distance = useCallback(
    (location) => {
      getDistance(location)
    }, [getDistance])

  useEffect(() => {
    distance(props)
  }, [distance, props]);

  return (
    <Modal
      {...props}
      aria-labelledby="example-modal-sizes-title-sm"
      centered
    >
      {loading &&
        <h1>loading ....</h1>
      }
      {props.location &&
        <Card className="map-location-card shadow-lg rounded">
          <Carousel activeIndex={index} onSelect={handleSelect} interval={10000000} wrap={false}>
            {props.location.photos.map(photo => (
              <Carousel.Item key={photo.id}>
                <Card.Img
                  className="map-location-card-image"
                  variant="top"
                  src={photo.url}
                  alt="sorry - there should be a picture here" />
              </Carousel.Item>
            ))}
          </Carousel>
          <p className="map-location-card-distance">
            {props.latitude &&
              <>
                <span>{distanceValue}km</span>
              </>
            }
            {!props.latitude &&
              <>
                <span className="map-location-card-no-gps-position">no gps position</span>
              </>
            }
          </p>
          <Card.Title className="map-location-card-title">
            {props.location.name}

            <div className="map-location-location-details">
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
          </Card.Title>
          <div className="map-location-card-body">
            <p className="map-location-card-text">{props.location.description}</p>
          </div>
          <Card.Footer className="map-location-card-footer">
            <div className="map-location-contactGroup">
              <span>{props.location.phone}</span>
              <span>{props.location.street}, {props.location.city}</span>
            </div>
            <div className="map-location-button-group">
              <Button size="sm" variant="outline-info" onClick={() => onCancel()}>Close</Button>
            </div>
          </Card.Footer>
        </Card>
      }
    </Modal >
  )
}
export default MapLocationModal;