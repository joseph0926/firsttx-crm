import { useRouteError, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

export function RouteErrorBoundary() {
  const error = useRouteError() as Error;
  const navigate = useNavigate();

  const handleReset = () => {
    navigate(0);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="relative bg-card/40 backdrop-blur-xl rounded-3xl border border-border shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-destructive/5 via-destructive/5 to-transparent" />

          <div className="relative z-10 p-8 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
              <div className="w-2.5 h-2.5 rounded-full bg-chart-1" />
              <div className="w-2.5 h-2.5 rounded-full bg-chart-2" />
            </div>

            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-destructive"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Something went wrong
                  </h1>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground"
              >
                An unexpected error occurred. Please try again or return to
                the home page.
              </motion.p>
            </div>

            {import.meta.env.DEV && error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4 bg-destructive/5 backdrop-blur-sm rounded-2xl border border-destructive/20"
              >
                <p className="text-sm font-medium text-destructive mb-2">
                  {error.message}
                </p>
                {error.stack && (
                  <pre className="overflow-auto text-xs text-muted-foreground max-h-40">
                    {error.stack}
                  </pre>
                )}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex gap-3 pt-2"
            >
              <Button
                onClick={handleReset}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-colors shadow-md"
              >
                Try again
              </Button>
              <Button
                variant="outline"
                onClick={handleGoHome}
                className="flex-1 bg-card/80 backdrop-blur-sm border-border hover:border-primary/30 rounded-xl font-medium transition-all"
              >
                Go home
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
