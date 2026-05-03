import { createContext, useEffect, useMemo, useState } from "react";
import * as authService from "../services/authService";

export const AuthContext = createContext(null);

const normalizeUser = (result) => result?.data?.user || result?.data || result?.user || null;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginUser = async (email, password) => {
    const result = await authService.login({ email, password });
    const token = result?.data?.accessToken || result?.accessToken;
    const loggedUser = normalizeUser(result);

    if (!token) throw new Error("Access token missing from response.");

    localStorage.setItem("accessToken", token);
    setUser(loggedUser);
    return loggedUser;
  };

  const registerUser = async (payload) => {
    const result = await authService.register(payload);
    const token = result?.data?.accessToken || result?.accessToken;
    const registeredUser = normalizeUser(result);

    if (token) localStorage.setItem("accessToken", token);
    setUser(registeredUser);
    return registeredUser;
  };

  const logoutUser = async () => {
    try {
      await authService.logout();
    } catch {
      // logout should still clear local state
    }
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const result = await authService.getMe();
        setUser(normalizeUser(result));
      } catch {
        localStorage.removeItem("accessToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === "admin",
      loginUser,
      registerUser,
      logoutUser,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
