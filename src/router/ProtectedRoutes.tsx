import { USER_DATA } from '@/lib/constants';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = () => {
  const userData = localStorage.getItem(USER_DATA);

  return userData ? <Outlet /> : <Navigate to='/login' replace />;
};
