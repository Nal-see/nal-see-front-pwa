import { Navigate, Outlet, useLoaderData } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { useEffect } from 'react';
import { IUserInfoResponse } from '@/types/auth';
import { convertImgSrcToHTTPS } from '@/lib/helpers';

const PublicRoute = () => {
  const userData = useLoaderData() as IUserInfoResponse;
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (userData) {
      console.log('userData: ', userData);
      setUser({
        user: {
          userId: userData.id,
          userName: userData.username,
          email: userData.email,
          isNewUser: userData.newUser,
          picture: convertImgSrcToHTTPS(userData.picture),
        },
      });
    }
  }, []);

  return userData ? <Outlet /> : <Navigate to="/hello" />;
};

export default PublicRoute;
