import { useCallback, useState } from 'react';

const AUTH_STORAGE_KEY = 'smartstay_user';

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((email: string, password: string) => {
    // Mock authentication
    const mockUser = {
      id: `user_${Date.now()}`,
      name: email.split('@')[0],
      email,
      isAuthenticated: true,
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }, []);

  const isAuthenticated = !!user?.isAuthenticated;

  return {
    user,
    login,
    logout,
    isAuthenticated,
  };
};
