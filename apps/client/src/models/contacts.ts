import { defineModel } from '@firsttx/local-first';
import { z } from 'zod';
import {
  ContactStatus as GQLContactStatus,
  ContactPriority as GQLContactPriority,
} from '@/gql/graphql';

const ContactStatusSchema = z.nativeEnum(GQLContactStatus);

const ContactPrioritySchema = z.nativeEnum(GQLContactPriority);

const ContactSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  status: ContactStatusSchema,
  priority: ContactPrioritySchema,
  lastContactedAt: z.any().nullable().optional(),
});

export const ContactsModel = defineModel('contacts', {
  schema: z.array(ContactSchema),
  ttl: 5 * 60 * 1000,
  initialData: [],
});

export type Contact = z.infer<typeof ContactSchema>;
export type ContactStatus = z.infer<typeof ContactStatusSchema>;
export type ContactPriority = z.infer<typeof ContactPrioritySchema>;
