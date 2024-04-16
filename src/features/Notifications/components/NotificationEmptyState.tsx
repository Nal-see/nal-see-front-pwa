import SplashSun from '@/assets/splash-sun.png';
import SplashGirl from '@/assets/splash-girl1.png';

const NotificationEmptyState = () => {
  return (
    <div className="flex h-[85%] flex-col items-center justify-center">
      <div className="flex h-[15%] flex-row items-end gap-20">
        <img src={SplashGirl} className="h-[100px]" />
        <img src={SplashSun} className="h-[70px]" />
      </div>
      <div className="h-[90px] w-full border-t border-[#E2E6E9] bg-gradient-to-t from-white to-[#E2E6E9] px-6 py-2">
        <p className="pt-3 text-center text-base font-light text-[#5E6164]">
          도착한 알림이 없습니다
        </p>
      </div>
    </div>
  );
};

export default NotificationEmptyState;
