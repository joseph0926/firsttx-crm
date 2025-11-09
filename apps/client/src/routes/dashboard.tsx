import { Component as ReactComponent, Suspense, type ReactNode } from 'react';
import { requireAuth } from '@/lib/auth';
import { StatsContent } from '@/components/dashboard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export async function loader() {
  const auth = await requireAuth();
  return { user: auth.user };
}

class ErrorBoundary extends ReactComponent<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            {this.state.error?.message || 'Failed to load dashboard stats'}
          </AlertDescription>
          <Button
            variant="outline"
            size="sm"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4"
          >
            Try again
          </Button>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export function Component() {
  return (
    <div className="flex-1 space-y-8 p-8 bg-background/50 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />

      <div className="relative">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Welcome back! Here's what's happening with your contacts.
        </p>
      </div>

      <div className="relative">
        <ErrorBoundary>
          <Suspense fallback={<StatsSkeleton />}>
            <StatsContent />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton
          key={i}
          className="h-[140px] rounded-3xl bg-background/60 backdrop-blur-xl border border-border/40"
        />
      ))}
    </div>
  );
}
