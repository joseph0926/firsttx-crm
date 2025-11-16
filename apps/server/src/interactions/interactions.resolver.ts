import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { Interaction } from './interaction.entity';
import { CreateInteractionInput } from './dto/create-interaction.input';
import { UpdateInteractionInput } from './dto/update-interaction.input';
import { InteractionFiltersInput } from './dto/interaction-filters.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { PaginationInput } from '@/common/dto/pagination.input';

@Resolver(() => Interaction)
@UseGuards(JwtAuthGuard)
export class InteractionsResolver {
  constructor(private interactionsService: InteractionsService) {}

  @Query(() => [Interaction])
  async interactions(
    @Args('filters', { nullable: true }) filters: InteractionFiltersInput,
    @CurrentUser() user: User,
    @Args('pagination', { nullable: true })
    pagination?: PaginationInput
  ) {
    return this.interactionsService.findAll(
      user.id,
      pagination ?? new PaginationInput(),
      filters
    );
  }

  @Query(() => Interaction)
  async interaction(@Args('id') id: string, @CurrentUser() user: User) {
    return this.interactionsService.findOne(id, user.id);
  }

  @Mutation(() => Interaction)
  async createInteraction(
    @Args('input') input: CreateInteractionInput,
    @CurrentUser() user: User
  ) {
    return this.interactionsService.create(user.id, input);
  }

  @Mutation(() => Interaction)
  async updateInteraction(
    @Args('id') id: string,
    @Args('input') input: UpdateInteractionInput,
    @CurrentUser() user: User
  ) {
    return this.interactionsService.update(id, user.id, input);
  }

  @Mutation(() => Interaction)
  async removeInteraction(@Args('id') id: string, @CurrentUser() user: User) {
    return this.interactionsService.remove(id, user.id);
  }
}
