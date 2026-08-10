import React from "react";
import { Moon, Sun } from "lucide-react";

import { Switch } from "@/shared/ui/switch";
import { usePreferencesStore } from "@/shared/preferences/preferences.store";

const DarkMode = () => {
  const darkMode = usePreferencesStore((state) => state.darkMode);

  const toggleDarkMode = usePreferencesStore((state) => state.toggleDarkMode);

  return (
    <div className="flex items-center justify-between">
      {/* Label */}
      <div className="flex items-center gap-2">
        {darkMode ? <Moon className="size-4" /> : <Sun className="size-4" />}

        <span className="text-sm font-medium">
          {darkMode ? "Dark Mode" : "Light Mode"}
        </span>
      </div>

      {/* Toggle */}
      <Switch
        checked={darkMode}
        onCheckedChange={toggleDarkMode}
        aria-label="Toggle dark mode"
      />
    </div>
  );
};

export default DarkMode;
