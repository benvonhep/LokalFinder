import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetLocation } from '../../store/actions/locationsAction';
import { latLng } from 'leaflet'

import { Modal } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import './MapLocationModal.scss'

function MapLocationModal(props) {
  const loading = useSelector(state => state.loading)
  const dispatch = useDispatch();

  const onCancel = async () => {
    props.onHide()
    dispatch(resetLocation())
  }

  const getDistance = (location) => {
    const latlngCurrentUserPosition = latLng(props.latitude, props.longitude)
    const latlngLocationPosition = latLng(location.latitude, location.longitude)
    const userLocationDistanceMeter = latlngCurrentUserPosition.distanceTo(latlngLocationPosition);
    const userLocationDistanceKm = (userLocationDistanceMeter / 1000).toFixed(1)
    return <span>{userLocationDistanceKm}km</span>
  }

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
        <Card className="card shadow-lg rounded">
          <Card.Img className="card-image" variant="top" src={props.location.photo}>
          </Card.Img>
          <div className="distance">
            {props.latitude &&
              <>
                {getDistance(props.location)}
              </>
            }</div>
          <Card.Body className="card-body">
            <Card.Title>{props.location.name}</Card.Title>
            <Card.Text className="body-content">
              <div className="location-details">
                {props.location.casual && !props.location.fancy &&
                  <>{props.location.casual}</>
                }
                {props.location.fancy && !props.location.casual && <>{props.location.fancy}</>}
                {props.location.fancy && props.location.casual &&
                  <>
                    {props.location.casual} | {props.location.fancy}
                  </>
                } | {props.location.food} | {props.location.occasion}
              </div>

              <div className="description">{props.location.description}</div>

            </Card.Text>
          </Card.Body>
          <Card.Footer>

            <div className="contactGroup">
              <span>{props.location.phone}</span>
              <span>{props.location.street}, {props.location.city}</span>
            </div>

            <div className="buttonGroup">
              <Button size="sm" variant="outline-info" onClick={() => onCancel()}>Close</Button>
            </div>

          </Card.Footer>
        </Card>




      }
    </Modal>
  )
}
export default MapLocationModal;