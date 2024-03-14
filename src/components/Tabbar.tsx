import { Badge, TabBar } from 'antd-mobile';
import { useCallback, useEffect, useState } from 'react';
import HomeIcon from '@/assets/icons/home.svg?react';
import FeedsIcon from '@/assets/icons/feed.svg?react';
import NewPostIcon from '@/assets/icons/newPost.svg?react';
import ChatIcon from '@/assets/icons/message.svg?react';
import MypageIcon from '@/assets/icons/mypage.svg?react';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  {
    key: 'home',
    title: '홈',
    icon: <HomeIcon />,
  },
  {
    key: 'feeds',
    title: '피드',
    icon: <FeedsIcon />,
  },
  {
    key: 'newPost',
    title: '새 게시물',
    icon: <NewPostIcon />,
  },
  {
    key: 'chat',
    title: '메시지',
    icon: <ChatIcon />,
    badge: Badge.dot,
  },
  {
    key: 'user',
    title: '마이페이지',
    icon: <MypageIcon />,
  },
];

const Tabbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState<string>('');
  const userId = '1';

  /*
    주소창으로 접속 시 or 새로고침 : pathname으로 tab 자동 선택 (activeKey값 설정)
  */
  const syncTabWithPath = useCallback((pathname: string) => {
    if (pathname === '/posts/create') setActiveKey('newPost');
    else if (pathname.split('/')[2] === userId) setActiveKey('user');
    else {
      switch (pathname.split('/')[1]) {
        case 'home':
          setActiveKey('home');
          break;
        case 'feeds':
          setActiveKey('feeds');
          break;
        case 'chat':
          setActiveKey('chat');
          break;
      }
    }
  }, []);

  // 최초 렌더링 시에만 syncTabWithPath 함수 실행
  useEffect(() => {
    syncTabWithPath(pathname);
  }, []);

  /*
    탭 Item 선택 시 해당 화면으로 Navigate
  */
  const navigateRoute = useCallback(
    (key: string) => {
      setActiveKey(key);

      // Navigate
      switch (key) {
        case 'home':
          navigate('/home');
          break;
        case 'feeds':
          navigate('/feeds');
          break;
        case 'newPost':
          navigate('/posts/create');
          break;
        case 'chat':
          navigate('/chat');
          break;
        case 'user':
          navigate(`/user/${userId}`); // current user Id로 넣어줘야 함!!!
          break;
      }
    },
    [userId],
  );

  return (
    <TabBar onChange={navigateRoute} activeKey={activeKey}>
      {tabs.map((item) => (
        <TabBar.Item
          key={item.key}
          icon={item.icon}
          title={item.title}
          badge={item.badge}
        />
      ))}
    </TabBar>
  );
};

export default Tabbar;
