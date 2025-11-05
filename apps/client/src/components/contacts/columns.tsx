import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Contact } from '@/models/contacts';

const statusColors = {
  ACTIVE: 'bg-green-500/10 text-green-500',
  INACTIVE: 'bg-gray-500/10 text-gray-500',
  LEAD: 'bg-blue-500/10 text-blue-500',
  LOST: 'bg-red-500/10 text-red-500',
} as const;

const priorityColors = {
  LOW: 'bg-gray-500/10 text-gray-500',
  MEDIUM: 'bg-yellow-500/10 text-yellow-500',
  HIGH: 'bg-orange-500/10 text-orange-500',
  URGENT: 'bg-red-500/10 text-red-500',
} as const;

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
      return (
        <Badge variant="outline" className={statusColors[status]}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      const priority = row.getValue('priority') as Contact['priority'];
      return (
        <Badge variant="outline" className={priorityColors[priority]}>
          {priority}
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
];
