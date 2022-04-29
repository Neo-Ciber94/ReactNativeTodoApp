import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { TodoContextProvider } from "./src/contexts/TodoContext";
import Layout from "./src/layouts/Layout";
import Main from "./src/layouts/Main";
import { appTheme } from "./src/themes/appTheme";
import { Provider } from "react-redux";
import { todoStore } from "./src/redux/todos.store";

export default function App() {
  return (
    <Provider store={todoStore}>
      <TodoContextProvider>
        <PaperProvider theme={appTheme}>
          <Layout>
            <Main />
          </Layout>
        </PaperProvider>
      </TodoContextProvider>
    </Provider>
  );
}
