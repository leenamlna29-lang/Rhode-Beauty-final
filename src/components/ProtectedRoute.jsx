import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ allowedRole }) {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (allowedRole && userRole !== allowedRole) {
    // Logged in but wrong role
    return <Navigate to={userRole === 'admin' ? '/admin' : '/'} replace />;
  }

  return <Outlet />;
}
