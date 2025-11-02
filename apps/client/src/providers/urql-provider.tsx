import { type ReactNode, useMemo } from 'react';
import { Provider } from 'urql';
import { createUrqlClient } from '../lib/urql-client';

interface UrqlProviderProps {
  children: ReactNode;
}

export function UrqlProvider({ children }: UrqlProviderProps) {
  const client = useMemo(() => createUrqlClient(), []);

  return <Provider value={client}>{children}</Provider>;
}
