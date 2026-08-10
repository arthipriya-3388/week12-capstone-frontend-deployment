import { useState } from "react";
import AuthContext from "./AuthContext";
import api from "../services/api";

const AuthProvider = ({ children }) => {
  
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

  
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  
  const [loading, setLoading] = useState(false);

  
  const login = async (email, password) => {
    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("Login response:", response.data);

      const responseData = response.data;

     

      const data = responseData.data || responseData;

      const jwtToken = data.token;
      const loggedInUser = data.user;

      
      if (!jwtToken) {
        throw new Error(
          "JWT token was not received from server."
        );
      }

      
      localStorage.setItem("token", jwtToken);

      if (loggedInUser) {
        localStorage.setItem(
          "user",
          JSON.stringify(loggedInUser)
        );
      }

      
      setToken(jwtToken);
      setUser(loggedInUser || null);

      return {
        success: true,
        user: loggedInUser,
        token: jwtToken,
      };
    } catch (error) {
      console.error("Login failed:", error);

      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  
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
