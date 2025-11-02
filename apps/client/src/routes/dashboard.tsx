import { requireAuth } from '@/lib/auth';

export async function loader() {
  const auth = await requireAuth();
  return { user: auth.user };
}

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground mt-2">Welcome to your dashboard</p>
    </div>
  );
}
