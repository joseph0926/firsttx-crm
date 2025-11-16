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
  email?: string | null;

  @Field({ nullable: true })
  phone?: string | null;

  @Field({ nullable: true })
  company?: string | null;

  @Field({ nullable: true })
  position?: string | null;

  @Field({ nullable: true })
  notes?: string | null;

  @Field(() => [String])
  tags!: string[];

  @Field({ nullable: true })
  lastContactedAt?: Date | null;

  @Field(() => ContactPriority)
  priority!: ContactPriority;

  @Field(() => ContactStatus)
  status!: ContactStatus;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [Interaction], { nullable: true })
  interactions?: Interaction[];

  @Field(() => [Task], { nullable: true })
  tasks?: Task[];
}
