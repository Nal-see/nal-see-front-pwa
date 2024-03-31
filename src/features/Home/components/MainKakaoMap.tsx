import currentLocMarker from '@/assets/icons/currentLocMarker.svg';
import loadingLocMarker from '@/assets/icons/loadingLocMarker.svg';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import UpdatePositionButton from './UpdatePositionButton';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

const MainKakaoMap = () => {
  const { kakaoMap, renewLocation, setCenter, mapRange } = useKakaoMap(
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

  const { data, error, isFetched, isLoading } = useQuery({
    queryKey: ['mainMapPosts', swLat, swLng, neLat, neLng],
    queryFn: () => {
      console.log(mapRange);
      api.get(
        `/api/posts/location?bottomLeftLat=${swLat}&bottomLeftLong=${swLng}&topRightLat=${neLat}&topRightLong=${neLng}`,
      );
    },
  });

  return (
    <>
      <div id="main-map" className="size-full bg-[#f4ede1]">
        {!kakaoMap && <div>로딩중...</div>}
      </div>
      <UpdatePositionButton
        renewLocation={renewLocation}
        setCenter={setCenter}
      />
    </>
  );
};

export default MainKakaoMap;
