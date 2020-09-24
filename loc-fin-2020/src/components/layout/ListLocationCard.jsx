import React, { useEffect, useState, useCallback } from 'react'
import { latLng } from 'leaflet';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import './ListLocationCard.scss';


export default function ListLocationCard(props) {
  const [distanceValue, setDistanceValue] = useState()

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
    <div>
      <Card className="card shadow-lg rounded">
        <Card.Img className="card-image" variant="top" src={props.location.photo}>
        </Card.Img>
        <p className="distance">
          {props.latitude &&
            <>
              <span>{distanceValue}km</span>
            </>
          }
          {!props.latitude &&
            <>
              <span>no gps position</span>
            </>
          }
        </p>
        <Card.Body className="card-body">
          <Card.Title>{props.location.name}</Card.Title>
          <div className="body-content">
            <div className="location-details">
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
            <div className="description">{props.location.description}</div>
          </div>
        </Card.Body>
        <Card.Footer>

          <div className="contactGroup">
            <span>{props.location.phone}</span>
            <span>{props.location.street}, {props.location.city}</span>
          </div>

          <div className="buttonGroup">
            <Button size="sm" onClick={props.onEdit} variant="outline-warning">Edit</Button>
            <Button size="sm" onClick={props.onDelete} variant="outline-danger ml-2">Delete</Button>
          </div>

        </Card.Footer>
      </Card>
    </div>
  )
}
