import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { SyncLoader } from 'react-spinners';

export const LocationStatusView = ({
  isCurrentLocation,
}: {
  isCurrentLocation: boolean;
}) => {
  const [showCheckMark, setShowCheckMark] = useState(false);

  useEffect(() => {
    if (isCurrentLocation) {
      setShowCheckMark(true);
      const timer = setTimeout(() => {
        setShowCheckMark(false);
      }, 1000); // 2초 후 체크 표시 사라짐
      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
    }
  }, [isCurrentLocation]);

  if (!isCurrentLocation) {
    // 위치 확인 중
    return (
      <div className="flex h-20 w-full flex-col items-center justify-center bg-white">
        <SyncLoader color="#3ba5ff" />
      </div>
    );
  } else if (showCheckMark) {
    // 위치 확인 완료 (체크 표시)
    return (
      <div className="flex h-20 w-full flex-col items-center justify-center bg-white">
        <FaCheckCircle className="text-4xl text-accent" />
        <div className="pt-3 text-lg font-bold">위치 확인됨!</div>
      </div>
    );
  }
  // 위치 확인 후 대기 상태에서는 별도의 UI를 표시하지 않음
  return null;
};
