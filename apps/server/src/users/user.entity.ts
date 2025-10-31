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

  @Field(() => String, { nullable: true })
  name?: string | null;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field(() => [Contact], { nullable: true })
  contacts?: Contact[];

  @Field(() => [Interaction], { nullable: true })
  interactions?: Interaction[];

  @Field(() => [Task], { nullable: true })
  tasks?: Task[];
}
