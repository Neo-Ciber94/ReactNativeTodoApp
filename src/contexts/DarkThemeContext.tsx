import React, { createContext, useContext } from "react";
import { Theme } from "react-native-paper/lib/typescript/types";
import { getAppTheme } from "../themes/appTheme";

const DARK_THEME_KEY = "todos/isDark";

export interface DarkThemeContextProps {
  theme: Theme;
  dark: boolean;
  setDarkTheme: (dark: boolean) => void;
}

export const DarkThemeContext = createContext<DarkThemeContextProps>({
  dark: false,
  theme: {} as Theme,
  setDarkTheme: () => {},
});

export const DarkThemeProvider: React.FC = ({ children }) => {
  const [dark, setDark] = React.useState(() => {
    return localStorage.getItem(DARK_THEME_KEY) === "true";
  });
  const [theme, setTheme] = React.useState<Theme>(getAppTheme(dark));

  const setDarkTheme = (dark: boolean) => {
    setDark(dark);
    setTheme(getAppTheme(dark));
    localStorage.setItem(DARK_THEME_KEY, dark.toString());
  };

  return (
    <DarkThemeContext.Provider value={{ theme, dark, setDarkTheme }}>
      {children}
    </DarkThemeContext.Provider>
  );
};

export const useDarkTheme = () => useContext(DarkThemeContext);
