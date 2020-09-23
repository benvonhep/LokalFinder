import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteLocation, getLocationFromSelect } from '../../store/actions/locationsAction';
import { usePosition } from '../hooks/usePosition';
import { latLng } from 'leaflet';
import EditLocationModal from '../layout/EditLocationModal';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import './List.scss';
import { render } from '@testing-library/react';
// import Spinner from '../layout/Spinner';
// import ILocation from '../interfaces/ILocation'

function List() {
  const [editmodalShow, setEditModalShow] = useState(false);
  const locations = useSelector(state => state.locations)
  const [location, setLocation] = useState(null)
  const loading = useSelector(state => state.loading)
  const { latitude, longitude, error } = usePosition();

  const dispatch = useDispatch();

  const onItemClicked = (id) => {
    setEditModalShow(true)
    const location = locations.locations.find((location) => location.id === id)
    setLocation(location)
  }

  const deleteItem = (id) => {
    dispatch(deleteLocation(id))
  }

  const getDistance = (location) => {
    const latlngCurrentUserPosition = latLng(latitude, longitude)
    const latlngLocationPosition = latLng(location.latitude, location.longitude)
    const userLocationDistanceMeter = latlngCurrentUserPosition.distanceTo(latlngLocationPosition);
    const userLocationDistanceKm = (userLocationDistanceMeter / 1000).toFixed(1)
    return <span>approximately {userLocationDistanceKm}km</span>
  }

  return (
    <div>
      <CardGroup className="app-card-list">
        <Row className="d-flex justify-content-center cardRow">
          {loading &&
            <h1>loading ....</h1>
          }
          {!loading &&
            <>
              {locations.locations.map((location) => (

                <Col xs={true} sm={true} lg={true} key={location.id} className="cardColumninRow" >
                  <Card className="card shadow-lg rounded">
                    <Card.Img className="card-image" variant="top" src={location.photo} />
                    <Card.Body className="card-body">
                      <Card.Title>{location.name}</Card.Title>
                      <Card.Text className="body-content">
                        {location.description}
                        <br></br>
                        {latitude &&
                          <span>
                            {getDistance(location)}
                          </span>
                        }
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="footer">
                      <small className="address">{location.street}, {location.city}</small>
                      <div className="buttonGroup">
                        <Button size="sm" onClick={() => { onItemClicked(location.id) }} variant="outline-warning">Edit</Button>
                        <Button size="sm" onClick={() => { deleteItem(location.id) }} variant="outline-danger ml-2">Delete</Button>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </>
          }
        </Row>
      </CardGroup>
      {location &&
        <EditLocationModal
          show={editmodalShow}
          location={location}
          onHide={() => setEditModalShow(false)} />}
    </div>
  )
}

export default List;
