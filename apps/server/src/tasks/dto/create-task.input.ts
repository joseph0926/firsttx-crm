import { InputType, Field } from '@nestjs/graphql';
import { TaskPriority, TaskStatus } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title!: string;

  @Field()
  @IsDate()
  dueDate!: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @Field(() => TaskPriority, { nullable: true })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @Field(() => TaskStatus, { nullable: true })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  contactId?: string;
}
