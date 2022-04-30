import React, { createContext, useContext } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";
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
  const colorScheme = useColorScheme();
  const [dark, setDark] = React.useState(() =>
    isUserPreferenceDarkMode(colorScheme)
  );
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

function isUserPreferenceDarkMode(colorSchemeName: ColorSchemeName): boolean {
  const isDarkModeString = localStorage.getItem(DARK_THEME_KEY);

  // The localStore has priority over the user preference
  if (isDarkModeString) {
    return isDarkModeString === "true";
  } else {
    const isDarkMode = colorSchemeName === "dark";
    localStorage.setItem(DARK_THEME_KEY, isDarkMode.toString());
    return isDarkMode;
  }
}

export const useDarkTheme = () => useContext(DarkThemeContext);

export const useIsDarkTheme = () => useContext(DarkThemeContext).dark;
