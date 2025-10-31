import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ContactsService } from './contacts.service';
import { ContactsResolver } from './contacts.resolver';

@Module({
  imports: [PrismaModule],
  providers: [ContactsService, ContactsResolver],
  exports: [ContactsService],
})
export class ContactsModule {}
