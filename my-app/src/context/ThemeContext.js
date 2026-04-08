import React, { createContext, useState } from "react";

// TODO: Use useState to create state for theme (light/dark)
// TODO: Create a toggle function to switch between light and dark
// TODO: Pass theme and toggle function in the Provider value
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme ] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return <ThemeContext.Provider value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>;
}