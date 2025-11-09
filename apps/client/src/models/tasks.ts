import { defineModel } from '@firsttx/local-first';
import { z } from 'zod';
import {
  TaskStatus as GQLTaskStatus,
  TaskPriority as GQLTaskPriority,
} from '@/gql/graphql';

const TaskStatusSchema = z.nativeEnum(GQLTaskStatus);
const TaskPrioritySchema = z.nativeEnum(GQLTaskPriority);

const TaskContactSchema = z
  .object({
    id: z.string(),
    name: z.string(),
  })
  .nullable()
  .optional();

const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: TaskStatusSchema,
  priority: TaskPrioritySchema,
  dueDate: z.any(),
  description: z.string().nullable().optional(),
  contact: TaskContactSchema,
});

export const TasksModel = defineModel('tasks', {
  schema: z.array(TaskSchema),
  ttl: 5 * 60 * 1000,
  initialData: [],
});

export type Task = z.infer<typeof TaskSchema>;
export type TaskStatus = z.infer<typeof TaskStatusSchema>;
export type TaskPriority = z.infer<typeof TaskPrioritySchema>;
