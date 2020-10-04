import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteLocation } from '../../store/actions/locationsAction';
import { usePosition } from '../hooks/usePosition';
import { ListLocationCard, EditLocationModal } from '../layout';
import './List.scss';

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
    <div className="card-grid-container">

      {loading &&
        <h1>loading ....</h1>
      }
      {!loading &&
        <div className="card-grid">
          {locations.locations.map((location) => (
            <div className="card-Grid-Item" key={location.id}>

              <ListLocationCard

                location={location}
                onDelete={() => deleteItem(location.id)}
                onEdit={() => onItemClicked(location.id)}
                latitude={latitude}
                longitude={longitude} />
            </div>
          ))}
        </div>
      }
      {location &&
        <EditLocationModal
          show={editmodalShow}
          location={location}
          onHide={() => setEditModalShow(false)} />}
    </div>
  )
}

export default List;
