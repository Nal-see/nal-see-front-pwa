import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import SplashPage from '@/features/Splash';
import HomePage from '@/features/Home';
import PostCreatePage from '@/features/Posts/PostCreate';
import ChatListPage from '@/features/Chat/ChatList';
import UserFeedPage from '@/features/Feed/UserFeed';
import PostDetailPage from '@/features/Posts/PostDetail';
import PostEditPage from '@/features/Posts/PostEdit';
import ChatRoomPage from '@/features/Chat/ChatRoom';
import NotificationsPage from '@/features/Notifications/Notifications';
import FeedListPage from '@/features/Feed/FeedPage';
import { getUserInfo } from '@/services/api/auth.service';

const userLoader = async () => {
  const userInfo = await getUserInfo();
  return userInfo ? userInfo.data : null;
};

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    loader: userLoader,
    id: 'user',
    children: [
      {
        path: 'hello',
        element: <SplashPage />,
      },
      {
        path: '/',
        element: <PrivateRoute />,
        children: [
          {
            path: 'home',
            element: <HomePage />,
          },
          {
            path: 'feeds',
            element: <FeedListPage />,
          },
          {
            path: 'posts',
            children: [
              {
                path: 'create',
                element: <PostCreatePage />,
              },
              {
                path: ':postId',
                element: <PostDetailPage />,
              },
              {
                path: ':postId/edit',
                element: <PostEditPage />,
              },
            ],
          },
          {
            path: 'chat',
            children: [
              {
                index: true,
                element: <ChatListPage />,
              },
              {
                path: ':chatId',
                element: <ChatRoomPage />,
              },
            ],
          },
          {
            path: 'user/:userId',
            element: <UserFeedPage />,
          },
          {
            path: 'notifications',
            element: <NotificationsPage />,
          },
        ],
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
