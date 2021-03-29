import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteLocation } from '../../store/actions/locationsAction';
import  {UsePosition}  from '../hooks/UsePosition';
import { ListLocationCard, Spinner } from '../layout';
import LocationModal from '../layout/LocationModal';

import './List.scss';

function List(props) {
  const locations = useSelector(state => state.locations)
  const [modalShow, setModalShow] = useState(false);
  const loading = useSelector(state => state.loading)
  const [location, setLocation] = useState(null)
  const { latitude, longitude } = UsePosition();
  const dispatch = useDispatch();

  const onItemEditClicked = (id) => {
    setModalShow(true)
    const location = locations.locations.find((location) => location.id === id)
    setLocation(location)
  }

  const { activeFilter } = props;

  const deleteItem = (id) => {
    dispatch(deleteLocation(id))
  }


  return (
    <div className="container listcontainer">
      <div style={{color: 'red'}}>
      {activeFilter ? <div>FILTERPROP - {activeFilter.sort().map((text)=> (
        <div key={text}>{text}</div>
      ))} - TEST</div> : <div>loading....</div>}
      {props.activeFilter}</div>
      {loading &&
        <Spinner/>
      }
      {!loading &&
        <div className="location-card-grid">
          {locations.locations.map((location) => (
            <div className="card-Grid-Item" key={location.id}>

              <ListLocationCard

                location={location}
                onDelete={() => deleteItem(location.id)}
                onEdit={() => onItemEditClicked(location.id)}
                latitude={latitude}
                longitude={longitude} />
            </div>
          ))}
        </div>
      }
      {location &&
        <LocationModal
          show={modalShow}
          // userName={userProfile.username}
          // id={userProfile.id}
          location={location}
          type="editLocation"
          onHide={() => setModalShow(false)} />}
    </div>
  )
}

export default List;
