import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './LeafletMap.scss'

const defaultLatLng = [48.8534534, 2.9234234];
const zoom = 8;


export default function LeafletMap() {
  return (
    <Map center={defaultLatLng} id="mapId" zoom={zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={defaultLatLng}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
      </Marker>
    </Map>
    //     <Map
    //       id="mapId"
    //       center={defaultLatLng}
    //       zoom={zoom}>
    //
    //     </Map>
  )
}
