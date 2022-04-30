import { Theme } from "react-native-paper/lib/typescript/types";
import { configureFonts, DarkTheme, DefaultTheme } from "react-native-paper";

const fontConfig = {
  web: {
    regular: {
      fontFamily: "monospace",
    },
    medium: {
      fontFamily: "monospace",
    },
    light: {
      fontFamily: "monospace",
    },
    thin: {
      fontFamily: "monospace",
    },
  },
  ios: {
    regular: {
      fontFamily: "monospace",
    },
    medium: {
      fontFamily: "monospace",
    },
    light: {
      fontFamily: "monospace",
    },
    thin: {
      fontFamily: "monospace",
    },
  },
  android: {
    regular: {
      fontFamily: "monospace",
    },
    medium: {
      fontFamily: "monospace",
    },
    light: {
      fontFamily: "monospace",
    },
    thin: {
      fontFamily: "monospace",
    },
  },
  default: {
    regular: {
      fontFamily: "monospace",
    },
    medium: {
      fontFamily: "monospace",
    },
    light: {
      fontFamily: "monospace",
    },
    thin: {
      fontFamily: "monospace",
    },
  },
};

export function getAppTheme(isDark: boolean): Theme {
  const mainTheme = isDark ? DarkTheme : DefaultTheme;
  return {
    ...mainTheme,
    fonts: configureFonts(fontConfig),
  };
}
