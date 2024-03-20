import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
// import OauthRedirectPage from '@/features/OauthRedirect';
import FeedListPage from '@/features/Feed/FeedPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<SplashPage />} />
          {/* <Route path="/oauth2/redirect" element={<OauthRedirectPage />} /> */}
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/feeds" element={<FeedListPage />} />
          <Route path="/posts">
            <Route path="create" element={<PostCreatePage />} />
            <Route path=":postId" element={<PostDetailPage />} />
            <Route path=":postId/edit" element={<PostEditPage />} />
          </Route>
          <Route path="/chat">
            <Route index element={<ChatListPage />} />
            <Route path=":chatId" element={<ChatRoomPage />} />
          </Route>
          <Route path="/user">
            <Route path=":userId" element={<UserFeedPage />} />
          </Route>
          <Route path="/notifications" element={<NotificationsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
