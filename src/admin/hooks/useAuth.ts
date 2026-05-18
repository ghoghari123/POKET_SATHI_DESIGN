import { useState, useEffect, useCallback } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
  isLoading: boolean;
}

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem('adminAuth');
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        setAuthState({
          isAuthenticated: true,
          user: parsed.user,
          isLoading: false,
        });
      } catch {
        setAuthState({ isAuthenticated: false, user: null, isLoading: false });
      }
    } else {
      setAuthState({ isAuthenticated: false, user: null, isLoading: false });
    }
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const user = { username };
      localStorage.setItem('adminAuth', JSON.stringify({ user }));
      setAuthState({
        isAuthenticated: true,
        user,
        isLoading: false,
      });
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid username or password',
    };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('adminAuth');
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
  }, []);

  return { ...authState, login, logout };
}