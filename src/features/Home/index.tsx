import MainKakaoMap from './components/MainKakaoMap';
import NotificationButton from './components/NotificationButton';
import MotionWeatherCard from './components/MotionWeatherCard';
import PostDetailDrawer from './PostDetailDrawer';
import useHomeStore from './store/useHomeStore';

const HomePage = () => {
  const { selectedPostId } = useHomeStore();

  return (
    <div className="relative flex-1">
      <PostDetailDrawer postId={selectedPostId} />
      <MotionWeatherCard />
      <div className="h-[calc(100dvh-80px)]">
        <MainKakaoMap />
      </div>
      <NotificationButton />
    </div>
  );
};

export default HomePage;
