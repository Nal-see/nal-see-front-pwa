import { getUserInfo } from '@/services/api/auth.service';
import useAuthStore from '@/store/useAuthStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OauthRedirectPage = () => {
  const { setIsAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo().then((res) => {
      if (res?.status === 200) {
        setIsAuthenticated(true);
      }

      navigate('/');
    });
  }, []);

  return <div>Login...</div>;
};

export default OauthRedirectPage;
