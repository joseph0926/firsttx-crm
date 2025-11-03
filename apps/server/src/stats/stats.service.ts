import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  DashboardStats,
  ContactsStats,
  TasksStats,
  InteractionsStats,
} from './entities/dashboard-stats.entity';
import { ContactStatus, TaskStatus } from '@prisma/client';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats(userId: string): Promise<DashboardStats> {
    const [contacts, tasks, interactions] = await Promise.all([
      this.getContactsStats(userId),
      this.getTasksStats(userId),
      this.getInteractionsStats(userId),
    ]);

    return { contacts, tasks, interactions };
  }

  private async getContactsStats(userId: string): Promise<ContactsStats> {
    const [total, active, leads, inactive] = await Promise.all([
      this.prisma.contact.count({ where: { userId } }),
      this.prisma.contact.count({
        where: { userId, status: ContactStatus.ACTIVE },
      }),
      this.prisma.contact.count({
        where: { userId, status: ContactStatus.LEAD },
      }),
      this.prisma.contact.count({
        where: { userId, status: ContactStatus.INACTIVE },
      }),
    ]);

    return { total, active, leads, inactive };
  }

  private async getTasksStats(userId: string): Promise<TasksStats> {
    const [total, pending, completed, highPriority] = await Promise.all([
      this.prisma.task.count({ where: { userId } }),
      this.prisma.task.count({
        where: {
          userId,
          status: { in: [TaskStatus.TODO, TaskStatus.IN_PROGRESS] },
        },
      }),
      this.prisma.task.count({
        where: { userId, status: TaskStatus.DONE },
      }),
      this.prisma.task.count({
        where: { userId, priority: 'HIGH' },
      }),
    ]);

    return { total, pending, completed, highPriority };
  }

  private async getInteractionsStats(
    userId: string,
  ): Promise<InteractionsStats> {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [total, thisWeek, thisMonth] = await Promise.all([
      this.prisma.interaction.count({ where: { userId } }),
      this.prisma.interaction.count({
        where: {
          userId,
          date: { gte: startOfWeek },
        },
      }),
      this.prisma.interaction.count({
        where: {
          userId,
          date: { gte: startOfMonth },
        },
      }),
    ]);

    return { total, thisWeek, thisMonth };
  }
}
