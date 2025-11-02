import { useState } from 'react';
import { motion } from 'motion/react';
import { useMutation } from 'urql';
import { RequestMagicLinkDocument } from '@/gql/graphql';
import { useAuth } from '@/contexts/auth-context';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [{ fetching }, requestMagicLink] = useMutation(RequestMagicLinkDocument);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        layout
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {!submitted ? (
          <motion.div
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="text-2xl font-bold mb-6">Sign In</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name (optional)
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>
              <button
                type="submit"
                disabled={fetching}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {fetching ? 'Sending...' : 'Send Magic Link'}
              </button>
            </form>

            {import.meta.env.DEV && (
              <button
                onClick={handleDevLogin}
                className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 text-sm"
              >
                Dev Login (Skip Magic Link)
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="mb-4 text-green-600 text-5xl">✓</div>
            <h2 className="text-xl font-semibold mb-2">Magic link sent!</h2>
            <p className="text-gray-600 mb-4">
              Check your email at <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500">
              Click the link in the email to complete sign in
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
