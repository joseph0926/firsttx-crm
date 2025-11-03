import { cacheExchange, createClient, fetchExchange, errorExchange, type Client } from 'urql';
import { AuthModel } from '@/models/auth';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/graphql`;

let cachedClient: Client | null = null;
let currentToken: string | null = null;

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
          const isAuthError = error.graphQLErrors.some(
            (e) => e.extensions?.code === 'UNAUTHENTICATED' ||
                   e.message.includes('Unauthorized')
          );

          if (isAuthError) {
            await AuthModel.replace(null);
            cachedClient = null;
            currentToken = null;
            window.location.href = '/login';
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
