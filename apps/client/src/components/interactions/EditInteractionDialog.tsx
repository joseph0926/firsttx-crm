import { useState, useEffect } from 'react';
import { useClient } from 'urql';
import { DialogFooter } from '@/components/ui/dialog';
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
  UpdateInteractionDocument,
  InteractionType,
  GetContactsDocument,
  type UpdateInteractionMutation,
} from '@/gql/graphql';
import { InteractionsModel } from '@/models/interactions';
import type { Interaction } from '@/models/interactions';
import { toast } from 'sonner';
import { DialogWrapper } from '../shared/DialogWrapper';
import { useEditEntity } from '@/hooks/useEditEntity';

interface EditInteractionDialogProps {
  interaction: Interaction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface UpdateInteractionInput {
  id: string;
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

export function EditInteractionDialog({
  interaction,
  open,
  onOpenChange,
  onSuccess,
}: EditInteractionDialogProps) {
  const client = useClient();
  const [contacts, setContacts] = useState<Contact[]>([]);

  const dateTime = new Date(interaction.date);
  const [formData, setFormData] = useState({
    type: interaction.type,
    date: dateTime.toISOString().split('T')[0],
    time: dateTime.toTimeString().slice(0, 5),
    notes: interaction.notes || '',
    contactId: interaction.contact.id,
  });

  useEffect(() => {
    if (open) {
      const dateTime = new Date(interaction.date);
      setFormData({
        type: interaction.type,
        date: dateTime.toISOString().split('T')[0],
        time: dateTime.toTimeString().slice(0, 5),
        notes: interaction.notes || '',
        contactId: interaction.contact.id,
      });

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
      fetchContacts();
    }
  }, [open, interaction, client]);

  const { mutate, isPending } = useEditEntity<
    UpdateInteractionInput,
    Interaction,
    UpdateInteractionMutation,
    {
      type: Interaction['type'];
      date: Date;
      notes?: string;
      contactId: string;
    }
  >({
    model: InteractionsModel,
    document: UpdateInteractionDocument,
    entityName: 'interaction',
    transformInput: (input) => ({
      type: input.type,
      date: new Date(`${input.date}T${input.time}:00`),
      notes: input.notes || undefined,
      contactId: input.contactId,
    }),
    extractResult: (data) => data.updateInteraction,
    applyOptimisticUpdate: (entity, input) => ({
      ...entity,
      type: input.type,
      date: `${input.date}T${input.time}:00`,
      notes: input.notes || null,
      contact:
        contacts.find((c) => c.id === input.contactId) || entity.contact,
    }),
    onSuccess: () => {
      onOpenChange(false);
      onSuccess?.();
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

    mutate({ id: interaction.id, ...formData });
  };

  return (
    <DialogWrapper
      type="edit"
      entity="interaction"
      desc="Update the details of this interaction."
      open={open}
      onOpenChange={onOpenChange}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-type">
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
              <SelectTrigger id="edit-type">
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
            <Label htmlFor="edit-contact">
              Contact <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.contactId}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  contactId: value,
                })
              }
              disabled={isPending}
            >
              <SelectTrigger id="edit-contact">
                <SelectValue placeholder="Select contact" />
              </SelectTrigger>
              <SelectContent>
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
              <Label htmlFor="edit-date">
                Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-date"
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
              <Label htmlFor="edit-time">
                Time <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-time"
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
            <Label htmlFor="edit-notes">Notes</Label>
            <Textarea
              id="edit-notes"
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
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Updating...' : 'Update Interaction'}
          </Button>
        </DialogFooter>
      </form>
    </DialogWrapper>
  );
}
