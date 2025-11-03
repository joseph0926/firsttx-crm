import { Module } from '@nestjs/common';
import { StatsResolver } from './stats.resolver';
import { StatsService } from './stats.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [StatsResolver, StatsService],
})
export class StatsModule {}
