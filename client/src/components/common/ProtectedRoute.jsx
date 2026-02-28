import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/store/auth.store.js";

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const isCheckingAuth = useAuthStore((s) => s.isCheckingAuth);

  useEffect(() => {}, [isAuthenticated, isCheckingAuth]);

  if (isCheckingAuth) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
