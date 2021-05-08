import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { useAuth0 } from '@auth0/auth0-react';

import './ListLocationCard.scss';

export default function ListLocationCard(props) {
  const users = useSelector((state) => state.users);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const { isAuthenticated, user } = useAuth0();
  const [loadingData, setLoadingData] = useState(true);
  const [distance, setDistance] = useState(null);

  const [userProfile, setUserProfile] = useState();
  const { location, distanceArray, onDelete, onEdit } = props;

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    if (isAuthenticated && loadingData) {
      const findUserProfile = users.users.find(
        (userProfile) => user.email === userProfile.email,
      );
      setUserProfile(findUserProfile);
      setLoadingData(false);
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loadingData]);

  useEffect(() => {
    if (distanceArray) {
      const res = Object.entries(distanceArray).map((dist) => {
        if (dist[1].locationId === location.id) {
          return dist[1].distance;
        } else {
          return null;
        }
      });
      setDistance(res);
    }
  }, [distanceArray, location.id]);

  return (
    <>
      <Card className="location-card shadow-lg rounded">
        <Carousel
          key={index}
          className="location-card-carousel"
          activeIndex={index}
          onSelect={handleSelect}
          interval={10000000}
          wrap={false}
        >
          {location.photos.map((photo) => (
            <Carousel.Item key={photo.id}>
              <Card.Img
                className="location-card-image"
                variant="top"
                src={photo.url}
                alt="sorry - there should be a picture here"
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <p className="location-card-no-gps-position">
          {distance === null ||
            (!distance && (
              <>
                <span>no gps position</span>
              </>
            ))}
        </p>

        <div
          className={`${
            open ? 'location-card-slider-open' : 'location-card-slider-close'
          }`}
        >
          {distance !== null && (
            <span
              className={`${
                open
                  ? 'location-card-gps-distance-open'
                  : 'location-card-gps-distance-closed'
              }`}
            >
              {distance}km
            </span>
          )}

          <Card.Title
            className="location-card-title"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <div className="location-card-location-name">{location.name}</div>
            <div className="location-card-details">
              {location.casual && !location.fancy && <>casual</>}
              {location.fancy && !location.casual && <>fancy</>}
              {location.fancy && location.casual && <>fancy | casual</>} |{' '}
              {location.food}
              {location.breakfast ? ' | breakfast' : ''}
              {location.brunch ? ' | brunch' : ''}
              {location.dinner ? ' | dinner' : ''}
              {location.lunch ? ' | lunch' : ''}
            </div>
            <MdKeyboardArrowUp
              className={`${
                open ? 'location-card-arrow-open' : 'location-card-arrow-close'
              }`}
            />
          </Card.Title>

          <div className="location-card-body">
            <p className="location-card-location-text">
              {location.description}
            </p>
          </div>

          <Card.Footer className="location-card-footer">
            <div className="location-card-contactGroup">
              <span>{location.phone}</span>
              <span>
                {location.street} {location.house_number}, {location.city}
              </span>
            </div>
            {!loadingData &&
              isAuthenticated &&
              userProfile.id === location.createdBy && (
                <div className="location-card-buttonGroup">
                  <Button size="sm" onClick={onEdit} variant="outline-warning">
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    onClick={onDelete}
                    variant="outline-danger ml-2"
                  >
                    Delete
                  </Button>
                </div>
              )}
          </Card.Footer>
        </div>
      </Card>
    </>
  );
}
