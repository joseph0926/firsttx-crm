import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { TaskPriority, TaskStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum TaskSortField {
  CREATED_AT = 'createdAt',
  DUE_DATE = 'dueDate',
  PRIORITY = 'priority',
  STATUS = 'status',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(TaskSortField, {
  name: 'TaskSortField',
});

registerEnumType(SortOrder, {
  name: 'SortOrder',
});

@InputType()
export class TaskFiltersInput {
  @Field(() => TaskStatus, { nullable: true })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @Field(() => TaskPriority, { nullable: true })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  contactId?: string;

  @Field({ nullable: true })
  @IsOptional()
  dueDateFrom?: Date;

  @Field({ nullable: true })
  @IsOptional()
  dueDateTo?: Date;

  @Field(() => TaskSortField, { nullable: true })
  @IsOptional()
  @IsEnum(TaskSortField)
  sortBy?: TaskSortField;

  @Field(() => SortOrder, { nullable: true })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}
