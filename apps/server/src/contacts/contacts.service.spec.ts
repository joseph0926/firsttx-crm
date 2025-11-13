import { Test, TestingModule } from '@nestjs/testing';
import { Contact } from '@prisma/client';
import { ContactsService } from './contacts.service';
import { PrismaService } from '../prisma/prisma.service';
import { createPrismaMock, MockPrismaClient } from '../test/prisma-mock';

describe('ContactsService', () => {
  let service: ContactsService;
  let prisma: MockPrismaClient;

  beforeEach(async () => {
    prisma = createPrismaMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all contacts for a user', async () => {
      const userId = 'user-1';
      const mockContacts: Contact[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '010-1234-5678',
          company: 'Acme Inc',
          position: 'CEO',
          status: 'ACTIVE',
          priority: 'HIGH',
          tags: ['vip'],
          notes: 'Important client',
          lastContactedAt: new Date('2024-01-15'),
          userId: 'user-1',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '010-9876-5432',
          company: 'Tech Corp',
          position: 'CTO',
          status: 'LEAD',
          priority: 'MEDIUM',
          tags: ['potential'],
          notes: 'Follow up next week',
          lastContactedAt: null,
          userId: 'user-1',
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date('2024-01-02'),
        },
      ];

      prisma.contact.findMany.mockResolvedValue(mockContacts);

      const result = await service.findAll(userId);

      expect(result).toEqual(mockContacts);
      expect(prisma.contact.findMany).toHaveBeenCalledWith({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
    });
  });
});
