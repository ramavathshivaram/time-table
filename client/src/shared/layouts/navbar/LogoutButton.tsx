import React from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { authService } from "@/features/auth/services/auth.service";

const LogoutButton = () => {
  return (
    <Button
      onClick={authService.logout}
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

      <span className="text-xs opacity-70 group-hover:opacity-100">→</span>
    </Button>
  );
};

export default LogoutButton;
