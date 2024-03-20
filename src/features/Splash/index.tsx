import SplashGirl from '@/assets/splash-girl2.png';
import { IoChatbubbleSharp } from 'react-icons/io5';

const handleOauthLogin = (provider: string) => {
  const oauthLoginUrl = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/${provider}`;
  window.location.href = oauthLoginUrl;
};

const SplashPage = () => {
  return (
    <div className="h-dvh overflow-hidden bg-gradient-to-b from-blue-300 to-sky-400">
      {/* <div className="absolute bottom-[-225px] left-[-52px] h-[631px] w-[272px] overflow-hidden bg-red-200">
        <img src={SplashGirl} alt="splash-girl" />
      </div> */}
      <div className="absolute right-0 top-[13%] h-[631px] w-[272px] overflow-hidden bg-red-200 pl-[122px]">
        <img
          src={SplashGirl}
          alt="splash-girl"
          className="size-full object-contain"
        />
      </div>
      {/* <img
        className="absolute right-0 top-[189.70px] h-60 w-40 origin-top-left rotate-[-46.01deg]"
        src={SplashSun}
        alt="splash-sun"
      /> */}

      <button
        onClick={() => handleOauthLogin('kakao')}
        className="absolute bottom-[72px] left-1/2 flex w-80 cursor-pointer items-center justify-between rounded-lg bg-yellow-400 px-4 py-3 transition-all hover:bg-yellow-300"
        style={{ transform: 'translateX(-50%)' }}
      >
        <IoChatbubbleSharp className="size-5" />
        <div className="text-center text-base font-medium leading-tight text-primary">
          카카오 로그인
        </div>
        <div></div>
      </button>
    </div>
  );
};

export default SplashPage;
