import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, MinLength, MaxLength } from 'class-validator';

@InputType()
export class RequestMagicLinkInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(2)
  @MaxLength(100)
  name?: string;
}
