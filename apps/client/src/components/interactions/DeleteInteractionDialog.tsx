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
import { RemoveInteractionDocument } from '@/gql/graphql';
import { InteractionsModel } from '@/models/interactions';
import type { Interaction } from '@/models/interactions';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';

interface DeleteInteractionDialogProps {
  interaction: Interaction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface DeleteInteractionInput {
  id: string;
}

export function DeleteInteractionDialog({
  interaction,
  open,
  onOpenChange,
  onSuccess,
}: DeleteInteractionDialogProps) {
  const client = useClient();
  const [deletedInteraction, setDeletedInteraction] = useState<Interaction | null>(null);

  const { mutate, isPending } = useTx<DeleteInteractionInput>({
    optimistic: async (input) => {
      await InteractionsModel.patch((draft) => {
        const index = draft.findIndex((i) => i.id === input.id);
        if (index !== -1) {
          setDeletedInteraction({ ...draft[index] });
          draft.splice(index, 1);
        }
      });
    },
    rollback: async () => {
      if (deletedInteraction) {
        await InteractionsModel.patch((draft) => {
          draft.push(deletedInteraction);
        });
        setDeletedInteraction(null);
      }
    },
    request: async (input) => {
      const result = await client.mutation(RemoveInteractionDocument, {
        id: input.id,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Failed to delete interaction');
      }

      return result.data;
    },
    transition: true,
    retry: { maxAttempts: 2, delayMs: 500 },
    onSuccess: () => {
      toast.success('Interaction deleted successfully');
      onOpenChange(false);
      setDeletedInteraction(null);
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete interaction');
      console.error(error);
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
