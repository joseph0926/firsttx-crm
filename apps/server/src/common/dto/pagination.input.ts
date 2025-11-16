import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, Max, Min } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1 })
  @IsOptional()
  @Min(1)
  page: number = 1;

  @Field(() => Int, { defaultValue: 20 })
  @IsOptional()
  @Min(1)
  @Max(100)
  limit: number = 20;
}
