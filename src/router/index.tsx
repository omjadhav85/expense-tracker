import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { Dashboard } from '../pages/Dashboard';
import { AuthRedirect } from './AuthRedirect';
import { ProtectedRoutes } from './ProtectedRoutes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRedirect />,
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
    ],
  },

  {
    path: '/',
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);
