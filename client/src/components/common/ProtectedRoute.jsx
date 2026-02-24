import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "@/store/user.store.js";

const ProtectedRoute = () => {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);

  const isCheckingAuth = useUserStore((s) => s.isCheckingAuth);

  useEffect(() => {}, [isAuthenticated, isCheckingAuth]);

  if (isCheckingAuth) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
