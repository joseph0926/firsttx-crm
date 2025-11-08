import { Outlet, useLocation } from 'react-router';
import { FloatingOrbs } from '../landing';
import { cn } from '@/lib/utils';

export function PublicLayout() {
  const { pathname } = useLocation();
  const isLandingPage = pathname === '/';

  return (
    <div
      className={cn(
        'min-h-screen bg-background relative overflow-hidden',
        isLandingPage ? '' : 'flex items-center justify-center'
      )}
    >
      <FloatingOrbs />
      <Outlet />
    </div>
  );
}
