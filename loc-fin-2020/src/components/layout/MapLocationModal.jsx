import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetLocation } from '../../store/actions/locationsAction';
import { latLng } from 'leaflet'

import { Modal } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import './MapLocationModal.scss'

export default function MapLocationModal(props) {
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
    return <span>approximately {userLocationDistanceKm}km</span>
  }

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="example-modal-sizes-title-sm"
      centered
    >
      {loading &&
        <h1>loading ....</h1>
      }
      {props.location &&
        <Card className="card shadow-lg rounded">
          <Card.Img className="card-image" variant="top" src={props.location.photo} />
          <Card.Body className="card-body">
            <Card.Title>{props.location.name}</Card.Title>
            <Card.Text className="body-content">
              {props.location.description}
              <br></br>
              {props.latitude &&
                <span>
                  {getDistance(props.location)}
                </span>
              }
            </Card.Text>
          </Card.Body>
          <Card.Footer className="footer">
            <small className="address">{props.location.address, props.location.city}</small>
            <div className="buttonGroup">
              <Button size="sm" variant="outline-info" onClick={() => onCancel()}>Close</Button>
            </div>
          </Card.Footer>
        </Card>
      }
    </Modal>
  )
}
