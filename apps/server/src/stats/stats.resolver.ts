import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { StatsService } from './stats.service';
import { DashboardStats } from './entities/dashboard-stats.entity';

@Resolver()
export class StatsResolver {
  constructor(private statsService: StatsService) {}

  @Query(() => DashboardStats, {
    description: 'Get dashboard statistics for the current user',
  })
  @UseGuards(JwtAuthGuard)
  async dashboardStats(@CurrentUser() user: User): Promise<DashboardStats> {
    return this.statsService.getDashboardStats(user.id);
  }
}
