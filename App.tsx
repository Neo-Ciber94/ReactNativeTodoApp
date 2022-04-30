import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Layout from "./src/layouts/Layout";
import Main from "./src/pages/Main";
import { appTheme } from "./src/themes/appTheme";
import { Provider } from "react-redux";
import { todoStore } from "./src/redux/todos.store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import routes from "./src/routes";
import AddTodo from "./src/pages/AddTodo";
import EditTodo from "./src/pages/EditTodo";
import Header from "./src/layouts/Header";
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={todoStore}>
      <PaperProvider theme={appTheme}>
        <Layout>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={routes.list}
              screenOptions={{
                header: (props) => <Header {...props} />,
                animation: "slide_from_bottom",
                contentStyle: styles.container,
              }}
            >
              <Stack.Screen name={routes.list} component={Main} />
              <Stack.Screen name={routes.add} component={AddTodo} />
              <Stack.Screen name={routes.edit} component={EditTodo} />
            </Stack.Navigator>
          </NavigationContainer>
        </Layout>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "90%",
  },
});
