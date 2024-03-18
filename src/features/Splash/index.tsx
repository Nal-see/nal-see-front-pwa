import { KakaoIcon } from '@/components/Icon';
import { Button } from '@/components/ui/button';

const SplashPage = () => {
  const navigateToOauthProvider = () => {
    window.location.assign(
      `${import.meta.env.VITE_API_END_POINT}/oauth2/authorization/kakao`,
    );
  };

  return (
    <div className="flex h-dvh flex-col items-center ">
      <Button variant="kakao" size="kakao" onClick={navigateToOauthProvider}>
        <div className="h-[18px] w-[19.03px]">
          <KakaoIcon />
        </div>

        <p className="text-center text-[15px] font-medium leading-tight">
          카카오로 로그인
        </p>
      </Button>
    </div>
  );
};

export default SplashPage;
