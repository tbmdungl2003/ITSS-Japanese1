import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = () => {
  const { auth } = useContext(AuthContext);
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/homepage" />;
  // return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export const PublicRoute = () => {
  const { auth } = useContext(AuthContext);
  return auth.isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};