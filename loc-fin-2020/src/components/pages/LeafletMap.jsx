import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLocationFromSelect } from '../../store/actions/locationsAction';
import { Map, TileLayer, Marker } from 'react-leaflet';
import './LeafletMap.scss'
import MapLocationModal from '../layout/MapLocationModal';

const defaultLatLng = [48.22034, 16.35157];
const zoom = 13;

export default function LeafletMap() {
  const locations = useSelector(state => state.locations)
  const [smShow, setSmShow] = useState(false);
  const loading = useSelector(state => state.loading)
  const dispatch = useDispatch();

  const markerClick = (id) => {
    setSmShow(true)
    dispatch(getLocationFromSelect(id))
  }

  return (
    <>
      <Map center={defaultLatLng} id="mapId" zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!loading &&
          <>
            {locations.locations.map((location) => (
              <Marker
                key={location.id}
                onClick={markerClick}
                position={[location.latitude, location.longitude]}>
              </Marker>
            ))}
          </>
        }
      </Map>
      <MapLocationModal
        show={smShow}
        onHide={() => setSmShow(false)} />
    </>
  )
}
