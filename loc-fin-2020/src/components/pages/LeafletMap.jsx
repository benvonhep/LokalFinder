import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Map, TileLayer, Marker, CircleMarker } from 'react-leaflet';
import { usePosition } from '../hooks/usePosition';
import './LeafletMap.scss'
import MapLocationModal from '../layout/MapLocationModal';

const defaultLatLng = [48.22034, 16.35157];
const zoom = 13;

function LeafletMap() {
  const locations = useSelector(state => state.locations);
  const [smShow, setSmShow] = useState(false);
  const loading = useSelector(state => state.loading);
  const [location, setLocation] = useState(null)
  const { latitude, longitude, error } = usePosition();

  const markerClick = (id) => {
    setSmShow(true)
    const location = locations.locations.find((location) => location.id === id)
    setLocation(location)
  }



  return (
    <>
      <Map center={defaultLatLng} id="mapId" zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!latitude && !longitude &&
          <h3 className="nogps-h3">Still thinking of where you are... {error}</h3>
        }
        {latitude && longitude &&
          <CircleMarker
            radius="10"
            fillColor="blue"
            center={[latitude, longitude]}
          >
          </CircleMarker>
        }
        {!loading &&
          <>
            {locations.locations.map((location) => (
              <Marker
                key={location.id}
                onClick={() => markerClick(location.id)}
                position={[location.latitude, location.longitude]}>
              </Marker>
            ))}
          </>
        }
      </Map>
      <MapLocationModal
        show={smShow}
        location={location}
        latitude={latitude}
        longitude={longitude}
        onHide={() => setSmShow(false)} />
    </>
  )
}
export default LeafletMap;