import { InputType, Field } from '@nestjs/graphql';
import { InteractionType } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateInteractionInput {
  @Field(() => InteractionType)
  @IsEnum(InteractionType)
  type!: InteractionType;

  @Field()
  date!: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string;

  @Field()
  @IsString()
  contactId!: string;
}
