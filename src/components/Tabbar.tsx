import { cn } from '@/lib/utility';
import { Link, useLocation } from 'react-router-dom';
import {
  ChatIcon,
  CreatePostIcon,
  FeedIcon,
  HomeIcon,
  MypageIcon,
} from './Icon';

const NavBar = () => {
  const location = useLocation();
  const isActive = (pathname: string) => {
    // `/chat`으로 시작하는 모든 경로를 활성화시키기 위한 특별한 처리
    if (pathname.startsWith('/chat')) {
      return location.pathname.startsWith('/chat');
    }
    // 그 외의 일반적인 경로 비교
    return location.pathname === pathname;
  };

  const tabs = [
    {
      key: 'home',
      label: '홈',
      link: '/home',
      icon: <HomeIcon isActive={isActive('/home')} />,
    },
    {
      key: 'feed',
      label: '피드',
      link: '/feeds',
      icon: <FeedIcon isActive={isActive('/feeds')} />,
    },
    {
      key: 'create',
      label: '새 게시물',
      link: '/posts/create',
      icon: <CreatePostIcon isActive={isActive('/posts/create')} />,
    },
    {
      key: 'chat',
      label: '메시지',
      link: '/chat',
      icon: <ChatIcon isActive={isActive('/chat')} />,
    },
    {
      key: 'mypage',
      label: '마이페이지',
      link: '/user',
      icon: <MypageIcon isActive={isActive('/user')} />,
    },
  ];

  return (
    <div className="inline-flex h-20 items-center justify-center gap-5 border-t border-neutral-300 bg-white px-7 py-2">
      {tabs.map((tab) => (
        <Link key={tab.key} to={tab.link}>
          <div className="inline-flex flex-col items-center justify-center gap-0.5">
            {tab.icon}
            <div
              className={cn(
                'w-[52px] text-center text-xs font-medium leading-none tracking-tight',
                isActive(tab.link) ? 'text-accent' : 'text-secondary',
              )}
            >
              {tab.label}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
