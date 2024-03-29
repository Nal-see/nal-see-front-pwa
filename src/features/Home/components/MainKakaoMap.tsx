import currentLocMarker from '@/assets/icons/currentLocMarker.svg';
import loadingLocMarker from '@/assets/icons/loadingLocMarker.svg';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import UpdatePositionButton from './UpdatePositionButton';

const MainKakaoMap = () => {
  const { kakaoMap, renewLocation, setCenter } = useKakaoMap(
    document.getElementById('main-map'),
    currentLocMarker,
    loadingLocMarker,
  );

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
