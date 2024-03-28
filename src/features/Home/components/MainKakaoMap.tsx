import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const MainKakaoMap = () => {
  const { longitude, latitude } = useCurrentLocation();
  const [mapRange, setMapRange] = useState();

  useEffect(() => {
    if (longitude && latitude) {
      window.kakao.maps.load(() => {
        const container = document.getElementById('main-map'); // 지도를 표시할 div element

        // 지도 좌표 설정
        const locPosition = new window.kakao.maps.LatLng(latitude, longitude);

        // Map 객체 옵션
        const options = {
          center: locPosition,
          level: 5,
        };

        // 마커 이미지 커스텀
        const markerImage = new window.kakao.maps.MarkerImage(
          '/src/assets/icons/currentLocMarker.svg',
          new window.kakao.maps.Size(40, 40),
        );

        const map = new window.kakao.maps.Map(container, options); // 지도 컴포넌트

        // 마커 컴포넌트
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: locPosition,
          image: markerImage,
        });

        // Event Handlers : 중심좌표나 확대 수준이 변경되었을 때 타일 이미지 로드가 모두 완료된 경우 (미세한 이동은 trigger되지 않음)
        window.kakao.maps.event.addListener(map, 'tilesloaded', function () {
          const bounds = map.getBounds();
          const swLatLng = bounds.getSouthWest();
          const neLatLng = bounds.getNorthEast();

          console.log('SouthWest: ', swLatLng);
          console.log('NorthEast: ', neLatLng);
        });
      });
    }
  }, [longitude, latitude]);

  return (
    <>
      {longitude && latitude ? (
        <div id="main-map" className="size-full"></div>
      ) : (
        <div className="size-full bg-[#f4ede1]">로딩중...</div>
      )}
    </>
  );
};

export default MainKakaoMap;
