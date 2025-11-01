import { PartialType, InputType } from '@nestjs/graphql';
import { CreateTaskInput } from './create-task.input';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {}
