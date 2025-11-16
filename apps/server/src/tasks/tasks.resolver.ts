import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { TaskFiltersInput } from './dto/task-filters.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { PaginationInput } from '@/common/dto/pagination.input';

@Resolver(() => Task)
@UseGuards(JwtAuthGuard)
export class TasksResolver {
  constructor(private tasksService: TasksService) {}

  @Query(() => [Task])
  async tasks(
    @Args('filters', { nullable: true }) filters: TaskFiltersInput,
    @CurrentUser() user: User,
    @Args('pagination', { nullable: true })
    pagination?: PaginationInput
  ) {
    return this.tasksService.findAll(
      user.id,
      pagination ?? new PaginationInput(),
      filters
    );
  }

  @Query(() => Task)
  async task(@Args('id') id: string, @CurrentUser() user: User) {
    return this.tasksService.findOne(id, user.id);
  }

  @Mutation(() => Task)
  async createTask(
    @Args('input') input: CreateTaskInput,
    @CurrentUser() user: User
  ) {
    return this.tasksService.create(user.id, input);
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('id') id: string,
    @Args('input') input: UpdateTaskInput,
    @CurrentUser() user: User
  ) {
    return this.tasksService.update(id, user.id, input);
  }

  @Mutation(() => Task)
  async removeTask(@Args('id') id: string, @CurrentUser() user: User) {
    return this.tasksService.remove(id, user.id);
  }
}
