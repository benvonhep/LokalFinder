import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteLocation } from '../../store/actions/locationsAction';
import { UsePosition } from '../hooks/UsePosition';
import { ListLocationCard, Spinner } from '../layout';
import LocationModal from '../layout/LocationModal';
import { Button } from 'react-bootstrap';

import './List.scss';

function List(props) {
  const [modalShow, setModalShow] = useState(false);
  // const loading = true;
  const loading = useSelector((state) => state.loading);
  const [location, setLocation] = useState(null);
  const { locations } = props;
  const { latitude, longitude } = UsePosition();

  const dispatch = useDispatch();

  const onItemEditClicked = (id) => {
    setModalShow(true);
    const location = locations.find((location) => location.id === id);
    setLocation(location);
  };

  const deleteItem = (id) => {
    dispatch(deleteLocation(id));
  };

  return (
    <div className="container listcontainer">
      <div style={{ color: 'red' }}></div>
      {loading && <Spinner />}
      {!loading && (
        <div className="location-card-grid">
          {locations &&
            locations.length &&
            locations.map((location) => (
              <div className="card-Grid-Item" key={location.id}>
                <ListLocationCard
                  location={location}
                  onDelete={() => deleteItem(location.id)}
                  onEdit={() => onItemEditClicked(location.id)}
                  latitude={latitude}
                  longitude={longitude}
                />
              </div>
            ))}
        </div>
      )}
      {location && (
        <LocationModal
          show={modalShow}
          // userName={userProfile.username}
          // id={userProfile.id}
          location={location}
          type="editLocation"
          onHide={() => setModalShow(false)}
        />
      )}
    </div>
  );
}

export default List;
