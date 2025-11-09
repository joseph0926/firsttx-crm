import { useState } from 'react';
import { useClient } from 'urql';
import { useTx } from '@firsttx/tx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RemoveTaskDocument } from '@/gql/graphql';
import { TasksModel } from '@/models/tasks';
import type { Task } from '@/models/tasks';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';

interface DeleteTaskDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface DeleteTaskInput {
  id: string;
}

export function DeleteTaskDialog({
  task,
  open,
  onOpenChange,
  onSuccess,
}: DeleteTaskDialogProps) {
  const client = useClient();
  const [deletedTask, setDeletedTask] = useState<Task | null>(null);

  const { mutate, isPending } = useTx<DeleteTaskInput>({
    optimistic: async (input) => {
      await TasksModel.patch((draft) => {
        const index = draft.findIndex((t) => t.id === input.id);
        if (index !== -1) {
          setDeletedTask({ ...draft[index] });
          draft.splice(index, 1);
        }
      });
    },
    rollback: async () => {
      if (deletedTask) {
        await TasksModel.patch((draft) => {
          draft.push(deletedTask);
        });
        setDeletedTask(null);
      }
    },
    request: async (input) => {
      const result = await client.mutation(RemoveTaskDocument, {
        id: input.id,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Failed to delete task');
      }

      return result.data;
    },
    transition: true,
    retry: { maxAttempts: 2, delayMs: 500 },
    onSuccess: () => {
      toast.success('Task deleted successfully');
      onOpenChange(false);
      setDeletedTask(null);
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete task');
      console.error(error);
    },
  });

  const handleDelete = () => {
    mutate({ id: task.id });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Delete Task</DialogTitle>
              <DialogDescription>This action cannot be undone.</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-foreground">{task.title}</span>?
            This will permanently remove the task from your list.
          </p>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
