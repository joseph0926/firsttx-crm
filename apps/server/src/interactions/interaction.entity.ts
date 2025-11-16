import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { InteractionType } from '@prisma/client';
import { User } from '../users/user.entity';
import { Contact } from '../contacts/contact.entity';

registerEnumType(InteractionType, {
  name: 'InteractionType',
});

@ObjectType()
export class Interaction {
  @Field(() => ID)
  id!: string;

  @Field(() => InteractionType)
  type!: InteractionType;

  @Field()
  date!: Date;

  @Field({ nullable: true })
  notes?: string | null;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Contact, { nullable: true })
  contact?: Contact;
}
