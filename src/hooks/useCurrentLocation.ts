import { useEffect, useState } from 'react';

export const useCurrentLocation = () => {
  const [longtitude, setLongtitude] = useState<number>();
  const [latitude, setLatitude] = useState<number>();
  const [errorMsg, setErrorMsg] = useState<string>();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          setLongtitude(pos.coords.longitude);
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
        },
      );
    }
  }, []);

  return { longtitude, latitude, errorMsg };
};
