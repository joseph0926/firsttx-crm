import { useState } from 'react';
import { motion } from 'motion/react';
import { useMutation } from 'urql';
import { RequestMagicLinkDocument } from '@/gql/graphql';
import { useAuth } from '@/contexts/auth-context';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [{ fetching }, requestMagicLink] = useMutation(
    RequestMagicLinkDocument
  );
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await requestMagicLink({
      input: { email, name: name || undefined },
    });

    if (result.data?.requestMagicLink.success) {
      setSubmitted(true);
    }
  };

  const handleDevLogin = async () => {
    await login('dev-token', {
      id: 'dev-user-id',
      email: 'dev@local',
      name: 'Dev User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative group w-full max-w-md"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-background/60 backdrop-blur-2xl p-8 shadow-xl shadow-primary/5 transition-all duration-500 hover:bg-background/80 hover:border-border/60">
        <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          {!submitted ? (
            <motion.div
              layout="position"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="text-2xl font-bold mb-6 text-foreground">
                Sign In
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-border/40 bg-background/40 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    Name (optional)
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-border/40 bg-background/40 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="Your name"
                  />
                </div>
                <button
                  type="submit"
                  disabled={fetching}
                  className="w-full mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {fetching ? 'Sending...' : 'Send Magic Link'}
                </button>
              </form>

              {import.meta.env.DEV && (
                <button
                  onClick={handleDevLogin}
                  className="w-full mt-4 px-6 py-2.5 bg-muted/60 backdrop-blur-sm text-muted-foreground rounded-full hover:bg-muted/80 transition-all duration-300 text-sm font-medium border border-border/30"
                >
                  Dev Login (Skip Magic Link)
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              layout="position"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="text-center py-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                className="mb-6 text-primary text-6xl"
              >
                ✓
              </motion.div>
              <h2 className="text-2xl font-bold mb-3 text-foreground">
                Magic link sent!
              </h2>
              <p className="text-muted-foreground mb-2">
                Check your email at{' '}
                <strong className="text-foreground">{email}</strong>
              </p>
              <p className="text-sm text-muted-foreground/80">
                Click the link in the email to complete sign in
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
