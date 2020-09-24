import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteLocation } from '../../store/actions/locationsAction';
import { usePosition } from '../hooks/usePosition';
import { latLng } from 'leaflet';
import EditLocationModal from '../layout/EditLocationModal';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import './List.scss';
// import Spinner from '../layout/Spinner';
// import ILocation from '../interfaces/ILocation'

function List() {
  const [editmodalShow, setEditModalShow] = useState(false);
  const [location, setLocation] = useState(null)
  const [distanceValue, setDistanceValue] = useState()
  const locations = useSelector(state => state.locations)
  const loading = useSelector(state => state.loading)
  const { latitude, longitude } = usePosition();
  // "error" from useposition
  const dispatch = useDispatch();

  const onItemClicked = (id) => {
    setEditModalShow(true)
    const location = locations.locations.find((location) => location.id === id)
    setLocation(location)
  }

  const deleteItem = (id) => {
    dispatch(deleteLocation(id))
  }

  const getDistance = useCallback((location) => {
    if (location && latitude) {
      const latlngCurrentUserPosition = latLng(latitude, longitude)
      const latlngLocationPosition = latLng(location.latitude, location.longitude)
      const userLocationDistanceMeter = latlngCurrentUserPosition.distanceTo(latlngLocationPosition);
      const userLocationDistanceKm = (userLocationDistanceMeter / 1000).toFixed(1)
      setDistanceValue(userLocationDistanceKm)
    } else {
      return
    }
  }, [longitude, latitude]);

  const distance = useCallback(
    (location) => {
      getDistance(location)
    }, [getDistance])

  useEffect(() => {
    distance(location)
  }, [distance, location]);

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
                    <Card.Img className="card-image" variant="top" src={location.photo}>
                    </Card.Img>
                    <p className="distance">
                      {latitude &&
                        <>
                          <span>{distanceValue}km</span>
                        </>
                      }
                      {!latitude &&
                        <>
                          <span>no gps position</span>
                        </>
                      }
                    </p>
                    <Card.Body className="card-body">
                      <Card.Title>{location.name}</Card.Title>
                      <div className="body-content">
                        <div className="location-details">
                          {location.casual && !location.fancy &&
                            <>{location.casual}</>
                          }
                          {location.fancy && !location.casual && <>{location.fancy}</>}
                          {location.fancy && location.casual &&
                            <>
                              {location.casual} | {location.fancy}
                            </>
                          } | {location.food} | {location.occasion}
                        </div>

                        <div className="description">{location.description}</div>

                      </div>
                    </Card.Body>
                    <Card.Footer>

                      <div className="contactGroup">
                        <span>{location.phone}</span>
                        <span>{location.street}, {location.city}</span>
                      </div>

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
