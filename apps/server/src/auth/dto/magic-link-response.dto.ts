import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class MagicLinkResponse {
  @Field()
  success!: boolean;

  @Field()
  message!: string;

  @Field(() => Int, { nullable: true })
  expiresInMinutes?: number;
}
