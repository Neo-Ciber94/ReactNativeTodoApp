import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { useDarkTheme } from "../contexts/DarkThemeContext";
import Header from "../layouts/Header";
import routes from "../routes";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import ListTodos from "./ListTodos";

const Stack = createNativeStackNavigator();

export default function Main() {
  // FIXME: react-native-paper and react-navigation theme types as semi-compatibles
  const { theme } = useDarkTheme();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme as unknown as Theme}>
        <Stack.Navigator
          initialRouteName={routes.list}
          screenOptions={{
            header: (props) => <Header {...props} />,
            animation: "slide_from_bottom",
            contentStyle: styles.container,
          }}
        >
          <Stack.Screen name={routes.list} component={ListTodos} />
          <Stack.Screen name={routes.add} component={AddTodo} />
          <Stack.Screen name={routes.edit} component={EditTodo} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "90%",
  },
});
