import { useEffect, useState } from 'react';
import { redirect, useNavigate, useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import { useMutation } from 'urql';
import { VerifyMagicLinkDocument } from '@/gql/graphql';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { getAuth } from '@/lib/auth';

export async function loader() {
  const auth = await getAuth();
  if (auth) {
    throw redirect('/dashboard');
  }
  return null;
}

export default function AuthVerifyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [{ error }, verifyMagicLink] = useMutation(VerifyMagicLinkDocument);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const verify = async () => {
      const result = await verifyMagicLink({ input: { token } });

      if (result.data?.verifyMagicLink) {
        const { accessToken, user } = result.data.verifyMagicLink;
        await login(accessToken, {
          id: user.id,
          email: user.email,
          name: user.name ?? null,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        });
        navigate('/dashboard');
      } else if (result.error) {
        setVerifying(false);
      }
    };

    verify();
  }, [searchParams, navigate, verifyMagicLink, login]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative group w-full max-w-md"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-background/60 backdrop-blur-2xl p-10 shadow-xl shadow-primary/5 transition-all duration-500">
        <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 text-center">
          {verifying && !error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full mx-auto mb-6"
              />
              <h1 className="text-2xl font-bold mb-3 text-foreground">
                Verifying...
              </h1>
              <p className="text-muted-foreground">
                Please wait while we sign you in
              </p>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                className="mb-6 text-destructive text-6xl"
              >
                ✕
              </motion.div>
              <h2 className="text-2xl font-bold mb-3 text-foreground">
                Verification failed
              </h2>
              <p className="text-muted-foreground mb-6">
                {error.message || 'The magic link is invalid or has expired'}
              </p>
              <Button
                onClick={() => navigate('/login')}
                className="px-8 py-3 rounded-full font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                Back to Login
              </Button>
            </motion.div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
