// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../Services/authService';  // Import auth service

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;  // Redirect to login if not authenticated
  }

  return children;  // If authenticated, render the protected component (e.g., Home)
};

export default ProtectedRoute;
