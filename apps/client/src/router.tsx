import { createBrowserRouter } from 'react-router';
import RootPage, { loader as rootLoader } from './routes/root';
import LoginPage from './routes/login';
import AuthVerifyPage from './routes/auth-verify';
import DashboardPage, { loader as dashboardLoader } from './routes/dashboard';
import ContactsPage, { loader as contactsLoader } from './routes/contacts';
import { AppLayout } from './components/layout/AppLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
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
