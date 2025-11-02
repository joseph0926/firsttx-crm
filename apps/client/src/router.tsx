import { createBrowserRouter } from 'react-router';
import { loader as rootLoader } from './routes/root';
import LoginPage from './routes/login';
import AuthVerifyPage from './routes/auth-verify';
import DashboardPage, { loader as dashboardLoader } from './routes/dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    loader: rootLoader,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/auth/verify',
    element: <AuthVerifyPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    loader: dashboardLoader,
  },
]);
