import { Navigate, Outlet } from 'react-router-dom';
import { USER_DATA } from '../lib/constants';

export const AuthRedirect = () => {
  const userData = localStorage.getItem(USER_DATA);

  return userData ? <Navigate to='/dashboard' replace /> : <Outlet />;
};
