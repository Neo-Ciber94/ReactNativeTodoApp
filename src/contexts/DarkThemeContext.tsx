import React, { createContext, useContext, useLayoutEffect } from "react";
import { useColorScheme } from "react-native";
import { Theme } from "react-native-paper/lib/typescript/types";
import { getAppTheme } from "../themes/appTheme";
import { LocalStore } from "../utils/persistence/LocalPersistence";

const store = new LocalStore<boolean>("todos/isDark");

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
  const userPrefersDarkMode = colorScheme === "dark";
  const [dark, setDark] = React.useState(userPrefersDarkMode);
  const [theme, setTheme] = React.useState<Theme>(getAppTheme(dark));

  useLayoutEffect(() => {
    const initialize = async () => {
      const isDark = await store.load();
      if (isDark != null) {
        setDark(isDark);
      }
    };

    initialize();
  }, []);

  const setDarkTheme = (dark: boolean) => {
    setDark(dark);
    setTheme(getAppTheme(dark));
    store.save(dark);
  };

  return (
    <DarkThemeContext.Provider value={{ theme, dark, setDarkTheme }}>
      {children}
    </DarkThemeContext.Provider>
  );
};

export const useDarkTheme = () => useContext(DarkThemeContext);

export const useIsDarkTheme = () => useContext(DarkThemeContext).dark;
