import { createContext, useContext, type ReactNode } from 'react';
import { useModel } from '@firsttx/local-first';
import { AuthModel, type AuthData } from '@/models/auth';
import type { UserDetailFragment } from '@/gql/graphql';

type AuthContextValue = {
  auth: AuthData;
  login: (token: string, user: Omit<UserDetailFragment, '__typename'>) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth] = useModel(AuthModel);

  const login = async (token: string, user: Omit<UserDetailFragment, '__typename'>) => {
    await AuthModel.replace({
      accessToken: token,
      user: {
        ...user,
        name: user.name ?? null,
      },
    });
  };

  const logout = async () => {
    await AuthModel.replace(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
