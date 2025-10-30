import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { TaskStatus, TaskPriority } from '@prisma/client';
import { User } from '../users/user.entity';
import { Contact } from '../contacts/contact.entity';

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});

registerEnumType(TaskPriority, {
  name: 'TaskPriority',
});

@ObjectType()
export class Task {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field(() => TaskStatus)
  status!: TaskStatus;

  @Field()
  dueDate!: Date;

  @Field({ nullable: true })
  notes?: string;

  @Field(() => TaskPriority)
  priority!: TaskPriority;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field(() => User)
  user!: User;

  @Field(() => Contact, { nullable: true })
  contact?: Contact;
}
