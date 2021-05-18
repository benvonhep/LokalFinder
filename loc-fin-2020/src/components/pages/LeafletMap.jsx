import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
  Map,
  TileLayer,
  Marker,
  CircleMarker,
  ZoomControl,
} from 'react-leaflet';
import './LeafletMap.scss';
import { MapLocationModal, Spinner } from '../layout';

const defaultLatLng = [48.22034, 16.35157];
const zoom = 13;

function LeafletMap(props) {
  const [cardModalShow, setCardModalShow] = useState(false);
  const loading = useSelector((state) => state.loading);
  const [location, setLocation] = useState(null);

  const { latitude, longitude, locations, loadingLocation } = props;
  const markerClick = (id) => {
    setCardModalShow(true);
    const location = locations.find((location) => location.id === id);
    setLocation(location);
  };

  return (
    <>
      {!loadingLocation ? (
        <Map center={defaultLatLng} id="mapId" zoom={zoom} zoomControl={false}>
          <ZoomControl />
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {!latitude ||
            (latitude === null && !longitude && (
              <h3 className="nogps-h3">
                No Gps ... still thinking of where you are...
              </h3>
            ))}
          {latitude && longitude && (
            <CircleMarker
              radius="10"
              fillColor="blue"
              center={[latitude, longitude]}
            ></CircleMarker>
          )}
          {!loading && (
            <>
              {locations &&
                locations.map((location) => (
                  <Marker
                    key={location.id}
                    onClick={() => markerClick(location.id)}
                    position={[location.latitude, location.longitude]}
                  ></Marker>
                ))}
            </>
          )}
        </Map>
      ) : (
        <>
          <Spinner></Spinner>
          <span>... thinking of where you are ...</span>
        </>
      )}

      {cardModalShow && location && (
        <MapLocationModal
          show={cardModalShow}
          location={location}
          latitude={latitude}
          longitude={longitude}
          onHide={() => setCardModalShow(false)}
        />
      )}
    </>
  );
}
export default LeafletMap;
