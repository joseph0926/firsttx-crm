import { createBrowserRouter } from 'react-router';
import RootPage, { loader as rootLoader } from './routes/root';
import LoginPage, { loader as loginLoader } from './routes/login';
import AuthVerifyPage, { loader as authVerifyLoader } from './routes/auth-verify';
import DashboardPage, { loader as dashboardLoader } from './routes/dashboard';
import ContactsPage, { loader as contactsLoader } from './routes/contacts';
import { AppLayout } from './components/layout/AppLayout';
import { PublicLayout } from './components/layout/PublicLayout';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <RootPage />,
        loader: rootLoader,
      },
      {
        path: '/login',
        element: <LoginPage />,
        loader: loginLoader,
      },
      {
        path: '/auth/verify',
        element: <AuthVerifyPage />,
        loader: authVerifyLoader,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
        loader: dashboardLoader,
      },
      {
        path: '/contacts',
        element: <ContactsPage />,
        loader: contactsLoader,
      },
    ],
  },
]);
