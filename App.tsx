import React from "react";
import Layout from "./src/layouts/Layout";
import { Provider } from "react-redux";
import { todoStore } from "./src/redux/todos.store";
import { StyleSheet } from "react-native";
import { DarkThemeProvider } from "./src/contexts/DarkThemeContext";
import Main from "./src/pages/Main";

export default function App() {
  return (
    <Provider store={todoStore}>
      <DarkThemeProvider>
        <Layout>
          <Main />
        </Layout>
      </DarkThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "90%",
  },
});
