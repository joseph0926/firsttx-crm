import { cacheExchange, createClient, fetchExchange, errorExchange, type Client } from 'urql';
import { toast } from 'sonner';
import { AuthModel } from '@/models/auth';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/graphql`;

let cachedClient: Client | null = null;
let currentToken: string | null = null;

const ERROR_MESSAGES: Record<string, string> = {
  UNAUTHENTICATED: 'Please sign in to continue',
  UNAUTHORIZED: 'You do not have permission to perform this action',
  NOT_FOUND: 'The requested resource was not found',
  VALIDATION_ERROR: 'Please check your input and try again',
  MAGIC_LINK_EXPIRED: 'This magic link has expired. Please request a new one',
  MAGIC_LINK_INVALID: 'This magic link is invalid',
  MAGIC_LINK_ALREADY_USED: 'This magic link has already been used',
  NETWORK_ERROR: 'Network error. Please check your connection',
  INTERNAL_SERVER_ERROR: 'Something went wrong. Please try again',
};

export const createUrqlClient = async (): Promise<Client> => {
  const auth = await AuthModel.getSnapshot();
  const token = auth?.accessToken || null;

  if (cachedClient && currentToken === token) {
    return cachedClient;
  }

  currentToken = token;
  cachedClient = createClient({
    url: API_URL,
    exchanges: [
      cacheExchange,
      errorExchange({
        onError: async (error) => {
          if (error.networkError) {
            toast.error(ERROR_MESSAGES.NETWORK_ERROR);
            return;
          }

          const graphQLError = error.graphQLErrors[0];
          if (!graphQLError) return;

          const errorCode = graphQLError.extensions?.code as string;
          const isAuthError = errorCode === 'UNAUTHENTICATED' ||
                             errorCode === 'UNAUTHORIZED';

          if (isAuthError) {
            await AuthModel.replace(null);
            cachedClient = null;
            currentToken = null;
            window.location.href = '/login';
            toast.error(ERROR_MESSAGES[errorCode] || 'Authentication required');
            return;
          }

          if (import.meta.env.DEV) {
            console.error('GraphQL Error:', {
              code: errorCode,
              message: graphQLError.message,
              extensions: graphQLError.extensions,
            });
          }
        },
      }),
      fetchExchange,
    ],
    fetchOptions: {
      headers: {
        'content-type': 'application/json',
        authorization: token ? `Bearer ${token}` : '',
      },
    },
  });

  return cachedClient;
};
