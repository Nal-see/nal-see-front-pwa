import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const PublicRoute = () => {
  // Replace with your auth condition
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
