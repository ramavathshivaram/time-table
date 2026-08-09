import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/auth.store";

export function PublicRoute() {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
