import { useCallback, useMemo, useState } from 'react';

const AUTH_STORAGE_KEY = 'smartstay_user';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (name: string, email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const normalizedName = name.trim() || email.split('@')[0] || 'Guest';
      const normalizedEmail = email.trim();

      if (!normalizedEmail) {
        throw new Error('Email is required');
      }

      const nextUser: AuthUser = {
        id: `user_${Date.now()}`,
        name: normalizedName,
        email: normalizedEmail,
        isAuthenticated: true,
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'Unable to sign in';
      setError(message);
      throw caughtError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
    setError(null);
  }, []);

  return useMemo(() => ({
    user,
    login,
    logout,
    isAuthenticated: Boolean(user?.isAuthenticated),
    isLoading,
    error,
  }), [error, isLoading, login, logout, user]);
};