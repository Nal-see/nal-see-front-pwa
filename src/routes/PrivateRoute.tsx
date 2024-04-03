import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useRouteLoaderData,
} from 'react-router-dom';
import Tabbar from '@/components/Tabbar';
import { IUserInfoResponse } from '@/types/auth';
import { useEffect } from 'react';
import { handleAllowNotification } from '@/services/fcm/notificationPermission';

const PrivateRoute = () => {
  const userData = useRouteLoaderData('user') as IUserInfoResponse;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/') {
      navigate('/home');
    }
    handleAllowNotification();
  }, []);

  return userData ? (
    <div className="flex h-dvh flex-col">
      <Outlet />
      <Tabbar />
    </div>
  ) : (
    <Navigate to="/hello" />
  );
};

export default PrivateRoute;
