// context/AuthContext.tsx
import React, { createContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import * as authService from '../service/authService';

interface IAuthContext {
  user: User | null;
  loading: boolean;
  register: (e: string, p: string) => Promise<any>;
  login: (e: string, p: string) => Promise<any>;
  logout: () => Promise<any>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const register = (email: string, password: string) => authService.register(email, password);
  const login = (email: string, password: string) => authService.login(email, password);
  const logout = () => authService.logout();

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
