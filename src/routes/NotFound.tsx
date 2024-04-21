import SplashSun from '@/assets/splash-sun.png';
import { FcHighPriority } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };
  return (
    <div className="relative">
      <div className="relative flex h-dvh flex-col items-center justify-center gap-5 overflow-hidden bg-gradient-to-b from-blue-300 to-sky-400">
        <img
          className="absolute right-0 top-[100px] z-[3] h-60 w-40 origin-top-left rotate-[-46.01deg]"
          src={SplashSun}
          alt="splash-sun"
        />

        <div className="flex flex-col items-center justify-center gap-2 text-lg text-white">
          <FcHighPriority size={50} />
          <p className="text-2xl font-semibold">Not Found</p>
          <p>존재하지 않는 경로입니다.</p>
        </div>
        <Button onClick={navigateToHome} variant="accent" className="shadow-lg">
          메인으로 이동
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
