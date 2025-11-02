import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import { useMutation } from 'urql';
import { VerifyMagicLinkDocument } from '@/gql/graphql';
import { useAuth } from '@/contexts/auth-context';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center"
      >
        {verifying && !error ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
            />
            <h1 className="text-xl font-semibold mb-2">Verifying...</h1>
            <p className="text-gray-600">Please wait while we sign you in</p>
          </>
        ) : error ? (
          <>
            <div className="mb-4 text-red-600 text-5xl">✕</div>
            <h2 className="text-xl font-semibold mb-2">Verification failed</h2>
            <p className="text-gray-600 mb-4">
              {error.message || 'The magic link is invalid or has expired'}
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Back to Login
            </button>
          </>
        ) : null}
      </motion.div>
    </div>
  );
}
