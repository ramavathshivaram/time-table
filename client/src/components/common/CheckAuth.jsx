import React from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "@/store/user.store.js";

const CheckAuth = () => {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return <div>hello</div>;
};

export default CheckAuth;