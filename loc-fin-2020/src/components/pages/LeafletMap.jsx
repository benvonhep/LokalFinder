import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { useSelector } from 'react-redux';
import './LeafletMap.scss'

const defaultLatLng = [48.22034, 16.35157];
const zoom = 13;


export default function LeafletMap() {
  const locations = useSelector(state => state.locations)
  console.log(locations, 'location');
  // const location = useSelector(state => state.location)
  const loading = useSelector(state => state.loading)

  return (
    <Map center={defaultLatLng} id="mapId" zoom={zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {!loading &&
        <>
          {locations.locations.map((location) => (
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>

          ))}
        </>
      }
    </Map>

  )
}
