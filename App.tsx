import React from "react";
import Layout from "./src/layouts/Layout";
import { Provider } from "react-redux";
import { todoStore } from "./src/redux/todos.store";
import { DarkThemeProvider } from "./src/contexts/DarkThemeContext";
import Main from "./src/pages/Main";
import { SnackbarProvider } from "./src/contexts/SnackbarContext";

export default function App() {
  return (
    <Provider store={todoStore}>
      <DarkThemeProvider>
        <SnackbarProvider>
          <Layout>
            <Main />
          </Layout>
        </SnackbarProvider>
      </DarkThemeProvider>
    </Provider>
  );
}
