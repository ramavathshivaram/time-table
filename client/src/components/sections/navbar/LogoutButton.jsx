import React from "react";
import { LogOut } from "lucide-react";
import useAuthStore from "@/store/auth.store";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  const logout = useAuthStore((s) => s.logout);

  return (
    <Button
      variant="destructive"
      className="w-full flex items-center justify-center gap-2"
      onClick={logout}
    >
      <LogOut size={16} />
      Logout
    </Button>
  );
};

export default LogoutButton;