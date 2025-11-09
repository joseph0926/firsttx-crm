import { useState, useEffect } from 'react';
import { useClient } from 'urql';
import { useTx } from '@firsttx/tx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  InteractionType,
  CreateInteractionDocument,
  GetContactsDocument,
} from '@/gql/graphql';
import { InteractionsModel } from '@/models/interactions';
import type { Interaction } from '@/models/interactions';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface CreateInteractionDialogProps {
  onSuccess?: () => void;
}

interface CreateInteractionInput {
  type: Interaction['type'];
  date: string;
  time: string;
  notes: string;
  contactId: string;
}

interface Contact {
  id: string;
  name: string;
  company?: string | null;
}

export function CreateInteractionDialog({ onSuccess }: CreateInteractionDialogProps) {
  const [open, setOpen] = useState(false);
  const client = useClient();
  const [contacts, setContacts] = useState<Contact[]>([]);

  const now = new Date();
  const [formData, setFormData] = useState<CreateInteractionInput>({
    type: InteractionType.Note,
    date: now.toISOString().split('T')[0],
    time: now.toTimeString().slice(0, 5),
    notes: '',
    contactId: '',
  });

  useEffect(() => {
    const fetchContacts = async () => {
      const result = await client.query(GetContactsDocument, {});
      if (result.data?.contacts) {
        setContacts(
          result.data.contacts.map((c) => ({
            id: c.id,
            name: c.name,
            company: c.company,
          }))
        );
      }
    };
    if (open) {
      fetchContacts();
    }
  }, [open, client]);

  const { mutate, isPending } = useTx<CreateInteractionInput>({
    optimistic: async (input) => {
      const tempInteraction: Interaction = {
        id: `temp-${Date.now()}`,
        type: input.type,
        date: `${input.date}T${input.time}:00`,
        notes: input.notes || null,
        contact: contacts.find((c) => c.id === input.contactId) || {
          id: input.contactId,
          name: 'Loading...',
        },
      };

      await InteractionsModel.patch((draft) => {
        draft.unshift(tempInteraction);
      });
    },
    rollback: async () => {
      await InteractionsModel.patch((draft) => {
        const index = draft.findIndex((i) => i.id.startsWith('temp-'));
        if (index !== -1) {
          draft.splice(index, 1);
        }
      });
    },
    request: async (input) => {
      const mutationInput = {
        type: input.type,
        date: new Date(`${input.date}T${input.time}:00`),
        notes: input.notes || undefined,
        contactId: input.contactId,
      };

      const result = await client.mutation(CreateInteractionDocument, {
        input: mutationInput,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Failed to create interaction');
      }

      return result.data;
    },
    transition: true,
    retry: { maxAttempts: 2, delayMs: 500 },
    onSuccess: () => {
      toast.success('Interaction created successfully');
      setOpen(false);
      const now = new Date();
      setFormData({
        type: InteractionType.Note,
        date: now.toISOString().split('T')[0],
        time: now.toTimeString().slice(0, 5),
        notes: '',
        contactId: '',
      });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create interaction');
      console.error(error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.contactId) {
      toast.error('Contact is required');
      return;
    }

    if (!formData.date || !formData.time) {
      toast.error('Date and time are required');
      return;
    }

    mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Interaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Interaction</DialogTitle>
          <DialogDescription>
            Record a new interaction with a contact. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">
                Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    type: value as typeof formData.type,
                  })
                }
                disabled={isPending}
              >
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={InteractionType.Call}>Call</SelectItem>
                  <SelectItem value={InteractionType.Email}>Email</SelectItem>
                  <SelectItem value={InteractionType.Meeting}>Meeting</SelectItem>
                  <SelectItem value={InteractionType.Note}>Note</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contact">
                Contact <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.contactId || 'none'}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    contactId: value === 'none' ? '' : value,
                  })
                }
                disabled={isPending}
              >
                <SelectTrigger id="contact">
                  <SelectValue placeholder="Select contact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Select a contact</SelectItem>
                  {contacts.map((contact) => (
                    <SelectItem key={contact.id} value={contact.id}>
                      {contact.name}
                      {contact.company && ` (${contact.company})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">
                  Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                  disabled={isPending}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">
                  Time <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  required
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Add notes about this interaction..."
                rows={4}
                disabled={isPending}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Interaction'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
