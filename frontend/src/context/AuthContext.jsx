import { createContext, useEffect, useState } from "react";
import * as authService from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = Boolean(user);
  const isAdmin = user?.role === "admin";

  const loginUser = async (email, password) => {
    const result = await authService.login({ email, password });

    const token = result.data.accessToken;
    const loggedUser = result.data.user;

    localStorage.setItem("accessToken", token);
    setUser(loggedUser);

    return loggedUser;
  };

  const registerUser = async (payload) => {
    const result = await authService.register(payload);

    const token = result.data.accessToken;
    const registeredUser = result.data.user;

    localStorage.setItem("accessToken", token);
    setUser(registeredUser);

    return registeredUser;
  };

  const logoutUser = async () => {
    try {
      await authService.logout();
    } catch {
      // ignore logout API errors
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
        setUser(result.data.user || result.data);
      } catch {
        localStorage.removeItem("accessToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isAdmin,
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}