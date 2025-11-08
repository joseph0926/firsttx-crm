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
import { RemoveContactDocument } from '@/gql/graphql';
import { ContactsModel } from '@/models/contacts';
import type { Contact } from '@/models/contacts';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';

interface DeleteContactDialogProps {
  contact: Contact;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface DeleteContactInput {
  id: string;
}

export function DeleteContactDialog({
  contact,
  open,
  onOpenChange,
  onSuccess,
}: DeleteContactDialogProps) {
  const client = useClient();
  const [deletedContact, setDeletedContact] = useState<Contact | null>(null);

  const { mutate, isPending } = useTx<DeleteContactInput>({
    optimistic: async (input) => {
      await ContactsModel.patch((draft) => {
        const index = draft.findIndex((c) => c.id === input.id);
        if (index !== -1) {
          setDeletedContact({ ...draft[index] });
          draft.splice(index, 1);
        }
      });
    },
    rollback: async () => {
      if (deletedContact) {
        await ContactsModel.patch((draft) => {
          draft.push(deletedContact);
        });
        setDeletedContact(null);
      }
    },
    request: async (input) => {
      const result = await client.mutation(RemoveContactDocument, {
        id: input.id,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Failed to delete contact');
      }

      return result.data;
    },
    transition: true,
    retry: { maxAttempts: 2, delayMs: 500 },
    onSuccess: () => {
      toast.success('Contact deleted successfully');
      onOpenChange(false);
      setDeletedContact(null);
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete contact');
      console.error(error);
    },
  });

  const handleDelete = () => {
    mutate({ id: contact.id });
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
              <DialogTitle>Delete Contact</DialogTitle>
              <DialogDescription>This action cannot be undone.</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-foreground">{contact.name}</span>?
            This will permanently remove the contact and all associated data from your
            CRM.
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
            {isPending ? 'Deleting...' : 'Delete Contact'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
