import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Layout from "./src/layouts/Layout";

export default function App() {
  return (
    <PaperProvider>
      <Layout>
        <Text>Todo App</Text>
        <StatusBar style="auto" />
      </Layout>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
