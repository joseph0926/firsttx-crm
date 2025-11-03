import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ContactsStats {
  @Field(() => Int, { description: 'Total number of contacts' })
  total!: number;

  @Field(() => Int, { description: 'Number of active contacts' })
  active!: number;

  @Field(() => Int, { description: 'Number of lead contacts' })
  leads!: number;

  @Field(() => Int, { description: 'Number of inactive contacts' })
  inactive!: number;
}

@ObjectType()
export class TasksStats {
  @Field(() => Int, { description: 'Total number of tasks' })
  total!: number;

  @Field(() => Int, { description: 'Number of pending tasks (TODO + IN_PROGRESS)' })
  pending!: number;

  @Field(() => Int, { description: 'Number of completed tasks' })
  completed!: number;

  @Field(() => Int, { description: 'Number of high priority tasks' })
  highPriority!: number;
}

@ObjectType()
export class InteractionsStats {
  @Field(() => Int, { description: 'Total number of interactions' })
  total!: number;

  @Field(() => Int, { description: 'Number of interactions this week' })
  thisWeek!: number;

  @Field(() => Int, { description: 'Number of interactions this month' })
  thisMonth!: number;
}

@ObjectType()
export class DashboardStats {
  @Field(() => ContactsStats, { description: 'Contacts statistics' })
  contacts!: ContactsStats;

  @Field(() => TasksStats, { description: 'Tasks statistics' })
  tasks!: TasksStats;

  @Field(() => InteractionsStats, { description: 'Interactions statistics' })
  interactions!: InteractionsStats;
}
