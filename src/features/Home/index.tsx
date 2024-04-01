import useAuthStore from '@/store/useAuthStore';
import MainKakaoMap from './components/MainKakaoMap';
import NotificationButton from './components/NotificationButton';

const HomePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="relative flex-1">
      <div className="h-[calc(100dvh-80px)]">
        <MainKakaoMap />
      </div>
      <NotificationButton />
    </div>
  );
};

export default HomePage;
