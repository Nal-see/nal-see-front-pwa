import { KakaoIcon } from '@/components/Icon';
import { Button } from '@/components/ui/button';

const SplashPage = () => {
  const navigateToOauthProvider = () => {
    window.location.assign(
      'http://ec2-43-203-106-91.ap-northeast-2.compute.amazonaws.com:8080/login',
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
