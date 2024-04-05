import { useEffect, useState } from 'react';

export const useCurrentLocation = () => {
  const [longitude, setLongitude] = useState<number>(
    parseFloat(localStorage.getItem('lastLng') ?? '126.97722'),
  );
  const [latitude, setLatitude] = useState<number>(
    parseFloat(localStorage.getItem('lastLat') ?? '37.57861'),
  );
  const [isCurrentLocation, setIsCurrentLocation] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>();

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          setLongitude(pos.coords.longitude);
          setLatitude(pos.coords.latitude);
          setIsCurrentLocation(true);
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
  };

  // 마운트 시 위치 정보 가져오기
  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {
    localStorage.setItem('lastLng', longitude.toString());
    localStorage.setItem('lastLat', latitude.toString());
  }, [latitude, longitude]);

  const renewLocation = () => {
    setIsCurrentLocation(false);
    getCurrentPosition(); // 현재 위치 갱신
  };

  return { longitude, latitude, isCurrentLocation, errorMsg, renewLocation };
};
