import { type ReactNode, useState, useEffect } from 'react';
import { Provider, type Client } from 'urql';
import { createUrqlClient } from '../lib/urql-client';
import { useModel } from '@firsttx/local-first';
import { AuthModel } from '@/models/auth';

interface UrqlProviderProps {
  children: ReactNode;
}

export function UrqlProvider({ children }: UrqlProviderProps) {
  const [auth] = useModel(AuthModel);
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    createUrqlClient().then(setClient);
  }, [auth?.accessToken]);

  if (!client) {
    return null;
  }

  return <Provider value={client}>{children}</Provider>;
}
