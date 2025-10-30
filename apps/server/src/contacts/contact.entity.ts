import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { ContactPriority, ContactStatus } from '@prisma/client';
import { User } from '../users/user.entity';
import { Interaction } from '../interactions/interaction.entity';
import { Task } from '../tasks/task.entity';

registerEnumType(ContactPriority, {
  name: 'ContactPriority',
});

registerEnumType(ContactStatus, {
  name: 'ContactStatus',
});

@ObjectType()
export class Contact {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  company?: string;

  @Field({ nullable: true })
  position?: string;

  @Field({ nullable: true })
  notes?: string;

  @Field(() => [String])
  tags!: string[];

  @Field({ nullable: true })
  lastContactedAt?: Date;

  @Field(() => ContactPriority)
  priority!: ContactPriority;

  @Field(() => ContactStatus)
  status!: ContactStatus;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field(() => User)
  user!: User;

  @Field(() => [Interaction])
  interactions!: Interaction[];

  @Field(() => [Task])
  tasks!: Task[];
}
