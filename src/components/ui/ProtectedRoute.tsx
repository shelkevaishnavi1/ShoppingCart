import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !isAdmin) {
    // Redirect to home if admin access is required but user is not admin
    return <Navigate to="/" />;
  }

  // Render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;