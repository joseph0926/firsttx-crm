import { useState, useEffect } from 'react';
import { useClient } from 'urql';
import { useTx } from '@firsttx/tx';
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
  UpdateTaskDocument,
  TaskStatus,
  TaskPriority,
  GetContactsDocument,
} from '@/gql/graphql';
import { TasksModel } from '@/models/tasks';
import type { Task } from '@/models/tasks';
import { toast } from 'sonner';
import { DialogWrapper } from '../shared/DialogWrapper';

interface EditTaskDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface UpdateTaskInput {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: Task['status'];
  priority: Task['priority'];
  contactId: string;
}

interface Contact {
  id: string;
  name: string;
}

export function EditTaskDialog({
  task,
  open,
  onOpenChange,
  onSuccess,
}: EditTaskDialogProps) {
  const client = useClient();
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || '',
    dueDate: new Date(task.dueDate).toISOString().split('T')[0],
    status: task.status,
    priority: task.priority,
    contactId: task.contact?.id || '',
  });

  const [previousData, setPreviousData] = useState<Task | null>(null);

  useEffect(() => {
    if (open) {
      setFormData({
        title: task.title,
        description: task.description || '',
        dueDate: new Date(task.dueDate).toISOString().split('T')[0],
        status: task.status,
        priority: task.priority,
        contactId: task.contact?.id || '',
      });

      const fetchContacts = async () => {
        const result = await client.query(GetContactsDocument, {});
        if (result.data?.contacts) {
          setContacts(
            result.data.contacts.map((c) => ({ id: c.id, name: c.name }))
          );
        }
      };
      fetchContacts();
    }
  }, [open, task, client]);

  const { mutate, isPending } = useTx<UpdateTaskInput>({
    optimistic: async (input) => {
      await TasksModel.patch((draft) => {
        const index = draft.findIndex((t) => t.id === input.id);
        if (index !== -1) {
          setPreviousData({ ...draft[index] });
          draft[index] = {
            ...draft[index],
            title: input.title,
            description: input.description || null,
            dueDate: input.dueDate,
            status: input.status,
            priority: input.priority,
            contact: input.contactId
              ? contacts.find((c) => c.id === input.contactId) || null
              : null,
          };
        }
      });
    },
    rollback: async () => {
      if (previousData) {
        await TasksModel.patch((draft) => {
          const index = draft.findIndex((t) => t.id === previousData.id);
          if (index !== -1) {
            draft[index] = previousData;
          }
        });
        setPreviousData(null);
      }
    },
    request: async (input) => {
      const result = await client.mutation(UpdateTaskDocument, {
        id: input.id,
        input: {
          title: input.title,
          description: input.description || undefined,
          dueDate: new Date(input.dueDate).toISOString(),
          status: input.status,
          priority: input.priority,
          contactId: input.contactId || undefined,
        },
      });

      if (result.error) {
        throw new Error(result.error.message || 'Failed to update task');
      }

      return result.data;
    },
    transition: true,
    retry: { maxAttempts: 2, delayMs: 500 },
    onSuccess: () => {
      toast.success('Task updated successfully');
      onOpenChange(false);
      setPreviousData(null);
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update task');
      console.error(error);
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

    mutate({
      id: task.id,
      ...formData,
    });
  };

  return (
    <DialogWrapper
      type="edit"
      entity="task"
      desc="Update the task details below."
      open={open}
      onOpenChange={onOpenChange}
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
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Updating...' : 'Update Task'}
          </Button>
        </DialogFooter>
      </form>
    </DialogWrapper>
  );
}
