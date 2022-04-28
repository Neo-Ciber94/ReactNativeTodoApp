import { StatusBar } from "expo-status-bar";
import React, { useReducer } from "react";
import { DefaultTheme as PaperDefaultTheme } from "react-native-paper";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Theme } from "react-native-paper/lib/typescript/types";
import AddTodoButton from "./src/components/AddTodoButton";
import TodoList from "./src/components/TodoList";
import Layout from "./src/layouts/Layout";
import { useTodoReducer } from "./src/redux/todos.redux";

const theme: Theme = {
  ...PaperDefaultTheme,
  fonts: {
    light: {
      fontFamily: "monospace",
    },
    medium: {
      fontFamily: "monospace",
    },
    regular: {
      fontFamily: "monospace",
    },
    thin: {
      fontFamily: "monospace",
    },
  },
};

export default function App() {
  const [todoState, dispatch] = useTodoReducer();

  return (
    <PaperProvider theme={theme}>
      <Layout>
        <TodoList todos={todoState.todos} />
        <AddTodoButton onPress={() => console.log("Add")} />
      </Layout>
    </PaperProvider>
  );
}
