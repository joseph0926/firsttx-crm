import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContactsService } from '../contacts/contacts.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { TaskFiltersInput } from './dto/task-filters.input';
import { SortOrder } from '../common/enums/sort-order.enum';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private contactsService: ContactsService
  ) {}

  private async validateContactOwnership(
    contactId: string | undefined,
    userId: string
  ) {
    if (contactId) {
      await this.contactsService.findOne(contactId, userId);
    }
  }

  async create(userId: string, data: CreateTaskInput) {
    await this.validateContactOwnership(data.contactId, userId);

    return this.prisma.task.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async findAll(userId: string, filters?: TaskFiltersInput) {
    const where: Prisma.TaskWhereInput = {
      userId,
      ...(filters?.status && { status: filters.status }),
      ...(filters?.priority && { priority: filters.priority }),
      ...(filters?.contactId && { contactId: filters.contactId }),
    };

    if (filters?.dueDateFrom || filters?.dueDateTo) {
      where.dueDate = {
        ...(filters.dueDateFrom && { gte: filters.dueDateFrom }),
        ...(filters.dueDateTo && { lte: filters.dueDateTo }),
      };
    }

    const orderBy: Prisma.TaskOrderByWithRelationInput = {};
    if (filters?.sortBy) {
      orderBy[filters.sortBy] = filters.sortOrder || SortOrder.ASC;
    } else {
      orderBy.createdAt = SortOrder.DESC;
    }

    return this.prisma.task.findMany({
      where,
      orderBy,
    });
  }

  async findOne(id: string, userId: string) {
    const task = await this.prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async update(id: string, userId: string, data: UpdateTaskInput) {
    await this.findOne(id, userId);
    await this.validateContactOwnership(data.contactId, userId);

    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.task.delete({
      where: { id },
    });
  }
}
