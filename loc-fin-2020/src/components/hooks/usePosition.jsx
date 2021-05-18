import { useState, useEffect } from 'react';

const defaultSettings = {
  enableHighAccuracy: false,
  timeout: 1000 * 60 * 1,
  maximumAge: 0,
};

export const UsePosition = (watch = true, settings = defaultSettings) => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const onChange = ({ coords, timestamp }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      timestamp,
    });
  };

  const onError = (error) => {
    setError(error.message);
    console.log('fehler im geo');
  };

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      setError('Geolocation is not supported');
      console.log('fehler im geo2');
      return;
    }

    let watcher = null;
    if (watch) {
      watcher = navigator.geolocation.watchPosition(
        onChange,
        onError,
        settings,
      );
    } else {
      navigator.geolocation.getCurrentPosition(onChange, onError, settings);
    }
    return () => watcher && navigator.geolocation.clearWatch(watcher);
  }, [settings, watch]);
  return { ...position, error };
};
