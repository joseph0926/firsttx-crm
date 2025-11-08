import { useState } from 'react';
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { ContactStatus, ContactPriority } from '@/gql/graphql';

interface ContactsDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ContactsDataTable<TData, TValue>({
  columns,
  data,
}: ContactsDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const statusFilter = (table.getColumn('status')?.getFilterValue() as string) ?? '';
  const priorityFilter =
    (table.getColumn('priority')?.getFilterValue() as string) ?? '';
  const nameFilter = (table.getColumn('name')?.getFilterValue() as string) ?? '';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search contacts..."
            value={nameFilter}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="pl-9 rounded-full bg-background/60 backdrop-blur-sm border-border/40"
          />
        </div>

        <div className="flex gap-3">
          {(statusFilter || priorityFilter || nameFilter) && (
            <Button
              variant="ghost"
              onClick={() => {
                table.resetColumnFilters();
              }}
              className="h-9 px-3 rounded-full"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}

          <Select
            value={statusFilter || 'all'}
            onValueChange={(value) =>
              table
                .getColumn('status')
                ?.setFilterValue(value === 'all' ? '' : value)
            }
          >
            <SelectTrigger className="w-[140px] rounded-full bg-background/60 backdrop-blur-sm border-border/40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value={ContactStatus.Active}>Active</SelectItem>
              <SelectItem value={ContactStatus.Inactive}>Inactive</SelectItem>
              <SelectItem value={ContactStatus.Lead}>Lead</SelectItem>
              <SelectItem value={ContactStatus.Lost}>Lost</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={priorityFilter || 'all'}
            onValueChange={(value) =>
              table
                .getColumn('priority')
                ?.setFilterValue(value === 'all' ? '' : value)
            }
          >
            <SelectTrigger className="w-[140px] rounded-full bg-background/60 backdrop-blur-sm border-border/40">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value={ContactPriority.Low}>Low</SelectItem>
              <SelectItem value={ContactPriority.Medium}>Medium</SelectItem>
              <SelectItem value={ContactPriority.High}>High</SelectItem>
              <SelectItem value={ContactPriority.Urgent}>Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-background/60 backdrop-blur-2xl shadow-xl shadow-primary/5">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-border/40 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-muted-foreground font-semibold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="border-border/40 hover:bg-primary/5 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-foreground">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-muted-foreground"
                >
                  No contacts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {table.getFilteredRowModel().rows.length} of {data.length}{' '}
          contacts
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-full backdrop-blur-sm bg-background/60 border-border/40 hover:bg-primary/10"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-full backdrop-blur-sm bg-background/60 border-border/40 hover:bg-primary/10"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
