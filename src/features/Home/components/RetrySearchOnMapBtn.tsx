import { RedoOutline } from 'antd-mobile-icons';
import useHomeStore from '../store/useHomeStore';

const RetrySearchOnMapBtn = () => {
  const { isMapMoved, setIsMapMoved, setRefetchPostsOnMap } = useHomeStore();

  const refetchOnMapMove = () => {
    setRefetchPostsOnMap(true);
    setIsMapMoved(false);
  };

  return (
    <>
      {isMapMoved && (
        <button
          onClick={refetchOnMapMove}
          className="absolute inset-x-0 bottom-6 z-[3] mx-auto inline-flex w-[130px] items-center justify-center gap-1 rounded-full border border-accent-foreground bg-white p-2 font-medium text-accent shadow-md"
        >
          <RedoOutline fontSize={16} />
          <p>이 지역 재검색</p>
        </button>
      )}
    </>
  );
};

export default RetrySearchOnMapBtn;
