import React, { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import useUserStore from "@/store/user.store";
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

  const toggleDarkMode = async () => {
    const value = !darkMode;

    setDarkMode(value);
    updateDarkModeApi({ darkMode: value });
  };

  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted/50 transition">
      
      {/* Label */}
      <div className="flex items-center gap-2 text-sm font-medium">
        {darkMode ? (
          <Moon size={16} className="text-blue-500" />
        ) : (
          <Sun size={16} className="text-yellow-500" />
        )}

        <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
      </div>

      {/* Toggle Switch */}
      <button
        onClick={toggleDarkMode}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300
        ${darkMode ? "bg-blue-600" : "bg-gray-300"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
          ${darkMode ? "translate-x-6" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
};

export default DarkMode;