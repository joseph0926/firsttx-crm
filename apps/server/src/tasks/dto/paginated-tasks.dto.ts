import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../common/dto/paginated-response.dto';
import { Task } from '../task.entity';

@ObjectType()
export class PaginatedTasks extends Paginated(Task) {}
