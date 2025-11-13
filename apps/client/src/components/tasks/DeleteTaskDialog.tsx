import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RemoveTaskDocument, type RemoveTaskMutation } from '@/gql/graphql';
import { TasksModel } from '@/models/tasks';
import type { Task } from '@/models/tasks';
import { AlertTriangle } from 'lucide-react';
import { useDeleteEntity } from '@/hooks/useDeleteEntity';

interface DeleteTaskDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteTaskDialog({
  task,
  open,
  onOpenChange,
  onSuccess,
}: DeleteTaskDialogProps) {
  const { mutate, isPending } = useDeleteEntity<Task, RemoveTaskMutation>({
    model: TasksModel,
    document: RemoveTaskDocument,
    entityName: 'task',
    onSuccess: () => {
      onOpenChange(false);
      onSuccess?.();
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
