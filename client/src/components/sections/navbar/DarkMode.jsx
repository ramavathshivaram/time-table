import React, { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import useUserStore from "@/store/user.store";
import { Button } from "@/components/ui/button";
import { updateDarkModeApi } from "@/lib/apis/user.api.js";

const DarkMode = () => {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser); // adjust if your store uses another action

  const darkMode = user?.settings?.darkMode ?? false;

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setUser({
      ...user,
      settings: {
        ...user?.settings,
        darkMode: !darkMode,
      },
    });

    updateDarkModeApi({ darkMode: !darkMode });
  };

  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-2"
      onClick={toggleDarkMode}
    >
      {darkMode ? <Moon size={16} /> : <Sun size={16} />}
      {darkMode ? "Dark Mode" : "Light Mode"}
    </Button>
  );
};

export default DarkMode;
