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
  ContactPriority,
  ContactStatus,
  CreateContactDocument,
} from '@/gql/graphql';
import { ContactsModel } from '@/models/contacts';
import type { Contact } from '@/models/contacts';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface CreateContactDialogProps {
  onSuccess?: () => void;
}

interface CreateContactInput {
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  notes: string;
  status: Contact['status'];
  priority: Contact['priority'];
  tags: string[];
}

export function CreateContactDialog({ onSuccess }: CreateContactDialogProps) {
  const [open, setOpen] = useState(false);
  const client = useClient();

  const [formData, setFormData] = useState<CreateContactInput>({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    notes: '',
    status: ContactStatus.Lead,
    priority: ContactPriority.Medium,
    tags: [],
  });

  const [tagInput, setTagInput] = useState('');

  const { mutate, isPending } = useTx<CreateContactInput>({
    optimistic: async (input) => {
      const tempContact: Contact = {
        id: `temp-${Date.now()}`,
        name: input.name,
        email: input.email || null,
        phone: input.phone || null,
        status: input.status,
        priority: input.priority,
        lastContactedAt: null,
      };

      await ContactsModel.patch((draft) => {
        draft.push(tempContact);
      });
    },
    rollback: async () => {
      await ContactsModel.patch((draft) => {
        const index = draft.findIndex((c) => c.id.startsWith('temp-'));
        if (index !== -1) {
          draft.splice(index, 1);
        }
      });
    },
    request: async (input) => {
      const result = await client.mutation(CreateContactDocument, {
        input: {
          name: input.name,
          email: input.email || undefined,
          phone: input.phone || undefined,
          company: input.company || undefined,
          position: input.position || undefined,
          notes: input.notes || undefined,
          status: input.status,
          priority: input.priority,
          tags: input.tags,
        },
      });

      if (result.error) {
        throw new Error(result.error.message || 'Failed to create contact');
      }

      return result.data;
    },
    transition: true,
    retry: { maxAttempts: 2, delayMs: 500 },
    onSuccess: () => {
      toast.success('Contact created successfully');
      setOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        notes: '',
        status: ContactStatus.Lead,
        priority: ContactPriority.Medium,
        tags: [],
      });
      setTagInput('');
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create contact');
      console.error(error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    mutate(formData);
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Contact</DialogTitle>
          <DialogDescription>
            Add a new contact to your CRM. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
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
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
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
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="Acme Inc."
                  disabled={isPending}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  placeholder="CEO"
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
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
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ContactStatus.Lead}>Lead</SelectItem>
                    <SelectItem value={ContactStatus.Active}>Active</SelectItem>
                    <SelectItem value={ContactStatus.Inactive}>Inactive</SelectItem>
                    <SelectItem value={ContactStatus.Lost}>Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
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
                  <SelectTrigger id="priority">
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

            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Add a tag..."
                  disabled={isPending}
                />
                <Button
                  type="button"
                  onClick={addTag}
                  variant="outline"
                  disabled={isPending}
                >
                  Add
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-primary/10 text-primary"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-primary/80"
                        disabled={isPending}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Additional notes about this contact..."
                rows={3}
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
              {isPending ? 'Creating...' : 'Create Contact'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
