import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  RemoveInteractionDocument,
  type RemoveInteractionMutation,
} from '@/gql/graphql';
import { InteractionsModel } from '@/models/interactions';
import type { Interaction } from '@/models/interactions';
import { AlertTriangle } from 'lucide-react';
import { useDeleteEntity } from '@/hooks/useDeleteEntity';

interface DeleteInteractionDialogProps {
  interaction: Interaction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteInteractionDialog({
  interaction,
  open,
  onOpenChange,
  onSuccess,
}: DeleteInteractionDialogProps) {
  const { mutate, isPending } = useDeleteEntity<
    Interaction,
    RemoveInteractionMutation
  >({
    model: InteractionsModel,
    document: RemoveInteractionDocument,
    entityName: 'interaction',
    onSuccess: () => {
      onOpenChange(false);
      onSuccess?.();
    },
  });

  const handleDelete = () => {
    mutate({ id: interaction.id });
  };

  const typeLabels = {
    CALL: 'call',
    EMAIL: 'email',
    MEETING: 'meeting',
    NOTE: 'note',
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
              <DialogTitle>Delete Interaction</DialogTitle>
              <DialogDescription>This action cannot be undone.</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this{' '}
            <span className="font-semibold text-foreground">
              {typeLabels[interaction.type]}
            </span>{' '}
            with{' '}
            <span className="font-semibold text-foreground">
              {interaction.contact.name}
            </span>
            ? This will permanently remove the interaction from your records.
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
            {isPending ? 'Deleting...' : 'Delete Interaction'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
