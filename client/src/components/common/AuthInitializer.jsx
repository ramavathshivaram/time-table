import { useEffect } from "react";
import useAuthStore from "@/store/auth.store";
import LoadingHeader from "@/components/common/LoadingHeader";

const AuthInitializer = ({ children }) => {
  const authCheck = useAuthStore((s) => s.authCheck);
  const isCheckingAuth = useAuthStore((s) => s.isCheckingAuth);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) return <LoadingHeader />;

  return children;
};

export default AuthInitializer;