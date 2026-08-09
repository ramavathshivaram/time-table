import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { authService } from "@/features/auth/services/auth.service";

import LoadingHeader from "./LoadingHeader";

const AuthInitializer = () => {
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    authService.checkAuth();
  }, []);

  if (isCheckingAuth) {
    return <LoadingHeader />;
  }

  return <Outlet />;
};

export default AuthInitializer;
