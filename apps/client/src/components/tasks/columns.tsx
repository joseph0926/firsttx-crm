import { useState } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Task } from '@/models/tasks';
import { TaskStatus, TaskPriority } from '@/gql/graphql';
import { EditTaskDialog } from './EditTaskDialog';
import { DeleteTaskDialog } from './DeleteTaskDialog';

const statusColors = {
  [TaskStatus.Todo]: 'bg-gray-500/10 text-gray-500',
  [TaskStatus.InProgress]: 'bg-blue-500/10 text-blue-500',
  [TaskStatus.Done]: 'bg-green-500/10 text-green-500',
} as const;

const priorityColors = {
  [TaskPriority.Low]: 'bg-gray-500/10 text-gray-500',
  [TaskPriority.Medium]: 'bg-yellow-500/10 text-yellow-500',
  [TaskPriority.High]: 'bg-orange-500/10 text-orange-500',
  [TaskPriority.Urgent]: 'bg-red-500/10 text-red-500',
} as const;

// eslint-disable-next-line react-refresh/only-export-components
function ActionsCell({ task }: { task: Task }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditTaskDialog task={task} open={editOpen} onOpenChange={setEditOpen} />
      <DeleteTaskDialog
        task={task}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}

interface CheckboxCellProps {
  task: Task;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
function CheckboxCell({ task, onStatusChange }: CheckboxCellProps) {
  const isCompleted = task.status === TaskStatus.Done;

  const handleCheckedChange = (checked: boolean) => {
    const newStatus = checked ? TaskStatus.Done : TaskStatus.Todo;
    onStatusChange(task.id, newStatus);
  };

  return (
    <Checkbox
      checked={isCompleted}
      onCheckedChange={handleCheckedChange}
      aria-label="Toggle task completion"
    />
  );
}

export function createColumns(
  onStatusChange: (taskId: string, status: TaskStatus) => void
): ColumnDef<Task>[] {
  return [
    {
      id: 'status_checkbox',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <CheckboxCell task={row.original} onStatusChange={onStatusChange} />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue('title')}</div>;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as Task['status'];
        const displayText = {
          [TaskStatus.Todo]: 'To Do',
          [TaskStatus.InProgress]: 'In Progress',
          [TaskStatus.Done]: 'Done',
        }[status];
        return (
          <Badge variant="outline" className={statusColors[status]}>
            {displayText}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => {
        const priority = row.getValue('priority') as Task['priority'];
        const displayText = {
          [TaskPriority.Low]: 'Low',
          [TaskPriority.Medium]: 'Medium',
          [TaskPriority.High]: 'High',
          [TaskPriority.Urgent]: 'Urgent',
        }[priority];
        return (
          <Badge variant="outline" className={priorityColors[priority]}>
            {displayText}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'dueDate',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Due Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.getValue('dueDate') as string;
        const dueDate = new Date(date);
        const now = new Date();
        const isOverdue = dueDate < now && row.original.status !== TaskStatus.Done;
        const isToday =
          dueDate.toDateString() === now.toDateString() &&
          row.original.status !== TaskStatus.Done;

        return (
          <div
            className={`text-muted-foreground ${
              isOverdue
                ? 'text-red-500 font-medium'
                : isToday
                  ? 'text-orange-500 font-medium'
                  : ''
            }`}
          >
            {dueDate.toLocaleDateString()}
          </div>
        );
      },
    },
    {
      accessorKey: 'contact',
      header: 'Contact',
      cell: ({ row }) => {
        const contact = row.getValue('contact') as Task['contact'];
        return (
          <div className="text-muted-foreground">
            {contact?.name || '-'}
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => <ActionsCell task={row.original} />,
    },
  ];
}
