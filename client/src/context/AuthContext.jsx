import { createContext, useEffect, useState } from "react";
import api from "../api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("smartComplaintToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
      } catch (error) {
        localStorage.removeItem("smartComplaintToken");
        localStorage.removeItem("smartComplaintUser");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const saveAuth = ({ token, user: nextUser }) => {
    localStorage.setItem("smartComplaintToken", token);
    localStorage.setItem("smartComplaintUser", JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem("smartComplaintToken");
    localStorage.removeItem("smartComplaintUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, saveAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
