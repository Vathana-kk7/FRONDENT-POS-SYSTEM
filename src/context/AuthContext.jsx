import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../features/auth/services/auth.service';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Check if session cookie is active on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await AuthService.me();
        setUser(response.data || response);
      } catch (error) {
        setUser(null); // Cookie is expired or missing
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // 2. Handle Login & store user state
  const loginContext = async (formData) => {
    const res = await AuthService.login(formData);

    if (res.status === "success" || res.data || res.user) {
      try {
        const userRes = await AuthService.me();
        setUser(userRes.data || userRes);
      } catch {
        setUser(res.user || res.data || true);
      }
    }
    return res;
  };

  // 3. Handle Logout & clear user state
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

// Export custom hook for easy access across components
export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;