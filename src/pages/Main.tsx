import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import AddTodoButton from "../components/AddTodoButton";
import TodoList from "../components/TodoList";
import { todosMocks } from "../mocks/todos.mocks";
import { initTodos, TodoState } from "../redux/todos.slice";
import { todoStore } from "../redux/todos.store";
import routes from "../routes";
import { RootStackParamList } from "../routes/navigator";
import { LocalStore } from "../utils/persistence/LocalPersistence";

const store = new LocalStore<TodoState>("todos/data");
type Props = NativeStackScreenProps<RootStackParamList, "List">;

export default function Main({ navigation }: Props) {
  // Initialize the todo store
  useTodosStorage();

  return (
    <View style={{ height: "100%" }}>
      <TodoList />
      <AddTodoButton onPress={() => navigation.navigate(routes.add, {})} />
    </View>
  );
}

function useTodosStorage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initialize = async () => {
      const data = await store.load();

      if (data) {
        dispatch(initTodos({ todos: data.todos }));
      } else {
        dispatch(initTodos({ todos: todosMocks }));
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    const unsuscribe = todoStore.subscribe(async () => {
      const appState = todoStore.getState();
      await store.save(appState.todoState);
    });

    return () => unsuscribe();
  }, []);
}
