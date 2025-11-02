import { defineModel } from '@firsttx/local-first';
import { z } from 'zod';
import type { UserDetailFragment } from '@/gql/graphql';

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
}) satisfies z.ZodType<Omit<UserDetailFragment, '__typename'>>;

const AuthSchema = z.object({
  accessToken: z.string(),
  user: UserSchema,
}).nullable();

export const AuthModel = defineModel('auth', {
  schema: AuthSchema,
  ttl: Infinity,
  initialData: null,
});

export type AuthData = z.infer<typeof AuthSchema>;
