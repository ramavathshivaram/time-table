import React, { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import useUserStore from "@/store/user.store";
import { Button } from "@/components/ui/button";
import { updateDarkModeApi } from "@/lib/apis/user.api.js";

const DarkMode = () => {
  const darkMode = useUserStore((s) => s.darkMode);
  const setDarkMode = useUserStore((s) => s.setDarkMode);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

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
