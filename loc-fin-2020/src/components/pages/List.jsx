import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteLocation } from '../../store/actions/locationsAction';
import { usePosition } from '../hooks/usePosition';
import EditLocationModal from '../layout/EditLocationModal';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './List.scss';
import ListLocationCard from '../layout/ListLocationCard';

function List() {
  const locations = useSelector(state => state.locations)
  const [editmodalShow, setEditModalShow] = useState(false);
  const loading = useSelector(state => state.loading)
  const [location, setLocation] = useState(null)
  const { latitude, longitude } = usePosition();
  const dispatch = useDispatch();

  const onItemClicked = (id) => {
    setEditModalShow(true)
    const location = locations.locations.find((location) => location.id === id)
    setLocation(location)
  }

  const deleteItem = (id) => {
    dispatch(deleteLocation(id))
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
                  <ListLocationCard
                    location={location}
                    onDelete={() => deleteItem(location.id)}
                    onEdit={() => onItemClicked(location.id)}
                    latitude={latitude}
                    longitude={longitude} />
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
