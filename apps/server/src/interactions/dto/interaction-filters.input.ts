import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { InteractionType } from '@prisma/client';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { SortOrder } from '../../common/enums/sort-order.enum';

export enum InteractionSortField {
  CREATED_AT = 'createdAt',
  DATE = 'date',
  TYPE = 'type',
}

registerEnumType(InteractionSortField, {
  name: 'InteractionSortField',
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
  @IsDate()
  dateFrom?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
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
