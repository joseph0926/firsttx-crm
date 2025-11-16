import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function Paginated<T>(classRef: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef])
    items!: T[];

    @Field(() => Int)
    total!: number;

    @Field(() => Int)
    page!: number;

    @Field(() => Int)
    limit!: number;

    @Field(() => Int)
    totalPages!: number;

    @Field(() => Boolean)
    hasNextPage!: boolean;

    @Field(() => Boolean)
    hasPreviousPage!: boolean;
  }

  return PaginatedType;
}
