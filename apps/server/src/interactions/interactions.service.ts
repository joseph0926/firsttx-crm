import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContactsService } from '../contacts/contacts.service';
import { CreateInteractionInput } from './dto/create-interaction.input';
import { UpdateInteractionInput } from './dto/update-interaction.input';
import { InteractionFiltersInput } from './dto/interaction-filters.input';
import { SortOrder } from '../common/enums/sort-order.enum';
import { Prisma } from '@prisma/client';
import { ResourceNotFoundException } from '../common/exceptions/app.exception';
import { PaginationInput } from '@/common/dto/pagination.input';
import { PaginatedInteractions } from './dto/paginated-interactions.dto';

@Injectable()
export class InteractionsService {
  constructor(
    private prisma: PrismaService,
    private contactsService: ContactsService
  ) {}

  async create(userId: string, data: CreateInteractionInput) {
    await this.contactsService.findOne(data.contactId, userId);

    return this.prisma.interaction.create({
      data: {
        ...data,
        userId,
      },
      include: {
        contact: true,
      },
    });
  }

  async findAll(
    userId: string,
    pagination: PaginationInput,
    filters?: InteractionFiltersInput
  ): Promise<PaginatedInteractions> {
    const { page, limit } = pagination;

    const where: Prisma.InteractionWhereInput = {
      userId,
      ...(filters?.type && { type: filters.type }),
      ...(filters?.contactId && { contactId: filters.contactId }),
    };

    if (filters?.dateFrom || filters?.dateTo) {
      where.date = {
        ...(filters.dateFrom && { gte: filters.dateFrom }),
        ...(filters.dateTo && { lte: filters.dateTo }),
      };
    }

    const orderBy: Prisma.InteractionOrderByWithRelationInput = {};
    if (filters?.sortBy) {
      orderBy[filters.sortBy] = filters.sortOrder || SortOrder.ASC;
    } else {
      orderBy.createdAt = SortOrder.DESC;
    }

    const [items, total] = await Promise.all([
      this.prisma.interaction.findMany({
        where,
        orderBy,
        include: {
          contact: true,
        },
        take: (page - 1) * limit,
        skip: limit,
      }),
      this.prisma.interaction.count({ where }),
    ]);

    const totalPages = Math.ceil(total / page);

    return {
      items,
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  async findOne(id: string, userId: string) {
    const interaction = await this.prisma.interaction.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        contact: true,
      },
    });

    if (!interaction) {
      throw new ResourceNotFoundException('Interaction', id);
    }

    return interaction;
  }

  async update(id: string, userId: string, data: UpdateInteractionInput) {
    await this.findOne(id, userId);

    if (data.contactId) {
      await this.contactsService.findOne(data.contactId, userId);
    }

    return this.prisma.interaction.update({
      where: { id },
      data,
      include: {
        contact: true,
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.interaction.delete({
      where: { id },
      include: {
        contact: true,
      },
    });
  }
}
