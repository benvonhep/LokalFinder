import React, { useEffect, useState, useCallback } from 'react'
import { latLng } from 'leaflet';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import { MdKeyboardArrowUp } from 'react-icons/md';
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
        <div className="cardImage">
          <Card.Img className="card-image" variant="top" src={props.location.photo}>
          </Card.Img>
        </div>
        <p className="no-gps-position">
          {!props.latitude &&
            <>
              <span>no gps position</span>
            </>
          }
        </p>

        <div className={`${open ? 'slider-open' : 'slider-closed'}`} >
          <Card.Title
            // className="title-closed title-open"
            // className={`${open ? 'title-open' : 'title-closed'}`}
            onClick={() => { setOpen(!open); console.log(open); }}
          >
            {props.latitude &&
              <span className="gps-distance">{distanceValue}km</span>
            }

            <div>{props.location.name}</div>
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
            <MdKeyboardArrowUp className={`${open ? 'arrow-open' : 'arrow-closed'}`} />
          </Card.Title>



          <div className={`${open ? 'info-collapse-open' : 'info-collapse-closed'}`}>
            <div className="card-body">
              <p className="location-text">{props.location.description}</p>
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
        </div>



      </Card>
    </>
  )
}
