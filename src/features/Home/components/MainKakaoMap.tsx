import currentLocMarker from '@/assets/icons/currentLocMarker.svg';
import loadingLocMarker from '@/assets/icons/loadingLocMarker.svg';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import UpdatePositionButton from './UpdatePositionButton';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useEffect } from 'react';
import { SyncLoader } from 'react-spinners';

const MainKakaoMap = () => {
  const { kakaoMap, renewLocation, setCenter, mapRange, displayPostMarker } =
    useKakaoMap(
      document.getElementById('main-map'),
      currentLocMarker,
      loadingLocMarker,
    );

  // 카카오 지도 범위 (undefined인 경우 기본값 설정)
  const { swLat, swLng, neLat, neLng } = mapRange ?? {
    swLat: 37.56481266992169,
    swLng: 126.96835276832655,
    neLat: 37.592350461680695,
    neLng: 126.98600486863796,
  };

  const { data, error, isSuccess, isLoading } = useQuery({
    queryKey: ['mainMapPosts', swLat, swLng, neLat, neLng],
    queryFn: () =>
      api.get('/api/map', {
        params: {
          bottomLeftLat: swLat,
          bottomLeftLong: swLng,
          topRightLat: neLat,
          topRightLong: neLng,
        },
      }),
  });

  // 게시물 데이터 fetch 후 지도 상에 표시
  useEffect(() => {
    if (isSuccess) {
      displayPostMarker(data.data.results);
    }
  }, [data, isSuccess]);

  return (
    <>
      <div id="main-map" className="size-full bg-[#f2f0e9]">
        {!kakaoMap && (
          <div className="flex size-full flex-row items-center justify-center">
            <SyncLoader color="#3ba5ff" />
          </div>
        )}
      </div>
      <UpdatePositionButton
        renewLocation={renewLocation}
        setCenter={setCenter}
      />
    </>
  );
};

export default MainKakaoMap;
