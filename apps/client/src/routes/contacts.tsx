import { Suspense } from 'react';
import { requireAuth } from '@/lib/auth';
import { ContactsList } from '@/components/contacts';
import { Skeleton } from '@/components/ui/skeleton';

export async function loader() {
  const auth = await requireAuth();
  return { user: auth.user };
}

export default function ContactsPage() {
  return (
    <div className="flex-1 space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        <p className="text-muted-foreground mt-2">
          Manage your customer relationships and contacts.
        </p>
      </div>
      <Suspense fallback={<ContactsSkeleton />}>
        <ContactsList />
      </Suspense>
    </div>
  );
}

function ContactsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-[400px] w-full" />
    </div>
  );
}
