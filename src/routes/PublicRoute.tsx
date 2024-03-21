import {
  Navigate,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { useEffect } from 'react';
import { IUserInfoResponse } from '@/types/auth';

const PublicRoute = () => {
  const userData = useLoaderData() as IUserInfoResponse;
  const { setUser } = useAuthStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setUser({
        user: {
          userId: userData.id,
          userName: userData.username,
          email: userData.email,
          isNewUser: userData.newUser,
        },
      });
    }

    if (pathname === '/hello' && userData) {
      navigate('/home');
    }
  }, []);

  return userData ? <Outlet /> : <Navigate to="/hello" />;
};

export default PublicRoute;
