import SplashGirl from '@/assets/splash-girl2.png';
import SplashSun from '@/assets/splash-sun.png';
import NalseeWhiteLogo from '@/assets/nalsee-white.png';
import kakaoLoginBtn from '@/assets/kakao_login_medium_wide.png';

const handleOauthLogin = (provider: string) => {
  const oauthLoginUrl = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/${provider}`;
  window.location.href = oauthLoginUrl;
};

const SplashPage = () => {
  return (
    <div className="relative h-dvh overflow-hidden bg-gradient-to-b from-blue-300 to-sky-400">
      <img
        className="absolute right-0 top-[189.70px] h-60 w-40 origin-top-left rotate-[-46.01deg]"
        src={SplashSun}
        alt="splash-sun"
      />
      <img
        src={NalseeWhiteLogo}
        className="absolute inset-x-0 top-[307px] mx-auto h-20 w-[74.10px]"
      />
      <div className="absolute left-[-52px] top-[438px] h-[631px] w-[271.57px] overflow-hidden">
        <img
          src={SplashGirl}
          alt="splash-girl"
          className="size-full object-contain"
        />
      </div>

      <button
        onClick={() => handleOauthLogin('kakao')}
        className="absolute inset-x-0 bottom-[72px] mx-auto inline-flex w-80 cursor-pointer justify-center"
      >
        <img src={kakaoLoginBtn} />
      </button>
    </div>
  );
};

export default SplashPage;
