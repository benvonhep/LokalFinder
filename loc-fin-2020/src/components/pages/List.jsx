import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteLocation } from '../../store/actions/locationsAction';
import { ListLocationCard, Spinner } from '../layout';
import LocationModal from '../layout/LocationModal';

import './List.scss';

function List(props) {
  const [modalShow, setModalShow] = useState(false);
  const loading = useSelector((state) => state.loading);
  const [location, setLocation] = useState(null);
  const { locations, distanceArray } = props;
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
            locations.length > 0 &&
            locations.map((location) => (
              <div className="card-Grid-Item" key={location.id}>
                <ListLocationCard
                  distanceArray={distanceArray}
                  location={location}
                  onDelete={() => deleteItem(location.id)}
                  onEdit={() => onItemEditClicked(location.id)}
                />
              </div>
            ))}
        </div>
      )}
      {location && (
        <LocationModal
          show={modalShow}
          location={location}
          type="editLocation"
          onHide={() => setModalShow(false)}
        />
      )}
    </div>
  );
}

export default List;
