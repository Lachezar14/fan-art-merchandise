import React from "react";
import { useContext, useEffect, useState} from "react";
import {getAuth} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const auth = getAuth();
  const [user, setUser] = useState();
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
    }, [user]);
  
  const value = {
    user
  }
  
  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}