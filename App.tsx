import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Layout from "./src/layouts/Layout";
import Main from "./src/pages/Main";
import { appTheme } from "./src/themes/appTheme";
import { Provider } from "react-redux";
import { todoStore } from "./src/redux/todos.store";

export default function App() {
  return (
    <Provider store={todoStore}>
      <PaperProvider theme={appTheme}>
        <Layout>
          <Main />
        </Layout>
      </PaperProvider>
    </Provider>
  );
}
