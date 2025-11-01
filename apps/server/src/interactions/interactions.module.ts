import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ContactsModule } from '../contacts/contacts.module';
import { InteractionsService } from './interactions.service';
import { InteractionsResolver } from './interactions.resolver';

@Module({
  imports: [PrismaModule, ContactsModule],
  providers: [InteractionsService, InteractionsResolver],
  exports: [InteractionsService],
})
export class InteractionsModule {}
