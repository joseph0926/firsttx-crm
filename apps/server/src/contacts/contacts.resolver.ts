import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from './contact.entity';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { PaginationInput } from '@/common/dto/pagination.input';
import { PaginatedContacts } from './dto/paginated-contacts.dto';

@Resolver(() => Contact)
@UseGuards(JwtAuthGuard)
export class ContactsResolver {
  constructor(private contactsService: ContactsService) {}

  @Query(() => PaginatedContacts)
  async contacts(
    @CurrentUser() user: User,
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
  ) {
    return this.contactsService.findAll(
      user.id,
      pagination ?? new PaginationInput(),
    );
  }

  @Query(() => Contact)
  async contact(@Args('id') id: string, @CurrentUser() user: User) {
    return this.contactsService.findOne(id, user.id);
  }

  @Mutation(() => Contact)
  async createContact(
    @Args('input') input: CreateContactInput,
    @CurrentUser() user: User
  ) {
    return this.contactsService.create(user.id, input);
  }

  @Mutation(() => Contact)
  async updateContact(
    @Args('id') id: string,
    @Args('input') input: UpdateContactInput,
    @CurrentUser() user: User
  ) {
    return this.contactsService.update(id, user.id, input);
  }

  @Mutation(() => Contact)
  async removeContact(@Args('id') id: string, @CurrentUser() user: User) {
    return this.contactsService.remove(id, user.id);
  }
}
