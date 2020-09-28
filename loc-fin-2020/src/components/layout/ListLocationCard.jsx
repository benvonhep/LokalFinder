import React, { useEffect, useState, useCallback } from 'react'
import { latLng } from 'leaflet';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import './ListLocationCard.scss';


export default function ListLocationCard(props) {
  const [distanceValue, setDistanceValue] = useState()
  const [open, setOpen] = useState(false)

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
        {/* <div className="card-body"> */}
        <Card.Title
        >
          <div onClick={() => setOpen(!open)} aria-controls="example-collapse-text"
            aria-expanded={open} className="collapse-button-div">

            {props.location.name}
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
          </div>
        </Card.Title>
        <Collapse in={open}>
          <div id="example-collapse-text">
            <div className="body-content card-body">
              <div className="description">{props.location.description}</div>
            </div>

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
          </div>

        </Collapse>
        {/* </div> */}


      </Card>
    </>
  )
}
