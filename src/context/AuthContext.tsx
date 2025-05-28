import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { users } from '../data/users';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check for saved user on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        setIsAdmin(parsedUser.isAdmin);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (email: string, password: string) => {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      setUser(user);
      setIsAuthenticated(true);
      setIsAdmin(user.isAdmin);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    
    return false;
  };

  const register = (name: string, email: string, password: string) => {
    // Check if email already exists
    const emailExists = users.some(u => u.email === email);
    
    if (emailExists) {
      return false;
    }
    
    const newUser: User = {
      id: (users.length + 1).toString(),
      name,
      email,
      password,
      isAdmin: false
    };
    
    // In a real app, this would be an API call
    // For demo, we're just updating local state
    users.push(newUser);
    
    // Automatically log in the new user
    setUser(newUser);
    setIsAuthenticated(true);
    setIsAdmin(false);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};