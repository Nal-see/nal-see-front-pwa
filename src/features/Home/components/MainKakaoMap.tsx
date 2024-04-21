import currentLocMarker from '@/assets/icons/currentLocMarker.svg';
import loadingLocMarker from '@/assets/icons/loadingLocMarker.svg';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import UpdatePositionButton from './UpdatePositionButton';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useEffect } from 'react';
import { BeatLoader, PuffLoader } from 'react-spinners';
import useHomeStore from '../store/useHomeStore';
import { toast } from 'sonner';

const MainKakaoMap = () => {
  const { refetchPostsOnMap, setRefetchPostsOnMap } = useHomeStore();
  const { kakaoMap, renewLocation, setCenter, mapRange, displayPostMarker } =
    useKakaoMap(
      document.getElementById('main-map'),
      currentLocMarker,
      loadingLocMarker,
    );

  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: [
      'mainMapPosts',
      mapRange?.swLat,
      mapRange?.swLng,
      mapRange?.neLat,
      mapRange?.neLng,
    ],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return api.get('/api/map', {
        params: {
          bottomLeftLat: mapRange?.swLat,
          bottomLeftLong: mapRange?.swLng,
          topRightLat: mapRange?.neLat,
          topRightLong: mapRange?.neLng,
        },
      });
    },
    enabled: refetchPostsOnMap && mapRange?.swLat !== undefined,
  });

  // 게시물 데이터 fetch 후 지도 상에 표시
  useEffect(() => {
    if (data) {
      displayPostMarker(data.data.results);
      setRefetchPostsOnMap(false);
    }
  }, [data, isFetched]);

  useEffect(() => {
    if (error)
      toast.warning('게시물을 불러오는 데 실패했습니다. 다시 시도해주세요.', {
        duration: 3000,
      });
  }, [error]);

  return (
    <>
      <div id="main-map" className="size-full bg-[#f2f0e9]">
        {isLoading && (
          <BeatLoader
            color="var(--primary-foreground)"
            className="absolute left-1/2 top-1/2 z-[3] -translate-x-[29.5px] -translate-y-[12px]"
          />
        )}
        {!kakaoMap && (
          <div className="flex size-full flex-row items-center justify-center">
            <PuffLoader color="#3ba5ff" />
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
