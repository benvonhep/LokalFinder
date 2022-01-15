import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { useAuth0 } from '@auth0/auth0-react';
import CarouselMemo from './CarouselMemo';
import LinkWrapper from './LinkWrapper';
import { FcPhone } from 'react-icons/fc';
import { SiGooglemaps } from 'react-icons/si';

import './ListLocationCard.scss';

const ListLocationCard = (props) => {
  const users = useSelector((state) => state.users);
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useAuth0();
  const [loadingData, setLoadingData] = useState(true);

  const [userProfile, setUserProfile] = useState();
  const { location, onDelete, onEdit } = props;

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

  return (
    <>
      <Card className="location-card shadow-lg rounded ">
        <div className={`${open ? 'hideCarouselControl' : ''}`}>
          <CarouselMemo location={location} />
        </div>

        <div
          className={`${
            open ? 'location-card-slider-open' : 'location-card-slider-close'
          }`}
        >
          <div
            className={`${
              open
                ? 'location-card-gps-distance-open'
                : 'location-card-gps-distance-closed'
            }`}
          >
            {location.distance !== null && location.distance ? (
              <div>{location.distance} km</div>
            ) : (
              <span>no gps</span>
            )}
          </div>

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
              {location.night ? ' | night' : ''}
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
              <a
                className="location-card-footer-icon"
                href={`tel: + ${location.phone}`}
              >
                <FcPhone size={30} />
              </a>
              <a
                className="location-card-footer-icon"
                href={`http://www.google.com/maps/place/${location.latitude},${location.longitude}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <SiGooglemaps size={28} />
              </a>
              {!isAuthenticated && (
                <span className="location-card-footer-icon">
                  {location.street} {location.house_number}, {location.city}
                </span>
              )}
            </div>
            <div className="location-card-buttonGroup">
              {!loadingData &&
                isAuthenticated &&
                userProfile.id === location.createdBy && (
                  <>
                    <Button
                      size="sm"
                      onClick={onEdit}
                      variant="outline-warning ml-1"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      onClick={onDelete}
                      variant="outline-danger ml-1 mr-1"
                    >
                      Delete
                    </Button>
                  </>
                )}

              <LinkWrapper link={location.bloglink}></LinkWrapper>
            </div>
          </Card.Footer>
        </div>
      </Card>
    </>
  );
};

export default React.memo(ListLocationCard);
