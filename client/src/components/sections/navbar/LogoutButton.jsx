import React from "react";
import { LogOut } from "lucide-react";
import useAuthStore from "@/store/auth.store";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  const logout = useAuthStore((s) => s.logout);

  return (
    <Button
      onClick={logout}
      className="w-full flex items-center justify-between px-3 py-2 
      bg-red-500 hover:bg-red-600 text-white rounded-lg
      transition-all duration-200 group"
    >
      <span className="flex items-center gap-2 font-medium">
        <LogOut
          size={16}
          className="transition-transform duration-200 group-hover:-translate-x-1"
        />
        Logout
      </span>

      <span className="text-xs opacity-70 group-hover:opacity-100">
        →
      </span>
    </Button>
  );
};

export default LogoutButton;