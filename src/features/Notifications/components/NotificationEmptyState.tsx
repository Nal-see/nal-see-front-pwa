import SplashSun from '@/assets/splash-sun.png';
import SplashGirl from '@/assets/splash-girl1.png';

const NotificationEmptyState = () => {
  return (
    <div className="flex h-[85%] flex-col items-center justify-center">
      <div className="inline-flex h-[15%] translate-x-20">
        <img src={SplashGirl} className="translate-x-5" />
        <img
          src={SplashSun}
          className="h-[70px] translate-x-28 translate-y-5"
        />
      </div>
      <div className="h-[90px] w-full border-t border-primary-foreground bg-gradient-to-t from-white to-[#F5F6F7] px-6 py-2">
        <p className="pt-3 text-center text-lg font-light text-primary-foreground">
          도착한 알림이 없습니다
        </p>
      </div>
    </div>
  );
};

export default NotificationEmptyState;
