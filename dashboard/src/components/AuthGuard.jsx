import { useEffect, useState } from "react";
import axios from "axios";

import AuthContext from "../context/AuthContext.jsx";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3002";

const FRONTEND_URL =
  import.meta.env.VITE_FRONTEND_URL || "http://localhost:5174";

const AuthGuard = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const checkAuthentication = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/me`, {
          withCredentials: true,
          signal: controller.signal,
        });

        setUser(response.data.user);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          window.location.replace(`${FRONTEND_URL}/signup`);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsCheckingAuth(false);
        }
      }
    };

    checkAuthentication();

    return () => controller.abort();
  }, []);

  if (isCheckingAuth) {
    return <p className="auth-loading">Checking authentication...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthGuard;