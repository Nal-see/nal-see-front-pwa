import React, { useEffect, useState } from 'react';

interface ILocationSelectorProps {
  longtitude: number | undefined;
  latitude: number | undefined;
}

const LocationSelector = ({ longtitude, latitude }: ILocationSelectorProps) => {
  const [map, setMap] = useState<any>();

  // 지도 표시
  useEffect(() => {
    console.log('위치', longtitude, latitude);
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longtitude),
        level: 3,
      };
      setMap(new window.kakao.maps.Map(container, options));
    });
  }, [longtitude, latitude]);

  return <div id="map" className="h-[600px] w-full"></div>;
};

export default LocationSelector;
