import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth(); // Get the authentication status from context
  const location = useLocation(); // Get current location to redirect back after login

  if (!isAuthenticated) {
    // If not authenticated, redirect to the /login page
    // Pass the current location in state so we can redirect back after login (optional)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child route element
  // Outlet is used by react-router-dom v6 to render nested routes
  return <Outlet />; 
};

export default ProtectedRoute;