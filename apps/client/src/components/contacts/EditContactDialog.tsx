import { useState, useEffect } from 'react';
import { useClient } from 'urql';
import { useTx } from '@firsttx/tx';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  UpdateContactDocument,
  ContactStatus,
  ContactPriority,
} from '@/gql/graphql';
import { ContactsModel } from '@/models/contacts';
import type { Contact } from '@/models/contacts';
import { toast } from 'sonner';
import { DialogWrapper } from '../shared/DialogWrapper';

interface EditContactDialogProps {
  contact: Contact;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface UpdateContactInput {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: Contact['status'];
  priority: Contact['priority'];
}

export function EditContactDialog({
  contact,
  open,
  onOpenChange,
  onSuccess,
}: EditContactDialogProps) {
  const client = useClient();

  const [formData, setFormData] = useState({
    name: contact.name,
    email: contact.email || '',
    phone: contact.phone || '',
    status: contact.status,
    priority: contact.priority,
  });

  const [previousData, setPreviousData] = useState<Contact | null>(null);

  useEffect(() => {
    if (open) {
      setFormData({
        name: contact.name,
        email: contact.email || '',
        phone: contact.phone || '',
        status: contact.status,
        priority: contact.priority,
      });
    }
  }, [open, contact]);

  const { mutate, isPending } = useTx<UpdateContactInput>({
    optimistic: async (input) => {
      await ContactsModel.patch((draft) => {
        const index = draft.findIndex((c) => c.id === input.id);
        if (index !== -1) {
          setPreviousData({ ...draft[index] });
          draft[index] = {
            ...draft[index],
            name: input.name,
            email: input.email || null,
            phone: input.phone || null,
            status: input.status,
            priority: input.priority,
          };
        }
      });
    },
    rollback: async () => {
      if (previousData) {
        await ContactsModel.patch((draft) => {
          const index = draft.findIndex((c) => c.id === previousData.id);
          if (index !== -1) {
            draft[index] = previousData;
          }
        });
        setPreviousData(null);
      }
    },
    request: async (input) => {
      const result = await client.mutation(UpdateContactDocument, {
        id: input.id,
        input: {
          name: input.name,
          email: input.email || undefined,
          phone: input.phone || undefined,
          status: input.status,
          priority: input.priority,
        },
      });

      if (result.error) {
        throw new Error(result.error.message || 'Failed to update contact');
      }

      return result.data;
    },
    transition: true,
    retry: { maxAttempts: 2, delayMs: 500 },
    onSuccess: () => {
      toast.success('Contact updated successfully');
      onOpenChange(false);
      setPreviousData(null);
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update contact');
      console.error(error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    mutate({
      id: contact.id,
      ...formData,
    });
  };

  return (
    <DialogWrapper
      type="edit"
      entity="contact"
      desc="Update contact information. Changes will be saved immediately."
      open={open}
      onOpenChange={onOpenChange}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="John Doe"
              required
              disabled={isPending}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john@example.com"
                disabled={isPending}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+1-555-0100"
                disabled={isPending}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    status: value as typeof formData.status,
                  })
                }
                disabled={isPending}
              >
                <SelectTrigger id="edit-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ContactStatus.Lead}>Lead</SelectItem>
                  <SelectItem value={ContactStatus.Active}>Active</SelectItem>
                  <SelectItem value={ContactStatus.Inactive}>
                    Inactive
                  </SelectItem>
                  <SelectItem value={ContactStatus.Lost}>Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    priority: value as typeof formData.priority,
                  })
                }
                disabled={isPending}
              >
                <SelectTrigger id="edit-priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ContactPriority.Low}>Low</SelectItem>
                  <SelectItem value={ContactPriority.Medium}>Medium</SelectItem>
                  <SelectItem value={ContactPriority.High}>High</SelectItem>
                  <SelectItem value={ContactPriority.Urgent}>Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
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
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </form>
    </DialogWrapper>
  );
}
