import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Contact } from '../contacts/contact.entity';
import { Interaction } from '../interactions/interaction.entity';
import { Task } from '../tasks/task.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  email!: string;

  @Field({ nullable: true })
  name?: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field(() => [Contact])
  contacts!: Contact[];

  @Field(() => [Interaction])
  interactions!: Interaction[];

  @Field(() => [Task])
  tasks!: Task[];
}
