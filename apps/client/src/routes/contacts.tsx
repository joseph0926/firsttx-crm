import { Suspense } from 'react';
import { requireAuth } from '@/lib/auth';
import { ContactsList, CreateContactDialog } from '@/components/contacts';
import { Skeleton } from '@/components/ui/skeleton';

export async function loader() {
  const auth = await requireAuth();
  return { user: auth.user };
}

export function Component() {
  return (
    <div className="flex-1 space-y-8 p-8 bg-background/50 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />

      <div className="relative flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Contacts
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Manage your customer relationships and contacts.
          </p>
        </div>
        <CreateContactDialog />
      </div>

      <div className="relative">
        <Suspense fallback={<ContactsSkeleton />}>
          <ContactsList />
        </Suspense>
      </div>
    </div>
  );
}

function ContactsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-full rounded-2xl bg-background/60 backdrop-blur-xl border border-border/40" />
      <Skeleton className="h-[500px] w-full rounded-3xl bg-background/60 backdrop-blur-xl border border-border/40" />
    </div>
  );
}
