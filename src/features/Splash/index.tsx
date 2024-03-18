import { KakaoIcon } from '@/components/Icon';
import { Button } from '@/components/ui/button';

const SplashPage = () => {
  const handleOauthLogin = (provider: string) => {
    const googleLoginURL = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/${provider}`;
    window.location.href = googleLoginURL;
  };

  return (
    <div className="flex h-dvh flex-col items-center ">
      <Button
        variant="kakao"
        size="kakao"
        onClick={() => handleOauthLogin('kakao')}
      >
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
