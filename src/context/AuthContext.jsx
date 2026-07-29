import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../features/auth/services/auth.service';

const AuthContext = createContext();
let authStatusChecked = false;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const userData = await AuthService.getUser();
      const normalizedUser = userData?.data ?? userData?.user ?? userData;
      setUser(normalizedUser ?? null);
      return normalizedUser ?? null;
    } catch (error) {
      setUser(null);
      return null;
    }
  };

  useEffect(() => {
    const publicPaths = ["/", "/login", "/register"];
    const currentPath = window.location.pathname;

    if (publicPaths.includes(currentPath)) {
      setLoading(false);
      return;
    }

    const checkAuthStatus = async () => {
      setLoading(true);
      try {
        await refreshUser();
      } finally {
        setLoading(false);
      }
    };

    if (!authStatusChecked) {
      authStatusChecked = true;
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, []);

  const loginContext = async (formData) => {
    try {
      await AuthService.login(formData);
      const userData = await refreshUser();
      return { success: Boolean(userData), user: userData };
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  const logoutContext = async () => {
    try {
      await AuthService.logout();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        loginContext,
        logoutContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;