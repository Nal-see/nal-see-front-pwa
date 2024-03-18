import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import Tabbar from '@/components/Tabbar';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? (
    <div className="flex h-dvh flex-col">
      <Outlet />
      <Tabbar />
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
