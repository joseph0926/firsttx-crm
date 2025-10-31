import { InputType, Field } from '@nestjs/graphql';
import { ContactPriority, ContactStatus } from '@prisma/client';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateContactInput {
  @Field()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  company?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  position?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string;

  @Field(() => [String], { defaultValue: [] })
  @IsArray()
  @IsString({ each: true })
  tags: string[] = [];

  @Field(() => ContactPriority, { nullable: true })
  @IsOptional()
  @IsEnum(ContactPriority)
  priority?: ContactPriority;

  @Field(() => ContactStatus, { nullable: true })
  @IsOptional()
  @IsEnum(ContactStatus)
  status?: ContactStatus;

  @Field({ nullable: true })
  @IsOptional()
  lastContactedAt?: Date;
}
