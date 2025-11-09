import { useCallback } from 'react';
import { useSuspenseSyncedModel } from '@firsttx/local-first';
import { useClient, useMutation } from 'urql';
import { TasksModel } from '@/models/tasks';
import { GetTasksDocument, UpdateTaskDocument, TaskStatus } from '@/gql/graphql';
import { TasksDataTable } from './TasksDataTable';
import { createColumns } from './columns';
import { toast } from 'sonner';

export function TasksList() {
  const client = useClient();
  const [, updateTask] = useMutation(UpdateTaskDocument);

  const tasks = useSuspenseSyncedModel(TasksModel, async () => {
    const result = await client.query(GetTasksDocument, {});

    if (result.error) {
      const isAuthError = result.error.graphQLErrors.some(
        (e) =>
          e.extensions?.code === 'UNAUTHENTICATED' ||
          e.message.includes('Unauthorized')
      );

      if (isAuthError) {
        throw new Error('Authentication required');
      }
      throw new Error(result.error.message || 'Failed to fetch tasks');
    }

    if (!result.data?.tasks) {
      throw new Error('Failed to fetch tasks');
    }

    return result.data.tasks;
  });

  const handleStatusChange = useCallback(
    async (taskId: string, status: TaskStatus) => {
      await TasksModel.patch((draft) => {
        const index = draft.findIndex((t) => t.id === taskId);
        if (index !== -1) {
          draft[index].status = status;
        }
      });

      const result = await updateTask({
        id: taskId,
        input: { status },
      });

      if (result.error) {
        toast.error('Failed to update task status');
        await TasksModel.patch((draft) => {
          const index = draft.findIndex((t) => t.id === taskId);
          if (index !== -1) {
            const originalTask = tasks.find((t) => t.id === taskId);
            if (originalTask) {
              draft[index].status = originalTask.status;
            }
          }
        });
        return;
      }

      toast.success('Task status updated');
    },
    [updateTask, tasks]
  );

  const columns = createColumns(handleStatusChange);

  return <TasksDataTable columns={columns} data={tasks} />;
}
