import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { useEffect } from 'react';
import { getUserInfo } from '@/services/api/auth.service';

const PublicRoute = () => {
  const { user, setUser } = useAuthStore();
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await getUserInfo();
      if (response) {
        // 사용자 정보를 성공적으로 가져온 경우
        const userData = response.data;
        setUser({
          user: {
            userId: userData.id,
            userName: userData.username,
            email: userData.email,
            isNewUser: userData.newUser,
          },
        });
      }
    };

    fetchUserInfo();
  }, [setUser]);

  return user ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
