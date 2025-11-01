import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContactsService } from '../contacts/contacts.service';
import { CreateInteractionInput } from './dto/create-interaction.input';
import { UpdateInteractionInput } from './dto/update-interaction.input';
import {
  InteractionFiltersInput,
  SortOrder,
} from './dto/interaction-filters.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class InteractionsService {
  constructor(
    private prisma: PrismaService,
    private contactsService: ContactsService,
  ) {}

  async create(userId: string, data: CreateInteractionInput) {
    await this.contactsService.findOne(data.contactId, userId);

    return this.prisma.interaction.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async findAll(userId: string, filters?: InteractionFiltersInput) {
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

    return this.prisma.interaction.findMany({
      where,
      orderBy,
    });
  }

  async findOne(id: string, userId: string) {
    const interaction = await this.prisma.interaction.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!interaction) {
      throw new NotFoundException('Interaction not found');
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
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.interaction.delete({
      where: { id },
    });
  }
}
