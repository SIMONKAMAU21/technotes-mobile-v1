import React, { createContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { ThemeType } from "@/constants/theme";

type ModeType = ThemeType | "system" | "automatic";

interface ThemeContextType {
  theme: ThemeType; // applied theme (light/dark)
  mode: ModeType;   // user preference
  toggleTheme: () => void;
  setMode: (mode: ModeType) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  mode: "system",
  toggleTheme: () => {},
  setMode: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceTheme = useColorScheme(); // 'light' | 'dark' | null
  const [theme, setTheme] = useState<ThemeType>("light");
  const [mode, setModeState] = useState<ModeType>("system");

  const isNightTime = () => {
    const now = new Date();
    const mins = now.getHours() * 60 + now.getMinutes();
    return mins >= 18 * 60 + 30 || mins <= 6 * 60 + 30;
  };

  const applyTheme = (selectedMode: ModeType) => {
    if (selectedMode === "light" || selectedMode === "dark") {
      setTheme(selectedMode);
    } else if (selectedMode === "system") {
      setTheme(deviceTheme === "dark" ? "dark" : "light");
    } else if (selectedMode === "automatic") {
      setTheme(isNightTime() ? "dark" : "light");
    }
  };

  useEffect(() => {
    applyTheme(mode);
  }, [mode, deviceTheme]);

  // Recheck every 1 min if mode is automatic
  useEffect(() => {
    if (mode !== "automatic") return;

    const interval = setInterval(() => {
      applyTheme("automatic");
    }, 60000);

    return () => clearInterval(interval);
  }, [mode]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setModeState(newTheme); // update mode to match toggle
  };

  const setMode = (newMode: ModeType) => {
    setModeState(newMode);
    applyTheme(newMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
