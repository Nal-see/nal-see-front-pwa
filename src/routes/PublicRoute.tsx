import { Navigate, Outlet, useLoaderData } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { useEffect } from 'react';
import { IUserInfoResponse } from '@/types/auth';

const PublicRoute = () => {
  const userData = useLoaderData() as IUserInfoResponse;
  const { setUser } = useAuthStore();

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
  }, []);

  return userData ? <Outlet /> : <Navigate to="/hello" />;
};

export default PublicRoute;
