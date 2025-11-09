import { useState } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2, Phone, Mail, Calendar, FileText } from 'lucide-react';
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
import type { Interaction } from '@/models/interactions';
import { InteractionType } from '@/gql/graphql';
import { EditInteractionDialog } from './EditInteractionDialog';
import { DeleteInteractionDialog } from './DeleteInteractionDialog';

const typeIcons = {
  [InteractionType.Call]: Phone,
  [InteractionType.Email]: Mail,
  [InteractionType.Meeting]: Calendar,
  [InteractionType.Note]: FileText,
} as const;

const typeColors = {
  [InteractionType.Call]: 'bg-blue-500/10 text-blue-500',
  [InteractionType.Email]: 'bg-purple-500/10 text-purple-500',
  [InteractionType.Meeting]: 'bg-green-500/10 text-green-500',
  [InteractionType.Note]: 'bg-gray-500/10 text-gray-500',
} as const;

// eslint-disable-next-line react-refresh/only-export-components
function ActionsCell({ interaction }: { interaction: Interaction }) {
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

      <EditInteractionDialog
        interaction={interaction}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <DeleteInteractionDialog
        interaction={interaction}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}

export const columns: ColumnDef<Interaction>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as Interaction['type'];
      const Icon = typeIcons[type];
      const displayText = {
        [InteractionType.Call]: 'Call',
        [InteractionType.Email]: 'Email',
        [InteractionType.Meeting]: 'Meeting',
        [InteractionType.Note]: 'Note',
      }[type];

      return (
        <Badge variant="outline" className={typeColors[type]}>
          <Icon className="mr-1 h-3 w-3" />
          {displayText}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'contact',
    header: 'Contact',
    cell: ({ row }) => {
      const contact = row.getValue('contact') as Interaction['contact'];
      return (
        <div>
          <div className="font-medium">{contact.name}</div>
          {contact.company && (
            <div className="text-sm text-muted-foreground">{contact.company}</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue('date') as string;
      const interactionDate = new Date(date);
      const now = new Date();
      const isToday = interactionDate.toDateString() === now.toDateString();

      return (
        <div className={isToday ? 'text-primary font-medium' : 'text-muted-foreground'}>
          {interactionDate.toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => {
      const notes = row.getValue('notes') as string | null | undefined;
      return (
        <div className="max-w-[400px] truncate text-muted-foreground">
          {notes || '-'}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell interaction={row.original} />,
  },
];
