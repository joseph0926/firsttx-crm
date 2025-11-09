import { defineModel } from '@firsttx/local-first';
import { z } from 'zod';
import { InteractionType as GQLInteractionType } from '@/gql/graphql';

const InteractionTypeSchema = z.nativeEnum(GQLInteractionType);

const InteractionContactSchema = z.object({
  id: z.string(),
  name: z.string(),
  company: z.string().nullable().optional(),
});

const InteractionSchema = z.object({
  id: z.string(),
  type: InteractionTypeSchema,
  date: z.any(),
  notes: z.string().nullable().optional(),
  contact: InteractionContactSchema,
});

export const InteractionsModel = defineModel('interactions', {
  schema: z.array(InteractionSchema),
  ttl: 5 * 60 * 1000,
  initialData: [],
});

export type Interaction = z.infer<typeof InteractionSchema>;
export type InteractionType = z.infer<typeof InteractionTypeSchema>;
