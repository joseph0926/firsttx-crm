import { cacheExchange, createClient, fetchExchange } from 'urql';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/graphql`;

export const createUrqlClient = () => {
  return createClient({
    url: API_URL,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => {
      const token = localStorage.getItem('accessToken');
      return {
        headers: {
          'content-type': 'application/json',
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    },
  });
};
