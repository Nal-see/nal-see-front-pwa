import { Badge, TabBar } from 'antd-mobile';
import { useCallback, useState } from 'react';
import Chat from '@/assets/icons/message.svg?react';
import { useNavigate } from 'react-router-dom';

const tabs = [
  {
    key: 'home',
    title: '홈',
    icon: <img src="src/assets/icons/home.svg" />,
  },
  {
    key: 'feeds',
    title: '피드',
    icon: <img src="src/assets/icons/feed.svg" />,
  },
  {
    key: 'newPost',
    title: '새 게시물',
    icon: <img src="src/assets/icons/newPost.svg" />,
  },
  {
    key: 'chat',
    title: '메시지',
    icon: <Chat />,
    badge: Badge.dot,
  },
  {
    key: 'user',
    title: '마이페이지',
    icon: <img src="src/assets/icons/mypage.svg" />,
  },
];

const Tabbar = () => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('home');
  const userId = '1';

  const navigateRoute = useCallback(
    (key: string) => {
      setActiveKey(key);

      // Navigate
      switch (key) {
        case 'home':
          navigate('/home');
          return;
        case 'feeds':
          navigate('/feeds');
          return;
        case 'newPost':
          navigate('/posts/create');
          return;
        case 'chat':
          navigate('/chat');
          return;
        case 'user':
          navigate(`/user/${userId}`); // current user Id로 넣어줘야 함!!!
          return;
      }
    },
    [userId],
  );

  return (
    <TabBar onChange={navigateRoute}>
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
