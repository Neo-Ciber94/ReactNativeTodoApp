import React from "react";
import { DefaultTheme as PaperDefaultTheme } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import { Theme } from "react-native-paper/lib/typescript/types";
import { TodoContextProvider } from "./src/contexts/TodoContext";
import Layout from "./src/layouts/Layout";
import Main from "./src/layouts/Main";
import { appTheme } from "./src/themes/defaultTheme";

export default function App() {
  return (
    <TodoContextProvider>
      <PaperProvider theme={appTheme}>
        <Layout>
          <Main />
        </Layout>
      </PaperProvider>
    </TodoContextProvider>
  );
}
