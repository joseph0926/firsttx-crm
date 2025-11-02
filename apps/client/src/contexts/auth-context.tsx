import { createContext, useContext, type ReactNode } from 'react';
import { useModel } from '@firsttx/local-first';
import { AuthModel, type AuthData } from '@/models/auth';
import type { UserDetailFragment } from '@/gql/graphql';

type AuthContextValue = {
  auth: AuthData;
  user: Omit<UserDetailFragment, '__typename'> | null;
  isAuthenticated: boolean;
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

  const contextValue: AuthContextValue = {
    auth,
    user: auth?.user ?? null,
    isAuthenticated: !!auth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
