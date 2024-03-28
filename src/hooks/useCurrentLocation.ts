import { useEffect, useState } from 'react';

export const useCurrentLocation = () => {
  const [longitude, setLongitude] = useState<number>(
    localStorage.getItem('lastLng')
      ? Number(localStorage.getItem('lastLng'))
      : 126.97722,
  );
  const [latitude, setLatitude] = useState<number>(
    localStorage.getItem('lastLat')
      ? Number(localStorage.getItem('lastLat'))
      : 37.57861,
  );
  const [errorMsg, setErrorMsg] = useState<string>();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        setLongitude(pos.coords.longitude);
        setLatitude(pos.coords.latitude);
      },
      function (error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMsg('PERMISSION_DENIED');
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMsg('POSITION_UNAVAILABLE');
            break;
          case error.TIMEOUT:
            setErrorMsg('TIMEOUT');
            break;
          default:
            setErrorMsg('UNKNOWN_ERROR');
        }
      },
      {
        maximumAge: 30000,
        enableHighAccuracy: false,
      },
    );
  }

  useEffect(() => {
    localStorage.setItem('lastLng', longitude.toString());
    localStorage.setItem('lastLat', latitude.toString());
  }, [latitude, longitude]);

  return { longitude, latitude, errorMsg };
};
