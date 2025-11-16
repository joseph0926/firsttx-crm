import { ObjectType } from '@nestjs/graphql';
import { Contact } from '../contact.entity';
import { Paginated } from '../../common/dto/paginated-response.dto';

@ObjectType()
export class PaginatedContacts extends Paginated(Contact) {}
