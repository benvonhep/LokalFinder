import React, { useEffect, useState, memo } from 'react';
import './DisplayDistance.scss';

export default function DisplayDistance(props) {
  const { distanceArray, id } = props;

  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (distanceArray) {
      const res = Object.entries(distanceArray).map((dist) => {
        if (dist[1].locationId === id && dist[1].distance !== null) {
          return dist[1].distance;
        } else {
          return null;
        }
      });
      setDistance(res);
    }
  }, [distanceArray, id]);

  if (distance === null || !distance) {
    return <span>no gps</span>;
  }
  return <span className="display-distance">{distance} km</span>;
}

// export const MemoDisplayDistance = memo(DisplayDistance);
