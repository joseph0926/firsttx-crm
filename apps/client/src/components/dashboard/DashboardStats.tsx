import { useSuspenseSyncedModel } from '@firsttx/local-first';
import { useClient } from 'urql';
import { Users, UserCheck, Activity, CheckSquare } from 'lucide-react';
import { DashboardStatsModel } from '@/models/dashboard-stats';
import { GetDashboardStatsDocument } from '@/gql/graphql';
import { StatsCard } from './StatsCard';

export function StatsContent() {
  const client = useClient();

  const stats = useSuspenseSyncedModel(DashboardStatsModel, async () => {
    const result = await client.query(GetDashboardStatsDocument, {});

    if (result.error) {
      const isAuthError = result.error.graphQLErrors.some(
        (e) => e.extensions?.code === 'UNAUTHENTICATED' ||
               e.message.includes('Unauthorized')
      );

      if (isAuthError) {
        throw new Error('Authentication required');
      }
      throw new Error(result.error.message || 'Failed to fetch dashboard stats');
    }

    if (!result.data?.dashboardStats) {
      throw new Error('Failed to fetch dashboard stats');
    }

    return result.data.dashboardStats;
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Contacts"
        value={stats.contacts.total}
        description={`${stats.contacts.active} active`}
        icon={Users}
        delay={0}
      />
      <StatsCard
        title="Active Contacts"
        value={stats.contacts.active}
        description={`${stats.contacts.leads} leads`}
        icon={UserCheck}
        delay={0.1}
      />
      <StatsCard
        title="This Week's Activity"
        value={stats.interactions.thisWeek}
        description={`${stats.interactions.thisMonth} this month`}
        icon={Activity}
        delay={0.2}
      />
      <StatsCard
        title="Pending Tasks"
        value={stats.tasks.pending}
        description={`${stats.tasks.completed} completed`}
        icon={CheckSquare}
        delay={0.3}
      />
    </div>
  );
}
