import { defineModel } from '@firsttx/local-first';
import { z } from 'zod';

const ContactsStatsSchema = z.object({
  total: z.number(),
  active: z.number(),
  leads: z.number(),
  inactive: z.number(),
});

const TasksStatsSchema = z.object({
  total: z.number(),
  pending: z.number(),
  completed: z.number(),
  highPriority: z.number(),
});

const InteractionsStatsSchema = z.object({
  total: z.number(),
  thisWeek: z.number(),
  thisMonth: z.number(),
});

const DashboardStatsSchema = z.object({
  contacts: ContactsStatsSchema,
  tasks: TasksStatsSchema,
  interactions: InteractionsStatsSchema,
});

export const DashboardStatsModel = defineModel('dashboard-stats', {
  schema: DashboardStatsSchema,
  ttl: 60 * 1000,
  initialData: {
    contacts: { total: 0, active: 0, leads: 0, inactive: 0 },
    tasks: { total: 0, pending: 0, completed: 0, highPriority: 0 },
    interactions: { total: 0, thisWeek: 0, thisMonth: 0 },
  },
});

export type DashboardStats = z.infer<typeof DashboardStatsSchema>;
