import MainKakaoMap from './components/MainKakaoMap';
import NotificationButton from './components/NotificationButton';
import MotionWeatherCard from './components/MotionWeatherCard';
import PostGroupListDrawer from './PostGroupListDrawer';
import ToastNotiPermission from '../Notifications/components/ToastNotiPermission';

const HomePage = () => {
  return (
    <div className="relative flex-1">
      <ToastNotiPermission />
      <PostGroupListDrawer />
      <MotionWeatherCard />
      <div className="h-[calc(100dvh-80px)]">
        <MainKakaoMap />
      </div>
      <NotificationButton />
    </div>
  );
};

export default HomePage;
