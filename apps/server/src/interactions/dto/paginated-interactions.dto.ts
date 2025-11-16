import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../common/dto/paginated-response.dto';
import { Interaction } from '../interaction.entity';

@ObjectType()
export class PaginatedInteractions extends Paginated(Interaction) {}
