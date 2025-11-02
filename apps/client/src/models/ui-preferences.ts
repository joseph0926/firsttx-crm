import { defineModel } from '@firsttx/local-first';
import { z } from 'zod';

const UiPreferencesSchema = z.object({
  sidebarExpanded: z.boolean(),
});

export const UiPreferencesModel = defineModel('ui-preferences', {
  schema: UiPreferencesSchema,
  ttl: Infinity,
  initialData: {
    sidebarExpanded: true,
  },
});

export type UiPreferences = z.infer<typeof UiPreferencesSchema>;
