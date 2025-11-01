import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { InteractionType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum InteractionSortField {
  CREATED_AT = 'createdAt',
  DATE = 'date',
  TYPE = 'type',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(InteractionSortField, {
  name: 'InteractionSortField',
});

registerEnumType(SortOrder, {
  name: 'SortOrder',
});

@InputType()
export class InteractionFiltersInput {
  @Field(() => InteractionType, { nullable: true })
  @IsOptional()
  @IsEnum(InteractionType)
  type?: InteractionType;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  contactId?: string;

  @Field({ nullable: true })
  @IsOptional()
  dateFrom?: Date;

  @Field({ nullable: true })
  @IsOptional()
  dateTo?: Date;

  @Field(() => InteractionSortField, { nullable: true })
  @IsOptional()
  @IsEnum(InteractionSortField)
  sortBy?: InteractionSortField;

  @Field(() => SortOrder, { nullable: true })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}
