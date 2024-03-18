import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { useEffect } from 'react';
import { getUserInfo } from '@/services/api/auth.service';

const PublicRoute = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    getUserInfo().then((res) => {
      console.log(res);
      const userData = res?.data;
      setUser({
        user: {
          userId: userData.id,
          username: userData.username,
          email: userData.eamil,
          isNewUser: userData.newUser,
        },
      });

      navigate('/');
    });
  }, []);

  return user ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
