export interface StatCard {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export interface RecentInteraction {
  id: string;
  type: 'CALL' | 'EMAIL' | 'MEETING' | 'NOTE';
  contactName: string;
  summary: string;
  date: string;
}

export interface UpcomingTask {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  contactName?: string;
}
