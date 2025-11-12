import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

type EntityType = 'contact' | 'task' | 'interaction';
type DialogWrapperProps = {
  type: 'create' | 'edit';
  entity: EntityType;
  children: React.ReactNode;
  desc: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentClassName?: string;
  triggerButton?: React.ReactNode;
};

const ENTITY_LABELS: Record<EntityType, string> = {
  contact: 'Contact',
  task: 'Task',
  interaction: 'Interaction',
};

export const DialogWrapper = ({
  type,
  entity,
  children,
  desc,
  open,
  onOpenChange,
  contentClassName,
  triggerButton,
}: DialogWrapperProps) => {
  const title = type === 'create' ? 'Create New' : 'Edit';
  const defaultTriggerButton = (
    <Button className="rounded-full bg-primary hover:bg-primary/90">
      <Plus className="h-4 w-4 mr-2" />
      Add {ENTITY_LABELS[entity]}
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {type === 'create' ? (
        <DialogTrigger asChild>
          {triggerButton ?? defaultTriggerButton}
        </DialogTrigger>
      ) : null}
      <DialogContent
        className={cn(
          'sm:max-w-[600px] max-h-[90vh] overflow-y-auto',
          contentClassName
        )}
      >
        <DialogHeader>
          <DialogTitle>
            {title} {ENTITY_LABELS[entity]}
          </DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
