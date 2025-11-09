import { createBrowserRouter } from 'react-router';
import { AppLayout } from './components/layout/AppLayout';
import { PublicLayout } from './components/layout/PublicLayout';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        lazy: () => import('./routes/root'),
      },
      {
        path: '/login',
        lazy: () => import('./routes/login'),
      },
      {
        path: '/auth/verify',
        lazy: () => import('./routes/auth-verify'),
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: '/dashboard',
        lazy: () => import('./routes/dashboard'),
      },
      {
        path: '/contacts',
        lazy: () => import('./routes/contacts'),
      },
      {
        path: '/tasks',
        lazy: () => import('./routes/tasks'),
      },
      {
        path: '/interactions',
        lazy: () => import('./routes/interactions'),
      },
    ],
  },
]);
