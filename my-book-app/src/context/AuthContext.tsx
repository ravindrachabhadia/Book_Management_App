import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for logout redirection

// Define the shape of the context data
interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (newToken: string) => void; // Function to call on successful login
  logout: () => void; // Function to call for logout
}

// Create the context with a default value (initially not authenticated)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for the provider component
interface AuthProviderProps {
  children: ReactNode; // To wrap around other components
}

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook for navigation during logout

  // Check localStorage for a token when the app loads
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      // TODO: Optionally verify token with backend here or fetch user details
    }
  }, []); // Empty dependency array means this runs once on mount

  // Function to update state and localStorage on login
  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
    // Navigate to home page after login is handled by LoginPage itself
  };

  // Function to clear state and localStorage on logout
  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
    // Redirect to login page after logout
    navigate('/login'); 
  };

  // Determine authentication status based on token presence
  const isAuthenticated = !!token; 

  // Value provided to consuming components
  const value = {
    token,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to easily use the AuthContext in components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};