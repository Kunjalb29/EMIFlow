import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../services/api';
import type { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateName: (name: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize and check current session on mount
  useEffect(() => {
    async function initAuth() {
      try {
        const currentUser = await api.getMe();
        setUser(currentUser);
      } catch {
        // Not logged in or expired session
        setUser(null);
        localStorage.removeItem('emiflow_token');
      } finally {
        setLoading(false);
      }
    }

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.login({ email, password });
    localStorage.setItem('emiflow_token', res.token);
    setUser(res.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await api.register({ name, email, password });
    localStorage.setItem('emiflow_token', res.token);
    setUser(res.user);
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (e) {
      console.warn('Logout error:', e);
    } finally {
      localStorage.removeItem('emiflow_token');
      setUser(null);
    }
  };

  const updateName = async (name: string) => {
    const updated = await api.updateProfile(name);
    setUser(updated);
  };

  const refreshUser = async () => {
    try {
      const currentUser = await api.getMe();
      setUser(currentUser);
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateName,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
