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
  TaskPriority,
  TaskStatus,
  CreateTaskDocument,
  GetContactsDocument,
  type CreateTaskMutation,
  type CreateTaskInput as GQLCreateTaskInput,
} from '@/gql/graphql';
import { TasksModel } from '@/models/tasks';
import type { Task } from '@/models/tasks';
import { toast } from 'sonner';
import { DialogWrapper } from '../shared/DialogWrapper';
import { useCreateEntity } from '@/hooks/useCreateEntity';

interface CreateTaskDialogProps {
  onSuccess?: () => void;
}

interface CreateTaskInput {
  title: string;
  description: string;
  dueDate: string;
  priority: Task['priority'];
  status: Task['status'];
  contactId: string;
}

interface Contact {
  id: string;
  name: string;
}

export function CreateTaskDialog({ onSuccess }: CreateTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const client = useClient();
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [formData, setFormData] = useState<CreateTaskInput>({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: TaskPriority.Medium,
    status: TaskStatus.Todo,
    contactId: '',
  });

  useEffect(() => {
    const fetchContacts = async () => {
      const result = await client.query(GetContactsDocument, {});
      if (result.data?.contacts) {
        setContacts(
          result.data.contacts.map((c) => ({ id: c.id, name: c.name }))
        );
      }
    };
    if (open) {
      fetchContacts();
    }
  }, [open, client]);

  const { mutate, isPending } = useCreateEntity<
    CreateTaskInput,
    Task,
    CreateTaskMutation,
    GQLCreateTaskInput
  >({
    model: TasksModel,
    document: CreateTaskDocument,
    entityName: 'task',
    buildTempEntity: (input) => ({
      id: `temp-${Date.now()}`,
      title: input.title,
      status: input.status,
      priority: input.priority,
      dueDate: input.dueDate,
      description: input.description || null,
      contact: input.contactId
        ? contacts.find((c) => c.id === input.contactId) || null
        : null,
    }),
    transformInput: (input) => ({
      title: input.title,
      description: input.description || undefined,
      dueDate: new Date(input.dueDate),
      priority: input.priority,
      status: input.status,
      contactId: input.contactId || undefined,
    }),
    extractResult: (data) => data.createTask,
    addToTop: false,
    onSuccess: () => {
      setOpen(false);
      setFormData({
        title: '',
        description: '',
        dueDate: new Date().toISOString().split('T')[0],
        priority: TaskPriority.Medium,
        status: TaskStatus.Todo,
        contactId: '',
      });
      onSuccess?.();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (!formData.dueDate) {
      toast.error('Due date is required');
      return;
    }

    mutate(formData);
  };

  return (
    <DialogWrapper
      type="create"
      entity="task"
      desc="Add a new task to track your work. Fill in the details below."
      open={open}
      onOpenChange={setOpen}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Follow up with client"
              required
              disabled={isPending}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Additional details about this task..."
              rows={3}
              disabled={isPending}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="dueDate">
                Due Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                required
                disabled={isPending}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact">Contact (Optional)</Label>
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
                  <SelectItem value="none">None</SelectItem>
                  {contacts.map((contact) => (
                    <SelectItem key={contact.id} value={contact.id}>
                      {contact.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  <SelectItem value={TaskStatus.Todo}>To Do</SelectItem>
                  <SelectItem value={TaskStatus.InProgress}>
                    In Progress
                  </SelectItem>
                  <SelectItem value={TaskStatus.Done}>Done</SelectItem>
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
                  <SelectItem value={TaskPriority.Low}>Low</SelectItem>
                  <SelectItem value={TaskPriority.Medium}>Medium</SelectItem>
                  <SelectItem value={TaskPriority.High}>High</SelectItem>
                  <SelectItem value={TaskPriority.Urgent}>Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
            {isPending ? 'Creating...' : 'Create Task'}
          </Button>
        </DialogFooter>
      </form>
    </DialogWrapper>
  );
}
