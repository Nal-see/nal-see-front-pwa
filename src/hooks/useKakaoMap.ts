import { useEffect, useState } from 'react';
import { useCurrentLocation } from './useCurrentLocation';
import { ImainMapPostList } from '@/types/kakaoMap';
import useHomeStore from '@/features/Home/store/useHomeStore';

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
    swLng: number;
    swLat: number;
    neLng: number;
    neLat: number;
  }>();
  const { setPostGroup, setPostDrawerOpen } = useHomeStore();

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
          const swLng = bounds.getSouthWest().getLng();
          const swLat = bounds.getSouthWest().getLat();
          const neLng = bounds.getNorthEast().getLng();
          const neLat = bounds.getNorthEast().getLat();

          setMapRange({
            swLng,
            swLat,
            neLng,
            neLat,
          });
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

  const setCenter = () => {
    if (kakaoMap) {
      kakaoMap.setCenter(new window.kakao.maps.LatLng(latitude, longitude));
    }
  };

  // 조회된 개별 포스트를 커스텀 오버레이로 지도에 표시
  const displayPostMarker = (dataArr: ImainMapPostList[]) => {
    if (kakaoMap && dataArr.length) {
      for (const postGroup of dataArr) {
        const position = new window.kakao.maps.LatLng(
          postGroup.bottomLeftLat,
          postGroup.bottomLeftLong,
        );

        const contentInner =
          `<div style="width: 100%; height: 100%; position: relative">` +
          `  <div style="display: inline-flex; width: 3.5rem; height: 3.5rem; align-items: center; justify-content: center; border-radius: 56px; border: 1px solid #38bdf8; background-color: white; padding: 0.25rem;">` +
          `   <img src="${postGroup.picture}" style="width: 3rem; height: 3rem; border-radius: 9999px; border: 1px solid rgba(30, 58, 138, 0.2); object-fit: cover;" />` +
          `  </div>` +
          `  <div style="width: 24px; height: 18px; padding-left: 5.50px; padding-right: 6.50px; left: 34px; top: 0px; position: absolute; background: #3BA5FF; border-radius: 18px; overflow: hidden; justify-content: center; align-items: center; display: inline-flex">` +
          `   <div style="text-align: center; color: white; font-size: 12px; font-weight: 300; line-height: 18px; word-wrap: break-word">${postGroup.count}</div>` +
          `  </div>` +
          `</div>`;

        const content = document.createElement('div');
        content.innerHTML = contentInner;
        content.addEventListener('click', () => {
          // 오버레이 클릭 시 : 포스트 리스트 drawer 열림
          setPostGroup({
            bottomLeftLat: postGroup.bottomLeftLat,
            bottomLeftLong: postGroup.bottomLeftLong,
            topRightLat: postGroup.topRightLat,
            topRightLong: postGroup.topRightLong,
          });
          setPostDrawerOpen();
        });

        const customOverlay = new window.kakao.maps.CustomOverlay({
          map: kakaoMap,
          clickable: true,
          content: content,
          position: position,
          zIndex: 10,
        });

        customOverlay.setMap(kakaoMap);
      }
    }
  };

  return {
    kakaoMap,
    marker,
    mapRange,
    renewLocation,
    setCenter,
    displayPostMarker,
  };
};
