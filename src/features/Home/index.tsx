import MainKakaoMap from './components/MainKakaoMap';
import NotificationButton from './components/NotificationButton';
import MotionWeatherCard from './components/MotionWeatherCard';
import PostGroupListDrawer from './PostGroupListDrawer';

const HomePage = () => {
  return (
    <div className="relative flex-1">
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
