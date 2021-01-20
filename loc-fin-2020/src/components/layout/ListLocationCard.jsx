import React, { useEffect, useState, useCallback } from 'react';
import { latLng } from 'leaflet';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { useAuth0 } from "@auth0/auth0-react";

import './ListLocationCard.scss';

export default function ListLocationCard(props) {
  const users = useSelector(state => state.users);
  const [distanceValue, setDistanceValue] = useState()
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0);
  const { isAuthenticated, user } = useAuth0();
  const [loadingData, setLoadingData] = useState(true)

  const [userProfile, setUserProfile] = useState()



  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


  useEffect(() => {
    if (isAuthenticated && loadingData) {
      const findUserProfile = users.users.find((userProfile) => user.email === userProfile.email)
      setUserProfile(findUserProfile)
      setLoadingData(false)
    } else {
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loadingData])

  const getDistance = useCallback(() => {
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
        <Carousel className="location-card-carousel" activeIndex={index} onSelect={handleSelect} interval={10000000} wrap={false}>
          {props.location.photos.map(photo => (
            <Carousel.Item key={photo.id}>
              <Card.Img
                className="location-card-image"
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

        <div className={`${open ? 'location-card-slider-open' : 'location-card-slider-close'}`} >
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
            <MdKeyboardArrowUp className={`${open ? 'location-card-arrow-open' : 'location-card-arrow-close'}`} />
          </Card.Title>

          <div className="location-card-body">
            <p className="location-card-location-text">{props.location.description}</p>
          </div>

          <Card.Footer className="location-card-footer">
            <div className="location-card-contactGroup">
              <span>{props.location.phone}</span>
              <span>{props.location.street} {props.location.house_number}, {props.location.city}</span>
            </div>
            {!loadingData && isAuthenticated && userProfile.id === props.location.createdBy &&
              <div className="location-card-buttonGroup">
                <Button size="sm" onClick={props.onEdit} variant="outline-warning">Edit</Button>
                <Button size="sm" onClick={props.onDelete} variant="outline-danger ml-2">Delete</Button>
              </div>
            }
          </Card.Footer>
        </div>
      </Card>
    </>
  )
}
