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
  RemoveContactDocument,
  type RemoveContactMutation,
} from '@/gql/graphql';
import { ContactsModel } from '@/models/contacts';
import type { Contact } from '@/models/contacts';
import { AlertTriangle } from 'lucide-react';
import { useDeleteEntity } from '@/hooks/useDeleteEntity';

interface DeleteContactDialogProps {
  contact: Contact;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteContactDialog({
  contact,
  open,
  onOpenChange,
  onSuccess,
}: DeleteContactDialogProps) {
  const { mutate, isPending } = useDeleteEntity<Contact, RemoveContactMutation>(
    {
      model: ContactsModel,
      document: RemoveContactDocument,
      entityName: 'contact',
      onSuccess: () => {
        onOpenChange(false);
        onSuccess?.();
      },
    }
  );

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
