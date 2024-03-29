import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { useEffect } from 'react';
import { EnvironmentOutline, CompassOutline } from 'antd-mobile-icons';
import { getKakaoAddress } from '../services/getKakaoAddress';
import { ISelectedLocation } from '@/types/postCreate';
import locationMarker from '@/assets/icons/marker.svg';

declare global {
  interface Window {
    kakao: any;
  }
}

interface ILocationSelectorProps {
  selectedLocation: ISelectedLocation | null;
  setSelectedLocation: (location: ISelectedLocation) => void;
}

const LocationSelector = ({
  selectedLocation,
  setSelectedLocation,
}: ILocationSelectorProps) => {
  const { longitude, latitude, errorMsg } = useCurrentLocation();

  // 지도 표시
  useEffect(() => {
    if (longitude && latitude) {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map'); // 지도를 표시할 div element

        // 지도 좌표 설정 : 선택된 위치가 있는 경우 & 없을 경우 현재 위치
        const locPosition = selectedLocation
          ? new window.kakao.maps.LatLng(
              selectedLocation.lat,
              selectedLocation.lng,
            )
          : new window.kakao.maps.LatLng(latitude, longitude);

        // Map 객체 옵션
        const options = {
          center: locPosition,
          level: 3,
        };

        // 마커 이미지 커스텀
        const markerImage = new window.kakao.maps.MarkerImage(
          locationMarker,
          new window.kakao.maps.Size(32, 40),
        );

        const map = new window.kakao.maps.Map(container, options); // 지도 컴포넌트
        // 마커 컴포넌트
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: locPosition,
          image: markerImage,
        });

        // 마커 - draggable 속성 설정
        marker.setDraggable(true);
        // 마커 Drag Event : 선택 위치 상태값 업데이트
        window.kakao.maps.event.addListener(marker, 'dragend', () => {
          setSelectedLocation({
            ...selectedLocation!,
            lng: marker.getPosition().getLng() as number,
            lat: marker.getPosition().getLat() as number,
          });
        });
      });
    }
  }, [longitude, latitude]);

  // 현재 위치 or 선택된 위치 위도&경도값으로 행정동 불러오기
  useEffect(() => {
    if (selectedLocation != null) {
      getKakaoAddress(selectedLocation.lng, selectedLocation.lat).then(
        (res) => {
          const addressH = res.documents.filter(
            (doc) => doc.region_type === 'H',
          )[0];

          setSelectedLocation({
            ...selectedLocation,
            address: addressH.address_name,
          });
        },
      );
    } else if (longitude && latitude) {
      getKakaoAddress(longitude, latitude).then((res) => {
        const addressH = res.documents.filter(
          (doc) => doc.region_type === 'H',
        )[0];

        setSelectedLocation({
          lng: longitude,
          lat: latitude,
          address: addressH.address_name,
        });
      });
    }
  }, [longitude, latitude, selectedLocation?.lng, selectedLocation?.lat]);

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="inline-flex items-center justify-center gap-3 p-4 text-lg">
        <EnvironmentOutline fontSize={26} color="var(--accent)" />
        <p className="font-base">
          {selectedLocation?.address
            ? selectedLocation.address
            : '현재 위치 로드 중...'}
        </p>
      </div>
      {longitude && latitude ? (
        <div id="map" className="h-[600px] w-full"></div>
      ) : (
        <div className="flex h-[600px] w-full flex-col items-center justify-center bg-accent-foreground text-xl text-accent">
          <CompassOutline fontSize={50} />
          <p>Loading...</p>
        </div>
      )}
      <div className="flex flex-col items-center justify-center p-4 font-semibold">
        <p>지도의 마커를 이동해</p>
        <p>날씨드롭을 업로드할 위치를 선택해주세요!</p>
        <p className="text-primary-foreground">
          게시물에는 상세 위치가 아닌 행정구역의 동단위까지 표시됩니다.
        </p>
      </div>
    </div>
  );
};

export default LocationSelector;
