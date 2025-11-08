import { useState } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Contact } from '@/models/contacts';
import { ContactStatus, ContactPriority } from '@/gql/graphql';
import { EditContactDialog } from './EditContactDialog';
import { DeleteContactDialog } from './DeleteContactDialog';

const statusColors = {
  [ContactStatus.Active]: 'bg-green-500/10 text-green-500',
  [ContactStatus.Inactive]: 'bg-gray-500/10 text-gray-500',
  [ContactStatus.Lead]: 'bg-blue-500/10 text-blue-500',
  [ContactStatus.Lost]: 'bg-red-500/10 text-red-500',
} as const;

const priorityColors = {
  [ContactPriority.Low]: 'bg-gray-500/10 text-gray-500',
  [ContactPriority.Medium]: 'bg-yellow-500/10 text-yellow-500',
  [ContactPriority.High]: 'bg-orange-500/10 text-orange-500',
  [ContactPriority.Urgent]: 'bg-red-500/10 text-red-500',
} as const;

// eslint-disable-next-line react-refresh/only-export-components
function ActionsCell({ contact }: { contact: Contact }) {
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

      <EditContactDialog
        contact={contact}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <DeleteContactDialog
        contact={contact}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('name')}</div>;
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const email = row.getValue('email') as string | null;
      return <div className="text-muted-foreground">{email || '-'}</div>;
    },
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => {
      const phone = row.getValue('phone') as string | null;
      return <div className="text-muted-foreground">{phone || '-'}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as Contact['status'];
      const displayText = {
        [ContactStatus.Active]: 'Active',
        [ContactStatus.Inactive]: 'Inactive',
        [ContactStatus.Lead]: 'Lead',
        [ContactStatus.Lost]: 'Lost',
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
      const priority = row.getValue('priority') as Contact['priority'];
      const displayText = {
        [ContactPriority.Low]: 'Low',
        [ContactPriority.Medium]: 'Medium',
        [ContactPriority.High]: 'High',
        [ContactPriority.Urgent]: 'Urgent',
      }[priority];
      return (
        <Badge variant="outline" className={priorityColors[priority]}>
          {displayText}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'lastContactedAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Last Contact
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue('lastContactedAt') as string | null;
      if (!date) return <div className="text-muted-foreground">Never</div>;

      return (
        <div className="text-muted-foreground">
          {new Date(date).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell contact={row.original} />,
  },
];
