import { useEffect, useState } from 'react';
import { useCurrentLocation } from './useCurrentLocation';

declare global {
  interface Window {
    kakao: any;
  }
}

export const useKakaoMap = (
  container: HTMLElement | null,
  markerImg: string,
  loadingMarkerImg: string,
) => {
  const { longitude, latitude, isCurrentLocation, renewLocation } =
    useCurrentLocation();
  const [kakaoMap, setKakaoMap] = useState<any>();
  const [marker, setMarker] = useState<any>();
  const [mapRange, setMapRange] = useState<{
    swLngLat: number;
    neLngLat: number;
  }>();

  useEffect(() => {
    if (longitude && latitude && container) {
      window.kakao.maps.load(() => {
        // 지도 좌표 설정
        const locPosition = new window.kakao.maps.LatLng(latitude, longitude);

        // Map 객체 옵션
        const options = {
          center: locPosition,
          level: 5,
        };

        // 마커 이미지 커스텀
        const markerImage = new window.kakao.maps.MarkerImage(
          markerImg,
          new window.kakao.maps.Size(40, 40),
        );
        const loadingMarker = new window.kakao.maps.MarkerImage(
          loadingMarkerImg,
          new window.kakao.maps.Size(40, 40),
        );

        const map = new window.kakao.maps.Map(container, options);

        // Event Handlers : 중심좌표나 확대 수준이 변경되었을 때 타일 이미지 로드가 모두 완료된 경우 (미세한 이동은 trigger되지 않음)
        window.kakao.maps.event.addListener(map, 'tilesloaded', function () {
          const bounds = map.getBounds();
          const southWest = bounds.getSouthWest();
          const northEast = bounds.getNorthEast();

          setMapRange({ swLngLat: southWest, neLngLat: northEast });
        });

        setKakaoMap(map); // 지도 컴포넌트

        // 마커 컴포넌트
        setMarker(
          new window.kakao.maps.Marker({
            map: map,
            position: locPosition,
            image: isCurrentLocation ? markerImage : loadingMarker,
          }),
        );
      });
    }
  }, [
    longitude,
    latitude,
    isCurrentLocation,
    container,
    markerImg,
    loadingMarkerImg,
  ]);

  return { kakaoMap, marker, mapRange, renewLocation };
};
