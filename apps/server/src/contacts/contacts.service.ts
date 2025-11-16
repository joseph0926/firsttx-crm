import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { ResourceNotFoundException } from '../common/exceptions/app.exception';
import { PaginationInput } from '@/common/dto/pagination.input';
import { PaginatedContacts } from './dto/paginated-contacts.dto';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateContactInput) {
    return this.prisma.contact.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async findAll(
    userId: string,
    pagination: PaginationInput
  ): Promise<PaginatedContacts> {
    const { page, limit } = pagination;

    const where = { userId };

    const [items, total] = await Promise.all([
      this.prisma.contact.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.contact.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  async findOne(id: string, userId: string) {
    const contact = await this.prisma.contact.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!contact) {
      throw new ResourceNotFoundException('Contact', id);
    }

    return contact;
  }

  async update(id: string, userId: string, data: UpdateContactInput) {
    await this.findOne(id, userId);

    return this.prisma.contact.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.contact.delete({
      where: { id },
    });
  }
}
