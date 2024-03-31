import useAuthStore from '@/store/useAuthStore';
import MainKakaoMap from './components/MainKakaoMap';
import NotificationButton from './components/NotificationButton';
import MotionWeatherCard from './components/MotionWeatherCard';

const HomePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="relative flex-1">
      <MotionWeatherCard />
      <div className="h-[calc(100dvh-80px)]">
        <MainKakaoMap />
      </div>
      <NotificationButton />
    </div>
  );
};

export default HomePage;
