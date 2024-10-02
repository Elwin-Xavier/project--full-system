/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { getUserDetails, setUserDetails, getToken, logout } from "../utils/helpers";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      const storedUser = getUserDetails();
      const token = getToken();
      
      if (storedUser && token) {
        // Optionally, you can add a token validation check here
        setUser(storedUser);
      }
      
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    setUserDetails(user);
  }, [user]);

  const logoutUser = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout: logoutUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}