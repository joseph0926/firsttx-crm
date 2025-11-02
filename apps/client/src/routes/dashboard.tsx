import { requireAuth } from '@/lib/auth';

export function loader() {
  const auth = requireAuth();
  return { user: auth.user };
}

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard</p>
    </div>
  );
}
