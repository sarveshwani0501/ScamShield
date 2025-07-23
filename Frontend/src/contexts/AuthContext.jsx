import React, { createContext, useContext, useState, useEffect } from "react";
import checkUserAuthLoader from "../AuthLoader";
const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await checkUserAuthLoader();
        console.log(response.userid);
        setUser(response.userid);
        console.log("User authenticated");
      } catch (error) {
        console.log("User not authenticated");
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ isLoading, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
