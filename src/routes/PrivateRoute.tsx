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

const PrivateRoute = () => {
  const userData = useRouteLoaderData('user') as IUserInfoResponse;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/') navigate('/home');
    if (userData.newUser === true) navigate('/optionalInfo');
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
