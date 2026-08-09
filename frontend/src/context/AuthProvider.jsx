import { useState } from "react";
import AuthContext from "./AuthContext";
import api from "../services/api";

const AuthProvider = ({ children }) => {
  // Get stored user
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse stored user:", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  // Get stored token
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  // Loading state
  const [loading, setLoading] = useState(false);

  // Login
  const login = async (email, password) => {
    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("Login response:", response.data);

      const responseData = response.data;

      /*
       * Expected backend response:
       *
       * {
       *   success: true,
       *   message: "Login successful",
       *   data: {
       *     user: {...},
       *     token: "..."
       *   }
       * }
       */

      const data = responseData.data || responseData;

      const jwtToken = data.token;
      const loggedInUser = data.user;

      // Check JWT token
      if (!jwtToken) {
        throw new Error(
          "JWT token was not received from server."
        );
      }

      // Store token
      localStorage.setItem("token", jwtToken);

      // Store user
      if (loggedInUser) {
        localStorage.setItem(
          "user",
          JSON.stringify(loggedInUser)
        );
      }

      // Update state
      setToken(jwtToken);
      setUser(loggedInUser || null);

      return {
        success: true,
        user: loggedInUser,
        token: jwtToken,
      };
    } catch (error) {
      console.error("Login failed:", error);

      /*
       * Preserve the original error.
       * This avoids the ESLint
       * preserve-caught-error error.
       */
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;