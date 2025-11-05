import { createContext, useContext, useState, ReactNode } from 'react';
import type { User } from '@shared/schema';
import { loginUser } from '@/lib/mockApi';

type SessionUser = Omit<User, 'password'>;

interface AuthContextType {
  user: SessionUser | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);

  // Static demo: authentication is resolved client-side against mock data.
  const login = async (username: string, password: string) => {
    const userData = await loginUser(username, password);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
