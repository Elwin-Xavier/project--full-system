import { createContext, useContext, useEffect, useState } from "react";
import { getUserDetails, setUserDetails, getToken, logout } from "../utils/helpers";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = getUserDetails();
    const token = getToken();
    return storedUser && token ? storedUser : null;
  });

  useEffect(() => {
    setUserDetails(user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
